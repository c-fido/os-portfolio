import { useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppIcon } from './Win95Icons';

const TITLEBAR_HEIGHT = 18;
const MIN_WIDTH = 320;
const MIN_HEIGHT = 200;

const WIN95_RAISED = {
  boxShadow: 'inset -1px -1px 0 #000000, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf',
};
const WIN95_PRESSED = {
  boxShadow: 'inset 1px 1px 0 #000000, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #808080, inset -2px -2px 0 #dfdfdf',
};

// Pixel-art glyphs for the three chrome buttons
const G = { imageRendering: 'pixelated', display: 'block' };
function MinimizeGlyph() {
  return (
    <svg width="7" height="7" viewBox="0 0 7 7" style={G}>
      <rect x="0" y="5" width="7" height="2" fill="#000000" />
    </svg>
  );
}
function MaximizeGlyph() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" style={G}>
      <rect x="0" y="0" width="9" height="2" fill="#000000" />
      <rect x="0" y="0" width="1" height="9" fill="#000000" />
      <rect x="8" y="0" width="1" height="9" fill="#000000" />
      <rect x="0" y="8" width="9" height="1" fill="#000000" />
    </svg>
  );
}
function CloseGlyph() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" style={G}>
      <rect x="0" y="0" width="2" height="2" fill="#000000" />
      <rect x="7" y="0" width="2" height="2" fill="#000000" />
      <rect x="1" y="1" width="2" height="2" fill="#000000" />
      <rect x="6" y="1" width="2" height="2" fill="#000000" />
      <rect x="2" y="2" width="2" height="2" fill="#000000" />
      <rect x="5" y="2" width="2" height="2" fill="#000000" />
      <rect x="3" y="3" width="3" height="3" fill="#000000" />
      <rect x="2" y="5" width="2" height="2" fill="#000000" />
      <rect x="5" y="5" width="2" height="2" fill="#000000" />
      <rect x="1" y="6" width="2" height="2" fill="#000000" />
      <rect x="6" y="6" width="2" height="2" fill="#000000" />
      <rect x="0" y="7" width="2" height="2" fill="#000000" />
      <rect x="7" y="7" width="2" height="2" fill="#000000" />
    </svg>
  );
}

