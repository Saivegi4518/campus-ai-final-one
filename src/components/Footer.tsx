import { SITE, FOOTER } from '../config';
import Logo from './Logo';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <span className="brand">
            <Logo size={32} />
            <span className="brand-text">
              <span className="brand-name">{SITE.name}</span>
              <span className="brand-sub">
                {SITE.tagline} · {SITE.college}
              </span>
            </span>
          </span>
          <p>
            {SITE.department}<br />
            {SITE.college}
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="footer-heading">Explore</p>
          <ul>
            {FOOTER.exploreLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="footer-heading">Assistant</p>
          <ul>
            {FOOTER.assistantLinks.map((l) => (
              <li key={l.label}>{l.label}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>{SITE.copyright}</p>
      </div>
    </footer>
  );
}