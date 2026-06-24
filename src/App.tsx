import { useEffect, useRef } from 'react';
import { I18nProvider, useI18n } from './i18n/context';
import { ThemeProvider, useTheme } from './theme/context';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function GrainOverlay() {
  const { isLight } = useTheme();
  return (
    <div
      className="grain-overlay"
      style={{ opacity: isLight ? 0.02 : 0.035 }}
    />
  );
}

function Vignette() {
  return <div className="vignette" />;
}

function BackgroundEffects() {
  return (
    <>
      <GrainOverlay />
      <Vignette />
    </>
  );
}

function ConsoleSignature() {
  useEffect(() => {
    console.log(
      '%c مريم MARIAM Photography ',
      'background:#0A0A0A;color:#C9A96E;font-size:18px;font-weight:bold;padding:8px 16px;border:1px solid #C9A96E'
    );
    console.log(
      '%c Yemeni Visual Storyteller ',
      'background:#111;color:#8A8490;font-size:13px;padding:4px 16px'
    );
  }, []);

  return null;
}

function AppContent() {
  return (
    <>
      <BackgroundEffects />
      <ConsoleSignature />
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <About />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </ThemeProvider>
  );
}
