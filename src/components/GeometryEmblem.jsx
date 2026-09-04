import { useEffect, useRef } from 'react';

// 中间几何体：旋转嵌套菱形 + 六边形外框 + 虚线轨道（恢复原来的几何徽章）
export default function GeometryEmblem() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    let w, h;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(time) {
      resize();
      ctx.clearRect(0, 0, w, h);
      const t = reduceMotion ? 0 : time * 0.001;
      const cx = w * 0.5, cy = h * 0.5;
      const r = Math.min(w, h) * 0.42;

      // 旋转的大菱形
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.45);
      const dR = r * 0.55;
      ctx.beginPath();
      ctx.moveTo(0, -dR);
      ctx.lineTo(dR * 0.65, 0);
      ctx.lineTo(0, dR);
      ctx.lineTo(-dR * 0.65, 0);
      ctx.closePath();
      ctx.fillStyle = 'rgba(46, 170, 220, 0.06)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(46, 170, 220, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 反向旋转的小菱形
      ctx.save();
      ctx.rotate(t * -0.65);
      const idR = r * 0.25;
      ctx.beginPath();
      ctx.moveTo(0, -idR);
      ctx.lineTo(idR, 0);
      ctx.lineTo(0, idR);
      ctx.lineTo(-idR, 0);
      ctx.closePath();
      ctx.fillStyle = 'rgba(160, 232, 255, 0.12)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(46, 170, 220, 0.5)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();
      ctx.restore();

      // 六边形外框
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = Math.PI / 3 * i - Math.PI / 6;
        const px = cx + Math.cos(a) * r * 0.85;
        const py = cy + Math.sin(a) * r * 0.85;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(160, 152, 184, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 外圈
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.88, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(160, 152, 184, 0.2)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // 虚线轨道
      for (let i = 0; i < 40; i++) {
        const sa = Math.PI * 2 / 40 * i + t * 0.08;
        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.88, sa, sa + Math.PI * 2 / 40 * 0.35);
        ctx.strokeStyle = 'rgba(46, 170, 220, 0.18)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // 两个环绕的点
      for (let i = 0; i < 2; i++) {
        const ang = t * (0.5 + i * 0.3) + i * Math.PI;
        const dx = cx + Math.cos(ang) * r * 0.88;
        const dy = cy + Math.sin(ang) * r * 0.88;
        ctx.beginPath();
        ctx.arc(dx, dy, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(46, 170, 220, 0.6)';
        ctx.fill();
      }

      // 中心点
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(46, 170, 220, 0.8)';
      ctx.fill();

      if (!reduceMotion) raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="hero-graphic">
      <canvas ref={canvasRef} />
    </div>
  );
}
