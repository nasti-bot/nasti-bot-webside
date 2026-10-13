import { useState, useCallback } from 'react';
import { site } from '../data/site.js';
import Lightbox from './Lightbox.jsx';

// 平面设计作品集：点击卡片打开全图预览（放大/缩小/全屏/左右切换）
export default function DesignPage() {
  const { design } = site;
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = useCallback((i) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const navigate = useCallback((i) => {
    // 循环或边界处理：超出范围就关闭
    if (i < 0 || i >= design.items.length) return;
    setLightboxIndex(i);
  }, [design.items.length]);

  return (
    <section className="section works-section" id="design">
      <div className="container">
        <div className="section-label">{design.label}</div>
        <h2 className="section-heading">{design.heading}<span className="accent">{design.headingAccent}</span></h2>

        <div className="masonry-grid">
          {design.items.map((w, i) => (
            <div className="masonry-item" key={w.id}>
              <div className="gallery-card" onClick={() => openLightbox(i)}>
                <div className="gallery-media">
                  {w.image ? (
                    <img className="gallery-image" src={w.image} alt={w.title} />
                  ) : (
                    <div className="gallery-placeholder" />
                  )}
                  <div className="gallery-overlay">
                    <span className="gallery-view">查看作品 →</span>
                  </div>
                </div>
                <div className="gallery-info">
                  <div className="gallery-num">0{i + 1} / Graphic Design</div>
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

      {lightboxIndex !== null && (
        <Lightbox
          items={design.items}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigate}
        />
      )}
    </section>
  );
}
