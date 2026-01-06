import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { questions } from '../data/questions';
import { Answers, AnswerLevel } from '../types/diagnosis';
import { calculateScores, determineTypeCode } from '../utils/diagnosis';
import { applyJsonLd, applySeoMeta } from '../utils/seo';
import { saveDiagnosisResult } from '../lib/database';
import { SITE_ALT_NAME, SITE_NAME } from '../data/site';
import { trackDiagnosisStart, trackDiagnosisComplete } from '../utils/analytics';
import { ScaleSelector } from '../components/ScaleSelector';

const QUESTIONS_PER_PAGE = 5;
const TOTAL_PAGES = 8;

export default function DiagnosisPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  // トップページから渡された回答があれば初期値として使用
  const [answers, setAnswers] = useState<Answers>(location.state?.answers || {});
  const questionsContainerRef = useRef<HTMLDivElement>(null);
  const questionCardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = Math.min(startIndex + QUESTIONS_PER_PAGE, questions.length);
  const currentPageQuestions = questions.slice(startIndex, endIndex);

  const totalAnswered = Object.keys(answers).length;
  const progress = (totalAnswered / questions.length) * 100;
  const isLastPage = currentPage === TOTAL_PAGES - 1;

  const allCurrentPageAnswered = currentPageQuestions.every(
    q => answers[q.id] !== undefined
  );

  useEffect(() => {
    // トップページから回答が渡されている場合、最初の5問が回答済みなので2ページ目から開始
    if (location.state?.answers) {
      const answeredCount = Object.keys(location.state.answers).length;
      if (answeredCount >= QUESTIONS_PER_PAGE) {
        setCurrentPage(1);
      }
    }
  }, [location.state]);

  useEffect(() => {
    const origin = window.location.origin;
    applySeoMeta({
      title: `MTPA（仮面診断）で外面性格診断を開始 - 16タイプ性格診断 | ${SITE_NAME}`,
      description: `MTPA（仮面診断）で外面性格診断・ヴェール診断を実施。40問の質問に答えて人前での振る舞いを4軸×16タイプで性格診断します（約5分・完全無料）`,
      canonicalUrl: `${origin}/diagnosis`,
    });

    applyJsonLd('jsonld-diagnosis-howto', {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "MTPA（仮面診断）で外面性格診断を行う方法",
      description: "MTPA（仮面診断）で外面性格診断・ヴェール診断を実施する手順を説明します。40問の質問に答えて、人前での振る舞いを4軸×16タイプで性格診断します。",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "診断を開始",
          text: "「診断を始める」ボタンをクリックして、MTPA（仮面診断）の外面性格診断を開始します。",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "質問に回答",
          text: "40問の質問（5問×8ページ）に6段階で回答します。各質問は「人前での自分（学校・職場・初対面など）」をイメージして答えてください。",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "診断結果を確認",
          text: "回答完了後、あなたの仮面タイプ（4文字コード）と詳細な診断結果が表示されます。",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "結果をシェア",
          text: "診断結果をSNSでシェアして、友達と比較したり、自己理解を深めたりできます。",
        },
      ],
    });

    trackDiagnosisStart();
  }, []);

  useEffect(() => {
    if (questionsContainerRef.current) {
      questionsContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [currentPage]);

  const scrollToElement = useCallback((el: HTMLElement, align: 'start' | 'center') => {
    // OS設定（Reduce motion）を尊重
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const behavior: ScrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

    const rect = el.getBoundingClientRect();
    const elementTop = rect.top + window.scrollY;

    const headerEl = document.querySelector('header');
    const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 64;
    const extraPadding = 16; // ヘッダー直下に少し余白

    const top =
      align === 'center'
        ? elementTop - (window.innerHeight / 2 - rect.height / 2)
        : elementTop - headerHeight - extraPadding;

    window.scrollTo({ top: Math.max(0, top), behavior });
  }, []);

  const handleAnswer = useCallback((questionId: number, level: AnswerLevel) => {
    // 同じ回答を再度押した場合は何もしない（過剰スクロール防止）
    if (answers[questionId] === level) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: level
    }));

    // 同一ページ内の「次の質問カード」へ自動スクロール
    const idx = currentPageQuestions.findIndex((q) => q.id === questionId);
    if (idx < 0) return;

    const next = currentPageQuestions[idx + 1];
    if (!next) {
      requestAnimationFrame(() => {
        if (nextButtonRef.current) {
          scrollToElement(nextButtonRef.current, 'center');
        }
      });
      return;
    }

    requestAnimationFrame(() => {
      const nextEl = questionCardRefs.current[next.id];
      if (nextEl) {
        scrollToElement(nextEl, 'start');
      }
    });
  }, [answers, currentPageQuestions, scrollToElement]);

  const handleNext = async () => {
    if (!allCurrentPageAnswered) return;

    if (isLastPage) {
      const scores = calculateScores(questions, answers);
      const typeCode = determineTypeCode(scores);

      trackDiagnosisComplete(typeCode);

      try {
        const { data, error } = await saveDiagnosisResult(typeCode, answers, scores);

        if (error) {
          console.error('診断結果の保存に失敗しました:', error);
        } else {
          console.log('診断結果を保存しました:', data?.id);
        }

        navigate(`/type/${typeCode}`, {
          state: {
            scores,
            diagnosisResultId: data?.id || null
          }
        });
      } catch (err) {
        console.error('予期しないエラーが発生しました:', err);
        navigate(`/type/${typeCode}`, { state: { scores } });
      }
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-slate-600">
              ページ {currentPage + 1} / {TOTAL_PAGES}
            </span>
            <span className="text-sm font-semibold text-slate-600">
              {totalAnswered} / {questions.length} 回答済み ({Math.round(progress)}%)
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-slate-800 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="text-center text-slate-500 text-sm">
            「人前での自分」をイメージして回答してください
          </p>
        </div>

        <div ref={questionsContainerRef} className="space-y-6 mb-8">
          {currentPageQuestions.map((question, index) => (
            <div
              key={question.id}
              ref={(el) => {
                questionCardRefs.current[question.id] = el;
              }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8 scroll-mt-24"
            >
              <div className="mb-6">
                <span className="text-sm font-semibold text-slate-500">
                  質問 {startIndex + index + 1}
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-2">
                  {question.text}
                </h2>
              </div>

              <ScaleSelector
                optionA={question.options.A.text}
                optionB={question.options.B.text}
                selectedLevel={answers[question.id]}
                onSelect={(level) => handleAnswer(question.id, level)}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 hover:bg-white"
          >
            <ChevronLeft className="w-5 h-5" />
            前へ
          </button>

          <button
            ref={nextButtonRef}
            onClick={handleNext}
            disabled={!allCurrentPageAnswered}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-full font-semibold transition-all duration-200 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed scroll-mt-24"
          >
            {isLastPage ? "結果を見る" : "次へ"}
            {!isLastPage && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
