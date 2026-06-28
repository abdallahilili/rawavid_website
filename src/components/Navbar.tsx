import { useState, useEffect } from 'react';
import { useI18n } from '../i18n';
import { Globe, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navLinks = [
    { label: t.nav.services, id: 'services' },
    { label: t.nav.technologies, id: 'technologies' },
    { label: t.nav.process, id: 'process' },
    { label: t.nav.about, id: 'whyus' },
    { label: t.nav.projects, id: 'portfolio' },
  ];

  return (
    <>
      <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container" style={{ width: '100%' }}>
          <div className="navbar-inner">
            {/* Logo */}
            <div className="navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img
                src="/img/svg/rawafid_nav_logo.png"
                alt="Rawafid"
                style={{ height: 36, width: 'auto' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>

            {/* Desktop nav */}
            <nav>
              <ul className="navbar-nav">
                {navLinks.map((item) => (
                  <li key={item.id}>
                    <button className="navbar-link" onClick={() => scrollTo(item.id)}>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Actions */}
            <div className="navbar-actions">
              <button className="lang-btn" onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')}>
                <Globe size={13} />
                {locale === 'ar' ? 'English' : 'العربية'}
              </button>

              <button
                className="btn-primary"
                onClick={() => scrollTo('contact')}
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.825rem', display: 'flex' }}
              >
                {t.nav.cta}
              </button>

              <button
                className="menu-btn"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      <div className={`mobile-nav${menuOpen ? ' open' : ''}`}>
        {navLinks.map((item) => (
          <button
            key={item.id}
            className="mobile-nav-link"
            onClick={() => scrollTo(item.id)}
          >
            {item.label}
          </button>
        ))}
        <div style={{ marginTop: '0.75rem' }}>
          <button className="btn-primary" onClick={() => scrollTo('contact')} style={{ width: '100%' }}>
            {t.nav.cta}
          </button>
        </div>
      </div>
    </>
  );
}
