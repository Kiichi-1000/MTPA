import { useState, useRef, useEffect, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { questions } from '../data/questions';
import { Answers, AnswerLevel } from '../types/diagnosis';
import { calculateScores, determineTypeCode } from '../utils/diagnosis';
import { applySeoMeta } from '../utils/seo';
import { saveDiagnosisResult } from '../lib/database';
import { SITE_ALT_NAME, SITE_NAME } from '../data/site';

const QUESTIONS_PER_PAGE = 5;
const TOTAL_PAGES = 8;

interface ScaleSelectorProps {
  optionA: string;
  optionB: string;
  selectedLevel: AnswerLevel | undefined;
  onSelect: (level: AnswerLevel) => void;
}

const ScaleSelector = memo(({ optionA, optionB, selectedLevel, onSelect }: ScaleSelectorProps) => {
  const levels: AnswerLevel[] = [1, 2, 3, 4, 5, 6];
  const sizes = [48, 36, 28, 28, 36, 48];

  return (
    <div className="space-y-6">
      <div className="flex justify-center items-center gap-2 md:gap-3 py-8">
        <span className="md:hidden flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-1">
          A
        </span>
        {levels.map((level, index) => {
          const isLeftSide = level <= 3;
          const getColorClass = () => {
            if (selectedLevel === level) {
              return isLeftSide ? 'bg-blue-600 shadow-lg' : 'bg-orange-600 shadow-lg';
            }
            return isLeftSide
              ? 'bg-blue-200 hover:bg-blue-300'
              : 'bg-orange-200 hover:bg-orange-300';
          };

          return (
            <button
              key={level}
              type="button"
              onClick={() => onSelect(level)}
              aria-label={`回答レベル${level}（${isLeftSide ? 'A寄り' : 'B寄り'}）`}
              aria-pressed={selectedLevel === level}
              className="relative transition-all duration-200 hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-400/60 rounded-full"
              style={{
                width: sizes[index],
                height: sizes[index],
              }}
            >
              <div
                className={`w-full h-full rounded-full transition-all duration-200 ${getColorClass()}`}
              />
            </button>
          );
        })}
        <span className="md:hidden flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm ml-1">
          B
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:gap-4">
        <div className="flex-1 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              A
            </span>
            <p className="text-slate-700 leading-relaxed pt-1">{optionA}</p>
          </div>
        </div>
        <div className="flex-1 bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              B
            </span>
            <p className="text-slate-700 leading-relaxed pt-1">{optionB}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

ScaleSelector.displayName = 'ScaleSelector';

export default function DiagnosisPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const questionsContainerRef = useRef<HTMLDivElement>(null);

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
    applySeoMeta({
      title: `診断 - ${SITE_NAME}（${SITE_ALT_NAME}）`,
      description: `${SITE_NAME}（${SITE_ALT_NAME}）で、40問の質問に答えて人前での振る舞いを4軸×16タイプで診断します（約5分）`,
      canonicalUrl: `${window.location.origin}/diagnosis`,
    });
  }, []);

  useEffect(() => {
    if (questionsContainerRef.current) {
      questionsContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [currentPage]);

  const handleAnswer = useCallback((questionId: number, level: AnswerLevel) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: level
    }));
  }, []);

  const handleNext = async () => {
    if (!allCurrentPageAnswered) return;

    if (isLastPage) {
      const scores = calculateScores(questions, answers);
      const typeCode = determineTypeCode(scores);

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
            <div key={question.id} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
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
            onClick={handleNext}
            disabled={!allCurrentPageAnswered}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-full font-semibold transition-all duration-200 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLastPage ? "結果を見る" : "次へ"}
            {!isLastPage && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
