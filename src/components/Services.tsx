import { useEffect, useRef } from 'react';
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const renderDecorator = (key: keyof typeof SERVICE_META) => {
    switch (key) {
      case 'web':
        return (
          <div className="bento-decorator bento-web-decorator">
            <div className="window-header">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="window-body">
              <div className="skeleton-nav"></div>
              <div className="skeleton-hero"></div>
              <div className="skeleton-grid">
                <div className="skeleton-item"></div>
                <div className="skeleton-item"></div>
                <div className="skeleton-item"></div>
              </div>
            </div>
          </div>
        );
      case 'mobile':
        return (
          <div className="bento-decorator bento-mobile-decorator">
            <div className="phone-bezel">
              <div className="phone-screen">
                <div className="phone-header">
                  <span className="phone-time">09:41</span>
                  <div className="phone-island"></div>
                </div>
                <div className="phone-widget">
                  <div className="widget-header">
                    <span className="widget-title">Active Users</span>
                    <span className="widget-status">Live</span>
                  </div>
                  <div className="widget-val">12.4k</div>
                  <div className="phone-chart">
                    <div className="chart-bar" style={{ height: '35%' }}></div>
                    <div className="chart-bar" style={{ height: '55%' }}></div>
                    <div className="chart-bar" style={{ height: '80%' }}></div>
                    <div className="chart-bar" style={{ height: '60%' }}></div>
                    <div className="chart-bar" style={{ height: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'training':
        return (
          <div className="bento-decorator bento-training-decorator">
            <div className="circle-pulsar">
              <div className="pulse-ring ring-1"></div>
              <div className="pulse-ring ring-2"></div>
              <div className="pulse-ring ring-3"></div>
            </div>
            <div className="training-tags">
              <span className="tag">Django</span>
              <span className="tag">Flutter</span>
              <span className="tag">AWS</span>
            </div>
          </div>
        );
      case 'cloud':
        return (
          <div className="bento-decorator bento-cloud-decorator">
            <div className="cloud-lines">
              <svg className="cloud-svg" viewBox="0 0 100 60">
                <path d="M 10 50 Q 50 10 90 50" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 25 45 Q 50 25 75 45" fill="none" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="1.5" />
              </svg>
              <div className="cloud-pulse"></div>
            </div>
          </div>
        );
      case 'support':
        return null;
      case 'consulting':
        return (
          <div className="bento-decorator bento-consulting-decorator">
            <div className="consulting-radar">
              <div className="radar-line"></div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="services" style={{ padding: '6.5rem 0', background: 'var(--c-surface-alt)', position: 'relative', overflow: 'hidden' }}>
      <div className="services-background-glow"></div>
      <div className="container">
        <div ref={headerRef} className="section-header centered reveal-up">
          <div className="section-badge">{t.services.badge}</div>
          <h2 className="section-title">{t.services.title}</h2>
          <p className="section-subtitle">{t.services.subtitle}</p>
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
                  <div className="service-icon" style={{ boxShadow: `0 8px 24px ${meta.bgGlow}` }}>
                    <Icon size={22} strokeWidth={2.2} />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.description}</p>
                </div>

                {renderDecorator(key)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
