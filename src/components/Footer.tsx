import { useI18n } from '../i18n';

export default function Footer() {
  const { t } = useI18n();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand column */}
          <div>
            <div className="footer-logo-text">RAWAFID</div>
            <p className="footer-tagline">{t.footer.tagline}</p>
            <div className="footer-socials">
              {[
                { src: '/img/svg/github.svg', label: 'GitHub' },
                { src: '/img/svg/twitter.svg', label: 'Twitter' },
                { src: '/img/svg/linkedin.svg', label: 'LinkedIn' },
              ].map(({ src, label }) => (
                <a href="#" className="footer-social" aria-label={label} key={label}>
                  <img src={src} alt={label} style={{ width: 16, height: 16, filter: 'brightness(0) invert(0.6)' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="footer-col-heading">{t.footer.company}</div>
            <ul className="footer-col-links">
              <li><button className="footer-col-link">{t.footer.links.about}</button></li>
              <li><button className="footer-col-link">{t.footer.links.team}</button></li>
              <li><button className="footer-col-link">{t.footer.links.careers}</button></li>
              <li><button className="footer-col-link">{t.footer.links.blog}</button></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="footer-col-heading">{t.footer.services}</div>
            <ul className="footer-col-links">
              <li>
                <button className="footer-col-link" onClick={() => scrollTo('services')}>
                  {t.footer.links.web}
                </button>
              </li>
              <li>
                <button className="footer-col-link" onClick={() => scrollTo('services')}>
                  {t.footer.links.mobile}
                </button>
              </li>
              <li>
                <button className="footer-col-link" onClick={() => scrollTo('services')}>
                  {t.footer.links.consulting}
                </button>
              </li>
              <li>
                <button className="footer-col-link" onClick={() => scrollTo('services')}>
                  {t.footer.links.cloud}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="footer-col-heading">{t.footer.contact}</div>
            <ul className="footer-col-links">
              <li>
                <button className="footer-col-link" onClick={() => scrollTo('contact')}>
                  {t.footer.links.about}
                </button>
              </li>
              <li>
                <span className="footer-col-link" style={{ cursor: 'default' }}>
                  hello@rawafid.mr
                </span>
              </li>
              <li>
                <span className="footer-col-link" style={{ cursor: 'default' }}>
                  +222 XX XX XX XX
                </span>
              </li>
              <li>
                <span className="footer-col-link" style={{ cursor: 'default' }}>
                  Nouakchott 🇲🇷
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span className="footer-copy">{t.footer.copyright} · {t.footer.made_in}</span>
          <div className="footer-legal">
            <button className="footer-legal-link">{t.footer.links.privacy}</button>
            <button className="footer-legal-link">{t.footer.links.terms}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
