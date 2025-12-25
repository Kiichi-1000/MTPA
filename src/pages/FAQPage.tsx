import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: '仮面診断とは何ですか？',
    answer: '仮面診断は、人前での振る舞いや社会的な場面での性格を診断するツールです。内面（本来の自分）ではなく、学校・職場など「外面での性格」に特化した診断を行います。4つの軸（テンション・ポジション・距離感・ワークスタイル）で、あなたの社会的な仮面を16タイプに分類します。'
  },
  {
    question: 'MBTIや他の性格診断との違いは何ですか？',
    answer: '仮面診断は、MBTIや他の一般的な性格診断とは全く異なるものです。他の診断が「本来の自分」や「内面」を診断するのに対し、仮面診断は「人前での振る舞い」「社会的な場面での自分」に特化しています。本診断は独自の心理学的フレームワークに基づいて開発されており、他の性格診断サイトや既存の診断ツールとは関係ありません。'
  },
  {
    question: 'この診断はどのように開発されましたか？',
    answer: '仮面診断は、心理学と統計学の研究に基づいて独自に開発されました。社会心理学における「自己呈示理論」や「印象管理」の概念を参考にしつつ、現代の職場や学校環境における行動パターンを分析し、独自の診断フレームワークを構築しています。本診断は完全にオリジナルのものであり、既存の診断ツールの模倣や派生ではありません。'
  },
  {
    question: '診断結果は科学的に正確ですか？',
    answer: '本診断は心理学的な理論と統計的手法に基づいて開発されていますが、エンターテインメント目的での利用を想定しています。診断結果は、あなたの社会的な振る舞いの傾向を示すものであり、絶対的な性格判断ではありません。自己理解を深めるための参考情報としてお使いください。'
  },
  {
    question: '診断にどのくらい時間がかかりますか？',
    answer: '診断は全40問（5問×8ページ）で構成されており、約5分程度で完了します。質問には6段階で回答していただきます。じっくり考えるよりも、直感的に答えることをおすすめします。'
  },
  {
    question: '回答時に気をつけることはありますか？',
    answer: '質問には、「人前での自分」「社会的な場面での自分」をイメージして回答してください。家族や親友といるときの自分ではなく、学校や職場、初対面の人と接するときの自分を思い浮かべて答えることが重要です。本来の性格ではなく、外面的な振る舞いに焦点を当ててください。'
  },
  {
    question: '診断結果は変わることがありますか？',
    answer: 'はい、社会的な場面での振る舞いは、環境や状況によって変化する可能性があります。職場が変わったり、新しい役割を担ったりすると、あなたの「仮面」も変わるかもしれません。定期的に診断を受けることで、自分の変化に気づくことができます。'
  },
  {
    question: '結果をシェアできますか？',
    answer: 'はい、診断結果ページから、X（Twitter）やLINEで結果をシェアすることができます。また、リンクをコピーして友達に共有することも可能です。友達と結果を比較して、お互いの社会的な振る舞いの違いを発見してみてください。'
  },
  {
    question: 'Lovetypeとの関係は？',
    answer: '仮面診断とLovetypeは全く関係ありません。仮面診断は独自に開発された診断ツールであり、Lovetypeやその他の既存の性格診断システムとは一切関係がありません。本診断は、社会的な場面での振る舞いに特化した独自の理論的枠組みに基づいています。'
  },
  {
    question: '診断は無料ですか？',
    answer: 'はい、仮面診断は完全無料でご利用いただけます。会員登録や個人情報の入力も不要です。何度でも診断を受けることができます。'
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
          <h2 className="text-2xl font-bold mb-4">本診断の独自性について</h2>
          <div className="space-y-4 text-slate-200 leading-relaxed">
            <p>
              仮面診断は、既存の性格診断ツール（MBTI、エニアグラム、Lovetype等）とは
              <span className="font-semibold text-white">一切関係がありません</span>。
            </p>
            <p>
              本診断は、心理学における「自己呈示理論」「印象管理」「社会的アイデンティティ理論」などの
              学術的な研究を基盤として、独自の診断フレームワークを構築しています。
            </p>
            <p>
              統計的手法を用いて質問項目を精選し、4つの軸（テンション・ポジション・距離感・ワークスタイル）による
              16タイプの分類システムを開発しました。これは、社会的な場面での行動パターンを
              科学的に分析するために、完全にゼロから設計されたものです。
            </p>
            <p className="font-semibold text-white">
              本診断は、他のいかなる診断ツールの模倣、派生、改変でもなく、
              完全にオリジナルの理論と方法論に基づいて開発されています。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
