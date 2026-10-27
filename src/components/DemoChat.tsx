import { useEffect, useState } from 'react';
import { CHAT_URL, CTA } from '../config';
import { DEMO_SCRIPT, DEMO_CONTEXT } from '../config/content';
import Logo from './Logo';
import Reveal from './Reveal';
import { usePrefersReducedMotion } from '../hooks';
import './DemoChat.css';

export default function DemoChat() {
  const reduced = usePrefersReducedMotion();
  const [inView, setInView] = useState(true);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);

  const playing = inView && !paused && !reduced;

  // Track visibility — pause the loop off-screen.
  useEffect(() => {
    const el = document.getElementById('demo-convo');
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setInView(entry.isIntersecting);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Restart the loop whenever we re-enter the viewport.
  useEffect(() => {
    if (inView && !paused && !reduced) setCycle((c) => c + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  // Conversation animation loop — reveal one bubble at a time with typing pauses.
  useEffect(() => {
    if (reduced) {
      setVisibleCount(DEMO_SCRIPT.length);
      setTyping(false);
      return;
    }
    if (!playing) return;

    setVisibleCount(0);
    setTyping(false);
    const step = 1100;
    const timers: number[] = [];
    // Message 1 appears quickly
    timers.push(window.setTimeout(() => setVisibleCount(1), 600));
    // Typing -> message 2
    timers.push(window.setTimeout(() => setTyping(true), 600 + step));
    timers.push(
      window.setTimeout(() => {
        setTyping(false);
        setVisibleCount(2);
      }, 600 + step * 2),
    );
    // Message 3 (student follow-up)
    timers.push(window.setTimeout(() => setVisibleCount(3), 600 + step * 3));
    // Typing -> message 4
    timers.push(window.setTimeout(() => setTyping(true), 600 + step * 4));
    timers.push(
      window.setTimeout(() => {
        setTyping(false);
        setVisibleCount(4);
      }, 600 + step * 5),
    );
    // Hold, then loop from the top
    timers.push(
      window.setTimeout(() => {
        setCycle((c) => c + 1);
      }, 600 + step * 5 + 5200),
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [playing, reduced, cycle]);

  // Expose conversation for screen readers
  const conversationText = DEMO_SCRIPT
    .map((m) => `${m.from === 'ai' ? 'CampusAI' : 'Student'}: ${m.text}`)
    .join(' ');

  return (
    <section id="demo" className="section demo" aria-labelledby="demo-heading">
      <div className="wrap demo-grid">
        {/* Left content */}
        <Reveal>
          <p className="eyebrow">Live preview</p>
          <h2 id="demo-heading" className="h2">
            Try CampusAI <span className="grad">anything about your department.</span>
          </h2>
          <p className="lead">
            Here is a glimpse of a typical conversation. When you are ready, open the assistant
            and start chatting for real — it takes seconds.
          </p>
          <div className="demo-ctas">
            <a
              href={CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {CTA.demo} <span aria-hidden="true">↗</span>
            </a>
          </div>
          <ul className="demo-points">
            <li>No sign-up needed to start</li>
            <li>Built for CSD students</li>
            <li>Opens in a new tab</li>
          </ul>

          {/* Small floating context chips */}
          <ul className="demo-context-chips">
            {DEMO_CONTEXT.map((c) => (
              <li key={c.label} className="chip glass-card">
                {c.label}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Right chat mock */}
        <Reveal delay={120} className="chat-mock-wrapper">
          <div className="chat-shell glass-card chat-tilted">
            {/* Browser-style header */}
            <div className="chat-head">
              <span className="chat-dots" aria-hidden="true">
                <i /><i /><i />
              </span>
              <span className="chat-title">
                <Logo size={22} />
                CampusAI Assistant
              </span>
              <span className="chat-live" aria-hidden="true">
                <span className="pulse-dot" /> online
              </span>
            </div>

            {/* Chat body - accessible with live-text for screen readers */}
            <div className="chat-body" id="demo-convo">
              {/* Conversation lines — progressively revealed */}
              {DEMO_SCRIPT.slice(0, reduced ? DEMO_SCRIPT.length : visibleCount).map((m, i) => (
                <div key={i} className={`bubble ${m.from} visible`}>
                  {m.text}
                </div>
              ))}

              {/* Typing indicator while the AI "composes" */}
              {!reduced && typing && (
                <div className="bubble ai visible typing" aria-hidden="true">
                  <span>
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              )}
            </div>

            <div className="chat-input" aria-hidden="true">
              <span>Ask about courses, faculty, placements…</span>
              <span className="chat-send">↑</span>
            </div>

            {/* Decorative border beam */}
            <div className="border-beam-wrapper">
              <div className="border-beam" aria-hidden="true" />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Hidden conversation for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {conversationText}
      </div>

      {/* Pause/Play button for accessibility */}
      {!reduced && (
        <button
          type="button"
          className="demo-pause-btn"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-controls="demo-convo"
          aria-label={paused ? 'Play conversation demo' : 'Pause conversation demo'}
        >
          <span aria-hidden="true">{paused ? '▶' : '⏸'}</span>
        </button>
      )}
    </section>
  );
}