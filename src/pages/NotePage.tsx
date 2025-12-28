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
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">この記事の使い方（最短ルート）</h2>
            <div className="bg-slate-50 rounded-xl p-5 space-y-3">
              <p className="text-sm">
                目的は「当てる」ではなく、<span className="font-semibold text-slate-900">行動を1段だけ良くする</span>ことです。
                まずは次の順で読むのがおすすめです。
              </p>
              <ol className="list-decimal pl-6 space-y-1 text-sm">
                <li>「外面（仮面）」の前提（セクション1）</li>
                <li>4軸の“調整スイッチ”を決める（セクション3）</li>
                <li>ケーススタディ（セクション6）を1つ真似する</li>
                <li>最後に「7日プラン」（セクション8）で習慣化する</li>
              </ol>
            </div>
          </section>

          <section id="premise" className="space-y-3 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">1. まず「これは外面（仮面）だ」と理解する</h2>
            <p>
              仮面タイプは、状況・役割・環境によって変化します。結果は「あなたの全て」ではなく、
              <span className="font-semibold text-slate-900">“よく使われる対人スタイル”</span>の傾向です。
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>同じ人でも、学校と職場で振る舞いが違うことがある</li>
              <li>役職や責任が変わると、Front/Backが入れ替わることがある</li>
              <li>体調や余裕で、Sunny/Moonの出方が変わることがある</li>
            </ul>
            <p className="text-sm text-slate-600">
              だからこそ、結果は「固定ラベル」ではなく<span className="font-semibold text-slate-900">“再現性のある癖”</span>として使うと、改善が進みます。
            </p>
          </section>

          <section id="howToRead" className="space-y-4 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">2. タイプページの読み方（どこを見ると効く？）</h2>
            <p>仮面診断の結果ページ・タイプ詳細には情報が多いので、目的別に見る場所を分けると速いです。</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-bold text-slate-900 mb-2">自分の強みを言語化したい</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>冒頭（opening）で「外からどう見えるか」を掴む</li>
                  <li>strengthsの箇条書きから「自分の言い方」に置換する</li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-bold text-slate-900 mb-2">つまずきを減らしたい</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>weaknesses / risks を優先して読む</li>
                  <li>tips を「次の一手（テンプレ）」に落とす</li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-bold text-slate-900 mb-2">職場での立ち回りを整えたい</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>workplaceHabits（同僚/部下/上司）を読む</li>
                  <li>「誤解されやすい見え方」を先に潰す</li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-bold text-slate-900 mb-2">人間関係を楽にしたい</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>compatibility を“相性”ではなく“言い換えの必要度”として使う</li>
                  <li>相手の軸に合わせた「翻訳」を作る（セクション5）</li>
                </ul>
              </div>
            </div>
            <div className="mt-3 flex flex-col sm:flex-row gap-3">
              <Link
                to="/types"
                className="inline-flex items-center justify-center px-6 py-3 bg-slate-100 text-slate-900 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
              >
                16タイプ一覧を見る
              </Link>
              <Link
                to="/diagnosis"
                className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
              >
                診断をはじめる
              </Link>
            </div>
          </section>

          <section id="axes" className="space-y-4 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">3. 4軸を「自己否定」ではなく「設計図」にする</h2>
            <p>
              4軸は優劣ではなく“やり方の違い”です。最も効果が出るのは、各軸を「強み」「詰まり」「調整スイッチ」に分けることです。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                <h3 className="font-bold text-slate-900">テンション（Sunny / Moon）</h3>
                <p className="text-sm">人前でのエネルギーの出し方。</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><span className="font-semibold text-slate-900">強み</span>: Sunny＝場を立ち上げる／Moon＝場を安定させる</li>
                  <li><span className="font-semibold text-slate-900">詰まり</span>: Sunny＝無理に元気がち／Moon＝疲れが見えやすい</li>
                  <li><span className="font-semibold text-slate-900">調整スイッチ</span>: 「今日は“明るさ”を8→6に落とす」「落ち着きのまま“一言だけ前向き”を足す」</li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                <h3 className="font-bold text-slate-900">ポジション（Front / Back）</h3>
                <p className="text-sm">チーム内の立ち位置。</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><span className="font-semibold text-slate-900">強み</span>: Front＝推進／Back＝支援・穴埋め</li>
                  <li><span className="font-semibold text-slate-900">詰まり</span>: Front＝抱え込み／Back＝評価が見えにくい</li>
                  <li><span className="font-semibold text-slate-900">調整スイッチ</span>: 「前に立つのは“最初の5分だけ”」「裏で整える内容を一言で共有する」</li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                <h3 className="font-bold text-slate-900">距離感（Close / Guard）</h3>
                <p className="text-sm">心理的距離の取り方。</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><span className="font-semibold text-slate-900">強み</span>: Close＝相談しやすい／Guard＝礼儀距離と境界</li>
                  <li><span className="font-semibold text-slate-900">詰まり</span>: Close＝頼られ過多／Guard＝冷たく見える</li>
                  <li><span className="font-semibold text-slate-900">調整スイッチ</span>: 「引き受ける前に“条件”を置く」「要点の前に“短い共感”を1行」</li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                <h3 className="font-bold text-slate-900">ワーク（Persistent / Quick）</h3>
                <p className="text-sm">進め方の癖。</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><span className="font-semibold text-slate-900">強み</span>: Persistent＝品質と継続／Quick＝最短で成立</li>
                  <li><span className="font-semibold text-slate-900">詰まり</span>: Persistent＝遅いと思われる／Quick＝淡泊・説明不足に見える</li>
                  <li><span className="font-semibold text-slate-900">調整スイッチ</span>: 「守る品質を2つに絞る」「結論の前に“目的/背景”を1行」</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="overuse" className="space-y-3 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">4. 「強みの使いすぎ」を先に止める（実務版）</h2>
            <p>
              仮面の悩みは「弱点」より、<span className="font-semibold text-slate-900">強みの出しすぎ</span>で起きやすいです。
              ここでは、職場で起きがちな“現象”に変換して対策します。
            </p>
            <div className="bg-slate-50 rounded-xl p-5 space-y-4">
              <div>
                <p className="font-semibold text-slate-900">Closeが強い人（仕事が寄る）</p>
                <p className="text-sm">よくある現説明: 「一旦見とくね」が“やる”扱いになりやすい。</p>
                <p className="text-sm mt-1">
                  <span className="font-semibold text-slate-900">対策テンプレ:</span> 「見れるけど、今日中は難しい。<span className="font-semibold">明日17時まで</span>ならOK」／「範囲は<span className="font-semibold">ここまで</span>にしよう」
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Guardが強い人（冷たく見える）</p>
                <p className="text-sm">よくある現象: 要点は正しいのに、温度が読めないと言われる。</p>
                <p className="text-sm mt-1">
                  <span className="font-semibold text-slate-900">対策テンプレ:</span> 「把握。<span className="font-semibold">大変だったね</span>。結論だけ言うと…」／「助かった、次はこうしよう」
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Persistentが強い人（“全部任される”）</p>
                <p className="text-sm">よくある現象: 丁寧さが「任せれば安心」になって、仕事が偏る。</p>
                <p className="text-sm mt-1">
                  <span className="font-semibold text-slate-900">対策テンプレ:</span> 「ここは私がやる。代わりに<span className="font-semibold">こっちは誰かに</span>任せたい」／「品質は“ここ”だけ守る」
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Quickが強い人（淡泊に見える）</p>
                <p className="text-sm">よくある現象: 最短で回すほど、感謝や背景が省略される。</p>
                <p className="text-sm mt-1">
                  <span className="font-semibold text-slate-900">対策テンプレ:</span> 「助かった。結論はAで。理由は<span className="font-semibold">これ1つ</span>」／「目的は◯◯。だからA」
                </p>
              </div>
            </div>
          </section>

          <section id="translation" className="space-y-4 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">5. コミュニケーションは「翻訳表」を作ると強い</h2>
            <p>
              相手のタイプが分からなくても、軸だけ分かると会話は整います。おすすめは「相手軸に合わせた言い換え」を固定で持つことです。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="font-semibold text-slate-900 mb-2">Quick相手に通る言い方</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>「結論→選択肢→期限」の順で</li>
                  <li>「3つだけ」「どれが良い？」で短く</li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="font-semibold text-slate-900 mb-2">Persistent相手に通る言い方</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>目的→条件→確認ポイントを置く</li>
                  <li>「ここは守る」「ここは捨てる」を明確に</li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="font-semibold text-slate-900 mb-2">Close相手に通る言い方</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>先に相談の枠（時間/目的）を置く</li>
                  <li>相手の負担を見える化して頼る</li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="font-semibold text-slate-900 mb-2">Guard相手に通る言い方</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>礼儀距離＋要点（短い共感は1行）</li>
                  <li>「必要なら後で個別に」で安全に</li>
                </ul>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-5">
              <p className="font-semibold text-slate-900 mb-2">ひとこと翻訳テンプレ</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <p>Quick向け: 「結論から。A/B/Cのどれで行く？」</p>
                <p>Persistent向け: 「目的は◯◯。条件は◯◯。確認ポイントは◯◯」</p>
                <p>Close向け: 「5分だけ相談。ここが詰まってて…」</p>
                <p>Guard向け: 「要点だけ共有するね。必要なら後で個別に確認させて」</p>
              </div>
            </div>
          </section>

          <section id="case" className="space-y-4 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">6. ケーススタディ（そのまま使える型）</h2>
            <p>よくある場面を、4軸の使い分けで“事故りにくい形”に整えます。</p>

            <div className="space-y-4">
              <div className="border border-slate-200 rounded-xl p-5">
                <h3 className="font-bold text-slate-900 mb-2">ケースA：会議が長い（Quickが詰まる/Guardが刺さる）</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>最初の1分で「目的」「決めたいこと」「制約（期限）」を宣言する</li>
                  <li>選択肢を3つまでに絞り、最後に“仮置きの決め”を作る</li>
                </ul>
                <p className="text-sm mt-2">
                  <span className="font-semibold text-slate-900">テンプレ:</span> 「今日決めたいのは1点。A/B/Cのどれで行くか。制約は期限だけ」
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-5">
                <h3 className="font-bold text-slate-900 mb-2">ケースB：仕事を断れない（Close/Persistentが詰まる）</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>断るのではなく「条件の交渉」に変換する（期限/範囲/優先度）</li>
                  <li>“代替案”を1つだけ出す（回りやすくなる）</li>
                </ul>
                <p className="text-sm mt-2">
                  <span className="font-semibold text-slate-900">テンプレ:</span> 「いまはAが最優先。これをやるなら、Bは◯日後/範囲はここまでなら可能」
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-5">
                <h3 className="font-bold text-slate-900 mb-2">ケースC：対立が出た（Moon/Persistentが刺さる）</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>両方の意見を一度言い換え、共通点（目的）を置く</li>
                  <li>次の一手を小さく切る（合意できる最小単位）</li>
                </ul>
                <p className="text-sm mt-2">
                  <span className="font-semibold text-slate-900">テンプレ:</span> 「Aは“◯◯を守りたい”、Bは“◯◯を早くしたい”。目的は同じ。まずは◯◯だけ決めよう」
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-5">
                <h3 className="font-bold text-slate-900 mb-2">ケースD：淡泊に誤解される（Quick/Guardが詰まる）</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>「共感1行」→「要点」→「次の一手」の順にする</li>
                  <li>最後に“感謝1語”を置く（短くてOK）</li>
                </ul>
                <p className="text-sm mt-2">
                  <span className="font-semibold text-slate-900">テンプレ:</span> 「それは大変だったね。要点は◯◯。次は◯◯で行こう。助かった」
                </p>
              </div>
            </div>
          </section>

          <section id="team" className="space-y-4 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">7. チームで使う時のルール（揉めないために）</h2>
            <p>診断をチームで共有するなら、必ず“扱い方のルール”を先に決めると安全です。</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-semibold text-slate-900">目的を固定</span>: 「評価」ではなく「連携の最適化」</li>
              <li><span className="font-semibold text-slate-900">ラベル禁止</span>: 「だから◯◯」で相手を固定しない</li>
              <li><span className="font-semibold text-slate-900">軸で話す</span>: タイプ名より「いまはQuickで回す/今日はMoonで整える」</li>
              <li><span className="font-semibold text-slate-900">役割は固定しない</span>: プロジェクトごとに“得意の置き場所”を変える</li>
            </ul>
          </section>

          <section id="plan" className="space-y-4 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">8. 7日プラン（本当に変えるための手順）</h2>
            <p>変化は「理解」ではなく「繰り返し」で起きます。7日だけ、1日1つでOKです。</p>
            <div className="bg-slate-50 rounded-xl p-5">
              <ol className="list-decimal pl-6 space-y-2 text-sm">
                <li>自分の4軸を書く（例：Sunny / Back / Guard / Quick）</li>
                <li>最近の“詰まり”を1つ選ぶ（会議/依頼/対立/報連相など）</li>
                <li>その場面で「強みの出しすぎ」を1つ決める（セクション4）</li>
                <li>テンプレを1個だけ覚える（セクション4/6）</li>
                <li>実際に1回使う（成功/失敗どちらでもOK）</li>
                <li>反応をメモする（良かった点・違和感の点）</li>
                <li>テンプレを1段だけ調整して再実行する</li>
              </ol>
            </div>
            <p className="text-sm text-slate-600">
              “大改造”より、<span className="font-semibold text-slate-900">1段だけ弱める/足す</span>が最短で効きます。
            </p>
          </section>

          <section id="caution" className="space-y-3 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">9. 注意：診断を“ラベル”として使いすぎない</h2>
            <p>
              タイプは便利ですが、貼りすぎると会話が止まります。仮面診断は、
              <span className="font-semibold text-slate-900">「どう振る舞えば次が良くなるか」</span>のヒントとして使うのが最も有益です。
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>「だから無理」ではなく「だから設計できる」に変える</li>
              <li>相手を分類して勝とうとしない（関係は“調整”で良くなる）</li>
              <li>苦しい時は、まず休む/相談する（診断で解決しようとしない）</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">10. 次の一手（今すぐできる）</h2>
            <p>最後に、行動に落とし込む入口を置きます。</p>
            <div className="mt-2 flex flex-col sm:flex-row gap-3">
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


