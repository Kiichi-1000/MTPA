import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MASK_TYPES } from '../data/maskTypes';
import { MaskTypeCode } from '../types/diagnosis';

const SLIDE_INTERVAL = 4000; // 4秒ごとに切り替え

export default function TypeSlider() {
  const typeEntries = Object.entries(MASK_TYPES) as [MaskTypeCode, typeof MASK_TYPES[MaskTypeCode]][];
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerResetRef = useRef<number | null>(null);

  // タイマーをリセットする関数
  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // 既存のリセットタイマーがあればクリア
    if (timerResetRef.current) {
      clearTimeout(timerResetRef.current);
    }
    // 新しいタイマーを設定
    timerResetRef.current = window.setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % typeEntries.length);
      }, SLIDE_INTERVAL);
      timerResetRef.current = null;
    }, 100);
  };

  useEffect(() => {
    // 初回タイマーを開始
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % typeEntries.length);
    }, SLIDE_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timerResetRef.current) {
        clearTimeout(timerResetRef.current);
      }
    };
  }, [typeEntries.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + typeEntries.length) % typeEntries.length);
    resetTimer();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % typeEntries.length);
    resetTimer();
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetTimer();
  };

  const currentType = typeEntries[currentIndex];

  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* 画像部分（1:1比率） */}
        <div className="relative w-full aspect-square">
          <img
            src={currentType[1].image}
            alt={currentType[1].name}
            className="w-full h-full object-cover object-center transition-opacity duration-500"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* タイプ情報 */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                {currentType[0]}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              {currentType[1].name}
            </h3>
            <p className="text-base md:text-lg text-white/90 mb-4">
              {currentType[1].shortLabel}
            </p>
            <Link
              to={`/type/${currentType[0]}`}
              className="inline-block px-6 py-2 bg-white text-slate-800 font-semibold rounded-lg hover:bg-slate-100 transition-colors"
            >
              詳しく見る
            </Link>
          </div>
        </div>

        {/* ナビゲーションボタン（画像の下） */}
        <div className="p-4 bg-slate-50 flex items-center justify-center gap-4">
          <button
            onClick={goToPrevious}
            className="bg-slate-800 hover:bg-slate-700 text-white rounded-full p-3 transition-all shadow-md hover:shadow-lg"
            aria-label="前のスライド"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="bg-slate-800 hover:bg-slate-700 text-white rounded-full p-3 transition-all shadow-md hover:shadow-lg"
            aria-label="次のスライド"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* インジケーター */}
        <div className="p-4 bg-slate-50 flex items-center justify-center gap-2 flex-wrap border-t border-slate-200">
          {typeEntries.map(([code], index) => (
            <button
              key={code}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-slate-800 w-8'
                  : 'bg-slate-300 w-2 hover:bg-slate-400'
              }`}
              aria-label={`${code}に移動`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

