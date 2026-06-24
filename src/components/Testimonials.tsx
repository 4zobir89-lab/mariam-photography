import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '../i18n/context';

export default function Testimonials() {
  const { t, isRTL } = useI18n();
  const trackRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.innerWidth < 768) return;

    let scrollAmount = 0;
    const step = 1;

    let interval: ReturnType<typeof setInterval> = setInterval(() => {
      scrollAmount += step;
      const maxScroll = track.scrollWidth - window.innerWidth + 100;
      if (scrollAmount >= maxScroll) scrollAmount = 0;
      track.style.transform = `translateX(-${scrollAmount}px)`;
      track.style.transition = 'transform 0.1s linear';
    }, 35);

    const onEnter = () => clearInterval(interval);
    const onLeave = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        scrollAmount += step;
        const maxScroll = track.scrollWidth - window.innerWidth + 100;
        if (scrollAmount >= maxScroll) scrollAmount = 0;
        track.style.transform = `translateX(-${scrollAmount}px)`;
        track.style.transition = 'transform 0.1s linear';
      }, 35);
    };

    track.addEventListener('mouseenter', onEnter);
    track.addEventListener('mouseleave', onLeave);

    return () => {
      clearInterval(interval);
      track.removeEventListener('mouseenter', onEnter);
      track.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section id="testimonials" className="bg-bg py-32 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="text-[11px] font-body font-semibold text-accent tracking-[0.4em] uppercase mb-4">
            {t.testimonials.label}
          </div>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-[-0.02em] text-fg ${
              isRTL ? 'font-arabicHeading' : ''
            }`}
            style={isRTL ? { fontFamily: "'Amiri', serif" } : {}}
          >
            {t.testimonials.title}
          </h2>
        </div>

        <div className="overflow-hidden" style={{ direction: 'ltr' }}>
          <div
            ref={trackRef}
            className="flex gap-6 w-max"
          >
            {[...t.testimonials.items, ...t.testimonials.items].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % t.testimonials.items.length) * 0.1 }}
                className="w-[340px] md:w-[420px] flex-shrink-0 p-10 md:p-12"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--line)',
                }}
              >
                <div
                  className="text-6xl leading-[0.6] mb-3"
                  style={{
                    color: 'var(--accent)',
                    opacity: 0.2,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  "
                </div>
                <p
                  className="text-sm md:text-base text-muted leading-relaxed font-body font-light italic mb-8"
                  style={isRTL ? { fontFamily: "'Noto Kufi Arabic', sans-serif", fontStyle: 'normal' } : {}}
                >
                  {item.text}
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
                    style={{
                      background: 'var(--bg3)',
                      border: '1px solid var(--line)',
                      color: 'var(--accent)',
                    }}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <div
                      className="text-sm font-semibold text-fg"
                      style={isRTL ? { fontFamily: "'Amiri', serif" } : {}}
                    >
                      {item.name}
                    </div>
                    <div
                      className="text-xs text-muted font-body font-light"
                      style={isRTL ? { fontFamily: "'Noto Kufi Arabic', sans-serif" } : {}}
                    >
                      {item.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
