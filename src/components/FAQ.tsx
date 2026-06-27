import { useState } from 'react';
import { useI18n } from '../i18n';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function FAQ() {
  const { t } = useI18n();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const listRef = useScrollReveal<HTMLDivElement>();
  const [openKey, setOpenKey] = useState<string | null>(null);

  const faqKeys = Object.keys(t.faq.items) as Array<keyof typeof t.faq.items>;

  const toggle = (key: string) => setOpenKey((prev) => (prev === key ? null : key));

  return (
    <section id="faq" style={{ padding: '6rem 0', background: 'var(--c-surface-alt)' }}>
      <div className="container">
        <div ref={headerRef} className="section-header centered reveal-up">
          <div className="section-badge">{t.faq.badge}</div>
          <h2 className="section-title">{t.faq.title}</h2>
          <p className="section-subtitle">{t.faq.subtitle}</p>
        </div>

        <div ref={listRef} className="faq-list reveal-up delay-150">
          {faqKeys.map((key) => {
            const item = t.faq.items[key];
            const isOpen = openKey === key;
            return (
              <div className={`faq-item${isOpen ? ' open' : ''}`} key={key}>
                <button className="faq-trigger" onClick={() => toggle(key)}>
                  <span>{item.q}</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className={`faq-body${isOpen ? ' open' : ''}`}>
                  <p className="faq-body-inner">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
