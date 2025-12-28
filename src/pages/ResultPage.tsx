import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation, useParams } from 'react-router-dom';
import { Share2, RotateCcw, Star, MessageCircle } from 'lucide-react';
import { MASK_TYPES } from '../data/maskTypes';
import { isValidTypeCode } from '../utils/diagnosis';
import { MaskTypeCode, Scores } from '../types/diagnosis';
import { applySeoMeta, applyJsonLd } from '../utils/seo';
import { saveFeedback } from '../lib/database';
import { SITE_ALT_NAME, SITE_NAME } from '../data/site';

interface AxisPercentage {
  name: string;
  optionA: string;
  optionB: string;
  percentageA: number;
  percentageB: number;
  codeA: string;
  codeB: string;
}

function calculateAxisPercentage(scoreA: number, scoreB: number): { percentageA: number; percentageB: number } {
  const total = scoreA + scoreB;
  if (total === 0) {
    return { percentageA: 50, percentageB: 50 };
  }
  const percentageA = Math.round((scoreA / total) * 100);
  const percentageB = 100 - percentageA;
  return { percentageA, percentageB };
}

export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const typeFromQuery = searchParams.get('type');
  const typeFromPath = typeof params.code === 'string' ? params.code : null;
  const typeParam = typeFromPath ?? typeFromQuery;
  const scores = location.state?.scores as Scores | undefined;
  const diagnosisResultId = location.state?.diagnosisResultId as string | undefined;

  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (!typeParam || !isValidTypeCode(typeParam)) {
      navigate('/');
    }
  }, [typeParam, navigate]);

  if (!typeParam || !isValidTypeCode(typeParam)) {
    return null;
  }

  const maskType = MASK_TYPES[typeParam as MaskTypeCode];

  useEffect(() => {
    const origin = window.location.origin;
    const canonicalPath = `/type/${maskType.code}`;
    const canonicalUrl = `${origin}${canonicalPath}`;
    applySeoMeta({
      title: `${maskType.name}（${maskType.code}）診断結果 - ${SITE_NAME}（${SITE_ALT_NAME}）`,
      description: `${SITE_NAME}（${SITE_ALT_NAME}）の${maskType.name}（${maskType.code}）タイプ。特徴・強み・弱み・学校/職場での傾向をまとめた結果ページです。`,
      canonicalUrl,
      ogImageUrl: maskType.image ? `${origin}${maskType.image}` : `${origin}/og.svg`,
    });

    applyJsonLd('jsonld-result', {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: `${maskType.name}（${maskType.code}）診断結果 - ${SITE_NAME}`,
      description: `${maskType.shortLabel} ${maskType.description}`,
      inLanguage: "ja-JP",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        name: SITE_NAME,
        url: `${origin}/`,
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: SITE_NAME,
            item: `${origin}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "タイプ一覧",
            item: `${origin}/types`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${maskType.name}（${maskType.code}）`,
            item: canonicalUrl,
          },
        ],
      },
    });
  }, [maskType.code, maskType.name, maskType.shortLabel, maskType.description]);

  const axisPercentages: AxisPercentage[] | null = scores ? [
    {
      name: 'テンション',
      optionA: 'Sunny（明るい）',
      optionB: 'Moon（落ち着いた）',
      codeA: 'S',
      codeB: 'M',
      ...calculateAxisPercentage(scores.tension.S, scores.tension.M)
    },
    {
      name: 'ポジション',
      optionA: 'Front（前に出る）',
      optionB: 'Back（裏方）',
      codeA: 'F',
      codeB: 'B',
      ...calculateAxisPercentage(scores.position.F, scores.position.B)
    },
    {
      name: '距離感',
      optionA: 'Close（親しみやすい）',
      optionB: 'Guard（適度な距離）',
      codeA: 'C',
      codeB: 'G',
      ...calculateAxisPercentage(scores.distance.C, scores.distance.G)
    },
    {
      name: 'ワークスタイル',
      optionA: 'Persistent（粘り強い）',
      optionB: 'Quick（要領よく）',
      codeA: 'P',
      codeB: 'Q',
      ...calculateAxisPercentage(scores.work.P, scores.work.Q)
    }
  ] : null;

  const handleShare = (platform: 'twitter' | 'line') => {
    const url = `${window.location.origin}/type/${maskType.code}`;

    let axisText = '';
    if (axisPercentages) {
      axisText = axisPercentages.map(axis => {
        const isADominant = axis.percentageA > axis.percentageB;
        const dominantCode = isADominant ? axis.codeA : axis.codeB;
        const dominantPercentage = isADominant ? axis.percentageA : axis.percentageB;
        return `${axis.name}: ${dominantCode} (${dominantPercentage}%)`;
      }).join('\n');
    } else {
      const tensionCode = maskType.axesSummary.tension === "Sunny" ? "S" : "M";
      const positionCode = maskType.axesSummary.position === "Front" ? "F" : "B";
      const distanceCode = maskType.axesSummary.distance === "Close" ? "C" : "G";
      const workCode = maskType.axesSummary.work === "Persistent" ? "P" : "Q";
      axisText = `テンション: ${tensionCode}\nポジション: ${positionCode}\n距離感: ${distanceCode}\nワークスタイル: ${workCode}`;
    }

    const text = `私の仮面タイプは「${maskType.name}（${maskType.code}）」でした！\n${maskType.shortLabel}\n\n【診断結果】\n${axisText}\n\n#仮面診断`;

    if (platform === 'twitter') {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        '_blank'
      );
    } else if (platform === 'line') {
      window.open(
        `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`,
        '_blank'
      );
    }
  };

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/type/${maskType.code}`;
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('clipboard_not_available');
      }
      await navigator.clipboard.writeText(url);
      alert('リンクをコピーしました！');
    } catch {
      window.prompt('リンクをコピーしてください', url);
    }
  };

  const handleSubmitFeedback = async () => {
    if (rating === 0) {
      alert('満足度を選択してください');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await saveFeedback(
        rating,
        comment.trim() || null,
        diagnosisResultId || null
      );

      if (error) {
        console.error('フィードバックの保存に失敗しました:', error);
        throw error;
      }

      console.log('フィードバックを保存しました:', data?.id);
      setFeedbackSubmitted(true);
      alert('フィードバックをお送りいただき、ありがとうございました！');
    } catch (err) {
      console.error('フィードバック送信エラー:', err);
      alert('フィードバックの送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            診断結果
          </h1>
          <p className="text-slate-600">あなたの仮面タイプ</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-6">
          <div className="mb-8">
            <div className="relative overflow-hidden rounded-2xl aspect-square bg-slate-900 w-full max-w-[360px] md:max-w-[480px] mx-auto">
              {maskType.image && (
                <img
                  src={maskType.image}
                  alt={maskType.name}
                  loading="eager"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-contain object-center"
                />
              )}
              {/* 画像のコントラストを少し締める（テキストは画像の下に配置） */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/15 to-slate-900/30" />
            </div>

            {/* タイプ名は画像の下に出して視認性を優先 */}
            <div className="text-center mt-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
                <span className="inline-block align-middle bg-slate-800 text-white text-xl md:text-2xl font-bold px-4 py-2 rounded-xl tracking-wider mr-3">
                  {maskType.code}
                </span>
                <span className="align-middle">{maskType.name}</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-600 italic mt-3">
                {maskType.shortLabel}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6">
              4つの軸の結果
            </h3>
            {axisPercentages ? (
              <div className="space-y-8">
                {axisPercentages.map((axis, index) => {
                  const colors = [
                    { a: 'bg-amber-500', b: 'bg-blue-500' },
                    { a: 'bg-rose-500', b: 'bg-teal-500' },
                    { a: 'bg-orange-500', b: 'bg-cyan-500' },
                    { a: 'bg-emerald-500', b: 'bg-pink-500' }
                  ];
                  const colorPair = colors[index];

                  const isADominant = axis.percentageA > axis.percentageB;

                  return (
                    <div key={index}>
                      <p className="text-sm font-semibold text-slate-600 mb-4 text-center">
                        {axis.name}
                      </p>
                      <div className="space-y-3">
                        <div className="text-center mb-3">
                          <span className="text-3xl font-bold text-slate-800">
                            {isADominant ? axis.codeA : axis.codeB}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-medium mb-1">
                          <span className="text-slate-800">{axis.optionA}</span>
                          <span className="text-slate-800">{axis.optionB}</span>
                        </div>
                        <div className="relative h-8 bg-slate-100 rounded-full overflow-hidden">
                          <div className="flex h-full">
                            <div
                              className={`${isADominant ? colorPair.a : 'bg-gray-300'} transition-all duration-500 flex items-center justify-start px-3`}
                              style={{ width: `${axis.percentageA}%` }}
                            >
                              {axis.percentageA >= 15 && (
                                <span className={`text-xs font-bold ${isADominant ? 'text-white' : 'text-gray-500'}`}>
                                  {axis.percentageA}%
                                </span>
                              )}
                            </div>
                            <div
                              className={`${!isADominant ? colorPair.b : 'bg-gray-300'} transition-all duration-500 flex items-center justify-end px-3`}
                              style={{ width: `${axis.percentageB}%` }}
                            >
                              {axis.percentageB >= 15 && (
                                <span className={`text-xs font-bold ${!isADominant ? 'text-white' : 'text-gray-500'}`}>
                                  {axis.percentageB}%
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-center text-sm text-slate-600">
                          <span className="font-bold">
                            {axis.percentageA}% - {axis.percentageB}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">テンション</p>
                  <p className="text-lg font-bold text-slate-800">
                    {maskType.axesSummary.tension === "Sunny" ? "Sunny（明るい）" : "Moon（落ち着いた）"}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">ポジション</p>
                  <p className="text-lg font-bold text-slate-800">
                    {maskType.axesSummary.position === "Front" ? "Front（前に出る）" : "Back（裏方）"}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">距離感</p>
                  <p className="text-lg font-bold text-slate-800">
                    {maskType.axesSummary.distance === "Close" ? "Close（親しみやすい）" : "Guard（適度な距離）"}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">ワークスタイル</p>
                  <p className="text-lg font-bold text-slate-800">
                    {maskType.axesSummary.work === "Persistent" ? "Persistent（粘り強い）" : "Quick（要領よく）"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {maskType.article ? (
            <>
              <div className="border-t border-slate-200 pt-8 mb-8">
                <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">
                  {maskType.article.opening}
                </p>
              </div>

              <div className="border-t border-slate-200 pt-8 mb-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  強み
                </h3>
                <p className="text-lg text-slate-600 mb-6 italic">
                  {maskType.article.strengths.title}
                </p>
                <ul className="space-y-4">
                  {maskType.article.strengths.items.map((item, index) => (
                    <li key={index} className="flex gap-3 bg-green-50 rounded-lg p-4">
                      <span className="text-green-600 mt-1 flex-shrink-0 text-xl">✓</span>
                      <span className="text-slate-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-slate-200 pt-8 mb-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  弱み
                </h3>
                <p className="text-lg text-slate-600 mb-6 italic">
                  {maskType.article.weaknesses.title}
                </p>
                <ul className="space-y-4">
                  {maskType.article.weaknesses.items.map((item, index) => (
                    <li key={index} className="flex gap-3 bg-amber-50 rounded-lg p-4">
                      <span className="text-amber-600 mt-1 flex-shrink-0 text-xl">⚠</span>
                      <span className="text-slate-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-slate-200 pt-8 mb-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">
                  学校・職場での様子
                </h3>

                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-slate-800 mb-3">
                      {maskType.article.workplaceHabits.colleague.description}
                    </h4>
                    <ul className="space-y-2">
                      {maskType.article.workplaceHabits.colleague.examples.map((example, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="text-blue-600 mt-1.5 flex-shrink-0">•</span>
                          <span className="text-slate-700 leading-relaxed">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-slate-800 mb-3">
                      {maskType.article.workplaceHabits.subordinate.description}
                    </h4>
                    <ul className="space-y-2">
                      {maskType.article.workplaceHabits.subordinate.examples.map((example, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="text-purple-600 mt-1.5 flex-shrink-0">•</span>
                          <span className="text-slate-700 leading-relaxed">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-teal-50 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-slate-800 mb-3">
                      {maskType.article.workplaceHabits.leader.description}
                    </h4>
                    <ul className="space-y-2">
                      {maskType.article.workplaceHabits.leader.examples.map((example, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="text-teal-600 mt-1.5 flex-shrink-0">•</span>
                          <span className="text-slate-700 leading-relaxed">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-8 mb-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">
                  向いている役割
                </h3>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-slate-700 mb-4">
                    光る場面
                  </h4>
                  <ul className="space-y-3">
                    {maskType.article.careerPaths.strengths.map((strength, index) => (
                      <li key={index} className="flex gap-3 bg-slate-50 rounded-lg p-4">
                        <span className="text-blue-600 mt-0.5 flex-shrink-0 text-lg">★</span>
                        <span className="text-slate-700 leading-relaxed">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">
                    しんどくなりやすい環境
                  </h4>
                  <p className="text-slate-700 leading-relaxed">
                    {maskType.article.careerPaths.challenges}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-8 mb-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  まとめ
                </h3>
                <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-6 border-l-4 border-blue-500">
                  <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">
                    {maskType.article.conclusion}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="border-t border-slate-200 pt-8 mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  タイプの特徴
                </h3>
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {maskType.description}
                </p>
              </div>

              {maskType.details && (
                <>
                  {maskType.details.characteristics && maskType.details.characteristics.length > 0 && (
                    <div className="border-t border-slate-200 pt-8 mb-8">
                      <h3 className="text-xl font-bold text-slate-800 mb-4">
                        外面的特徴
                      </h3>
                      <ul className="space-y-3">
                        {maskType.details.characteristics.map((characteristic, index) => (
                          <li key={index} className="flex gap-3">
                            <span className="text-blue-600 mt-1.5 flex-shrink-0">●</span>
                            <span className="text-slate-700 leading-relaxed">{characteristic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {maskType.details.behaviors && maskType.details.behaviors.length > 0 && (
                    <div className="border-t border-slate-200 pt-8 mb-8">
                      <h3 className="text-xl font-bold text-slate-800 mb-4">
                        行動傾向（学校・職場で見えるムーブ）
                      </h3>
                      <ul className="space-y-4">
                        {maskType.details.behaviors.map((behavior, index) => (
                          <li key={index} className="bg-slate-50 rounded-lg p-4">
                            <p className="text-slate-700 leading-relaxed">{behavior}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {maskType.details.risks && maskType.details.risks.length > 0 && (
                    <div className="border-t border-slate-200 pt-8 mb-8">
                      <h3 className="text-xl font-bold text-slate-800 mb-4">
                        リスク・注意点
                      </h3>
                      <ul className="space-y-3">
                        {maskType.details.risks.map((risk, index) => (
                          <li key={index} className="flex gap-3">
                            <span className="text-amber-600 mt-1.5 flex-shrink-0">⚠</span>
                            <span className="text-slate-700 leading-relaxed">{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {maskType.details.tips && maskType.details.tips.length > 0 && (
                    <div className="border-t border-slate-200 pt-8 mb-8">
                      <h3 className="text-xl font-bold text-slate-800 mb-4">
                        対人関係で勝ちやすいコツ
                      </h3>
                      <ul className="space-y-3">
                        {maskType.details.tips.map((tip, index) => (
                          <li key={index} className="flex gap-3 bg-blue-50 rounded-lg p-4">
                            <span className="text-blue-600 mt-0.5 flex-shrink-0">💡</span>
                            <span className="text-slate-700 leading-relaxed">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Share2 className="w-6 h-6" />
            結果をシェア
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleShare('twitter')}
              className="flex-1 min-w-[140px] bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              X（Twitter）
            </button>
            <button
              onClick={() => handleShare('line')}
              className="flex-1 min-w-[140px] bg-[#00B900] hover:bg-[#00a000] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              LINE
            </button>
            <button
              onClick={handleCopyLink}
              className="flex-1 min-w-[140px] bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              リンクをコピー
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            フィードバック
          </h3>
          {!feedbackSubmitted ? (
            <div className="space-y-4">
              <div>
                <p className="text-slate-700 mb-3">診断結果に満足しましたか？</p>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onMouseEnter={() => setHoveredRating(value)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(value)}
                      className="transition-transform hover:scale-110 focus:outline-none"
                      disabled={isSubmitting}
                    >
                      <Star
                        className={`w-10 h-10 ${
                          value <= (hoveredRating || rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-slate-300'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-2 text-slate-600 font-medium">
                      {rating === 1 && '不満'}
                      {rating === 2 && 'やや不満'}
                      {rating === 3 && '普通'}
                      {rating === 4 && '満足'}
                      {rating === 5 && 'とても満足'}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="feedback-comment" className="block text-slate-700 mb-2">
                  コメント（任意）
                </label>
                <textarea
                  id="feedback-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="診断についてのご意見やご感想をお聞かせください"
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all resize-none"
                  disabled={isSubmitting}
                />
              </div>
              <button
                onClick={handleSubmitFeedback}
                disabled={isSubmitting || rating === 0}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '送信中...' : 'フィードバックを送信'}
              </button>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <p className="text-green-800 font-medium text-lg">
                フィードバックをお送りいただき、ありがとうございました！
              </p>
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-200"
          >
            <RotateCcw className="w-5 h-5" />
            最初から診断し直す
          </button>
        </div>
      </div>
    </div>
  );
}
