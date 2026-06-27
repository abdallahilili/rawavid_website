import { useI18n } from '../i18n';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Shield, Zap, HeartHandshake, Cpu, Eye, MapPin } from 'lucide-react';

const ICONS = [Shield, Zap, HeartHandshake, Cpu, Eye, MapPin];

export default function WhyUs() {
  const { t } = useI18n();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>();

  const featureKeys = Object.keys(t.whyus.items) as Array<keyof typeof t.whyus.items>;

  return (
    <section id="whyus" style={{ padding: '6rem 0', background: 'var(--c-surface-alt)' }}>
      <div className="container">
        <div ref={headerRef} className="section-header centered reveal-up">
          <div className="section-badge">{t.whyus.badge}</div>
          <h2 className="section-title">{t.whyus.title}</h2>
          <p className="section-subtitle">{t.whyus.subtitle}</p>
        </div>

        <div ref={gridRef} className="whyus-grid reveal-up delay-150">
          {featureKeys.map((key, i) => {
            const Icon = ICONS[i];
            const item = t.whyus.items[key];
            return (
              <div className="feature-item" key={key}>
                <div className="feature-icon">
                  <Icon size={20} />
                </div>
                <h3 className="feature-title">{item.title}</h3>
                <p className="feature-desc">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
