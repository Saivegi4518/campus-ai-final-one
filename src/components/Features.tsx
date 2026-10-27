import FeatureCard from './FeatureCard';
import FeatureIcon from './FeatureIcon';
import Reveal from './Reveal';
import { FEATURES } from '../config/content';
import './Features.css';

export default function Features() {
  return (
    <section id="features" className="section features" aria-labelledby="features-heading">
      <div className="wrap">
        <Reveal className="center">
          <p className="eyebrow">Features</p>
          <h2 id="features-heading" className="h2">
            Everything you need, <span className="grad">one question away.</span>
          </h2>
          <p className="lead">
            CampusAI brings together the answers CSD students ask about most — courses, faculty,
            subjects, placements, and campus life — in a single conversation.
          </p>
        </Reveal>
        <ul className="feature-grid">
          {FEATURES.map((f, i) => (
            <Reveal as="li" key={f.title} delay={i * 110} className={f.span}>
              <FeatureCard
                icon={<FeatureIcon glyph={f.glyph} label={f.label} />}
                title={f.title}
                text={f.text}
                beam={i === 0 || i === 2 || i === 5}
                delay={i * 110}
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}