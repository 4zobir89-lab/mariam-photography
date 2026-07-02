import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../i18n/context';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { href: '#portfolio', key: 'portfolio' },
  { href: '#about', key: 'about' },
  { href: '#services', key: 'services' },
  { href: '#contact', key: 'contact' },
];

export default function Navbar() {
  const { t, isRTL } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-4 left-0 right-0 z-50 px-8 lg:px-16 transition-all duration-500 ${
        scrolled ? 'top-0 pt-4' : ''
      }`}
    >
      <div className="liquid-glass rounded-full px-5 py-2.5 flex items-center justify-between max-w-7xl mx-auto">
        <a
          href="#"
          className="font-heading italic text-2xl text-white no-underline"
          style={isRTL ? { fontFamily: "'Amiri', serif", fontSize: '1.5rem' } : {}}
        >
          {isRTL ? 'م' : 'M'}
          <span style={{ color: 'var(--accent)' }}>{isRTL ? 'ريم' : 'ariam'}</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="px-3 py-2 text-sm font-body font-medium text-white/80 hover:text-white transition-colors no-underline"
            >
              {t.nav[link.key as keyof typeof t.nav] as string}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />

          <a
            href="#contact"
            className="liquid-glass-strong rounded-full px-4 py-2 text-sm font-body font-medium text-white no-underline flex items-center gap-1.5 hover:brightness-110 transition-all"
          >
            {t.nav.bookSession}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden liquid-glass rounded-full h-10 w-10 flex flex-col items-center justify-center gap-1 cursor-pointer"
            aria-label="Menu"
          >
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden liquid-glass-strong rounded-2xl mt-2 px-6 py-6 mx-8 lg:mx-16 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-body font-medium text-white/80 hover:text-white transition-colors no-underline py-2"
              >
                {t.nav[link.key as keyof typeof t.nav] as string}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
