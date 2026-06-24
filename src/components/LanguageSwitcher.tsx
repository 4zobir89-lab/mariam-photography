import { useI18n } from '../i18n/context';

export default function LanguageSwitcher() {
  const { lang, toggleLang } = useI18n();

  return (
    <button
      onClick={toggleLang}
      className="liquid-glass rounded-full h-10 w-10 flex items-center justify-center text-xs font-body font-medium text-white/90 hover:text-white transition-colors cursor-pointer"
      aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      {lang === 'en' ? 'ع' : 'EN'}
    </button>
  );
}
