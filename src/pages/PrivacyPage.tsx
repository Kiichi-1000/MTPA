import { useEffect } from 'react';
import { applySeoMeta } from '../utils/seo';
import { CONTACT_EMAIL, OPERATOR_NAME, SITE_ALT_NAME, SITE_NAME } from '../data/site';

export default function PrivacyPage() {
  useEffect(() => {
    const origin = window.location.origin;
    applySeoMeta({
      title: `プライバシーポリシー - ${SITE_NAME}（${SITE_ALT_NAME}）`,
      description: `${SITE_NAME}（${SITE_ALT_NAME}）のプライバシーポリシーです。`,
      canonicalUrl: `${origin}/privacy`,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">プライバシーポリシー</h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            本プライバシーポリシーは、{SITE_NAME}（以下「本サービス」）における利用者情報の取扱い方針を定めるものです。
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. 取得する情報</h2>
            <p className="text-slate-700 leading-relaxed">
              現時点では、会員登録・問い合わせフォーム等による個人情報の入力を必須としていません。
              ただし、Webサーバーやブラウザの通信に伴い、IPアドレスやUser-Agent等が通常の範囲で取り扱われる場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. 利用目的</h2>
            <ul className="list-disc pl-6 text-slate-700 leading-relaxed space-y-1">
              <li>本サービスの提供・維持・改善</li>
              <li>不正利用の防止、セキュリティ確保</li>
              <li>障害対応や品質向上のための分析</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. アクセス解析・Cookie</h2>
            <p className="text-slate-700 leading-relaxed">
              現時点では、アクセス解析ツールを導入していません。将来、利便性向上や改善のために導入する場合は、
              本ポリシーの更新や必要な表示等を行います。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. 第三者提供</h2>
            <p className="text-slate-700 leading-relaxed">
              法令に基づく場合を除き、運営者は利用者情報を第三者に提供しません（導入する外部サービスがある場合は別途明示します）。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. お問い合わせ</h2>
            <p className="text-slate-700 leading-relaxed">
              本ポリシーに関するお問い合わせは、以下までご連絡ください。
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


