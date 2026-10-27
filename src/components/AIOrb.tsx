import { Suspense, lazy, useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks';
import { FLOATING_CARDS } from '../config/content';
import './AIOrb.css';

const ThinkingOrb = lazy(() =>
  import('thinking-orbs').then((m) => ({ default: m.ThinkingOrb })),
);

const ORB_STATES = ['connecting', 'searching', 'working', 'listening'] as const;

/**
 * Hero intelligence-core visual.
 * - Centred, luminous AI orb (thinking-orbs) on a soft radial glow.
 * - 2-3 crisp orbit rings in 3D perspective with glowing data nodes.
 * - Floating glass question cards at different depths (translateZ + parallax).
 * - Ground shadow/reflection ellipse so the orb floats in space.
 * - "CampusAI is online" chip placed safely below the orb, never overlapping.
 */
export default function AIOrb() {
  const reduced = usePrefersReducedMotion();
  const [stateIdx, setStateIdx] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setStateIdx((i) => (i + 1) % ORB_STATES.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div
      className="orb-stage"
      role="img"
      aria-label="Illustration of the CampusAI intelligence core surrounded by example student questions"
    >
      {/* Soft background glow */}
      <div className="orb-halo" aria-hidden="true" />

      {/* Orbit rings — 3D perspective, crisp on light background */}
      <div className="orb-ring ring-a" aria-hidden="true">
        <span className="ring-node" aria-hidden="true" />
      </div>
      <div className="orb-ring ring-b" aria-hidden="true">
        <span className="ring-node" aria-hidden="true" />
      </div>
      <div className="orb-ring ring-c" aria-hidden="true" />

      {/* Centred AI orb core */}
      <div className="orb-core">
        <Suspense fallback={<div className="orb-fallback" aria-hidden="true" />}>
          <ThinkingOrb
            state={ORB_STATES[stateIdx]}
            size={64}
            theme="light"
            color="#4F7CFF"
            dots={2.2}
            dotSize={1.6}
            speed={reduced ? 0 : 0.9}
            paused={reduced}
            gravity={false}
            aria-label="CampusAI thinking orb"
          />
        </Suspense>
        <div className="orb-core-glow" aria-hidden="true" />
      </div>

      {/* Ground shadow / reflection ellipse — makes it float in space */}
      <div className="orb-shadow" aria-hidden="true" />

      {/* Status chip — placed safely at the bottom, never overlapping cards */}
      <div className="orb-status glass-card" aria-hidden="true">
        <span className="pulse-dot" />
        <span>CampusAI is online</span>
      </div>

      {/* Floating glass question cards at different depths */}
      {FLOATING_CARDS.map((f, i) => (
        <div
          key={f.q}
          className={`floater glass-card f${i + 1}`}
          style={{ animationDelay: `${i * 0.7}s` }}
          aria-hidden="true"
        >
          <span className="floater-tag">{f.tag}</span>
          <span className="floater-q">&ldquo;{f.q}&rdquo;</span>
        </div>
      ))}
    </div>
  );
}