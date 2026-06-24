import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/context';
import { useTheme } from '../theme/context';
import BlurText from './BlurText';

const fadeUp = (delay: number) => ({
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: 'easeOut' },
});

export default function Hero() {
  const { t, isRTL } = useI18n();
  const { isLight } = useTheme();
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const onMouse = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
    };
    const onLeave = () => {
      el.style.transform = `translate(${window.innerWidth / 2 - 300}px, ${window.innerHeight / 2 - 300}px)`;
    };

    document.addEventListener('mousemove', onMouse);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMouse);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 6 + Math.random() * 8,
    size: Math.random() > 0.5 ? 2 : 1,
  }));

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg"
    >
      <div
        ref={cursorRef}
        className="cursor-light"
        style={{ opacity: isLight ? 0.06 : 0.12 }}
      />

      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div
          style={{
            width: '100%',
            height: '100%',
            background: isLight
              ? 'linear-gradient(135deg, #faf7f2 0%, #f0ebe3 30%, #e8e0d6 60%, #faf7f2 100%)'
              : 'linear-gradient(135deg, #0a0a0a 0%, #1a1410 30%, #0d0b0a 60%, #0a0a0a 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(ellipse at 80% 30%, var(--accent-glow) 0%, transparent 50%)`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: '-10%',
              top: '20%',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: `radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)`,
            }}
          />
        </div>
      </div>

      {/* Particles */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="animate-float-particle"
            style={{
              position: 'absolute',
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: 'var(--accent)',
              borderRadius: '50%',
              opacity: 0,
              boxShadow: '0 0 6px var(--accent)',
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="hero-fog absolute inset-0 z-[1]"
        style={{
          background: `radial-gradient(ellipse at 50% 60%, transparent 0%, var(--bg) 78%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-[3] text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          {...fadeUp(0.4)}
          className="liquid-glass rounded-full px-5 py-2 mb-6"
        >
          <span className="text-[10px] font-body font-semibold text-white/80 tracking-[0.25em] uppercase">
            {t.hero.eyebrow}
          </span>
        </motion.div>

        <h1
          className={`font-heading italic leading-[0.85] tracking-[-3px] md:tracking-[-5px] text-fg mb-3 ${
            isRTL
              ? `text-7xl md:text-8xl lg:text-[10rem]`
              : `text-7xl md:text-8xl lg:text-[10rem]`
          }`}
          style={isRTL ? { fontFamily: "'Amiri', serif", letterSpacing: '0' } : {}}
        >
          {isRTL ? (
            <>
              <span style={{ color: 'var(--accent)' }}>م</span>ريم
            </>
          ) : (
            <>
              <span style={{ color: 'var(--accent)' }}>M</span>ARIAM
            </>
          )}
        </h1>

        <p
          className="text-sm md:text-base text-muted max-w-xl font-body font-light leading-relaxed mb-12"
          style={isRTL ? { fontFamily: "'Noto Kufi Arabic', sans-serif" } : {}}
        >
          {t.hero.subtitle}
        </p>

        <motion.div {...fadeUp(0.9)} className="flex gap-4 md:gap-6 mb-12">
          <a
            href="#portfolio"
            className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-body font-medium text-white no-underline flex items-center gap-2 hover:brightness-110 transition-all"
          >
            {t.hero.viewPortfolio}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
          <a
            href="#contact"
            className="text-sm font-body font-medium text-white/80 hover:text-white no-underline flex items-center gap-2 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 4 20 12 6 20 6 4" />
            </svg>
            {t.hero.bookSession}
          </a>
        </motion.div>

        <motion.div {...fadeUp(1.1)} className="flex gap-4 md:gap-6 flex-wrap justify-center mb-12">
          {t.hero.stats.map((stat, i) => (
            <div key={i} className="liquid-glass p-5 w-[170px] md:w-[200px] rounded-[1.25rem]">
              <div
                className="text-4xl font-heading italic text-accent tracking-[-1px] leading-none mt-1"
                style={isRTL ? { fontFamily: "'Amiri', serif" } : {}}
              >
                {stat.value}
              </div>
              <div
                className="text-xs text-white/60 font-body font-light mt-2"
                style={isRTL ? { fontFamily: "'Noto Kufi Arabic', sans-serif" } : {}}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div {...fadeUp(1.3)} className="flex flex-col items-center gap-4 pb-8">
          <div className="liquid-glass rounded-full px-5 py-2">
            <span
              className="text-[11px] font-body text-white/70 tracking-wide whitespace-nowrap"
              style={isRTL ? { fontFamily: "'Noto Kufi Arabic', sans-serif" } : {}}
            >
              {t.hero.trust}
            </span>
          </div>
          <div className="flex gap-8 md:gap-16 flex-wrap justify-center">
            {t.hero.brands.map((brand, i) => (
              <span
                key={i}
                className="font-heading italic text-xl md:text-2xl text-white/40 tracking-tight"
                style={isRTL ? { fontFamily: "'Amiri', serif" } : {}}
              >
                {brand}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2 text-muted">
        <span
          className="text-[10px] font-body font-medium tracking-[0.25em] uppercase"
          style={isRTL ? { fontFamily: "'Noto Kufi Arabic', sans-serif" } : {}}
        >
          {t.hero.scroll}
        </span>
        <div
          className="w-[1px] h-[60px]"
          style={{
            background: 'linear-gradient(to bottom, var(--accent), transparent)',
            animation: 'scrollPulse 2.4s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
