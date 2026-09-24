import { useState, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen.jsx';
import MenuOverlay from './components/MenuOverlay.jsx';
import HomePage from './components/HomePage.jsx';
import DesignPage from './components/DesignPage.jsx';
import WorksPage from './components/WorksPage.jsx';

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
      {/* 全局背景图 */}
      <div className="global-bg" aria-hidden="true">
        <img src="作品/荆棘冠.png" alt="" />
      </div>

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
