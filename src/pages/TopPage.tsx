import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Users, TrendingUp, Shield } from 'lucide-react';
import { applyJsonLd, applySeoMeta } from '../utils/seo';
import heroImage from '../assets/Hero.png';
import TermsConsentNotice from '../components/TermsConsentNotice';

export default function TopPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const origin = window.location.origin;
    applySeoMeta({
      title: '仮面診断 - Kamen Personality Test',
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
          name: "仮面診断",
          inLanguage: "ja-JP",
        },
        {
          "@type": "WebPage",
          "@id": `${origin}/#webpage`,
          url: `${origin}/`,
          name: "仮面診断 - Kamen Personality Test",
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
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
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
            Kamen Personality Test
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
