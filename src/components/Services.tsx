import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '../i18n/context';

export default function Services() {
  const { t, isRTL } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  const card = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section id="services" className="bg-bg2 py-32 md:py-40 px-6 md:px-12 lg:px-20">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="text-[11px] font-body font-semibold text-accent tracking-[0.4em] uppercase mb-4">
            {t.services.label}
          </div>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] mb-5 tracking-[-0.02em] text-fg ${
              isRTL ? 'font-arabicHeading' : ''
            }`}
            style={isRTL ? { fontFamily: "'Amiri', serif" } : {}}
          >
            {t.services.title}
          </h2>
          <p
            className="text-base text-muted max-w-xl mx-auto font-body font-light leading-relaxed"
            style={isRTL ? { fontFamily: "'Noto Kufi Arabic', sans-serif" } : {}}
          >
            {t.services.desc}
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
          {t.services.items.map((service, i) => (
            <motion.div
              key={i}
              variants={card}
              className="relative p-8 md:p-12 text-center transition-all duration-500 hover:-translate-y-2"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--line)',
                overflow: 'hidden',
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px] origin-left transition-transform duration-500 scale-x-0 hover:scale-x-100"
                style={{ background: 'var(--accent)' }}
              />
              <span
                className="text-3xl block mb-5"
                style={{ color: 'var(--accent)', opacity: 0.7 }}
              >
                {service.icon}
              </span>
              <h3
                className="text-lg font-semibold mb-3 tracking-[-0.01em] text-fg"
                style={isRTL ? { fontFamily: "'Amiri', serif" } : {}}
              >
                {service.title}
              </h3>
              <p
                className="text-sm text-muted leading-relaxed font-body font-light"
                style={isRTL ? { fontFamily: "'Noto Kufi Arabic', sans-serif" } : {}}
              >
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
