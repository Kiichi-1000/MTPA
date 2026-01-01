import { memo } from 'react';
import { AnswerLevel } from '../types/diagnosis';

interface ScaleSelectorProps {
  optionA: string;
  optionB: string;
  selectedLevel: AnswerLevel | undefined;
  onSelect: (level: AnswerLevel) => void;
}

export const ScaleSelector = memo(({ optionA, optionB, selectedLevel, onSelect }: ScaleSelectorProps) => {
  const levels: AnswerLevel[] = [1, 2, 3, 4, 5, 6];
  const sizes = [48, 36, 28, 28, 36, 48];

  return (
    <div className="space-y-6">
      <div className="flex justify-center items-center gap-2 md:gap-3 py-8">
        <span className="md:hidden flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-1">
          A
        </span>
        {levels.map((level, index) => {
          const isLeftSide = level <= 3;
          const getColorClass = () => {
            if (selectedLevel === level) {
              return isLeftSide ? 'bg-blue-600 shadow-lg' : 'bg-orange-600 shadow-lg';
            }
            return isLeftSide
              ? 'bg-blue-200 hover:bg-blue-300'
              : 'bg-orange-200 hover:bg-orange-300';
          };

          return (
            <button
              key={level}
              type="button"
              onClick={() => onSelect(level)}
              aria-label={`回答レベル${level}（${isLeftSide ? 'A寄り' : 'B寄り'}）`}
              aria-pressed={selectedLevel === level}
              className="relative flex-none p-0 aspect-square transition-all duration-200 hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-400/60 rounded-full"
              style={{
                width: sizes[index],
                height: sizes[index],
                minWidth: sizes[index],
                minHeight: sizes[index],
              }}
            >
              <div
                className={`w-full h-full rounded-full transition-all duration-200 ${getColorClass()}`}
              />
            </button>
          );
        })}
        <span className="md:hidden flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm ml-1">
          B
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:gap-4">
        <div className="flex-1 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              A
            </span>
            <p className="text-slate-700 leading-relaxed pt-1">{optionA}</p>
          </div>
        </div>
        <div className="flex-1 bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              B
            </span>
            <p className="text-slate-700 leading-relaxed pt-1">{optionB}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

ScaleSelector.displayName = 'ScaleSelector';

