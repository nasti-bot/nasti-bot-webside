import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

// 全屏图片预览灯箱：
// - 右上角按钮：缩小 / 放大 / 全屏 / 重置 / 关闭
// - 左右箭头切换上一张 / 下一张
// - 点击背景或按 Esc 关闭
// - 用 Portal 渲染到 body 顶层，避免被其他元素遮挡
// - 打开时锁定背景滚动
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const item = items[index];

  // Esc 关闭、方向键切换
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(index - 1);
      if (e.key === 'ArrowRight') onNavigate(index + 1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, onClose, onNavigate]);

  // 打开时：记住滚动位置 + 重置缩放 + 锁定背景滚动
  // 关闭时：恢复滚动位置
  useEffect(() => {
    setScale(1);
    const prevScrollY = window.scrollY;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
      // 恢复原来的滚动位置，防止跳回顶部
      window.scrollTo(0, prevScrollY);
    };
  }, [index]);

  // 监听全屏状态变化
  useEffect(() => {
    function onFsChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const zoomIn = useCallback(() => setScale((s) => Math.min(s + 0.25, 3)), []);
  const zoomOut = useCallback(() => setScale((s) => Math.max(s - 0.25, 0.5)), []);
  const resetZoom = useCallback(() => setScale(1), []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, []);

  if (!item) return null;

  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;

  return createPortal(
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label="作品全图预览">
      {/* 顶部工具栏 */}
      <div className="lightbox-top" onClick={(e) => e.stopPropagation()}>
        <span className="lightbox-count">
          {index + 1} / {items.length}
        </span>
        <span className="lightbox-title">{item.title}</span>
        <div className="lightbox-actions">
          <button className="lb-btn" onClick={zoomOut} title="缩小" aria-label="缩小">−</button>
          <button className="lb-btn" onClick={zoomIn} title="放大" aria-label="放大">＋</button>
          <button className="lb-btn" onClick={toggleFullscreen} title="全屏" aria-label="全屏">
            {isFullscreen ? '⤢' : '⛶'}
          </button>
          <button className="lb-btn lb-reset" onClick={resetZoom} title="重置缩放" aria-label="重置缩放">1:1</button>
          <button className="lb-btn lb-close" onClick={onClose} title="关闭" aria-label="关闭">✕</button>
        </div>
      </div>

      {/* 图片区 */}
      <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
        <img
          className="lightbox-img"
          src={item.full || item.image}
          alt={item.title}
          style={{ transform: `scale(${scale})` }}
          draggable={false}
        />
      </div>

      {/* 左右箭头 */}
      {hasPrev && (
        <button
          className="lightbox-arrow left"
          onClick={(e) => { e.stopPropagation(); onNavigate(index - 1); }}
          aria-label="上一张"
        >
          ‹
        </button>
      )}
      {hasNext && (
        <button
          className="lightbox-arrow right"
          onClick={(e) => { e.stopPropagation(); onNavigate(index + 1); }}
          aria-label="下一张"
        >
          ›
        </button>
      )}
    </div>,
    document.body
  );
}
