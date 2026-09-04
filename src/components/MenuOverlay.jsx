import { site } from '../data/site.js';

// 右上角菜单按钮 + 全屏覆盖的导航
export default function MenuOverlay({ open, onToggle, onNavigate }) {
  return (
    <>
      {/* 右上角菜单按钮 */}
      <button
        className={'menu-btn' + (open ? ' open' : '')}
        onClick={onToggle}
        aria-label={open ? '关闭菜单' : '打开菜单'}
        aria-expanded={open}
      >
        <span className="menu-icon">
          <span className="bar bar1" />
          <span className="bar bar2" />
          <span className="bar bar3" />
        </span>
      </button>

      {/* 全屏覆盖菜单 */}
      <div className={'menu-overlay' + (open ? ' open' : '')} aria-hidden={!open}>
        <nav className="menu-nav">
          {site.menu.map((item, i) => (
            <button
              key={item.id}
              className="menu-link"
              onClick={() => onNavigate(item.id)}
              style={{ transitionDelay: open ? `${0.1 + i * 0.08}s` : '0s' }}
            >
              <span className="menu-index">0{i + 1}</span>
              <span className="menu-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
