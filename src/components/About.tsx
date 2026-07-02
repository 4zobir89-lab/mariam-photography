import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '../i18n/context';

export default function About() {
  const { t, isRTL } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section id="about" className="bg-bg2 py-32 md:py-40 px-6 md:px-12 lg:px-20">
      <div
        ref={ref}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
        style={{ direction: isRTL ? 'rtl' : 'ltr' }}
      >
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 60 : -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative overflow-hidden aspect-[3/4] max-w-lg mx-auto lg:mx-0 w-full"
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(201,169,110,0.03) 40px, rgba(201,169,110,0.03) 41px)',
              }}
            />
            <span
              style={{
                fontSize: '5rem',
                color: 'var(--accent)',
                opacity: 0.2,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontFamily: "'Instrument Serif', serif",
              }}
            >
              M
            </span>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 30%, rgba(10,10,10,0.7) 100%)',
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              inset: 0,
              border: '1px solid var(--accent)',
              zIndex: 2,
              top: '16px',
              left: '16px',
              pointerEvents: 'none',
            }}
          />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="flex flex-col"
        >
          <motion.div variants={item} className="text-[11px] font-body font-semibold text-accent tracking-[0.4em] uppercase mb-4">
            {t.about.label}
          </motion.div>

          <motion.h2
            variants={item}
            className={`text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] mb-5 tracking-[-0.02em] text-fg ${
              isRTL ? 'font-arabicHeading' : ''
            }`}
            style={isRTL ? { fontFamily: "'Amiri', serif" } : {}}
          >
            {t.about.title.split('\\n').map((line, i) => (
              <span key={i}>{line}{i === 0 ? <br /> : ''}</span>
            ))}
          </motion.h2>

          {t.about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={item}
              className="text-base text-muted leading-relaxed mb-5 font-body font-light"
              style={isRTL ? { fontFamily: "'Noto Kufi Arabic', sans-serif" } : {}}
            >
              {p}
            </motion.p>
          ))}

          <motion.p
            variants={item}
            className="text-lg italic text-accent font-heading mb-8"
            style={isRTL ? { fontFamily: "'Amiri', serif", fontStyle: 'normal' } : {}}
          >
            {t.about.quote}
          </motion.p>

          <motion.div
            variants={item}
            className="grid grid-cols-3 gap-6 pt-8"
            style={{ borderTop: '1px solid var(--line)' }}
          >
            {t.about.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-3xl md:text-4xl font-heading italic text-accent"
                  style={isRTL ? { fontFamily: "'Amiri', serif" } : {}}
                >
                  {stat.number}
                </div>
                <div
                  className="text-xs text-muted tracking-[0.15em] uppercase mt-1 font-body"
                  style={isRTL ? { fontFamily: "'Noto Kufi Arabic', sans-serif", letterSpacing: '0' } : {}}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
