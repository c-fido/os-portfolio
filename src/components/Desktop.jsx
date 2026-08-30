import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Window from './Window';
import Taskbar from './Taskbar';
import ContextMenu from './ContextMenu';
import Projects from './apps/Projects';
import About from './apps/About';
import Resume from './apps/Resume';
import Terminal from './apps/Terminal';
import Contact from './apps/Contact';
import Minesweeper from './apps/Minesweeper';
import Snake from './apps/Snake';
import Finder from './apps/Finder';
import ConnectFour from './apps/ConnectFour';
import Books from './apps/Books';
import { useWindowManager } from '../hooks/useWindowManager';
import { person } from '../data/portfolio';
import { AppIcon } from './Win95Icons';
import { getHashApp, setAppHash } from '../lib/apps';

const APP_COMPONENTS = {
  projects: Projects,
  about:    About,
  resume:   Resume,
  terminal: Terminal,
  contact:  Contact,
  minesweeper: Minesweeper,
  snake:    Snake,
  finder:   Finder,
  connect4: ConnectFour,
  books:    Books,
};

const PORTFOLIO_ICONS = [
  { id: 'about',    label: 'About.txt'      },
  { id: 'resume',   label: 'Resume.pdf'     },
  { id: 'projects', label: 'Projects'       },
  { id: 'books',    label: 'Books'          },
  { id: 'contact',  label: 'Inbox'          },
  { id: 'terminal', label: 'MS-DOS Prompt'  },
  { id: 'finder',   label: 'My Computer'    },
];

const GAME_ICONS = [
  { id: 'minesweeper', label: 'Minesweeper'  },
  { id: 'snake',       label: 'Snake'        },
  { id: 'connect4',    label: 'Connect Four' },
];

const STICKY_TIPS = [
  'Click icons to open apps',
  'Try MS-DOS Prompt — type HELP',
  'Can you beat the Connect Four bot?',
  'Right-click the desktop for shortcuts',
  'Play Snake for a high score challenge',
];

function DesktopIcon({ id, label, onOpen }) {
  const [selected, setSelected] = useState(false);

  return (
    <button
      className="desktop-icon-btn"
      onClick={onOpen}
      onFocus={() => setSelected(true)}
      onBlur={() => setSelected(false)}
    >
      <div
        className="pixel-art"
        style={{
          width: '36px',
          height: '36px',
          filter: selected ? 'brightness(0.7) sepia(1) saturate(3) hue-rotate(200deg)' : 'none',
        }}
      >
        <AppIcon id={id} size={36} />
      </div>
      <span
        className="win95-icon-label"
        style={{
          background: selected ? 'var(--color-highlight)' : 'transparent',
          padding: '2px 4px',
        }}
      >
        {label}
      </span>
    </button>
  );
}

function StickyNote() {
  const [tip] = useState(() => STICKY_TIPS[Math.floor(Math.random() * STICKY_TIPS.length)]);

  return (
    <div className="sticky-note" title="Portfolio tips">
      <strong>Hey!</strong>
      <p style={{ margin: '6px 0 0' }}>{tip}</p>
      <p style={{ margin: '8px 0 0', fontSize: '10px', color: '#666' }}>
        — Carlo
      </p>
    </div>
  );
}

export default function Desktop() {
  const [contextMenu, setContextMenu] = useState(null);
  const didInit = useRef(false);
  const {
    windows,
    openWindow, closeWindow, minimizeWindow, maximizeWindow, focusWindow,
    moveWindow, resizeWindow, updateWindow,
  } = useWindowManager();

  const openApp = useCallback((id) => {
    openWindow(id);
    setAppHash(id);
  }, [openWindow]);

  const focusApp = useCallback((id) => {
    focusWindow(id);
    setAppHash(id);
  }, [focusWindow]);

  useEffect(() => {
    const applyHash = () => {
      const id = getHashApp();
      if (id) openWindow(id);
    };

    if (!didInit.current) {
      didInit.current = true;
      const id = getHashApp();
      if (id) {
        openWindow(id);
      } else {
        openWindow('about');
        setAppHash('about');
      }
    }

    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, [openWindow]);

  const handleDesktopContextMenu = useCallback((e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  const contextItems = [
    { label: 'Open Projects', action: () => openApp('projects') },
    { label: 'Open About.txt', action: () => openApp('about') },
    { label: 'Open Resume.pdf', action: () => openApp('resume') },
    { label: 'Open Inbox', action: () => openApp('contact') },
    { separator: true },
    { label: 'Minesweeper', action: () => openApp('minesweeper') },
    { label: 'Snake', action: () => openApp('snake') },
    { label: 'Connect Four', action: () => openApp('connect4') },
    { separator: true },
    {
      label: 'About this Portfolio',
      action: () => {
        alert(`Portfolio Shell OS\n\nBuilt by ${person.name}\nReact + Vite\n\n${person.email}`);
      },
    },
  ];

  const openWins = Object.values(windows).filter(w => !w.minimized);
  const maxZ = openWins.length > 0 ? Math.max(...openWins.map(w => w.zIndex)) : -1;

  return (
    <div
      className="desktop-wallpaper"
      style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}
      onContextMenu={handleDesktopContextMenu}
      onClick={closeContextMenu}
    >
      <div className="desktop-icon-grid">
        <div className="desktop-icon-col">
          {PORTFOLIO_ICONS.map(item => (
            <DesktopIcon
              key={item.id}
              id={item.id}
              label={item.label}
              onOpen={() => openApp(item.id)}
            />
          ))}
        </div>
        <div />
        <div className="desktop-icon-col desktop-icon-col--right">
          {GAME_ICONS.map(item => (
            <DesktopIcon
              key={item.id}
              id={item.id}
              label={item.label}
              onOpen={() => openApp(item.id)}
            />
          ))}
        </div>
      </div>

      <StickyNote />

      <AnimatePresence>
        {Object.values(windows).map(win => {
          if (win.minimized) return null;
          const AppComponent = APP_COMPONENTS[win.id];
          if (!AppComponent) return null;
          return (
            <Window
              key={win.id}
              {...win}
              isActive={win.zIndex === maxZ}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onMaximize={maximizeWindow}
              onFocus={focusApp}
              onMove={moveWindow}
              onResize={resizeWindow}
            >
              <AppComponent
                onTitleChange={(title) => updateWindow(win.id, { title })}
                onOpenApp={openApp}
              />
            </Window>
          );
        })}
      </AnimatePresence>

      <Taskbar
        windows={windows}
        openWindow={openApp}
        focusWindow={focusApp}
        minimizeWindow={minimizeWindow}
        maxZ={maxZ}
      />

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextItems}
          onClose={closeContextMenu}
        />
      )}
    </div>
  );
}