function ChromeButton({ label, onClick, title }) {
  const ref = useRef(null);

  const handleMouseDown = (e) => {
    e.stopPropagation();
    const btn = ref.current;
    if (!btn) return;
    Object.assign(btn.style, WIN95_PRESSED);
    const up = () => {
      Object.assign(btn.style, WIN95_RAISED);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mouseup', up);
  };

  return (
    <button
      ref={ref}
      title={title}
      onMouseDown={handleMouseDown}
      onClick={(e) => { e.stopPropagation(); onClick?.(); }}
      style={{
        width: '16px',
        height: '14px',
        background: '#c0c0c0',
        border: 'none',
        padding: 0,
        cursor: 'default',
        fontSize: '9px',
        fontFamily: '"Press Start 2P", monospace',
        fontWeight: 'bold',
        lineHeight: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        ...WIN95_RAISED,
      }}
    >
      {label}
    </button>
  );
}

export default function Window({
  id, title, icon, x, y, width, height, zIndex, minimized, isActive,
  onClose, onMinimize, onFocus, onMove, onResize,
  children,
}) {
  const dragState = useRef(null);
  const resizeState = useRef(null);

  // ── Drag ────────────────────────────────────────────────────────────
  const handleTitleBarMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    if (e.target.closest('.win95-chrome-btn')) return;
    e.preventDefault();
    onFocus(id);
    dragState.current = { startX: e.clientX - x, startY: e.clientY - y };

    const onMouseMove = (me) => {
      if (!dragState.current) return;
      onMove(id, me.clientX - dragState.current.startX, me.clientY - dragState.current.startY);
    };
    const onMouseUp = () => {
      dragState.current = null;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, [id, x, y, onFocus, onMove]);

  const handleTitleBarTouchStart = useCallback((e) => {
    if (e.target.closest('.win95-chrome-btn')) return;
    onFocus(id);
    const touch = e.touches[0];
    dragState.current = { startX: touch.clientX - x, startY: touch.clientY - y };

    const onTouchMove = (te) => {
      if (!dragState.current) return;
      const t = te.touches[0];
      onMove(id, t.clientX - dragState.current.startX, t.clientY - dragState.current.startY);
    };
    const onTouchEnd = () => {
      dragState.current = null;
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
  }, [id, x, y, onFocus, onMove]);

  // ── Resize ──────────────────────────────────────────────────────────
  const handleResizeMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    resizeState.current = { startX: e.clientX, startY: e.clientY, startW: width, startH: height };

    const onResizeMove = (me) => {
      if (!resizeState.current) return;
      const dw = me.clientX - resizeState.current.startX;
      const dh = me.clientY - resizeState.current.startY;
      onResize(id,
        Math.max(MIN_WIDTH, resizeState.current.startW + dw),
        Math.max(MIN_HEIGHT, resizeState.current.startH + dh),
      );
    };
    const onResizeUp = () => {
      resizeState.current = null;
      window.removeEventListener('mousemove', onResizeMove);
      window.removeEventListener('mouseup', onResizeUp);
    };
    window.addEventListener('mousemove', onResizeMove);
    window.addEventListener('mouseup', onResizeUp);
  }, [id, width, height, onResize]);

  if (minimized) return null;

  const titleBarBg = isActive
    ? 'linear-gradient(to right, #000080, #1084d0)'
    : '#808080';

  return (
    <AnimatePresence>
      <motion.div
        key={id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0 }}
        style={{
          position: 'fixed',
          left: x,
          top: y,
          width,
          height,
          zIndex,
          minWidth: MIN_WIDTH,
          minHeight: MIN_HEIGHT,
          background: '#c0c0c0',
          display: 'flex',
          flexDirection: 'column',
          // Win95 outer window border
          boxShadow: 'inset -1px -1px 0 #000000, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf',
          border: '1px solid #000000',
          fontFamily: '"Press Start 2P", "MS Sans Serif", monospace',
          fontSize: '8px',
        }}
        onMouseDown={() => onFocus(id)}
        onContextMenu={e => e.stopPropagation()}
      >
        {/* ── Title Bar ── */}
        <div
          className="window-titlebar"
          style={{
            height: TITLEBAR_HEIGHT,
            minHeight: TITLEBAR_HEIGHT,
            background: titleBarBg,
            padding: '2px 2px 2px 4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'default',
            flexShrink: 0,
          }}
          onMouseDown={handleTitleBarMouseDown}
          onTouchStart={handleTitleBarTouchStart}
        >
          {/* App icon */}
          <span style={{ width: '14px', height: '14px', flexShrink: 0, imageRendering: 'pixelated' }}>
            <AppIcon id={id} size={14} />
          </span>

          {/* Title text */}
          <span style={{
            flex: 1,
            color: '#ffffff',
            fontFamily: '"Press Start 2P", "MS Sans Serif", monospace',
            fontSize: '8px',
            fontWeight: 'bold',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            lineHeight: 1,
            WebkitFontSmoothing: 'none',
          }}>
            {title}
          </span>

          {/* Chrome buttons */}
          <div className="win95-chrome-btn" style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
            <ChromeButton label={<MinimizeGlyph />} title="Minimize" onClick={() => onMinimize(id)} />
            <ChromeButton label={<MaximizeGlyph />} title="Maximize" onClick={() => {}} />
            <ChromeButton label={<CloseGlyph />}    title="Close"    onClick={() => onClose(id)} />
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {children}
        </div>

        {/* ── Resize handle (invisible, cursor only) ── */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '8px',
            height: '8px',
            cursor: 'se-resize',
            zIndex: 10,
          }}
          onMouseDown={handleResizeMouseDown}
        />
      </motion.div>
    </AnimatePresence>
  );
}
