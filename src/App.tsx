import { I18nProvider } from './i18n';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Technologies from './components/Technologies';
import Portfolio from './components/Portfolio';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import DotParticleCanvas from './components/DotParticleCanvas';

function AppContent() {
  return (
    <>
      <DotParticleCanvas excludeId="hero" particleColor="255, 130, 92" />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Technologies />
        <Portfolio />
        <WhyUs />
        <Testimonials />
        <Process />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}
