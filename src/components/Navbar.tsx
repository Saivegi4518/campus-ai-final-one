import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CHAT_URL, CTA, NAV_LINKS, SITE } from '../config';
import { useScrolled, useScrollSpy } from '../hooks';
import Logo from './Logo';
import './Navbar.css';

const SECTION_IDS = ['home', 'features', 'demo', 'how-it-works', 'about'];

export default function Navbar() {
  const scrolled = useScrolled(48);
  const activeId = useScrollSpy(SECTION_IDS, 88);
  const [open, setOpen] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Track scroll progress for the progress bar
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const height = document.body.scrollHeight - doc.clientHeight;
      const scroll = height > 0 ? (doc.scrollTop || window.pageYOffset || 0) / height * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, scroll)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while open; Esc closes; simple focus trap.
  // Focus moves into the portalled menu; on close it returns to the toggle.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => {
      const first = menuRef.current?.querySelector<HTMLElement>('a[href], button:not([disabled])');
      (first ?? btnRef.current)?.focus();
    }, 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
      if (e.key === 'Tab' && menuRef.current) {
        const focusables = menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
    <header
      className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' menu-open' : ''}`}
      data-scroll="true"
    >
      <div className="wrap nav-inner">
        <a href="#home" className="brand" aria-label="CampusAI — back to top">
          <Logo size={34} />
          <span className="brand-text">
            <span className="brand-name">{SITE.name}</span>
            <span className="brand-sub">
              {SITE.tagline} · {SITE.college}
            </span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {NAV_LINKS.map((l) => {
            const id = l.href.replace('#', '');
            const isActive = activeId === id;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`nav-link${isActive ? ' is-active' : ''}`}
                aria-current={isActive ? 'location' : undefined}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        <div className="nav-actions">
          <a
            href={CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary nav-cta"
          >
            {CTA.nav} <span aria-hidden="true">↗</span>
          </a>
          <button
            ref={btnRef}
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className="menu-icon">
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      {/* Scroll progress bar at bottom of navbar */}
      <div className="nav-progress" aria-hidden="true">
        <div className="nav-progress-bar" style={{ width: `${scrollPercent}%` }} />
      </div>
    </header>
    {/* Mobile menu — portalled to <body> so the pill's overflow/backdrop-filter
        can never clip it. Fixed under the bar, closes on overlay click. */}
    {open &&
      createPortal(
        <div className="mobile-menu-root">
          <div className="mobile-menu-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
          <div id="mobile-menu" ref={menuRef} className="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu">
            <nav aria-label="Mobile">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="mobile-link" onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ))}
              <a
                href={CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mobile-cta"
              >
                {CTA.nav} <span aria-hidden="true">↗</span>
              </a>
            </nav>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}