import { useEffect, useRef } from 'react';
import { useI18n } from '../i18n';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Globe, Smartphone, Lightbulb, Cloud, Settings, GraduationCap } from 'lucide-react';

const ICONS = [Globe, Smartphone, Lightbulb, Cloud, Settings, GraduationCap];
const DELAYS = ['delay-100', 'delay-200', 'delay-300', 'delay-100', 'delay-200', 'delay-300'];

function useRevealGroup(count: number) {
  const refs = Array.from({ length: count }, () => useRef<HTMLDivElement>(null));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    refs.forEach((r) => { if (r.current) observer.observe(r.current); });
    return () => observer.disconnect();
  }, []);

  return refs;
}

export default function Services() {
  const { t } = useI18n();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const cardRefs = useRevealGroup(6);

  const serviceKeys = Object.keys(t.services.items) as Array<keyof typeof t.services.items>;

  return (
    <section id="services" style={{ padding: '6rem 0', background: 'var(--c-surface-alt)' }}>
      <div className="container">
        <div ref={headerRef} className="section-header centered reveal-up">
          <div className="section-badge">{t.services.badge}</div>
          <h2 className="section-title">{t.services.title}</h2>
          <p className="section-subtitle">{t.services.subtitle}</p>
        </div>

        <div className="services-grid">
          {serviceKeys.map((key, i) => {
            const Icon = ICONS[i];
            const service = t.services.items[key];
            return (
              <div
                key={key}
                ref={cardRefs[i]}
                className={`service-card reveal-up ${DELAYS[i]}`}
              >
                <div className="service-icon">
                  <Icon size={22} />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
