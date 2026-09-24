import { useEffect, useRef, useState } from 'react';
import { site } from '../data/site.js';

// 单个作品卡片的动态预览画布
function GalleryCanvas({ draw }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let raf, w, h;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function frame(time) {
      resize();
      ctx.clearRect(0, 0, w, h);
      draw(ctx, w, h, reduceMotion ? 0 : time);
      if (!reduceMotion) raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [draw]);

  return <canvas ref={ref} />;
}

// 画一朵抽象的花（彩窗风格）
function drawFlowers(X, w, h, time) {
  const t = time * 0.001;
  X.fillStyle = '#0e0e18';
  X.fillRect(0, 0, w, h);

  for (let k = 0; k < 5; k++) {
    const fx = w * (0.15 + k * 0.18);
    const fy = h * (0.6 + Math.sin(k * 2.1) * 0.15);
    const r = Math.min(w, h) * (0.07 + (k % 2) * 0.02);

    X.save();
    X.translate(fx, fy);
    X.rotate(t * (0.2 + k * 0.05));
    const petals = 6;
    for (let i = 0; i < petals; i++) {
      const a = (Math.PI * 2 / petals) * i;
      X.beginPath();
      X.ellipse(
        Math.cos(a) * r * 0.5, Math.sin(a) * r * 0.5,
        r * 0.55, r * 0.28, a, 0, Math.PI * 2
      );
      X.fillStyle = i % 2 === 0
        ? 'rgba(46, 170, 220, 0.22)'
        : 'rgba(139, 122, 184, 0.25)';
      X.fill();
    }
    X.restore();

    X.beginPath();
    X.arc(fx, fy, r * 0.22, 0, Math.PI * 2);
    X.fillStyle = 'rgba(201, 168, 106, 0.5)';
    X.fill();

    X.beginPath();
    X.moveTo(fx, fy + r * 0.3);
    X.quadraticCurveTo(fx + Math.sin(t + k) * 8, fy + h * 0.3, fx, h);
    X.strokeStyle = 'rgba(139, 122, 184, 0.28)';
    X.lineWidth = 1.2;
    X.stroke();
  }
}

// 哥特拱门阵列（已移除，保留注释占位）
// 玫瑰花窗微缩版（已移除，保留注释占位）

// 每个作品的画布绘制函数（"怎么显示"的代码，文案在 site.js 里）
const drawById = {
  1: drawFlowers,
};

// 作品展示 + 联系方式 + 页脚
export default function WorksPage() {
  const { works, contact, footer } = site;
  const [remoteWorks, setRemoteWorks] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/works')
      .then((res) => res.json())
      .then((data) => setRemoteWorks(data))
      .catch(() => {});
  }, []);

  // 后端有数据就用后端的，没有就用 site.js 里的
  const items = remoteWorks || works.items;

  return (
    <>
      <section className="section works-section" id="works">
        <div className="container">
          <div className="section-label">{works.label}</div>
          <h2 className="section-heading">{works.heading}<span className="accent">{works.headingAccent}</span></h2>

          <div className="masonry-grid">
            {items.map((w, i) => (
              <div className="masonry-item" key={w.id}>
                <div className="gallery-card">
                  <div className="gallery-media">
                    {w.image ? (
                      <img className="gallery-image" src={w.image} alt={w.title} />
                    ) : (
                      <GalleryCanvas draw={drawById[w.id]} />
                    )}
                    <div className="gallery-overlay">
                      <span className="gallery-view">查看作品 →</span>
                    </div>
                  </div>
                  <div className="gallery-info">
                    <div className="gallery-num">0{i + 1} / AI Animation</div>
                    <h3 className="gallery-name">{w.title}</h3>
                    <p className="gallery-desc">{w.desc}</p>
                    <div className="gallery-tags">
                      {w.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="container">
          <div className="section-label">{contact.label}</div>
          <h2 className="section-heading" style={{ marginBottom: '24px' }}>{contact.heading}</h2>
          <div className="contact-links">
            {contact.links.map((link) => (
              <a
                href={link.href}
                key={link.label}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener' : undefined}
                className="contact-link"
              >
                <span className="clabel">{link.label}</span><span className="cvalue">{link.value}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>{footer}</span>
        <span>Built with precision</span>
      </footer>
    </>
  );
}
