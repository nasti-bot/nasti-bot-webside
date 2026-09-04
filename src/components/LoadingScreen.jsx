import { useEffect, useState } from 'react';
import { site } from '../data/site.js';

const MIN_DURATION = 800; // 最短展示 0.8 秒，保证加载动画能被看到
const FADE_MS = 500;      // 淡出动画时长，需与 CSS 一致

// 进入时的加载画面：
// - 进度条快速冲到约 90%，然后慢下来等待真实加载完成
// - 监听 window.load，真正加载完 → 跳到 100% → 淡出
// - 若加载太快（< 0.8s），强制等满 0.8s 再淡出
export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    let loaded = false;
    let raf;

    // 进度推进：指数逼近 90%，永远到不了 100%（100% 留给真实完成信号）
    function tick(now) {
      const elapsed = now - startTime;
      const p = 90 * (1 - Math.exp(-elapsed / 450));
      setProgress(p);
      if (!loaded) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    // 网页真实加载完成
    function finish() {
      loaded = true;
      cancelAnimationFrame(raf);
      setProgress(100);

      const elapsed = performance.now() - startTime;
      // 等待时间：至少展示 MIN_DURATION，慢加载则只停 150ms 看 100% 那一下
      const wait = Math.max(MIN_DURATION - elapsed, 150);

      setTimeout(() => setFading(true), wait);
      setTimeout(onDone, wait + FADE_MS);
    }

    // 若页面已加载完（如缓存命中），立即进入 finish 流程
    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', finish);
    };
  }, [onDone]);

  return (
    <div className={'loading-screen' + (fading ? ' fading' : '')}>
      <div className="loading-inner">
        <div className="loading-brand">{site.loading.brand}</div>
        <div className="loading-bar">
          <span style={{ width: progress + '%' }} />
        </div>
        <div className="loading-text">{Math.round(progress)}%</div>
      </div>
    </div>
  );
}
