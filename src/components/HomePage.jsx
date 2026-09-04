import { useEffect, useRef } from 'react';
import GeometryEmblem from './GeometryEmblem.jsx';
import { site } from '../data/site.js';

// 开幕画面背景：蓝图坐标网格 + 同心圆 + 辐射线 + 斐波那契螺旋
function HeroBackdrop() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let raf, w, h;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(time) {
      ctx.clearRect(0, 0, w, h);
      const t = reduceMotion ? 0 : time * 0.001;
      const cx = w * 0.5, cy = h * 0.45;
      const mr = Math.min(w * 0.38, h * 0.38);

      ctx.strokeStyle = 'rgba(180, 172, 200, 0.12)';
      ctx.lineWidth = 0.3;
      for (let x = cx - mr * 1.6; x < cx + mr * 1.6; x += 48) {
        ctx.beginPath(); ctx.moveTo(x, cy - mr * 1.6); ctx.lineTo(x, cy + mr * 1.6); ctx.stroke();
      }
      for (let y = cy - mr * 1.6; y < cy + mr * 1.6; y += 48) {
        ctx.beginPath(); ctx.moveTo(cx - mr * 1.6, y); ctx.lineTo(cx + mr * 1.6, y); ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(46, 170, 220, 0.12)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(cx - mr * 1.5, cy); ctx.lineTo(cx + mr * 1.5, cy);
      ctx.moveTo(cx, cy - mr * 1.5); ctx.lineTo(cx, cy + mr * 1.5);
      ctx.stroke();

      for (let i = 0; i < 18; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, mr * (0.06 + i * 0.055), 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(46, 170, 220,' + (0.01 + (1 - i / 18) * 0.06) + ')';
        ctx.lineWidth = i % 3 === 0 ? 0.5 : 0.25;
        ctx.stroke();
      }

      for (let i = 0; i < 32; i++) {
        const a = Math.PI * 2 / 32 * i;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * mr * 0.08, cy + Math.sin(a) * mr * 0.08);
        ctx.lineTo(cx + Math.cos(a) * mr * 1.2, cy + Math.sin(a) * mr * 1.2);
        ctx.strokeStyle = 'rgba(46, 170, 220,' + (i % 8 === 0 ? 0.08 : 0.03) + ')';
        ctx.lineWidth = i % 8 === 0 ? 0.5 : 0.2;
        ctx.stroke();
      }

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.025);
      let fx = 0, fy = 0, fp = 0, fc = 1;
      const fs = mr * 0.011;
      const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
      for (let i = 0; i < 40; i++) {
        const nxt = fp + fc; fp = fc; fc = nxt;
        const len = fc * fs;
        const ddx = dirs[i % 4][0], ddy = dirs[i % 4][1];
        const ndx = fx + ddx * len, ndy = fy + ddy * len;
        const aR = len;
        let cax, cay, sa, ea;
        if (i % 4 === 0) { cax = fx; cay = fy - aR; sa = -Math.PI / 2; ea = 0; }
        else if (i % 4 === 1) { cax = fx + aR; cay = fy; sa = Math.PI; ea = Math.PI * 1.5; }
        else if (i % 4 === 2) { cax = fx; cay = fy + aR; sa = Math.PI / 2; ea = Math.PI; }
        else { cax = fx - aR; cay = fy; sa = 0; ea = Math.PI / 2; }
        ctx.beginPath();
        ctx.arc(cax, cay, aR, sa, ea);
        ctx.strokeStyle = 'rgba(46, 170, 220, 0.2)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
        fx = ndx; fy = ndy;
        if (Math.abs(fx) > mr * 0.75 || Math.abs(fy) > mr * 0.75) break;
      }
      ctx.restore();

      for (let k = 0; k < 3; k++) {
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
          const a = Math.PI * 2 / 3 * i + t * (0.5 + k * 0.25);
          const px = cx + Math.cos(a) * mr * (0.2 + k * 0.12);
          const py = cy + Math.sin(a) * mr * (0.2 + k * 0.12);
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(46, 170, 220,' + (0.02 + k * 0.015) + ')';
        ctx.fill();
        ctx.strokeStyle = 'rgba(46, 170, 220,' + (0.15 + k * 0.12) + ')';
        ctx.lineWidth = 0.5 + k * 0.15;
        ctx.stroke();
      }

      for (let i = 0; i < 6; i++) {
        const oR = mr * (0.45 + i * 0.08);
        const ang = t * (0.35 - i * 0.04) + i * 1;
        const dx = cx + Math.cos(ang) * oR, dy = cy + Math.sin(ang) * oR * 0.45;
        ctx.beginPath();
        ctx.arc(dx, dy, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(46, 170, 220, 0.5)';
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(46, 170, 220, 0.7)';
      ctx.fill();

      if (!reduceMotion) raf = requestAnimationFrame(draw);
    }

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <div className="hero-canvas"><canvas ref={ref} /></div>;
}

// 开幕画面
export default function HomePage() {
  const { hero } = site;

  return (
    <section className="hero" id="home">
      <h1 className="sr-only">{site.brandTagline}</h1>
      <HeroBackdrop />
      <div className="hero-center">
        <GeometryEmblem />
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
