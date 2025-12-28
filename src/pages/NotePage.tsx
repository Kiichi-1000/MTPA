import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applyJsonLd, applySeoMeta } from '../utils/seo';
import { OPERATOR_NAME, SITE_ALT_NAME, SITE_NAME } from '../data/site';

export default function NotePage() {
  useEffect(() => {
    const origin = window.location.origin;
    const canonicalUrl = `${origin}/note`;

    const title = `仮面診断結果の有益な利用方法 - ${SITE_NAME}（${SITE_ALT_NAME}）`;
    const description =
      '仮面診断の結果（4軸×16タイプ）を、自己理解・コミュニケーション・働き方の改善に活かすための具体的な使い方をまとめたガイド記事です。';

    applySeoMeta({
      title,
      description,
      canonicalUrl,
      ogImageUrl: `${origin}/og.svg`,
    });

    applyJsonLd('jsonld-note', {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${canonicalUrl}#article`,
      headline: '仮面診断結果の有益な利用方法',
      description,
      inLanguage: 'ja-JP',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
      author: {
        '@type': 'Organization',
        name: OPERATOR_NAME,
      },
      publisher: {
        '@type': 'Organization',
        name: OPERATOR_NAME,
        url: origin,
      },
      datePublished: '2025-12-28',
      dateModified: '2025-12-28',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <header className="mb-10">
          <p className="text-sm text-slate-500 mb-3">
            <Link to="/" className="underline underline-offset-4 hover:text-slate-700">仮面診断</Link>
            {' / '}
            <span>Note</span>
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            仮面診断結果の有益な利用方法
          </h1>
          <p className="text-slate-600 leading-relaxed">
            仮面診断は「内面」ではなく、学校・職場など人前での振る舞い（仮面）を4軸×16タイプで捉えるためのツールです。
            ここでは、結果を“当てはめ”で終わらせず、現実の行動改善に落とす使い方をまとめます。
          </p>
        </header>

        <article className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-10 text-slate-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">1. まず「これは外面（仮面）だ」と理解する</h2>
            <p>
              仮面タイプは、状況・役割・環境によって変化します。結果は「あなたの全て」ではなく、
              <span className="font-semibold text-slate-900">“よく使われる対人スタイル”の傾向</span>です。
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>同じ人でも、学校と職場で振る舞いが違うことがある</li>
              <li>役職や責任が変わると、Front/Backが入れ替わることがある</li>
              <li>体調や余裕で、Sunny/Moonの出方が変わることがある</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">2. 4軸を「自己否定」ではなく「設計図」にする</h2>
            <p>4軸は、優劣ではなく“やり方の違い”です。使い方はシンプルで、各軸を「得意な場」と「詰まりやすい場」に分けます。</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-bold text-slate-900 mb-2">テンション（Sunny / Moon）</h3>
                <p className="text-sm">
                  人前でのエネルギーの出し方。Sunnyは“明るさ”で場を動かしやすく、Moonは“落ち着き”で場を整えやすい。
                </p>
                <p className="text-sm mt-2">
                  <span className="font-semibold text-slate-900">改善の問い:</span> 今日はエネルギー残量が何%？残量に合う振る舞いに調整できてる？
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-bold text-slate-900 mb-2">ポジション（Front / Back）</h3>
                <p className="text-sm">
                  前に立つか、後ろで支えるか。Frontは“推進”が強み、Backは“安定化/支援”が強み。
                </p>
                <p className="text-sm mt-2">
                  <span className="font-semibold text-slate-900">改善の問い:</span> 自分が前に立つべき場と、任せるべき場を分けられてる？
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-bold text-slate-900 mb-2">距離感（Close / Guard）</h3>
                <p className="text-sm">
                  関係の詰め方。Closeは“相談しやすさ”が強み、Guardは“礼儀距離/境界”が強み。
                </p>
                <p className="text-sm mt-2">
                  <span className="font-semibold text-slate-900">改善の問い:</span> 距離が近すぎ/遠すぎで誤解される場面はどこ？
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-bold text-slate-900 mb-2">ワーク（Persistent / Quick）</h3>
                <p className="text-sm">
                  進め方。Persistentは“質と継続”が強み、Quickは“最短で成立”が強み。
                </p>
                <p className="text-sm mt-2">
                  <span className="font-semibold text-slate-900">改善の問い:</span> いまの仕事は「丁寧さ」が必要？それとも「回転」が必要？
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">3. 「強みの使いすぎ」を先に決めておく</h2>
            <p>
              多くの人は、失敗した時に反省します。でも仮面の改善は、<span className="font-semibold text-slate-900">“得意の出しすぎ”</span>を先に止める方が早いです。
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><span className="font-semibold text-slate-900">Close</span>が強い人：頼られすぎる前に「期限/範囲」を言語化する</li>
              <li><span className="font-semibold text-slate-900">Guard</span>が強い人：距離を保ちながら「短い共感」を1行足す</li>
              <li><span className="font-semibold text-slate-900">Persistent</span>が強い人：品質を守る対象を“2つまで”に絞る</li>
              <li><span className="font-semibold text-slate-900">Quick</span>が強い人：結論の前に「背景/目的」を1行置く</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">4. コミュニケーションは「翻訳表」を作ると楽になる</h2>
            <p>相手のタイプが分からなくても、軸だけ分かると会話は整います。おすすめは“ひとこと翻訳”です。</p>
            <div className="bg-slate-50 rounded-xl p-5 space-y-3">
              <div>
                <p className="font-semibold text-slate-900">Quick相手</p>
                <p className="text-sm">「結論から言うね。3つだけ。A/B/Cのどれが良い？」</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Persistent相手</p>
                <p className="text-sm">「前提を揃えたい。目的→条件→確認ポイントの順で話すね」</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Close相手</p>
                <p className="text-sm">「ちょっと相談。いま困ってて、5分だけいい？」</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Guard相手</p>
                <p className="text-sm">「要点だけ共有するね。必要なら後で個別に確認させて」</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">5. 仕事の使い方：役割を「適性」で再配置する</h2>
            <p>
              チームで使うなら、タイプ名よりも“軸”で役割を再配置するのが安全です。
              たとえば、次のように分けると衝突が減ります。
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>立ち上げ・推進：Front寄りが担う</li>
              <li>運用・品質：Persistent寄りが担う</li>
              <li>短縮・最適化：Quick寄りが担う</li>
              <li>関係構築・相談窓口：Close寄りが担う</li>
              <li>境界・リスク管理：Guard寄りが担う</li>
            </ul>
            <p className="text-sm text-slate-600">
              ポイントは「苦手克服」ではなく、<span className="font-semibold text-slate-900">得意の置き場所を変える</span>ことです。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">6. 注意：診断を“ラベル”として使いすぎない</h2>
            <p>
              タイプは便利ですが、相手や自分に貼りすぎると、会話が止まります。
              仮面診断は、<span className="font-semibold text-slate-900">「どう振る舞えば次が良くなるか」</span>のヒントとして使うのが最も有益です。
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>「だから無理」ではなく「だから設計できる」に変える</li>
              <li>相手を分類して勝とうとしない（関係は“調整”で良くなる）</li>
              <li>苦しい時は、まず休む/相談する（診断で解決しようとしない）</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">7. 次の一手（3分でできる実践）</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>自分の4軸を紙に書く（例：Sunny / Back / Guard / Quick）</li>
              <li>最近しんどかった場面を1つ思い出す</li>
              <li>その場面で「得意の出しすぎ」を1つ決めて、次回は1段だけ弱める</li>
            </ol>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <Link
                to="/diagnosis"
                className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
              >
                診断をはじめる
              </Link>
              <Link
                to="/types"
                className="inline-flex items-center justify-center px-6 py-3 bg-slate-100 text-slate-900 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
              >
                16タイプ一覧を見る
              </Link>
            </div>
          </section>

          <footer className="pt-6 border-t border-slate-200 text-xs text-slate-500">
            本記事は自己理解の参考情報です。医療・心理の診断（医学的/臨床的評価）ではありません。
          </footer>
        </article>
      </div>
    </div>
  );
}


