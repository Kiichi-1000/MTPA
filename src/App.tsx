import { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const TopPage = lazy(() => import('./pages/TopPage'));
const DiagnosisPage = lazy(() => import('./pages/DiagnosisPage'));
const ResultPage = lazy(() => import('./pages/ResultPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const TypeListPage = lazy(() => import('./pages/TypeListPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage'));

function App() {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-12 text-slate-600">読み込み中...</div>}>
            <Routes>
              <Route path="/" element={<TopPage />} />
              <Route path="/diagnosis" element={<DiagnosisPage />} />
              <Route path="/result" element={<ResultPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/types" element={<TypeListPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
