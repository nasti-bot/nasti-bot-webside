import { useState, useCallback, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen.jsx';
import MenuOverlay from './components/MenuOverlay.jsx';
import HomePage from './components/HomePage.jsx';
import DesignPage from './components/DesignPage.jsx';
import WorksPage from './components/WorksPage.jsx';

// 全局背景图轮播：两张图交叉淡入淡出，每 6 秒切换
function GlobalBackground() {
  const images = ['作品/荆棘冠.png', '作品/蜕凡思.png'];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="global-bg" aria-hidden="true">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={'bg-slide' + (i === current ? ' active' : '')}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoadingDone = useCallback(() => setLoading(false), []);

  const handleNavigate = useCallback((id) => {
    setMenuOpen(false);
    // 等菜单关闭动画开始后再滚动到目标区块
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, []);

  return (
    <div className="app">
      {/* 全局背景图（轮播） */}
      <GlobalBackground />

      {loading && <LoadingScreen onDone={handleLoadingDone} />}

      <MenuOverlay
        open={menuOpen}
        onToggle={() => setMenuOpen((v) => !v)}
        onNavigate={handleNavigate}
      />

      <HomePage />
      <DesignPage />
      <WorksPage />
    </div>
  );
}
