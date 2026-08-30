import { AppIcon } from './Win95Icons';
import { START_MENU_ITEMS } from '../lib/apps';

export default function StartMenu({ onOpen, onClose }) {
  return (
    <div
      role="menu"
      aria-label="Start"
      className="win95-menu"
      style={{
        position: 'absolute',
        left: 0,
        bottom: '100%',
        marginBottom: '2px',
        width: '220px',
        zIndex: 9600,
        padding: '2px',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '22px',
          flexShrink: 0,
          background: 'var(--color-title-active)',
          color: 'var(--color-title-text)',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          fontFamily: 'var(--font-sys)',
          fontSize: '11px',
          letterSpacing: '1px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px 0',
        }}
      >
        Portfolio OS
      </div>
      <div style={{ flex: 1, padding: '2px 0' }}>
        {START_MENU_ITEMS.map((item, i) =>
          item.separator ? (
            <div key={`sep-${i}`} className="win95-menu-sep" />
          ) : (
            <button
              key={item.id}
              role="menuitem"
              type="button"
              onClick={() => {
                onOpen(item.id);
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                padding: '5px 8px',
                background: 'none',
                border: 'none',
                cursor: 'default',
                textAlign: 'left',
                fontFamily: 'var(--font-sys)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-highlight)';
                e.currentTarget.style.color = 'var(--color-highlight-text)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = 'var(--color-text)';
              }}
            >
              <span style={{ width: '16px', height: '16px', flexShrink: 0 }}>
                <AppIcon id={item.id} size={16} />
              </span>
              <span>{item.label}</span>
            </button>
          ),
        )}
      </div>
    </div>
  );
}
