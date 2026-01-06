import { useState, useRef, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react';
import { Play, Pause, Music } from 'lucide-react';

// publicフォルダ内のファイルはルートパスで参照
// ファイル名に特殊文字が含まれているため、直接パスを指定
const audioFile = "/Low tide, but I'm still wavin',.mp3";

export interface MusicPlayerRef {
  stop: () => void;
}

const MusicPlayer = forwardRef<MusicPlayerRef>((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // オーディオ要素を作成
    const audio = new Audio();
    audio.loop = isLooping;
    audio.preload = 'metadata';
    
    // ファイルパスを設定（特殊文字をエンコード）
    // ファイル名部分のみをエンコード（先頭のスラッシュは保持）
    const pathParts = audioFile.split('/');
    const encodedPath = '/' + pathParts.slice(1).map(part => encodeURIComponent(part)).join('/');
    console.log('オーディオファイルパス:', encodedPath);
    audio.src = encodedPath;
    audioRef.current = audio;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
        setIsLoading(false);
      }
    };
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      console.error('オーディオの読み込みエラー:', audio.error);
      console.error('オーディオのパス:', encodedPath);
      setIsLoading(false);
    };
    const handleCanPlay = () => {
      setIsLoading(false);
    };
    const handleLoadedMetadata = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
        setIsLoading(false);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('canplaythrough', handleCanPlay);

    // メタデータの読み込みを開始
    audio.load().catch((error) => {
      console.error('オーディオの読み込みに失敗しました:', error);
      setIsLoading(false);
    });

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.pause();
      audio.src = '';
    };
  }, [isLooping]);

  useEffect(() => {
    if (!audioRef.current || isLoading) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // 再生成功
          })
          .catch((error) => {
            console.error('音楽の再生に失敗しました:', error);
            setIsPlaying(false);
          });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, isLoading]);

  const stop = useCallback(() => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  useImperativeHandle(ref, () => ({
    stop,
  }));

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-5 border border-slate-200">
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-slate-800 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:bg-slate-700 hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-400/60 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={isPlaying ? '音楽を停止' : '音楽を再生'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 md:w-6 md:h-6" />
          ) : (
            <Play className="w-5 h-5 md:w-6 md:h-6 ml-0.5" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Music className="w-4 h-4 text-slate-600 flex-shrink-0" />
            <span className="text-sm font-medium text-slate-700 truncate">
              High vibes
            </span>
          </div>
          <div
            className="w-full h-2 bg-slate-200 rounded-full cursor-pointer hover:h-2.5 transition-all"
            onClick={handleProgressClick}
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="再生進捗"
          >
            <div
              className="h-full bg-slate-800 rounded-full transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-slate-500">
              {formatTime(currentTime)}
            </span>
            <span className="text-xs text-slate-500">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

MusicPlayer.displayName = 'MusicPlayer';

export default MusicPlayer;

