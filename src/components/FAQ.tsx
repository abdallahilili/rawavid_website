import { useState } from 'react';
import { useI18n } from '../i18n';
import { Bot, X, ChevronDown } from 'lucide-react';

export default function FAQ() {
  const { t, locale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);

  const faqKeys = Object.keys(t.faq.items) as Array<keyof typeof t.faq.items>;

  const toggle = (key: string) =>
    setOpenKey((prev) => (prev === key ? null : key));

  return (
    <>
      {/* Floating bot button */}
      <button
        className={`faq-bot-trigger${isOpen ? ' active' : ''}`}
        onClick={() => setIsOpen((o) => !o)}
        aria-label="FAQ"
      >
        {isOpen ? <X size={22} /> : <Bot size={22} />}
        {!isOpen && <span className="faq-bot-ping" />}
      </button>

      {/* Panel */}
      <div className={`faq-bot-panel${isOpen ? ' open' : ''}`}>
        {/* Header */}
        <div className="faq-bot-header">
          <div className="faq-bot-avatar">
            <Bot size={17} />
          </div>
          <div className="faq-bot-info">
            <span className="faq-bot-name">{t.faq.title}</span>
            <span className="faq-bot-status">
              <span className="faq-bot-dot" />
              {locale === 'ar' ? 'متاح الآن' : 'Online'}
            </span>
          </div>
          <button className="faq-bot-close" onClick={() => setIsOpen(false)}>
            <X size={15} />
          </button>
        </div>

        <div className="faq-bot-body">
          {/* FAQ accordion */}
          <div className="faq-bot-list">
            {faqKeys.map((key) => {
              const item = t.faq.items[key];
              const isItemOpen = openKey === key;
              return (
                <div
                  className={`faq-bot-item${isItemOpen ? ' open' : ''}`}
                  key={key}
                >
                  <button className="faq-bot-q" onClick={() => toggle(key)}>
                    <span>{item.q}</span>
                    <ChevronDown size={14} className="faq-bot-chevron" />
                  </button>
                  <div className="faq-bot-a">
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
