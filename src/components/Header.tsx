import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, Home, List, HelpCircle, BookOpen } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Sparkles className="w-8 h-8 text-slate-800" />
            <span className="text-xl font-bold text-slate-800">仮面診断</span>
          </Link>

          {/* スマホ版: 診断する・タイプ一覧 + ハンバーガーメニュー */}
          <nav className="flex items-center gap-3 md:hidden">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors whitespace-nowrap ${
                location.pathname === '/'
                  ? 'text-slate-800'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              診断する
            </Link>
            <Link
              to="/types"
              className={`text-sm font-medium transition-colors whitespace-nowrap ${
                location.pathname === '/types'
                  ? 'text-slate-800'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              タイプ一覧
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-800 transition-colors"
              aria-label="メニュー"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>

          {/* PC版: 全メニュー表示 */}
          <nav className="hidden md:flex items-center gap-6">
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
            <Link
              to="/note"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/note' || location.pathname.startsWith('/note/')
                  ? 'text-slate-800'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Note
            </Link>
          </nav>
        </div>

        {/* ハンバーガーメニューのオーバーレイとサイドバー */}
        <>
          {/* 半透明のオーバーレイ */}
          <div
            className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
              isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsMenuOpen(false)}
          />
          {/* サイドバーメニュー（右からスライドイン） */}
          <div
            className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-2xl z-50 md:hidden transition-transform duration-300 ease-out ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* ヘッダー部分 */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-slate-800" />
                <span className="text-lg font-bold text-slate-800">メニュー</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full hover:bg-slate-200 transition-colors"
                aria-label="メニューを閉じる"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* メニューリスト */}
            <nav className="flex flex-col p-4 gap-2">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 py-4 px-5 rounded-xl font-medium transition-all duration-200 ${
                  location.pathname === '/'
                    ? 'bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg transform scale-[1.02]'
                    : 'text-slate-700 hover:bg-slate-200 hover:shadow-md hover:transform hover:scale-[1.01]'
                }`}
              >
                <Home className={`w-5 h-5 ${location.pathname === '/' ? 'text-white' : 'text-slate-600'}`} />
                <span>診断する</span>
              </Link>
              <Link
                to="/types"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 py-4 px-5 rounded-xl font-medium transition-all duration-200 ${
                  location.pathname === '/types'
                    ? 'bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg transform scale-[1.02]'
                    : 'text-slate-700 hover:bg-slate-200 hover:shadow-md hover:transform hover:scale-[1.01]'
                }`}
              >
                <List className={`w-5 h-5 ${location.pathname === '/types' ? 'text-white' : 'text-slate-600'}`} />
                <span>タイプ一覧</span>
              </Link>
              <Link
                to="/faq"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 py-4 px-5 rounded-xl font-medium transition-all duration-200 ${
                  location.pathname === '/faq'
                    ? 'bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg transform scale-[1.02]'
                    : 'text-slate-700 hover:bg-slate-200 hover:shadow-md hover:transform hover:scale-[1.01]'
                }`}
              >
                <HelpCircle className={`w-5 h-5 ${location.pathname === '/faq' ? 'text-white' : 'text-slate-600'}`} />
                <span>FAQ</span>
              </Link>
              <Link
                to="/note"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 py-4 px-5 rounded-xl font-medium transition-all duration-200 ${
                  location.pathname === '/note' || location.pathname.startsWith('/note/')
                    ? 'bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg transform scale-[1.02]'
                    : 'text-slate-700 hover:bg-slate-200 hover:shadow-md hover:transform hover:scale-[1.01]'
                }`}
              >
                <BookOpen className={`w-5 h-5 ${location.pathname === '/note' || location.pathname.startsWith('/note/') ? 'text-white' : 'text-slate-600'}`} />
                <span>Note</span>
              </Link>
            </nav>
          </div>
        </>
      </div>
    </header>
  );
}
