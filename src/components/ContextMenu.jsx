import { useEffect, useRef } from 'react';

export default function ContextMenu({ x, y, items, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const menuWidth = 180;
  const itemHeight = 20;
  const sepHeight = 8;
  const menuHeight = items.reduce((h, item) => h + (item.separator ? sepHeight : itemHeight), 0) + 8;
  const clampedX = Math.min(x, window.innerWidth - menuWidth - 8);
  const clampedY = Math.min(y, window.innerHeight - menuHeight - 8);

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        left: clampedX,
        top: clampedY,
        width: menuWidth,
        zIndex: 9998,
        background: '#c0c0c0',
        border: '1px solid #000000',
        boxShadow: '2px 2px 0 #000000',
        padding: '2px',
        fontFamily: '"Press Start 2P", "MS Sans Serif", monospace',
        fontSize: '7px',
      }}
    >
      {items.map((item, i) =>
        item.separator ? (
          <div
            key={i}
            style={{
              height: 0,
              borderTop: '1px solid #808080',
              borderBottom: '1px solid #ffffff',
              margin: '3px 4px',
            }}
          />
        ) : (
          <button
            key={i}
            onClick={() => { item.action(); onClose(); }}
            disabled={item.disabled}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              width: '100%',
              padding: '4px 8px',
              background: 'none',
              border: 'none',
              cursor: 'default',
              textAlign: 'left',
              fontFamily: '"Press Start 2P", "MS Sans Serif", monospace',
              fontSize: '7px',
              color: item.disabled ? '#808080' : '#000000',
            }}
            onMouseEnter={e => {
              if (!item.disabled) {
                e.currentTarget.style.background = '#000080';
                e.currentTarget.style.color = '#ffffff';
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'none';
              e.currentTarget.style.color = item.disabled ? '#808080' : '#000000';
            }}
          >
            {item.icon && <span style={{ fontSize: '12px', width: '16px', textAlign: 'center' }}>{item.icon}</span>}
            <span>{item.label}</span>
            {item.shortcut && (
              <span style={{ marginLeft: 'auto', color: 'inherit', opacity: 0.7 }}>{item.shortcut}</span>
            )}
          </button>
        )
      )}
    </div>
  );
}
