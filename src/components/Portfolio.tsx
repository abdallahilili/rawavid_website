import { useI18n } from '../i18n';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowUpRight } from 'lucide-react';

export default function Portfolio() {
  const { t } = useI18n();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>();

  const projects = Object.values(t.portfolio.items);

  return (
    <section id="portfolio" style={{ padding: '6rem 0', background: 'var(--c-surface)' }}>
      <div className="container">
        <div
          ref={headerRef}
          className="section-header reveal-up"
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div>
            <div className="section-badge">{t.portfolio.badge}</div>
            <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>{t.portfolio.title}</h2>
            <p className="section-subtitle">{t.portfolio.subtitle}</p>
          </div>
          <button
            className="btn-outline"
            style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            {t.portfolio.view_all}
            <ArrowUpRight size={16} />
          </button>
        </div>

        <div ref={gridRef} className="portfolio-grid reveal-up delay-150">
          {projects.map((project) => (
            <div className="portfolio-card" key={project.title}>
              <div
                className="portfolio-visual"
                style={{ background: project.gradient }}
              >
                <span style={{ fontSize: '3.5rem', position: 'relative', zIndex: 1 }}>
                  {project.icon}
                </span>
              </div>
              <div className="portfolio-content">
                <div className="portfolio-category">{project.category}</div>
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-desc">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
