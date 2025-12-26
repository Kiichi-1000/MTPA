import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MASK_TYPES } from '../data/maskTypes';
import { MaskTypeCode } from '../types/diagnosis';
import { Users, Target, Heart, Sparkles } from 'lucide-react';
import { applySeoMeta } from '../utils/seo';
import TermsConsentNotice from '../components/TermsConsentNotice';

const defaultImage = "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800";

const getAxisIcon = (axis: string) => {
  switch (axis) {
    case 'Sunny':
      return <Sparkles className="w-4 h-4" />;
    case 'Front':
      return <Target className="w-4 h-4" />;
    case 'Close':
      return <Heart className="w-4 h-4" />;
    default:
      return <Users className="w-4 h-4" />;
  }
};

const TypeListPage = () => {
  const typeEntries = Object.entries(MASK_TYPES) as [MaskTypeCode, typeof MASK_TYPES[MaskTypeCode]][];

  useEffect(() => {
    applySeoMeta({
      title: '16タイプ一覧 - 仮面診断',
      description: '仮面診断の16タイプ一覧。各タイプの特徴・行動傾向を確認できます。',
      canonicalUrl: `${window.location.origin}/types`,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            16の仮面タイプ一覧
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            あなたが職場や学校で被っている仮面は、どのタイプでしょうか？
            <br />
            それぞれの特徴を理解して、自分らしい働き方を見つけましょう。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {typeEntries.map(([code, type]) => (
            <div
              key={code}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={type.image || defaultImage}
                  alt={type.name}
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-xs font-medium mb-1 opacity-90">
                    {code}
                  </p>
                  <h3 className="text-white text-lg font-bold leading-tight">
                    {type.name}
                  </h3>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm text-blue-600 font-medium mb-3 flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  {type.shortLabel}
                </p>

                <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {type.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {Object.entries(type.axesSummary).map(([key, value]) => (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full"
                    >
                      {getAxisIcon(value)}
                      {value}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/result?type=${code}`}
                  aria-label={`${type.name}（${code}）を詳しく見る`}
                  className="block w-full text-center py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
                >
                  詳しく見る
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/diagnosis"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            診断をはじめる
          </Link>
          <TermsConsentNotice
            className="mt-3 text-xs md:text-sm text-slate-600"
            linkClassName="underline underline-offset-4 hover:text-slate-900"
          />
        </div>
      </div>
    </div>
  );
};

export default TypeListPage;
