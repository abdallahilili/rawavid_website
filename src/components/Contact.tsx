import { useState } from 'react';
import { useI18n } from '../i18n';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const { t } = useI18n();
  const leftRef = useScrollReveal<HTMLDivElement>();
  const rightRef = useScrollReveal<HTMLDivElement>();

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 3500);
    }, 1200);
  };

  const infoRows = [
    { Icon: Mail, label: t.contact.info.email_label, val: t.contact.info.email_val },
    { Icon: Phone, label: t.contact.info.phone_label, val: t.contact.info.phone_val },
    { Icon: MapPin, label: t.contact.info.address_label, val: t.contact.info.address_val },
    { Icon: Clock, label: t.contact.info.hours_label, val: t.contact.info.hours_val },
  ];

  return (
    <section id="contact" style={{ padding: '6rem 0', background: 'var(--c-surface)' }}>
      <div className="container">
        <div className="contact-grid">
          {/* Left: Info */}
          <div ref={leftRef} className="reveal-left">
            <div className="section-badge">{t.contact.badge}</div>
            <h2 className="section-title">{t.contact.title}</h2>
            <p className="section-subtitle">{t.contact.subtitle}</p>

            <div className="contact-info-list">
              {infoRows.map(({ Icon, label, val }) => (
                <div className="contact-info-row" key={label}>
                  <div className="contact-info-icon">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="contact-info-label">{label}</div>
                    <div className="contact-info-val">{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div ref={rightRef} className="reveal-right">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">{t.contact.form.name}</label>
                  <input
                    className="form-input"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t.contact.form.name}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.contact.form.email}</label>
                  <input
                    className="form-input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t.contact.form.email}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t.contact.form.phone}</label>
                <input
                  className="form-input"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={t.contact.form.phone}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.contact.form.message}</label>
                <textarea
                  className="form-input"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t.contact.form.message}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={status !== 'idle'}
                style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.75 : 1 }}
              >
                {status === 'sent'
                  ? t.contact.form.sent
                  : status === 'sending'
                  ? t.contact.form.sending
                  : t.contact.form.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
