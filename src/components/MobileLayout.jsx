import { useState, useEffect } from 'react';
import Projects from './apps/Projects';
import About from './apps/About';
import Resume from './apps/Resume';
import Terminal from './apps/Terminal';
import Contact from './apps/Contact';
import Books from './apps/Books';
import Finder from './apps/Finder';
import Minesweeper from './apps/Minesweeper';
import Snake from './apps/Snake';
import ConnectFour from './apps/ConnectFour';
import { person } from '../data/portfolio';
import { AppIcon, PortfolioLogo } from './Win95Icons';
import StartCluster from './StartCluster';
import { getHashApp, setAppHash, MOBILE_PINNED } from '../lib/apps';

const APP_COMPONENTS = {
  projects: Projects,
  about: About,
  resume: Resume,
  terminal: Terminal,
  contact: Contact,
  books: Books,
  finder: Finder,
  minesweeper: Minesweeper,
  snake: Snake,
  connect4: ConnectFour,
};

const PINNED = MOBILE_PINNED;

export default function MobileLayout({ onRestart }) {
  const [active, setActive] = useState(() => getHashApp() || 'projects');
  const CurrentComponent = APP_COMPONENTS[active];

  const openApp = (id) => {
    if (!APP_COMPONENTS[id]) return;
    setActive(id);
    setAppHash(id);
  };

  useEffect(() => {
    if (!getHashApp()) setAppHash('projects');
    const applyHash = () => {
      const id = getHashApp();
      if (id && APP_COMPONENTS[id]) setActive(id);
    };
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--color-desktop)',
      fontFamily: 'var(--font-sys)',
      fontSize: 'var(--text-sm)',
    }}>
      <div style={{
        padding: '6px 10px',
        background: 'var(--color-title-active)',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <PortfolioLogo size={18} />
        <div style={{ minWidth: 0 }}>
          <div style={{ color: 'var(--color-title-text)', fontWeight: 'bold', fontSize: 'var(--text-sm)' }}>{person.name}</div>
          <div style={{ color: '#c0c0c0', fontSize: 'var(--text-xs)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{person.title}</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', background: 'var(--color-surface)', minHeight: 0 }}>
        {CurrentComponent && <CurrentComponent onOpenApp={openApp} />}
      </div>

      <div style={{ flexShrink: 0, borderTop: '2px solid var(--color-border-light)', background: 'var(--color-surface)' }}>
        <div className="mobile-tabs" style={{ display: 'flex' }}>
          <StartCluster compact onOpen={openApp} onRestart={onRestart} />
          {PINNED.map(tab => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => openApp(tab.id)}
                style={{
                  flex: 1,
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '3px',
                  padding: isActive ? '8px 4px 6px' : '7px 4px 7px',
                  background: isActive ? 'var(--color-surface)' : '#a0a0a0',
                  border: 'none',
                  borderRight: '1px solid var(--color-border-dark)',
                  cursor: 'default',
                  fontFamily: 'var(--font-sys)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text)',
                  boxShadow: isActive
                    ? 'inset -1px 0 0 #808080, inset 1px 0 0 #fff'
                    : 'none',
                  borderTop: isActive ? '2px solid #fff' : '1px solid #808080',
                  marginTop: isActive ? '-2px' : '0',
                  position: 'relative',
                  zIndex: isActive ? 1 : 0,
                }}
              >
                <span style={{ width: '20px', height: '20px', imageRendering: 'pixelated' }}>
                  <AppIcon id={tab.id} size={20} />
                </span>
                <span style={{
                  fontWeight: isActive ? 'bold' : 'normal',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
