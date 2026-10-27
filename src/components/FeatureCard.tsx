import { Suspense, lazy, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '../hooks';

const BorderBeam = lazy(() =>
  import('border-beam').then((m) => ({ default: m.BorderBeam })),
);

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  text: string;
  beam?: boolean;
  delay?: number;
}

/**
 * Light theme glass feature card. Selected cards get a restrained BorderBeam
 * (ocean variant, light theme); all cards keep the glass style so the
 * grid reads consistently even before the beam chunk loads.
 */
export default function FeatureCard({ icon, title, text, beam = false, delay = 0 }: FeatureCardProps) {
  const reduced = usePrefersReducedMotion();
  const body = (
    <div className="feature-body glass-card">
      {icon}
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );

  if (!beam) return body;

  return (
    <div className="feature-beam" style={{ transitionDelay: `${delay}ms` }}>
      <Suspense fallback={body}>
        <BorderBeam
          size="md"
          colorVariant="ocean"
          theme="light"
          duration={3.2}
          active={!reduced}
          borderRadius={22}
          strength={0.85}
        >
          {body}
        </BorderBeam>
      </Suspense>
    </div>
  );
}