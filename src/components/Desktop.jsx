import { useState, useCallback } from 'react';
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
import { useWindowManager } from '../hooks/useWindowManager';
import { person } from '../data/portfolio';
import { AppIcon } from './Win95Icons';

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
};

const PORTFOLIO_ICONS = [
  { id: 'about',    label: 'About'     },
  { id: 'resume',   label: 'Resume'    },
  { id: 'projects', label: 'Projects'  },
  { id: 'contact',  label: 'Contact'   },
  { id: 'terminal', label: 'Terminal'  },
  { id: 'finder',   label: 'My PC'     },
];

const GAME_ICONS = [
  { id: 'minesweeper', label: 'Mines'     },
  { id: 'snake',       label: 'Snake'     },
  { id: 'connect4',    label: 'Connect 4' },
];

const STICKY_TIPS = [
  'Double-click icons to open apps!',
  'Try the Terminal — type "help"',
  'Can you beat the Connect 4 bot?',
  'Right-click the desktop for shortcuts',
  'Play Snake for a high score challenge',
];

function DesktopIcon({ id, label, onOpen }) {
  const [selected, setSelected] = useState(false);

  return (
    <button
      className="desktop-icon-btn"
      onDoubleClick={onOpen}
      onClick={() => setSelected(s => !s)}
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
          background: selected ? '#000080' : 'transparent',
          padding: '2px 4px',
        }}
      >
        {label}
      </span>
    </button>
  );
}

function StickyNote() {
  const tip = STICKY_TIPS[Math.floor(Math.random() * STICKY_TIPS.length)];

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
  const {
    windows, configs,
    openWindow, closeWindow, minimizeWindow, focusWindow,
    moveWindow, resizeWindow, updateWindow,
  } = useWindowManager();

  const handleDesktopContextMenu = useCallback((e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  const contextItems = [
    {
      label: 'Open Projects',
      action: () => openWindow('projects'),
    },
    {
      label: 'Open About',
      action: () => openWindow('about'),
    },
    { separator: true },
    {
      label: 'Play Snake',
      action: () => openWindow('snake'),
    },
    { separator: true },
    {
      label: 'About this Portfolio',
      action: () => {
        alert(`Portfolio OS — Windows 95 Edition\n\nBuilt by ${person.name}\nReact + Vite + Framer Motion\n\n${person.email}`);
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
      {/* Desktop icon layout — portfolio left, games right */}
      <div className="desktop-icon-grid">
        <div className="desktop-icon-col">
          {PORTFOLIO_ICONS.map(item => (
            <DesktopIcon
              key={item.id}
              id={item.id}
              label={item.label}
              onOpen={() => openWindow(item.id)}
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
              onOpen={() => openWindow(item.id)}
            />
          ))}
        </div>
      </div>

      <StickyNote />

      {/* Windows */}
      <AnimatePresence>
        {Object.values(windows).map(win => {
          if (win.minimized) return null;
          const AppComponent = APP_COMPONENTS[win.id];
          return (
            <Window
              key={win.id}
              {...win}
              isActive={win.zIndex === maxZ}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onFocus={focusWindow}
              onMove={moveWindow}
              onResize={resizeWindow}
            >
              <AppComponent
                onTitleChange={(title) => updateWindow(win.id, { title })}
                onOpenApp={openWindow}
              />
            </Window>
          );
        })}
      </AnimatePresence>

      <Taskbar
        windows={windows}
        configs={configs}
        openWindow={openWindow}
        focusWindow={focusWindow}
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
