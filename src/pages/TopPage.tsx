import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, TrendingUp, Shield } from 'lucide-react';
import { applyJsonLd, applySeoMeta } from '../utils/seo';
import heroImage from '../assets/Heroresize.jpg';
import phoneHeroImage from '../assets/phoneHeroresize.jpg';
import { SITE_ALT_NAME, SITE_NAME, CONTACT_EMAIL, OPERATOR_NAME } from '../data/site';
import { questions } from '../data/questions';
import { AnswerLevel } from '../types/diagnosis';
import { ScaleSelector } from '../components/ScaleSelector';

export default function TopPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerLevel>>({});
  
  // 最初の5問を取得
  const firstPageQuestions = useMemo(() => questions.slice(0, 5), []);
  const questionsContainerRef = useRef<HTMLDivElement>(null);
  const questionCardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const nextButtonRef = useRef<HTMLButtonElement>(null);

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
    const idx = firstPageQuestions.findIndex((q) => q.id === questionId);
    if (idx < 0) return;

    const next = firstPageQuestions[idx + 1];
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
  }, [answers, firstPageQuestions, scrollToElement]);

  useEffect(() => {
    // LCP改善: ヒーロー画像のpreload
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = phoneHeroImage;
    document.head.appendChild(preloadLink);

    const origin = window.location.origin;
    applySeoMeta({
      title: `MTPA（仮面診断）で外面性格診断 - 16タイプ性格診断ツール | ${SITE_NAME}`,
      description: 'MTPA（仮面診断）は、学校・職場など「人前での自分（仮面）」の外面性格診断ツールです。4軸×16タイプで性格診断・ヴェール診断を行い、あなたの外面的な振る舞いを分析します。',
      canonicalUrl: `${origin}/`,
    });

    applyJsonLd('jsonld-top', {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${origin}/#organization`,
          name: SITE_NAME,
          alternateName: SITE_ALT_NAME,
          url: `${origin}/`,
          email: CONTACT_EMAIL,
          logo: `${origin}/og.svg`,
          description: "MTPA（仮面診断）は、学校・職場など「人前での自分（仮面）」の外面性格診断・ヴェール診断ツールです。4軸×16タイプで性格診断を行い、あなたの外面的な振る舞いを分析します。",
        },
        {
          "@type": "WebSite",
          "@id": `${origin}/#website`,
          url: `${origin}/`,
          name: SITE_NAME,
          alternateName: SITE_ALT_NAME,
          inLanguage: "ja-JP",
          publisher: { "@id": `${origin}/#organization` },
          keywords: "MTPA,仮面診断,性格診断,外面性格診断,ヴェール診断,16タイプ,性格診断ツール,外面診断,人前での自分,社会的な振る舞い",
        },
        {
          "@type": "WebPage",
          "@id": `${origin}/#webpage`,
          url: `${origin}/`,
          name: `MTPA（仮面診断）で外面性格診断 - 16タイプ性格診断ツール | ${SITE_NAME}`,
          description: 'MTPA（仮面診断）は、学校・職場など「人前での自分（仮面）」の外面性格診断ツールです。4軸×16タイプで性格診断・ヴェール診断を行い、あなたの外面的な振る舞いを分析します。',
          isPartOf: { "@id": `${origin}/#website` },
          inLanguage: "ja-JP",
        }
      ]
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <section className="relative overflow-hidden text-white pt-0 pb-8 md:pb-16 md:pt-20 min-h-[60vh] md:min-h-[85vh]">
        <picture>
          <source media="(min-width: 768px)" srcSet={heroImage} width="1376" height="768" />
          <img
            src={phoneHeroImage}
            alt=""
            aria-hidden="true"
            width="768"
            height="852"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/85" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex flex-col">
          <div className="flex-1"></div>
          <div className="flex flex-col items-center justify-end pb-2 md:pb-6">
            <div className="text-center mb-0 md:mb-4 w-full md:max-w-4xl md:mx-auto">
              <div className="mb-6 md:mb-8">
                <h1 className="text-5xl md:text-7xl leading-tight tracking-tight text-white drop-shadow-2xl">
                  <span className="text-4xl md:text-6xl font-bold tracking-wider whitespace-nowrap absolute top-[200px] left-1/2 -translate-x-1/2 md:static md:translate-x-0">仮面診断MTPA</span>
                </h1>
              </div>
              <div className="flex flex-col items-center justify-center gap-6 mb-0 md:mt-16 md:mb-6 md:gap-4">
                {/* PC版: 以前どおり、単体でabsolute配置 */}
                <button
                  onClick={() => navigate('/diagnosis')}
                  className="hidden md:inline-flex group absolute top-[265px] md:absolute bg-white text-slate-900 hover:bg-slate-50 font-bold text-lg px-10 py-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-white/20 border-2 border-white/20 backdrop-blur-sm md:hover:shadow-white/30"
                >
                  <span className="relative z-10">今すぐ診断を始める</span>
                  <span className="rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>

                {/* スマホ版: CTA直下に「仮面診断とは？」を表示 */}
                <div className="md:hidden absolute top-[265px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                  <button
                    onClick={() => navigate('/diagnosis')}
                    className="group whitespace-nowrap bg-white text-slate-900 hover:bg-slate-50 font-bold text-base px-6 py-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-white/20 border-2 border-white/20 backdrop-blur-sm"
                  >
                    <span className="relative z-10">今すぐ診断を始める</span>
                    <span className="rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>

                  <button
                    onClick={() => navigate('/about')}
                    className="text-slate-300 hover:text-white font-medium text-base transition-all duration-300 underline underline-offset-4 decoration-2 decoration-slate-300/50 hover:decoration-white/80 tracking-wide"
                  >
                    仮面診断とは？
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="md:mt-auto max-w-md md:max-w-6xl mx-auto w-full pb-10 md:pb-12 md:pt-10">
            <div className="hidden md:grid md:mt-[150px] grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-white/50 md:bg-white/75 backdrop-blur-sm rounded-xl shadow-lg p-3 md:p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 md:hover:-translate-y-1">
                <div className="flex justify-center mb-2 md:mb-4">
                  <div className="bg-slate-800 rounded-full p-2 md:p-3">
                    <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-slate-800 mb-1 md:mb-2 text-sm md:text-base">16タイプ性格診断</h3>
                <p className="text-xs md:text-sm text-slate-600 mb-2 md:mb-4">
                  4つの軸であなたの外面性格診断を実施
                </p>
                <button
                  onClick={() => navigate('/types')}
                  className="text-xs md:text-sm text-slate-800 font-semibold hover:underline"
                >
                  タイプ一覧を見る →
                </button>
              </div>
              <div className="bg-white/50 md:bg-white/75 backdrop-blur-sm rounded-xl shadow-lg p-3 md:p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 md:hover:-translate-y-1">
                <div className="flex justify-center mb-2 md:mb-4">
                  <div className="bg-slate-800 rounded-full p-2 md:p-3">
                    <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-slate-800 mb-1 md:mb-2 text-sm md:text-base">科学的根拠</h3>
                <p className="text-xs md:text-sm text-slate-600 mb-2 md:mb-4">
                  心理学と統計学に基づいた独自開発
                </p>
                <button
                  onClick={() => navigate('/faq')}
                  className="text-xs md:text-sm text-slate-800 font-semibold hover:underline"
                >
                  FAQを見る →
                </button>
              </div>
              <div className="bg-white/50 md:bg-white/75 backdrop-blur-sm rounded-xl shadow-lg p-3 md:p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 md:hover:-translate-y-1">
                <div className="flex justify-center mb-2 md:mb-4">
                  <div className="bg-slate-800 rounded-full p-2 md:p-3">
                    <Shield className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-slate-800 mb-1 md:mb-2 text-sm md:text-base">完全無料</h3>
                <p className="text-xs md:text-sm text-slate-600 mb-2 md:mb-4">
                  約5分で簡単に診断できます
                </p>
                <button
                  onClick={() => navigate('/diagnosis')}
                  className="text-xs md:text-sm text-slate-800 font-semibold hover:underline"
                >
                  診断を始める →
                </button>
              </div>
            </div>

            <div className="hidden md:flex justify-center mt-[82px]">
              <button
                onClick={() => navigate('/about')}
                className="text-slate-300 hover:text-white font-medium text-base transition-all duration-300 hover:underline underline-offset-4 decoration-2 decoration-slate-300/50 hover:decoration-white/80 tracking-wide"
              >
                仮面診断とは？
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">

        {/* 診断ページの1枚目を表示 */}
        <div className="mb-6">
          <p className="text-center text-slate-500 text-sm">
            「人前での自分」をイメージして回答してください
          </p>
        </div>

        <div ref={questionsContainerRef} className="space-y-6 mb-8">
          {firstPageQuestions.map((question, index) => (
            <div
              key={question.id}
              ref={(el) => {
                questionCardRefs.current[question.id] = el;
              }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8 scroll-mt-24"
            >
              <div className="mb-6">
                <span className="text-sm font-semibold text-slate-500">
                  質問 {index + 1}
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

        <div className="text-center">
          <button
            ref={nextButtonRef}
            onClick={() => navigate('/diagnosis', { state: { answers } })}
            disabled={firstPageQuestions.some(q => !answers[q.id])}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg px-12 py-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none"
          >
            次へ
          </button>
          <p className="text-sm text-slate-500 mt-4">
            全40問の診断を完了すると、あなたの仮面タイプが分かります
          </p>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/about')}
            className="text-slate-600 hover:text-slate-800 font-semibold underline underline-offset-4"
          >
            仮面診断とは？ →
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            診断の流れ
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">質問に回答</h3>
                <p className="text-slate-600 text-sm">
                  40問の質問に6段階で答えます（5問×8ページ、約5分）
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">結果を確認</h3>
                <p className="text-slate-600 text-sm">
                  あなたの仮面タイプ（4文字コード）を表示
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">シェア</h3>
                <p className="text-slate-600 text-sm">
                  結果をSNSでシェアして友達と比較
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/diagnosis')}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg px-12 py-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            診断を始める
          </button>
          <p className="text-sm text-slate-500 mt-4">
            所要時間: 約5分 | 質問数: 40問
          </p>
        </div>
      </div>
    </div>
  );
}
