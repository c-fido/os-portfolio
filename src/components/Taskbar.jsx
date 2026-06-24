import { useState, useEffect } from 'react';
import { PortfolioLogo, AppIcon } from './Win95Icons';

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      style={{
        padding: '2px 8px',
        fontSize: 'var(--text-xs)',
        fontFamily: 'var(--font-sys)',
        color: '#000',
        boxShadow: 'inset 1px 1px 0 #808080, inset -1px -1px 0 #fff',
        whiteSpace: 'nowrap',
        lineHeight: '20px',
        minWidth: '60px',
        textAlign: 'center',
      }}
    >
      {timeStr}
    </div>
  );
}

function StartButton() {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        height: '22px',
        padding: pressed ? '4px 10px 2px 12px' : '3px 11px 3px 11px',
        background: '#c0c0c0',
        border: 'none',
        cursor: 'default',
        fontFamily: 'var(--font-pixel)',
        fontSize: '9px',
        fontWeight: 'bold',
        color: '#000000',
        flexShrink: 0,
        boxShadow: pressed
          ? 'inset 1px 1px 0 #000000, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #808080, inset -2px -2px 0 #dfdfdf'
          : 'inset -1px -1px 0 #000000, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf',
      }}
    >
      <PortfolioLogo size={14} />
      <span>Start</span>
    </button>
  );
}

function TaskbarButton({ win, isActive, onFocus, onMinimize }) {
  const [pressed, setPressed] = useState(false);
  const showPressed = isActive || pressed;

  const handleClick = () => {
    if (isActive) {
      onMinimize(win.id);
    } else {
      onFocus(win.id);
    }
  };

  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={handleClick}
      title={win.title}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        height: '22px',
        padding: showPressed ? '4px 7px 2px 9px' : '3px 8px',
        background: '#c0c0c0',
        border: 'none',
        cursor: 'default',
        fontFamily: 'var(--font-pixel)',
        fontSize: '9px',
        color: '#000000',
        maxWidth: '160px',
        minWidth: '100px',
        flexShrink: 0,
        overflow: 'hidden',
        boxShadow: showPressed
          ? 'inset 1px 1px 0 #000000, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #808080, inset -2px -2px 0 #dfdfdf'
          : 'inset -1px -1px 0 #000000, inset 1px 1px 0 #ffffff, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf',
      }}
    >
      <span style={{ width: '12px', height: '12px', flexShrink: 0, imageRendering: 'pixelated' }}>
          <AppIcon id={win.id} size={12} />
        </span>
      <span style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        flex: 1,
        textAlign: 'left',
      }}>
        {win.title}
      </span>
    </button>
  );
}

export default function Taskbar({ windows, configs, openWindow, focusWindow, minimizeWindow, maxZ }) {
  const openWins = Object.values(windows).filter(Boolean);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '28px',
        background: '#c0c0c0',
        borderTop: '1px solid #ffffff',
        borderBottom: '1px solid #808080',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '3px 4px',
        boxShadow: 'inset 0 1px 0 #ffffff',
        fontFamily: '"Press Start 2P", "MS Sans Serif", monospace',
      }}
    >
      {/* Start button */}
      <StartButton />

      {/* Separator */}
      <div style={{
        width: '2px',
        height: '20px',
        borderLeft: '1px solid #808080',
        borderRight: '1px solid #ffffff',
        flexShrink: 0,
        marginRight: '2px',
      }} />

      {/* Open window buttons */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px', overflow: 'hidden' }}>
        {openWins.map(win => (
          <TaskbarButton
            key={win.id}
            win={win}
            isActive={win.zIndex === maxZ && !win.minimized}
            onFocus={focusWindow}
            onMinimize={minimizeWindow}
          />
        ))}
      </div>

      {/* System tray area */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        flexShrink: 0,
        marginLeft: '4px',
      }}>
        <div style={{
          borderLeft: '1px solid #808080',
          borderTop: '1px solid #808080',
          padding: '2px 6px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: 'inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff',
          height: '22px',
        }}>
          <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px', color: '#000' }}>Vol</span>
          <Clock />
        </div>
      </div>
    </div>
  );
}
