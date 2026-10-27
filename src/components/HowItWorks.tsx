import Reveal from './Reveal';
import { STEPS } from '../config/content';
import './HowItWorks.css';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section how" aria-labelledby="how-heading">
      <div className="wrap">
        <Reveal className="center">
          <p className="eyebrow">How it works</p>
          <h2 id="how-heading" className="h2">
            Three steps to <span className="grad">your answer.</span>
          </h2>
          <p className="lead">No manuals, no hunting through notices — just ask.</p>
        </Reveal>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 110} className="step-reveal">
              <article className="step glass-card">
                <span className="step-num" aria-hidden="true">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}