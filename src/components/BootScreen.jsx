import { useEffect, useState } from 'react';
import { WindowsFlag } from './Win95Icons';

const STAGES = [
  { label: 'Starting Windows 95...', pct: 20,  delay: 400 },
  { label: 'Loading system drivers...', pct: 40, delay: 500 },
  { label: 'Initializing hardware...', pct: 60, delay: 400 },
  { label: 'Starting window manager...', pct: 80, delay: 500 },
  { label: 'Portfolio OS ready.', pct: 100, delay: 300 },
];

const BOOT_TIPS = [
  'Tip: Double-click desktop icons to open apps',
  'Tip: Try the Terminal — type "help"',
  'Tip: Can you beat the Connect 4 bot?',
  'Tip: Right-click the desktop for shortcuts',
  'Tip: Play Snake and set a high score!',
];

export default function BootScreen({ onComplete }) {
  const [stage, setStage] = useState(0);
  const [done, setDone] = useState(false);
  const [tip] = useState(() => BOOT_TIPS[Math.floor(Math.random() * BOOT_TIPS.length)]);

  useEffect(() => {
    let timeout;
    function advance(i) {
      if (i >= STAGES.length) {
        timeout = setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 400);
        }, 600);
        return;
      }
      timeout = setTimeout(() => {
        setStage(i);
        advance(i + 1);
      }, STAGES[i].delay);
    }
    advance(0);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  const current = STAGES[Math.min(stage, STAGES.length - 1)];

  if (done) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999, background: '#000',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-pixel)', fontSize: '9px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <WindowsFlag size={72} />
        </div>
        <div style={{ color: '#c8c8c8', letterSpacing: '3px', marginBottom: '4px' }}>Microsoft</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold', letterSpacing: '2px' }}>Windows</span>
          <span style={{ color: '#fff', fontSize: '16px', fontStyle: 'italic', opacity: 0.9 }}>95</span>
        </div>
        <p style={{ color: '#606060', marginTop: '10px', letterSpacing: '1px' }}>Portfolio Edition</p>
      </div>

      <div style={{ width: '260px' }}>
        <div style={{
          height: '18px', background: '#000', border: '1px solid #808080',
          overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '2px 3px', gap: '2px',
        }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              style={{
                width: '10px', height: '12px', flexShrink: 0,
                background: (i / 20) * 100 < current.pct ? '#000080' : '#000',
              }}
            />
          ))}
        </div>
        <p style={{ color: '#808080', textAlign: 'center', marginTop: '10px', fontFamily: 'var(--font-sys)', fontSize: '12px' }}>
          {current.label}
        </p>
      </div>

      <p style={{
        position: 'absolute', bottom: '48px', color: '#505050',
        fontFamily: 'var(--font-sys)', fontSize: '12px', textAlign: 'center',
      }}>
        {tip}
      </p>

      <div style={{
        position: 'absolute', bottom: '16px', color: '#404040',
        fontFamily: 'var(--font-sys)', fontSize: '11px', textAlign: 'center', lineHeight: 1.6,
      }}>
        <p style={{ margin: 0 }}>Microsoft Windows 95</p>
        <p style={{ margin: 0 }}>Copyright © 1981-1995 Microsoft Corp.</p>
      </div>
    </div>
  );
}
