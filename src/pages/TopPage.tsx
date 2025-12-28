import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Users, TrendingUp, Shield, Sun, Moon, ArrowRight, ArrowLeft, Heart, Shield as ShieldIcon, Target } from 'lucide-react';
import { applyJsonLd, applySeoMeta } from '../utils/seo';
import heroImage from '../assets/Hero.png';
import phoneHeroImage from '../assets/phonehero.jpeg';
import TermsConsentNotice from '../components/TermsConsentNotice';
import TypeSlider from '../components/TypeSlider';
import { SITE_ALT_NAME, SITE_NAME } from '../data/site';

export default function TopPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const origin = window.location.origin;
    applySeoMeta({
      title: `${SITE_NAME} - ${SITE_ALT_NAME}`,
      description: '学校・職場など「人前での自分（仮面）」の性格を4軸×16タイプに分類する診断サイト',
      canonicalUrl: `${origin}/`,
    });

    applyJsonLd('jsonld-top', {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${origin}/#website`,
          url: `${origin}/`,
          name: SITE_NAME,
          alternateName: SITE_ALT_NAME,
          inLanguage: "ja-JP",
        },
        {
          "@type": "WebPage",
          "@id": `${origin}/#webpage`,
          url: `${origin}/`,
          name: `${SITE_NAME} - ${SITE_ALT_NAME}`,
          description: '学校・職場など「人前での自分（仮面）」の性格を4軸×16タイプに分類する診断サイト',
          isPartOf: { "@id": `${origin}/#website` },
          inLanguage: "ja-JP",
        }
      ]
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <section className="relative overflow-hidden text-white py-20 md:py-32">
        <picture>
          <source media="(min-width: 768px)" srcSet={heroImage} />
          <img
            src={phoneHeroImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/85" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-6 border border-white/20">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            仮面診断
          </h1>
          <p className="text-2xl md:text-3xl text-slate-200 mb-4">
            {SITE_ALT_NAME}
          </p>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            人前での「あなたの仮面」を診断します<br />
            社会的な場面でのあなたの振る舞いを16タイプに分類
          </p>
          <button
            onClick={() => navigate('/diagnosis')}
            className="bg-white text-slate-800 hover:bg-slate-100 font-bold text-lg px-12 py-4 rounded-full shadow-2xl transition-all duration-200 transform hover:scale-105"
          >
            今すぐ診断を始める
          </button>
          <TermsConsentNotice />
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-slate-100 rounded-full p-3">
                <Users className="w-8 h-8 text-slate-800" />
              </div>
            </div>
            <h3 className="font-bold text-slate-800 mb-2">16タイプ診断</h3>
            <p className="text-sm text-slate-600">
              4つの軸であなたの外面的な性格を分類
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-slate-100 rounded-full p-3">
                <TrendingUp className="w-8 h-8 text-slate-800" />
              </div>
            </div>
            <h3 className="font-bold text-slate-800 mb-2">科学的根拠</h3>
            <p className="text-sm text-slate-600">
              心理学と統計学に基づいた独自開発
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-slate-100 rounded-full p-3">
                <Shield className="w-8 h-8 text-slate-800" />
              </div>
            </div>
            <h3 className="font-bold text-slate-800 mb-2">完全無料</h3>
            <p className="text-sm text-slate-600">
              約5分で簡単に診断できます
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            仮面診断とは？
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              仮面診断は、内面（本来の自分）ではなく、<span className="font-semibold text-slate-800">学校・職場など「人前での振る舞い」</span>に特化した性格診断です。
            </p>
            <p>
              社会的な場面でのあなたの行動パターンや対人スタイルを分析し、心理学と統計学に基づいて開発されました。
            </p>
            <p>
              4つの軸（テンション・ポジション・距離感・ワークスタイル）で、あなたの「外面の性格」を16タイプに分類します。
            </p>
            <div className="bg-slate-50 rounded-lg p-6 mt-6">
              <p className="font-semibold text-slate-800 mb-2">
                重要：回答時の心構え
              </p>
              <p className="text-sm">
                質問には、<span className="font-semibold">「人前での自分」「社会的な場面での自分」</span>をイメージして回答してください。家族や親友の前での姿ではなく、学校や職場での振る舞いを思い浮かべましょう。
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            4つの診断軸
          </h2>
          <p className="text-center text-slate-600 mb-8">
            仮面診断では、あなたの外面的な性格を4つの軸で分析します。各軸には2つの特性があり、組み合わせることで16タイプを分類します。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* テンション軸 */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-400 rounded-full p-3">
                  <Sun className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">テンション軸</h3>
              </div>
              <p className="text-slate-700 mb-4">
                人前でのあなたの「エネルギーの出し方」を表します。
              </p>
              <div className="space-y-3">
                <div className="bg-white/60 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="w-5 h-5 text-yellow-600" />
                    <span className="font-semibold text-slate-800">Sunny (明るい)</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    疲れていても明るく振る舞える。周囲にポジティブなエネルギーを提供するタイプ。
                  </p>
                </div>
                <div className="bg-white/60 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Moon className="w-5 h-5 text-slate-600" />
                    <span className="font-semibold text-slate-800">Moon (落ち着いた)</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    疲れると表情や態度に現れやすい。落ち着いた雰囲気で場を安定させるタイプ。
                  </p>
                </div>
              </div>
            </div>

            {/* ポジション軸 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-500 rounded-full p-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">ポジション軸</h3>
              </div>
              <p className="text-slate-700 mb-4">
                チームやグループでのあなたの「立ち位置」を表します。
              </p>
              <div className="space-y-3">
                <div className="bg-white/60 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-slate-800">Front (前に立つ)</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    自然に前に出て仕切る。リーダーシップを発揮しやすいタイプ。
                  </p>
                </div>
                <div className="bg-white/60 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowLeft className="w-5 h-5 text-cyan-600" />
                    <span className="font-semibold text-slate-800">Back (後ろで支える)</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    前に出るより後ろで支える。サポート役として力を発揮するタイプ。
                  </p>
                </div>
              </div>
            </div>

            {/* 距離感軸 */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border-2 border-pink-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-pink-500 rounded-full p-3">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">距離感軸</h3>
              </div>
              <p className="text-slate-700 mb-4">
                他者との「心理的な距離の取り方」を表します。
              </p>
              <div className="space-y-3">
                <div className="bg-white/60 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-pink-600" />
                    <span className="font-semibold text-slate-800">Close (近い距離)</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    フランクに話しかけやすい。距離を縮めて関係を築くタイプ。
                  </p>
                </div>
                <div className="bg-white/60 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldIcon className="w-5 h-5 text-rose-600" />
                    <span className="font-semibold text-slate-800">Guard (距離を保つ)</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    適度な距離感を保つ。礼儀正しく接するタイプ。
                  </p>
                </div>
              </div>
            </div>

            {/* ワークスタイル軸 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-500 rounded-full p-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">ワークスタイル軸</h3>
              </div>
              <p className="text-slate-700 mb-4">
                仕事や作業でのあなたの「進め方」を表します。
              </p>
              <div className="space-y-3">
                <div className="bg-white/60 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-slate-800">Persistent (粘り強く)</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    量と質を重視し、最後まで粘り強くやり切るタイプ。
                  </p>
                </div>
                <div className="bg-white/60 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-slate-800">Quick (効率的に)</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    必要なところを押さえて、効率的に進めるタイプ。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-4 text-center">
            16の仮面タイプ
          </h2>
          <p className="text-center text-slate-600 mb-8">
            4つの軸の組み合わせで、16種類の仮面タイプが生まれます。<br />
            あなたはどのタイプでしょうか？
          </p>
          <TypeSlider />
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/types')}
              className="inline-block px-8 py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors"
            >
              全16タイプ一覧を見る
            </button>
          </div>
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
          <TermsConsentNotice
            className="mt-3 text-xs md:text-sm text-slate-500"
            linkClassName="underline underline-offset-4 hover:text-slate-700"
          />
          <p className="text-sm text-slate-500 mt-4">
            所要時間: 約5分 | 質問数: 40問
          </p>
        </div>
      </div>
    </div>
  );
}
