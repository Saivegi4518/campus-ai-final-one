import { useEffect, useState } from 'react';
import { CHAT_URL, CTA } from '../config';
import { HERO } from '../config/content';
import AIOrb from './AIOrb';
import { usePrefersReducedMotion } from '../hooks';
import './Hero.css';

const TYPE_CYCLES = ['Where is the Data Science Lab?', 'Who teaches DBMS?', 'Placement information', 'Course details for CSD'];

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const [reveal, setReveal] = useState(false);
  const [typeIdx, setTypeIdx] = useState(0);

  // Staggered reveal for headline
  useEffect(() => {
    if (reduced) {
      setReveal(true);
      return;
    }
    const t = setTimeout(() => setReveal(true), 400);
    return () => clearTimeout(t);
  }, [reduced]);

  // Typewriter cycle
  useEffect(() => {
    if (reduced) return;
    const cycleId = setInterval(() => setTypeIdx((i) => (i + 1) % TYPE_CYCLES.length), 3200);
    return () => clearInterval(cycleId);
  }, [reduced]);

  return (
    <section id="home" className="hero" aria-labelledby="hero-heading">
      <div className="hero-spotlight" aria-hidden="true" />

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-badge">
            <span className="badge-dot" aria-hidden="true" />
            {HERO.badge}
          </p>

          <h1 id="hero-heading" className="hero-title">
            <span className="hero-line">Your Campus.</span>{' '}
            <span className={`hero-line hero-gradient ${reveal ? 'is-visible' : ''}`}>
              One Intelligent Assistant.
            </span>
          </h1>

          <p className="hero-sub">{HERO.sub}</p>

          <div className="hero-ctas">
            <a
              href={CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary hero-cta"
            >
              {CTA.hero} <span aria-hidden="true">→</span>
            </a>
            <a href="#features" className="btn btn-ghost">
              Explore Features
            </a>
          </div>

          <ul className="hero-trust" aria-label="Highlights">
            {HERO.trust.map((t) => (
              <li key={t}>
                <span className="trust-tick" aria-hidden="true">✓</span> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-visual">
          <AIOrb />
        </div>
      </div>

      {/* Typing prompt line beneath the hero grid */}
      <p className="hero-typing" aria-hidden="true">
        <span className="typing-label">Ask:</span>
        <span className="typing-text">
          {TYPE_CYCLES[typeIdx]}
          <span className="caret" />
        </span>
      </p>
    </section>
  );
}
