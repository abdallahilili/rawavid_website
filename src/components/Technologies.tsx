import { useState } from 'react';
import { useI18n } from '../i18n';
import { useScrollReveal } from '../hooks/useScrollReveal';

const LOGO_MAP: Record<string, string> = {
  'React':          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  'Next.js':        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  'TypeScript':     'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  'Tailwind CSS':   'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  'Vue.js':         'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
  'Vite':           'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg',
  'Node.js':        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  'Python':         'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  'Django':         'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg',
  'FastAPI':        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
  'PostgreSQL':     'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  'MongoDB':        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  'React Native':   'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  'Flutter':        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
  'Expo':           'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original.svg',
  'iOS':            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg',
  'Android':        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg',
  'AWS':            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  'Vercel':         'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg',
  'Docker':         'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  'Nginx':          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg',
  'Redis':          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
  'GitHub Actions': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
};

type CatKey = 'frontend' | 'backend' | 'mobile' | 'cloud';
type FilterKey = 'all' | CatKey;

export default function Technologies() {
  const { t, locale } = useI18n();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const bodyRef = useScrollReveal<HTMLDivElement>();
  const [active, setActive] = useState<FilterKey>('all');

  const catKeys: CatKey[] = ['frontend', 'backend', 'mobile', 'cloud'];

  const allTechs = catKeys.flatMap(k =>
    (t.technologies.items[k] as readonly string[]).map(name => ({ name, cat: k }))
  );

  const visible = active === 'all'
    ? allTechs
    : allTechs.filter(item => item.cat === active);

  const allLabel = locale === 'ar' ? 'الكل' : 'All';

  const pillLabels: Record<FilterKey, string> = {
    all:      allLabel,
    frontend: t.technologies.categories.frontend,
    backend:  t.technologies.categories.backend,
    mobile:   t.technologies.categories.mobile,
    cloud:    t.technologies.categories.cloud,
  };

  return (
    <section id="technologies" style={{ padding: '6rem 0', background: 'var(--c-section-b)' }}>
      <div className="container">
        <div ref={headerRef} className="section-header centered reveal-up">
          <div className="section-badge">{t.technologies.badge}</div>
          <h2 className="section-title">{t.technologies.title}</h2>
          <p className="section-subtitle">{t.technologies.subtitle}</p>
        </div>

        <div ref={bodyRef} className="reveal-up delay-200">
          <div className="tech-filter-pills">
            {(['all', ...catKeys] as FilterKey[]).map(k => (
              <button
                key={k}
                className={`tech-filter-pill${active === k ? ' active' : ''}`}
                onClick={() => setActive(k)}
              >
                {pillLabels[k]}
              </button>
            ))}
          </div>

          <div className="tech-logo-grid">
            {visible.map(({ name }) => (
              <div className="tech-logo-card" key={name} title={name}>
                <img
                  src={LOGO_MAP[name] ?? ''}
                  alt={name}
                  className="tech-logo-img"
                  loading="lazy"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
