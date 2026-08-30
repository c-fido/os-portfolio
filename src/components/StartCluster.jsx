import { useEffect, useRef, useState } from 'react';
import { PortfolioLogo } from './Win95Icons';
import StartMenu from './StartMenu';

export default function StartCluster({ onOpen, compact = false }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const pressed = open;

  return (
    <div ref={wrapRef} style={{ position: 'relative', flexShrink: 0 }}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          height: compact ? 'auto' : '22px',
          padding: compact
            ? (pressed ? '8px 6px 6px' : '7px 6px')
            : (pressed ? '4px 10px 2px 12px' : '3px 11px 3px 11px'),
          background: compact ? (pressed ? '#c0c0c0' : '#a0a0a0') : 'var(--color-surface)',
          border: 'none',
          cursor: 'default',
          fontFamily: 'var(--font-sys)',
          fontSize: compact ? 'var(--text-xs)' : '11px',
          fontWeight: 'bold',
          color: 'var(--color-text)',
          flexShrink: 0,
          flexDirection: compact ? 'column' : 'row',
          minWidth: compact ? '48px' : undefined,
          boxShadow: pressed
            ? 'inset 1px 1px 0 #000000, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #808080, inset -2px -2px 0 #dfdfdf'
            : 'inset -1px -1px 0 #000000, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf',
        }}
      >
        <PortfolioLogo size={compact ? 20 : 14} />
        <span>Start</span>
      </button>
      {open && (
        <StartMenu
          onOpen={onOpen}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
