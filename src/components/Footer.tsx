import { useI18n } from '../i18n/context';

export default function Footer() {
  const { t, isRTL } = useI18n();

  return (
    <footer className="py-12 px-6 md:px-12 text-center bg-bg" style={{ borderTop: '1px solid var(--line)' }}>
      <p
        className="text-sm text-muted tracking-[0.05em] font-body font-light"
        style={isRTL ? { fontFamily: "'Noto Kufi Arabic', sans-serif" } : {}}
      >
        &copy;{' '}
        <span style={{ color: 'var(--accent)' }}>
          {isRTL ? 'مريم' : 'MARIAM'}
        </span>{' '}
        {t.footer.text}{' '}
        <span style={{ opacity: 0.4 }}>|</span>{' '}
        <span style={{ color: 'var(--accent)' }}>
          {t.footer.heart.split('\u2665').length > 1 ? (
            <>
              {t.footer.heart.split('\u2665')[0]}
              <span>&#9829;</span>
              {t.footer.heart.split('\u2665')[1]}
            </>
          ) : (
            t.footer.heart
          )}
        </span>
      </p>
    </footer>
  );
}
