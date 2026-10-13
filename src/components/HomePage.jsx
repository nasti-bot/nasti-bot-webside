import { useEffect, useRef } from 'react';
import { site } from '../data/site.js';

// 开幕画面：
// - 背景图 + 欢迎图片（替代文字）
// - 滚动时白色覆盖层渐显，遮住背景图，过渡到下一版块
export default function HomePage() {
  const { hero } = site;
  const heroRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // 白色覆盖进度：滚过 0~0.25 个视口高度之间渐显到全白（快）
      const cover = Math.min(scrollY / (vh * 0.25), 1);
      heroRef.current?.style.setProperty('--hero-cover', cover.toString());

      // SCROLL 提示：滚动一丁点就快速消失
      const hintOpacity = Math.max(0, 1 - scrollY / (vh * 0.25));
      hintRef.current?.style.setProperty('--hint-opacity', hintOpacity.toString());
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef}>
      <h1 className="sr-only">{site.brandTagline}</h1>
      {/* 白色覆盖层：随滚动渐显 */}
      <div className="hero-white" aria-hidden="true" />
      <div className="hero-center">
        <img className="hero-true-welcome-img" src="作品/welcome.png" alt="欢迎" />
      </div>
      <div className="hero-scroll-hint" ref={hintRef}>
        <span>SCROLL</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
