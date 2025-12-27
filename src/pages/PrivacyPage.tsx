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
            <div className="text-slate-700 leading-relaxed space-y-3">
              <p>
                本サービスでは、会員登録や個人情報の入力を必須としていません。
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded p-4">
                <h3 className="font-bold text-slate-900 mb-2">診断結果データの保存について</h3>
                <p className="mb-2">
                  本サービスでは、サービスの改善と統計分析を目的として、以下の情報を匿名でデータベースに保存します：
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>診断の回答内容（質問への選択結果）</li>
                  <li>診断結果のタイプとスコア</li>
                  <li>フィードバック（満足度評価、コメント）</li>
                </ul>
                <p className="mt-3 font-semibold text-slate-900">
                  重要：IPアドレス、氏名、メールアドレス、その他個人を特定できる情報は一切保存されません。
                </p>
              </div>
              <p>
                Webサーバーやブラウザの通信に伴い、IPアドレスやUser-Agent等が通常の範囲で一時的に取り扱われる場合がありますが、
                これらの情報はデータベースには保存されず、個人を特定する目的では使用されません。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. 利用目的</h2>
            <div className="text-slate-700 leading-relaxed space-y-3">
              <p>保存されたデータは、以下の目的でのみ使用されます：</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>本サービスの提供・維持・改善</li>
                <li>診断結果の傾向分析とコンテンツの品質向上</li>
                <li>ユーザーフィードバックに基づくサービス改善</li>
                <li>統計データの作成（すべて匿名化）</li>
                <li>不正利用の防止、セキュリティ確保</li>
                <li>障害対応や品質向上のための分析</li>
              </ul>
              <p className="mt-3">
                保存されたデータは匿名であり、個人を特定する目的では使用されません。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. アクセス解析・Cookie</h2>
            <div className="text-slate-700 leading-relaxed space-y-3">
              <p>
                本サービスでは、サービスの改善とユーザー体験の向上を目的として、Google Analytics（Googleが提供するアクセス解析ツール）を使用しています。
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded p-4">
                <h3 className="font-bold text-slate-900 mb-2">Google Analyticsについて</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>訪問者数、ページビュー、利用環境などの統計情報を収集します</li>
                  <li>Cookieを使用して匿名の利用データを収集します</li>
                  <li>個人を特定する情報は収集されません</li>
                  <li>収集されたデータはGoogleのプライバシーポリシーに基づいて管理されます</li>
                </ul>
                <p className="mt-3">
                  Google Analyticsのデータ収集を無効にするには、
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Googleアナリティクス オプトアウト アドオン
                  </a>
                  をご利用ください。
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. 第三者提供</h2>
            <div className="text-slate-700 leading-relaxed space-y-3">
              <p>
                法令に基づく場合を除き、運営者は利用者情報を第三者に提供しません。ただし、以下の外部サービスを利用しています：
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <span className="font-semibold">Google Analytics（Google LLC）</span>
                  - アクセス解析のため、匿名の統計情報がGoogleに提供されます。
                  詳細は
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Googleのプライバシーポリシー
                  </a>
                  をご確認ください。
                </li>
              </ul>
            </div>
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
            最終更新日: 2025-12-27
          </footer>
        </div>
      </div>
    </div>
  );
}


