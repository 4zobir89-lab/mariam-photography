import { useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '../i18n/context';
import Lightbox from './Lightbox';

export default function Portfolio() {
  const { t, isRTL, lang } = useI18n();
  const [filter, setFilter] = useState('all');
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);

  const categories = useMemo(() => {
    const cats = ['all', ...new Set(t.portfolio.items.map((item) => item.category))];
    return cats;
  }, [t.portfolio.items]);

  const filtered = useMemo(() => {
    if (filter === 'all') return t.portfolio.items;
    return t.portfolio.items.filter((item) => item.category === filter);
  }, [filter, t.portfolio.items]);

  const openLightbox = (index: number) => {
    const realIndex = t.portfolio.items.indexOf(filtered[index]);
    setLbIndex(realIndex);
    setLbOpen(true);
  };

  return (
    <section id="portfolio" className="bg-bg py-32 md:py-40 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="text-[11px] font-body font-semibold text-accent tracking-[0.4em] uppercase mb-4">
            {t.portfolio.label}
          </div>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] mb-5 tracking-[-0.02em] text-fg ${
              isRTL ? 'font-arabicHeading' : ''
            }`}
            style={isRTL ? { fontFamily: "'Amiri', serif" } : {}}
          >
            {t.portfolio.title}
          </h2>
          <p
            className="text-base text-muted max-w-xl mx-auto font-body font-light leading-relaxed"
            style={isRTL ? { fontFamily: "'Noto Kufi Arabic', sans-serif" } : {}}
          >
            {t.portfolio.desc}
          </p>
        </div>

        {/* Filter */}
        <div
          className="liquid-glass rounded-full inline-flex px-2 py-1.5 gap-1 mb-12 mx-auto"
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 text-[11px] font-body font-medium rounded-full transition-all cursor-pointer ${
                filter === cat
                  ? 'liquid-glass-strong text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {cat === 'all' ? t.portfolio.all : cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {filtered.map((item, i) => (
            <motion.div
              key={`${item.title}-${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
              className={`relative overflow-hidden cursor-pointer bg-bg3 ${
                i === 1 ? 'sm:row-span-2 sm:aspect-[3/5]' : 'aspect-[3/4]'
              } ${i === 4 ? 'sm:col-span-2 sm:aspect-[4/3]' : ''} ${i === 6 ? 'sm:row-span-2 sm:aspect-[3/5]' : ''}`}
              onClick={() => openLightbox(i)}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #1a1a1a, #252525, #1e1e1e)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
                className="group-hover:scale-105"
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '2rem',
                    color: 'var(--accent)',
                    opacity: 0.12,
                    fontFamily: "'Instrument Serif', serif",
                  }}
                >
                  &#x2606;
                </span>

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8"
                  style={{
                    background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)',
                  }}
                >
                  <div className="text-[10px] font-body font-semibold text-accent tracking-[0.3em] uppercase mb-1">
                    {item.category}
                  </div>
                  <div className="text-xl font-semibold text-white">{item.title}</div>
                  <div className="text-sm text-muted mt-1 font-body font-light">{item.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-fg no-underline text-sm tracking-[0.12em] uppercase font-body font-medium pb-2 transition-all hover:text-accent hover:gap-4"
            style={{ borderBottom: '1px solid var(--accent)' }}
          >
            {t.portfolio.cta}
          </a>
        </div>
      </div>

      <Lightbox
        isOpen={lbOpen}
        currentIndex={lbIndex}
        total={t.portfolio.items.length}
        onClose={() => setLbOpen(false)}
        onPrev={() => setLbIndex((i) => (i - 1 + t.portfolio.items.length) % t.portfolio.items.length)}
        onNext={() => setLbIndex((i) => (i + 1) % t.portfolio.items.length)}
        title={t.portfolio.items[lbIndex]?.title}
        location={t.portfolio.items[lbIndex]?.location}
      />
    </section>
  );
}
