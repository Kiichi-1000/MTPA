import { useEffect } from 'react';
import { applySeoMeta } from '../utils/seo';
import { SITE_NAME } from '../data/site';

export default function DisclaimerPage() {
  useEffect(() => {
    const origin = window.location.origin;
    applySeoMeta({
      title: `免責事項 - ${SITE_NAME}`,
      description: `${SITE_NAME}の免責事項です。`,
      canonicalUrl: `${origin}/disclaimer`,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">免責事項</h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            本ページは、{SITE_NAME}の利用に関する免責・注意事項をまとめたものです。
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6 text-slate-700 leading-relaxed">
          <div className="bg-slate-50 rounded-xl p-4 md:p-5">
            <p className="font-semibold text-slate-900 mb-2">重要</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>本サービスは医療行為・心理療法・診断（医学的/臨床的評価）ではありません。</li>
              <li>診断結果は参考情報であり、正確性・完全性・有用性を保証するものではありません。</li>
              <li>重要な意思決定は、本サービスの結果のみに依拠せず、専門家への相談等をご検討ください。</li>
            </ul>
          </div>

          <p>
            運営者は、本サービスの利用または利用不能により生じた損害について責任を負いません（ただし、運営者の故意または重過失による場合を除きます）。
          </p>

          <footer className="pt-2 text-xs text-slate-500">
            最終更新日: 2025-12-26
          </footer>
        </div>
      </div>
    </div>
  );
}


