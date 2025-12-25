import { Link, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Header() {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Sparkles className="w-8 h-8 text-slate-800" />
            <span className="text-xl font-bold text-slate-800">仮面診断</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-slate-800'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              診断する
            </Link>
            <Link
              to="/types"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/types'
                  ? 'text-slate-800'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              タイプ一覧
            </Link>
            <Link
              to="/faq"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/faq'
                  ? 'text-slate-800'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              FAQ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
