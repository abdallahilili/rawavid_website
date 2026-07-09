import { useMemo, useState } from 'react';
import { useI18n } from '../i18n';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowUpRight } from 'lucide-react';

export default function Portfolio() {
  const { t } = useI18n();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const tabsRef = useScrollReveal<HTMLDivElement>();

  const projects = useMemo(
    () => Object.entries(t.portfolio.items).map(([id, project]) => ({ id, ...project })),
    [t]
  );

  const [activeId, setActiveId] = useState(projects[0].id);
  const active = projects.find((p) => p.id === activeId) ?? projects[0];

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

        <div ref={tabsRef} className="portfolio-tabs-row reveal-up">
          {projects.map((project) => (
            <button
              key={project.id}
              className={`portfolio-tab-item${project.id === activeId ? ' active' : ''}`}
              onClick={() => setActiveId(project.id)}
            >
              <span className="portfolio-tab-icon" style={{ background: project.gradient }}>
                {project.icon}
              </span>
              {project.title}
            </button>
          ))}
        </div>

        <div className="portfolio-detail" key={active.id}>
          <div className="portfolio-detail-visual" style={{ background: active.gradient }}>
            <span className="portfolio-detail-visual-icon">{active.icon}</span>
          </div>
          <div className="portfolio-detail-content">
            <div className="portfolio-detail-header">
              <span className="portfolio-detail-icon-badge" style={{ background: active.gradient }}>
                {active.icon}
              </span>
              <h3 className="portfolio-detail-title">{active.title}</h3>
            </div>
            <div className="portfolio-detail-category">{active.category}</div>
            <div className="portfolio-detail-divider" />
            <p className="portfolio-detail-desc">{active.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
