import { useRef, useState, useCallback, useEffect } from 'react';

interface FadingVideoProps {
  src: string | string[];
  className?: string;
  style?: React.CSSProperties;
}

export default function FadingVideo({ src, className = '', style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMulti = Array.isArray(src);
  const sources = isMulti ? src : [src];
  const currentSrc = sources[currentIndex % sources.length];

  const fadeIn = useCallback(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 500;

    function step(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      setOpacity(progress);
      if (progress < 1) frame = requestAnimationFrame(step);
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  const fadeOut = useCallback((next: () => void) => {
    let frame: number;
    let start: number | null = null;
    const duration = 550;

    function step(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      setOpacity(1 - progress);
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        next();
      }
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleEnded = useCallback(() => {
    if (isMulti) {
      fadeOut(() => {
        setCurrentIndex((prev) => prev + 1);
        setOpacity(0);
      });
    } else {
      fadeOut(() => {
        const video = videoRef.current;
        if (video) {
          video.currentTime = 0;
          video.play().then(() => fadeIn());
        }
      });
    }
  }, [isMulti, fadeIn, fadeOut]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => fadeIn();

    const handleTimeUpdate = () => {
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && remaining > 0) {
        if (isMulti) {
          fadeOut(() => {
            setCurrentIndex((prev) => prev + 1);
            setOpacity(0);
          });
        }
      }
    };

    video.addEventListener('loadeddata', handleLoaded);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadeddata', handleLoaded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [currentSrc, fadeIn, fadeOut, handleEnded, isMulti]);

  return (
    <video
      ref={videoRef}
      src={currentSrc}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ ...style, opacity, transition: 'none' }}
    />
  );
}
