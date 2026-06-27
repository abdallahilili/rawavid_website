import { useI18n } from '../i18n';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const { t } = useI18n();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>();

  const testimonials = Object.values(t.testimonials.items);

  return (
    <section id="testimonials" style={{ padding: '6rem 0', background: '#18216d' }}>
      <div className="container">
        <div ref={headerRef} className="section-header centered reveal-up">
          <div className="section-badge section-badge-dark">{t.testimonials.badge}</div>
          <h2 className="section-title section-title-dark">{t.testimonials.title}</h2>
          <p className="section-subtitle section-subtitle-dark">{t.testimonials.subtitle}</p>
        </div>

        <div ref={gridRef} className="testimonials-grid reveal-up delay-150">
          {testimonials.map((item) => (
            <div className="testimonial-card" key={item.name}>
              <div className="testimonial-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="testimonial-quote">"{item.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{item.initial}</div>
                <div>
                  <div className="testimonial-name">{item.name}</div>
                  <div className="testimonial-role">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
