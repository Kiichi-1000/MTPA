import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TopPage from './pages/TopPage';
import DiagnosisPage from './pages/DiagnosisPage';
import ResultPage from './pages/ResultPage';
import FAQPage from './pages/FAQPage';
import TypeListPage from './pages/TypeListPage';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<TopPage />} />
            <Route path="/diagnosis" element={<DiagnosisPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/types" element={<TypeListPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
