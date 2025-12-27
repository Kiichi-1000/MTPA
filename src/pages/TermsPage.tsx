import { useEffect } from 'react';
import { applySeoMeta } from '../utils/seo';
import { CONTACT_EMAIL, OPERATOR_NAME, SITE_ALT_NAME, SITE_NAME } from '../data/site';

export default function TermsPage() {
  useEffect(() => {
    const origin = window.location.origin;
    applySeoMeta({
      title: `利用規約 - ${SITE_NAME}（${SITE_ALT_NAME}）`,
      description: `${SITE_NAME}（${SITE_ALT_NAME}）の利用規約です。診断開始ボタンの押下をもって本規約に同意いただいたものとして取り扱います。`,
      canonicalUrl: `${origin}/terms`,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">利用規約</h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            本利用規約（以下「本規約」）は、{SITE_NAME}（以下「本サービス」）の利用条件を定めるものです。
            利用者は、本サービスを利用することにより、本規約に同意したものとみなされます。
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. 適用</h2>
            <p className="text-slate-700 leading-relaxed">
              本規約は、利用者と本サービスの提供者（以下「運営者」）との間の本サービス利用に関わる一切の関係に適用されます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. 同意の成立</h2>
            <p className="text-slate-700 leading-relaxed">
              利用者が本サービス上の「診断を始める」等のボタンを押下し、診断を開始した時点で、利用者は本規約の内容に同意いただいたものとして取り扱います。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. 本サービスの位置づけ（重要）</h2>
            <div className="bg-slate-50 rounded-xl p-4 md:p-5 text-slate-700 leading-relaxed space-y-2">
              <p>
                本サービスは、自己理解の参考となる情報提供を目的としたものであり、医療行為・心理療法・診断（医学的/臨床的評価）ではありません。
              </p>
              <p>
                本サービスの結果は絶対的な性格判断ではなく、特定の状況（学校・職場など「人前」）における傾向を整理した参考情報です。
              </p>
              <p>
                重要な意思決定（進路・就職・治療等）を行う際は、本サービスの結果のみに依拠せず、専門家への相談等をご検討ください。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. 禁止事項</h2>
            <ul className="list-disc pl-6 text-slate-700 leading-relaxed space-y-1">
              <li>法令または公序良俗に違反する行為</li>
              <li>本サービスの運営を妨害する行為（過度な負荷の送信、不正アクセス等）</li>
              <li>本サービスのコンテンツの無断転載・複製・改変等の権利侵害行為</li>
              <li>他者を誹謗中傷する行為、差別的表現の投稿等（本サービスが投稿機能を提供する場合を含む）</li>
              <li>その他、運営者が不適切と判断する行為</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. 知的財産権</h2>
            <p className="text-slate-700 leading-relaxed">
              本サービス上で提供される文章・画像・ロゴ等のコンテンツに関する知的財産権は、運営者または正当な権利者に帰属します。
              利用者は、私的利用の範囲を超えてこれらを利用することはできません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. 免責・責任制限</h2>
            <div className="text-slate-700 leading-relaxed space-y-2">
              <p>
                運営者は、本サービスの内容の正確性・完全性・有用性等について、明示または黙示を問わず保証しません。
              </p>
              <p>
                利用者が本サービスを利用したこと、または利用できなかったことにより生じた損害について、運営者は責任を負いません。ただし、運営者の故意または重過失による場合はこの限りではありません。
              </p>
              <p>
                本サービスは予告なく変更・中断・終了することがあります。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. 規約の変更</h2>
            <p className="text-slate-700 leading-relaxed">
              運営者は、必要に応じて本規約を変更できます。変更後の本規約は、本サービス上に表示した時点から効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. 準拠法・管轄</h2>
            <p className="text-slate-700 leading-relaxed">
              本規約の解釈にあたっては日本法を準拠法とします。本サービスに関して紛争が生じた場合、運営者所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. お問い合わせ</h2>
            <p className="text-slate-700 leading-relaxed">
              本規約に関するお問い合わせは、以下までご連絡ください。
            </p>
            <p className="mt-2 text-slate-700">
              運営者: <span className="font-semibold text-slate-900">{OPERATOR_NAME}</span>
            </p>
            <p className="mt-2 text-slate-900 font-semibold">{CONTACT_EMAIL}</p>
          </section>

          <footer className="pt-2 text-xs text-slate-500">
            最終更新日: 2025-12-26
          </footer>
        </div>
      </div>
    </div>
  );
}


