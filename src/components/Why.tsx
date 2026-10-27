import Reveal from './Reveal';
import { WHY_POINTS } from '../config/content';
import './Why.css';

export default function Why() {
  return (
    <section id="about" className="section why" aria-labelledby="why-heading">
      <div className="wrap why-grid">
        <Reveal>
          <p className="eyebrow">Why CampusAI</p>
          <h2 id="why-heading" className="h2">
            Campus information, <span className="grad">without the hunt.</span>
          </h2>
          <p className="lead">
            CampusAI is a digital campus assistant for NSRIT students. It brings department
            information together so you can ask in your own words and get pointed in the right
            direction — available anytime through the assistant.
          </p>
        </Reveal>
        <ul className="why-list">
          {WHY_POINTS.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 90}>
              <div className="why-item glass-card">
                <span className="why-tick" aria-hidden="true">✓</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}