import { useI18n } from '../i18n';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Process() {
  const { t } = useI18n();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>();

  const steps = Object.values(t.process.steps);

  return (
    <section id="process" style={{ padding: '6rem 0', background: 'var(--c-section-b)' }}>
      <div className="container">
        <div ref={headerRef} className="section-header centered reveal-up">
          <div className="section-badge">{t.process.badge}</div>
          <h2 className="section-title">{t.process.title}</h2>
          <p className="section-subtitle">{t.process.subtitle}</p>
        </div>

        <div ref={gridRef} className="process-grid reveal-up delay-150">
          {steps.map((step) => (
            <div className="process-step" key={step.num}>
              <div className="process-num">{step.num}</div>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
