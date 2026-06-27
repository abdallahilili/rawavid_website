import { useEffect } from 'react';
import { useI18n } from '../i18n';
import { Rocket, ArrowRight } from 'lucide-react';
import initFluidCursor from '../hooks/useFluidCursor';
import DotParticleCanvas from './DotParticleCanvas';

export default function Hero() {
  const { t } = useI18n();

  useEffect(() => {
    // Guard against React StrictMode double-invocation
    const canvas = document.getElementById('fluid') as HTMLCanvasElement | null;
    if (!canvas || canvas.dataset.fluidInit) return;
    canvas.dataset.fluidInit = '1';
    initFluidCursor();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    t.hero.stats.projects,
    t.hero.stats.clients,
    t.hero.stats.years,
    t.hero.stats.support,
  ];

  return (
    <section className="hero" id="hero">
      {/* WebGL fluid simulation — fills full hero background */}
      <canvas id="fluid" className="hero-fluid-canvas" />

      {/* Click particle bursts inside the hero */}
      <DotParticleCanvas particleColor="255, 130, 92" />

      {/* Subtle CSS grid texture overlay */}
      <div className="hero-grid-pattern" />

      {/* Ambient radial glow */}
      <div className="hero-radial-glow" />

      <div className="container" style={{ width: '100%' }}>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-pulse" />
            {t.hero.badge}
          </div>

          <h1 className="hero-title">{t.hero.title}</h1>

          <p className="hero-desc">{t.hero.description}</p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo('contact')}>
              <Rocket size={16} />
              {t.hero.cta_primary}
            </button>
            <button className="btn-outline" onClick={() => scrollTo('portfolio')}>
              {t.hero.cta_secondary}
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="hero-stats">
            {stats.map((stat) => (
              <div className="hero-stat" key={stat.label}>
                <div className="hero-stat-value">{stat.value}</div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
