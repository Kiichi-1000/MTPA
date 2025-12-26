import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { applyJsonLd, applySeoMeta } from '../utils/seo';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: '仮面診断とは何ですか？',
    answer:
      '仮面診断は、内面（本来の自分）ではなく、学校・職場など「人前での振る舞い」に特化した診断です。4つの軸（テンション・ポジション・距離感・ワークスタイル）で、外面の傾向を16タイプに分類します。'
  },
  {
    question: '回答時に気をつけることはありますか？',
    answer:
      '質問には「人前での自分（学校・職場・初対面など）」をイメージして答えてください。家族や親友の前での自分ではなく、社会的な場面での振る舞いに焦点を当てるのがポイントです。'
  },
  {
    question: 'この診断は医療・心理の「診断」ですか？',
    answer:
      'いいえ。本診断は、自己理解の参考となる情報提供を目的としたものであり、医療行為・心理療法・診断（医学的/臨床的評価）ではありません。重要な意思決定は、結果のみに依拠せず専門家への相談等をご検討ください。'
  },
  {
    question: '診断結果は科学的に正確ですか？',
    answer:
      '結果は「傾向」を示す参考情報です。正確性・完全性・有用性を保証するものではなく、状況や役割によって変わり得ます。自己理解のヒントとしてご利用ください。'
  },
  {
    question: '診断にどのくらい時間がかかりますか？',
    answer: '診断は全40問（5問×8ページ）で構成されており、約5分程度で完了します。質問には6段階で回答していただきます。じっくり考えるよりも、直感的に答えることをおすすめします。'
  },
  {
    question: '診断結果や回答は保存されますか？',
    answer:
      '現時点では、会員登録や個人情報の入力は不要で、診断結果や回答をサーバーに保存する運用はしていません（将来変更する場合は告知・更新します）。'
  },
  {
    question: 'アクセス解析（Cookie等）は使っていますか？',
    answer:
      '現時点では、アクセス解析ツールを導入していません。将来導入する場合は、プライバシーポリシー等を更新し、必要な表示を行います。'
  },
  {
    question: '「診断を始める」を押すと、利用規約に同意したことになりますか？',
    answer:
      'はい。本サービスでは、「診断を始める」等のボタンを押下して診断を開始した時点で、利用規約に同意いただいたものとして取り扱います。'
  },
  {
    question: 'MBTIやLovetypeなど、他の診断との関係はありますか？',
    answer:
      '本サービスは、他社の性格診断（MBTI等）や既存の診断ツールとは関係ありません。名称や商標等は各権利者に帰属します。'
  },
  {
    question: '診断は無料ですか？',
    answer: 'はい、仮面診断は完全無料でご利用いただけます。会員登録や個人情報の入力も不要です。何度でも診断を受けることができます。'
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const origin = window.location.origin;
    applySeoMeta({
      title: 'よくある質問 - 仮面診断',
      description: '仮面診断についてのよくある質問と回答をまとめています。',
      canonicalUrl: `${origin}/faq`,
    });

    applyJsonLd('jsonld-faq', {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            よくある質問
          </h1>
          <p className="text-lg text-slate-600">
            仮面診断について、よくいただく質問にお答えします
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border-b border-slate-200 last:border-b-0"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-4 flex justify-between items-center text-left hover:text-slate-600 transition-colors"
                >
                  <span className="font-semibold text-slate-800 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 w-5 h-5 text-slate-400 transition-transform duration-200 ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openIndex === index ? 'max-h-96 pb-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 text-white rounded-2xl shadow-lg p-8 md:p-10">
          <h2 className="text-2xl font-bold mb-4">本サービスの位置づけについて</h2>
          <div className="space-y-4 text-slate-200 leading-relaxed">
            <p>
              本サービスは「人前での振る舞い」の傾向を整理するための参考情報を提供するものであり、
              <span className="font-semibold text-white">医療行為・心理療法・診断ではありません</span>。
            </p>
            <p>
              結果は絶対的な性格判断ではなく、状況や役割によって変わり得ます。重要な意思決定は、結果のみに依拠せず専門家への相談等をご検討ください。
            </p>
            <div className="pt-2">
              <p className="text-slate-200">
                詳細は
                <Link to="/terms" className="underline underline-offset-4 hover:text-white">
                  利用規約
                </Link>
                ・
                <Link to="/privacy" className="underline underline-offset-4 hover:text-white">
                  プライバシーポリシー
                </Link>
                ・
                <Link to="/disclaimer" className="underline underline-offset-4 hover:text-white">
                  免責事項
                </Link>
                をご確認ください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
