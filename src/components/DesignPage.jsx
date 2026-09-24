import { site } from '../data/site.js';

// 平面设计作品集
export default function DesignPage() {
  const { design } = site;

  return (
    <section className="section works-section" id="design">
      <div className="container">
        <div className="section-label">{design.label}</div>
        <h2 className="section-heading">{design.heading}<span className="accent">{design.headingAccent}</span></h2>

        <div className="masonry-grid">
          {design.items.map((w, i) => (
            <div className="masonry-item" key={w.id}>
              <div className="gallery-card">
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
    </section>
  );
}
