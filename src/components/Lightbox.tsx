import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxProps {
  isOpen: boolean;
  currentIndex: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  title?: string;
  location?: string;
}

export default function Lightbox({ isOpen, currentIndex, total, onClose, onPrev, onNext, title, location }: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center cursor-pointer"
          style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            className="absolute top-8 right-10 bg-none border-none text-fg text-3xl cursor-pointer opacity-60 hover:opacity-100 transition-opacity z-10"
            onClick={onClose}
          >
            &times;
          </button>

          <button
            className="absolute top-1/2 -translate-y-1/2 left-5 bg-none border-none text-fg text-4xl cursor-pointer opacity-40 hover:opacity-100 transition-opacity p-5 z-10"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
          >
            &#8592;
          </button>

          <button
            className="absolute top-1/2 -translate-y-1/2 right-5 bg-none border-none text-fg text-4xl cursor-pointer opacity-40 hover:opacity-100 transition-opacity p-5 z-10"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
          >
            &#8594;
          </button>

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-[80vw] h-[70vh] md:w-[70vw] md:h-[80vh] flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                borderRadius: '0.75rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span style={{
                fontSize: '4rem',
                color: 'var(--accent)',
                opacity: 0.15,
                fontFamily: "'Instrument Serif', serif",
              }}>
                M
              </span>
            </div>

            {title && (
              <div className="mt-6 text-center">
                <div className="text-sm text-accent font-body font-medium tracking-[0.15em] uppercase">
                  {title}
                </div>
                {location && (
                  <div className="text-xs text-muted mt-1 font-body font-light">
                    {location}
                  </div>
                )}
              </div>
            )}

            <div className="mt-4 text-sm text-muted font-body tracking-widest">
              {currentIndex + 1} / {total}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
