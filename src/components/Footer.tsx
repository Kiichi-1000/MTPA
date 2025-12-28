import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6" />
              <span className="text-lg font-bold">仮面診断</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              心理学と統計学に基づいて独自開発された、
              あなたの社会的な仮面を診断するツールです。
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">メニュー</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-300 hover:text-white text-sm transition-colors">
                  診断する
                </Link>
              </li>
              <li>
                <Link to="/types" className="text-slate-300 hover:text-white text-sm transition-colors">
                  タイプ一覧
                </Link>
              </li>
              <li>
                <Link to="/note" className="text-slate-300 hover:text-white text-sm transition-colors">
                  Note（活用ガイド）
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-300 hover:text-white text-sm transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">情報</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-slate-300 hover:text-white text-sm transition-colors">
                  利用規約
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-300 hover:text-white text-sm transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-slate-300 hover:text-white text-sm transition-colors">
                  免責事項
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            &copy; {currentYear} 仮面診断. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
