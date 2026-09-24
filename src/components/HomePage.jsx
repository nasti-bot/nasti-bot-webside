import { site } from '../data/site.js';

// 开幕画面
export default function HomePage() {
  const { hero } = site;

  return (
    <section className="hero" id="home">
      <h1 className="sr-only">{site.brandTagline}</h1>
      <div className="hero-center">
        <div className="hero-welcome">Welcome</div>
        <div className="hero-eyebrow">{hero.eyebrow}</div>
        <p className="hero-tagline">{hero.tagline}</p>
      </div>
      <div className="hero-scroll-hint">
        <span>SCROLL</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
