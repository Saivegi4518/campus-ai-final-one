import { Suspense, lazy } from 'react';
import { CHAT_URL, CTA } from '../config';
import { FINAL_CTA } from '../config/content';
import { usePrefersReducedMotion } from '../hooks';
import Reveal from './Reveal';
import './FinalCTA.css';

const MetalFx = lazy(() =>
  import('metal-fx').then((m) => ({ default: m.MetalFx })),
);

/**
 * Closing call-to-action.
 * The primary button gets the MetalFx liquid-metal ring if it reads premium on light.
 */
export default function FinalCTA() {
  const reduced = usePrefersReducedMotion();

  const ctaLink = (
    <a href={CHAT_URL} target="_blank" rel="noopener noreferrer">
      <span aria-hidden="true">💬</span> {CTA.final}
    </a>
  );

  return (
    <section className="section final" aria-labelledby="final-heading">
      <div className="wrap">
        <Reveal className="center">
          <div className="final-panel glass-card">
            <div className="final-glow" aria-hidden="true" />
            <p className="eyebrow">{FINAL_CTA.eyebrow}</p>
            <h2 id="final-heading" className="h2">
              {FINAL_CTA.title} <span className="grad">{FINAL_CTA.highlight}</span>
            </h2>
            <p className="lead">{FINAL_CTA.sub}</p>
            <div className="final-cta">
              <span className="metal-cta">
                <Suspense fallback={ctaLink}>
                  <MetalFx
                    variant="button"
                    preset="chromatic"
                    theme="light"
                    strength={reduced ? 0.35 : 0.9}
                    glowGain={0.7}
                  >
                    {ctaLink}
                  </MetalFx>
                </Suspense>
              </span>
            </div>
            <p className="final-note">{FINAL_CTA.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}