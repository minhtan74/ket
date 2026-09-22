'use client';

// Trình phát audio tuỳ biến cho bài nghe: ẩn thanh điều khiển gốc của
// trình duyệt để (1) giới hạn số lần nghe đúng luật thi thật (mặc định 2
// lần - truyền maxPlays={null} để bỏ giới hạn, dùng ở màn hình review sau
// khi nộp bài) và (2) không cho tua/đổi tốc độ.

import { useRef, useState } from 'react';

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function ListeningAudioPlayer({ src, maxPlays = 2 }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const [ended, setEnded] = useState(false);

  if (!src) {
    return <div className="audio-player audio-player-empty">Audio chưa được tải lên.</div>;
  }

  const limited = typeof maxPlays === 'number';
  const usedUp = limited && playCount >= maxPlays && ended;

  function handleTogglePlay() {
    const audio = audioRef.current;
    if (!audio || usedUp) return;

    if (isPlaying) {
      audio.pause();
      return;
    }

    if (limited && playCount >= maxPlays) return;

    if (audio.currentTime === 0 || ended) {
      setPlayCount((c) => c + 1);
      setEnded(false);
    }

    audio.playbackRate = 1;
    audio.play();
  }

  return (
    <div className={`audio-player${usedUp ? ' audio-player-disabled' : ''}`}>
      <audio
        ref={audioRef}
        src={`/${src}`}
        preload="metadata"
        onContextMenu={(e) => e.preventDefault()}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime || 0)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setEnded(true);
        }}
      />

      <button
        type="button"
        className="audio-play-btn"
        onClick={handleTogglePlay}
        disabled={usedUp}
        aria-label={isPlaying ? 'Tạm dừng' : 'Phát'}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>

      <div className="audio-progress-wrap">
        <div className="audio-progress-track">
          <div className="audio-progress-fill" style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }} />
        </div>
        <span className="audio-time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      {limited && !usedUp && (
        <span className="audio-plays-left">Đã nghe: {playCount}/{maxPlays} lần</span>
      )}
      {usedUp && <span className="audio-exhausted-msg">Đã hết lượt nghe</span>}
    </div>
  );
}
