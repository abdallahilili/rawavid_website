import { useEffect, useMemo, createRef } from 'react';
import { useI18n } from '../i18n';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Globe, Smartphone, Lightbulb, Cloud, Settings, GraduationCap } from 'lucide-react';

const SERVICE_META = {
  web: {
    icon: Globe,
    bentoClass: 'bento-web',
    colorVar: 'var(--c-accent)',
    bgGlow: 'rgba(255, 130, 92, 0.05)',
  },
  mobile: {
    icon: Smartphone,
    bentoClass: 'bento-mobile',
    colorVar: '#ec4899',
    bgGlow: 'rgba(236, 72, 153, 0.05)',
  },
  consulting: {
    icon: Lightbulb,
    bentoClass: 'bento-consulting',
    colorVar: '#eab308',
    bgGlow: 'rgba(234, 179, 8, 0.05)',
  },
  cloud: {
    icon: Cloud,
    bentoClass: 'bento-cloud',
    colorVar: '#10b981',
    bgGlow: 'rgba(16, 185, 129, 0.05)',
  },
  support: {
    icon: Settings,
    bentoClass: 'bento-support',
    colorVar: '#06b6d4',
    bgGlow: 'rgba(6, 182, 212, 0.05)',
  },
  training: {
    icon: GraduationCap,
    bentoClass: 'bento-training',
    colorVar: '#8b5cf6',
    bgGlow: 'rgba(139, 92, 246, 0.05)',
  },
};

const DELAYS = ['delay-100', 'delay-200', 'delay-300', 'delay-100', 'delay-200', 'delay-300'];

function useRevealGroup(count: number) {
  const refs = useMemo(() => Array.from({ length: count }, () => createRef<HTMLDivElement>()), [count]);

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
  }, [refs]);

  return refs;
}

export default function Services() {
  const { t } = useI18n();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const cardRefs = useRevealGroup(6);

  const serviceKeys = Object.keys(t.services.items) as Array<keyof typeof t.services.items>;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // Decorators removed for uniform card sizes

  return (
    <section id="services" style={{ padding: '6.5rem 0', background: 'var(--c-surface-alt)', position: 'relative', overflow: 'hidden' }}>
      <div className="services-background-glow"></div>
      <div className="container">
        <div ref={headerRef} className="section-header centered reveal-up">
          {/* <div className="section-badge">{t.services.badge}</div> */}
          <h2 className="section-title">{t.services.title}</h2>
          {/* <p className="section-subtitle">{t.services.subtitle}</p> */}
        </div>

        <div className="services-grid bento-grid">
          {serviceKeys.map((key, i) => {
            const meta = SERVICE_META[key];
            const Icon = meta.icon;
            const service = t.services.items[key];
            return (
              <div
                key={key}
                ref={cardRefs[i]}
                onMouseMove={handleMouseMove}
                className={`service-card bento-card ${meta.bentoClass} reveal-up ${DELAYS[i]}`}
                style={{
                  '--theme-color': meta.colorVar,
                  '--glow-color': meta.bgGlow,
                } as React.CSSProperties}
              >
                <div className="service-card-glow"></div>
                <div className="service-card-border-glow"></div>
                
                <div className="service-content-wrapper">
                  <div className="service-header">
                    <h3 className="service-title">{service.title}</h3>
                    <div className="service-icon" style={{ boxShadow: `0 8px 24px ${meta.bgGlow}` }}>
                      <Icon size={22} strokeWidth={2.2} />
                    </div>
                  </div>
                  <p className="service-desc">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
