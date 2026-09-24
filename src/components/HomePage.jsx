import { useEffect, useRef } from 'react';
import { site } from '../data/site.js';

// 开幕画面：滚动时文字和渐变遮罩随滚动淡出，滚回时淡入
export default function HomePage() {
  const { hero } = site;
  const heroRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // 滚过 0~0.6 个视口高度之间，淡出程度从 0 到 1
      const progress = Math.min(scrollY / (vh * 0.6), 1);
      heroRef.current?.style.setProperty('--hero-fade', (1 - progress).toString());
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef}>
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
