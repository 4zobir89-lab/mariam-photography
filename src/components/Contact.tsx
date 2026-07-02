import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '../i18n/context';

export default function Contact() {
  const { t, isRTL } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({
    type: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    btn.disabled = true;
    btn.textContent = t.contact.form.sending;
    setStatus({ type: '', message: '' });

    const data = new FormData(form);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const result = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', message: t.contact.form.success });
        form.reset();
      } else {
        setStatus({ type: 'error', message: result.error || t.contact.form.error });
      }
    } catch {
      setStatus({ type: 'error', message: t.contact.form.networkError });
    }
    btn.disabled = false;
    btn.textContent = t.contact.form.send;
  };

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  });

  return (
    <section id="contact" className="relative py-32 md:py-40 px-6 md:px-12 lg:px-20 bg-bg2 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, var(--accent-glow) 0%, transparent 60%)',
        }}
      />

      <div
        ref={ref}
        className="relative z-[1] max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
        style={{ direction: isRTL ? 'rtl' : 'ltr' }}
      >
        <motion.div {...fadeIn(0.2)} className="flex flex-col">
          <div className="text-[11px] font-body font-semibold text-accent tracking-[0.4em] uppercase mb-4">
            {t.contact.label}
          </div>
          <h2
            className={`text-4xl md:text-5xl font-semibold leading-[1.1] mb-4 tracking-[-0.02em] text-fg ${
              isRTL ? 'font-arabicHeading' : ''
            }`}
            style={isRTL ? { fontFamily: "'Amiri', serif" } : {}}
          >
            {t.contact.title.split('\\n').map((line, i) => (
              <span key={i}>{line}{i === 0 ? <br /> : ''}</span>
            ))}
          </h2>
          <p
            className="text-base text-muted leading-relaxed mb-8 font-body font-light"
            style={isRTL ? { fontFamily: "'Noto Kufi Arabic', sans-serif" } : {}}
          >
            {t.contact.desc}
          </p>

          {[
            { icon: '\u2709', label: t.contact.email, value: t.contact.email },
            { icon: '\u260E', label: t.contact.phone, value: t.contact.phone },
            { icon: '\u2302', label: t.contact.location, value: t.contact.location },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 mb-4">
              <div
                className="w-9 h-9 flex items-center justify-center flex-shrink-0 text-sm"
                style={{
                  border: '1px solid var(--line)',
                  color: 'var(--accent)',
                }}
              >
                {item.icon}
              </div>
              <div>
                <div className="text-xs text-muted uppercase tracking-[0.12em] font-body font-medium">{item.label}</div>
                <div className="text-sm text-fg mt-0.5 font-body">{item.value}</div>
              </div>
            </div>
          ))}

          <div className="flex gap-3 mt-8">
            {['IG', 'X', 'Be', 'in'].map((s, i) => (
              <a
                key={i}
                href="#"
                className="w-11 h-11 flex items-center justify-center text-xs text-muted no-underline transition-all duration-300 hover:text-accent hover:-translate-y-0.5"
                style={{ border: '1px solid var(--line)', letterSpacing: '0.1em' }}
              >
                {s}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          {...fadeIn(0.4)}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="text"
              name="name"
              required
              placeholder={t.contact.form.name}
              className="px-5 py-4 text-sm font-body outline-none transition-[border-color] duration-300 bg-bg text-fg placeholder:text-muted"
              style={{ border: '1px solid var(--line)', fontFamily: 'inherit' }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--line)'; }}
            />
            <input
              type="email"
              name="email"
              required
              placeholder={t.contact.form.email}
              className="px-5 py-4 text-sm font-body outline-none transition-[border-color] duration-300 bg-bg text-fg placeholder:text-muted"
              style={{ border: '1px solid var(--line)', fontFamily: 'inherit' }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--line)'; }}
            />
          </div>

          <select
            name="service"
            required
            className="px-5 py-4 text-sm font-body outline-none transition-[border-color] duration-300 bg-bg text-fg"
            style={{
              border: '1px solid var(--line)',
              fontFamily: 'inherit',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C9A96E' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: isRTL ? 'left 16px center' : 'right 16px center',
            }}
            onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--line)'; }}
          >
            <option value="" disabled selected>{t.contact.form.service}</option>
            {t.contact.services.map((s, i) => (
              <option key={i} value={s.value} style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
                {s.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="event_date"
            placeholder={t.contact.form.eventDate}
            className="px-5 py-4 text-sm font-body outline-none transition-[border-color] duration-300 bg-bg text-fg placeholder:text-muted"
            style={{ border: '1px solid var(--line)', fontFamily: 'inherit' }}
            onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--line)'; }}
          />

          <textarea
            name="message"
            required
            placeholder={t.contact.form.message}
            rows={5}
            className="px-5 py-4 text-sm font-body outline-none transition-[border-color] duration-300 bg-bg text-fg placeholder:text-muted resize-vertical"
            style={{ border: '1px solid var(--line)', fontFamily: 'inherit', minHeight: '120px' }}
            onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--line)'; }}
          />

          <button
            type="submit"
            className="w-fit px-12 py-4 text-sm font-body font-medium tracking-[0.15em] uppercase cursor-pointer relative overflow-hidden transition-colors duration-400"
            style={{
              background: 'transparent',
              border: '1px solid var(--accent)',
              color: 'var(--accent)',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--bg)';
              const pseudo = e.currentTarget.querySelector('.btn-bg') as HTMLElement;
              if (pseudo) pseudo.style.transform = 'scaleX(1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--accent)';
              const pseudo = e.currentTarget.querySelector('.btn-bg') as HTMLElement;
              if (pseudo) pseudo.style.transform = 'scaleX(0)';
            }}
          >
            <span
              className="btn-bg absolute inset-0 origin-left transition-transform duration-400"
              style={{ background: 'var(--accent)', transform: 'scaleX(0)', zIndex: -1 }}
            />
            {t.contact.form.send}
          </button>

          {status.type && (
            <div
              className={`text-sm min-h-[24px] transition-opacity duration-300 font-body ${
                status.type === 'success' ? 'text-accent' : 'text-red-500'
              }`}
            >
              {status.message}
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
