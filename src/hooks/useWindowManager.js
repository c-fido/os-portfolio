import { useState, useCallback, useRef } from 'react';

export const TASKBAR_HEIGHT = 28;

const WINDOW_CONFIGS = {
  projects:    { title: 'Projects',           width: 780, height: 520 },
  about:       { title: 'Notepad - About.txt', width: 560, height: 480 },
  resume:      { title: 'Resume.pdf',         width: 620, height: 580 },
  terminal:    { title: 'MS-DOS Prompt',      width: 600, height: 420 },
  contact:     { title: 'Inbox',              width: 500, height: 480 },
  minesweeper: { title: 'Minesweeper',        width: 420, height: 460 },
  snake:       { title: 'Snake',              width: 480, height: 520 },
  finder:      { title: 'My Computer',        width: 760, height: 500 },
  connect4:    { title: 'Connect Four',       width: 480, height: 560 },
  books:       { title: 'Books',              width: 780, height: 520 },
};

function maximizedBounds() {
  return {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: Math.max(200, window.innerHeight - TASKBAR_HEIGHT),
  };
}

function clampPosition(x, y, width) {
  const maxX = Math.max(0, window.innerWidth - width);
  const maxY = Math.max(0, window.innerHeight - TASKBAR_HEIGHT - 24);
  return {
    x: Math.max(0, Math.min(x, maxX)),
    y: Math.max(0, Math.min(y, maxY)),
  };
}

function getInitialPosition(id, width, height) {
  if (id === 'resume') return clampPosition(36, 28, width);
  if (id === 'projects') return clampPosition(76, 68, width);
  const offsets = { about: 1, terminal: 3, contact: 4, books: 5, minesweeper: 6, connect4: 7, snake: 8, finder: 9 };
  const offset = (offsets[id] ?? 0) * 30;
  const x = Math.max(60, (window.innerWidth - width) / 2 + offset);
  const y = Math.max(40, (window.innerHeight - height) / 2 + offset - 40);
  return clampPosition(x, y, width);
}

export function useWindowManager() {
  const [windows, setWindows] = useState({});
  const zCounter = useRef(100);

  const openWindow = useCallback((id) => {
    if (!WINDOW_CONFIGS[id]) return;
    setWindows(prev => {
      if (prev[id]) {
        const newZ = ++zCounter.current;
        return {
          ...prev,
          [id]: { ...prev[id], minimized: false, zIndex: newZ },
        };
      }
      const config = WINDOW_CONFIGS[id];
      const pos = getInitialPosition(id, config.width, config.height);
      const newZ = ++zCounter.current;
      return {
        ...prev,
        [id]: {
          id,
          ...config,
          ...pos,
          minimized: false,
          maximized: false,
          zIndex: newZ,
        },
      };
    });
  }, []);

  const closeWindow = useCallback((id) => {
    setWindows(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], minimized: true },
    }));
  }, []);

  const maximizeWindow = useCallback((id) => {
    setWindows(prev => {
      const win = prev[id];
      if (!win) return prev;
      const newZ = ++zCounter.current;
      if (win.maximized) {
        const restore = win.restore ?? getInitialPosition(id, win.width, win.height);
        return {
          ...prev,
          [id]: {
            ...win,
            ...restore,
            maximized: false,
            minimized: false,
            restore: undefined,
            zIndex: newZ,
          },
        };
      }
      return {
        ...prev,
        [id]: {
          ...win,
          restore: { x: win.x, y: win.y, width: win.width, height: win.height },
          ...maximizedBounds(),
          maximized: true,
          minimized: false,
          zIndex: newZ,
        },
      };
    });
  }, []);

  const focusWindow = useCallback((id) => {
    setWindows(prev => {
      if (!prev[id]) return prev;
      const newZ = ++zCounter.current;
      return {
        ...prev,
        [id]: { ...prev[id], zIndex: newZ, minimized: false },
      };
    });
  }, []);

  const moveWindow = useCallback((id, x, y) => {
    setWindows(prev => {
      const win = prev[id];
      if (!win || win.maximized) return prev;
      const clamped = clampPosition(x, y, win.width);
      return {
        ...prev,
        [id]: { ...win, ...clamped },
      };
    });
  }, []);

  const resizeWindow = useCallback((id, width, height) => {
    setWindows(prev => {
      const win = prev[id];
      if (!win || win.maximized) return prev;
      return {
        ...prev,
        [id]: {
          ...win,
          width: Math.max(320, width),
          height: Math.max(200, height),
        },
      };
    });
  }, []);

  const updateWindow = useCallback((id, patch) => {
    setWindows(prev => {
      if (!prev[id]) return prev;
      return { ...prev, [id]: { ...prev[id], ...patch } };
    });
  }, []);

  return {
    windows,
    configs: WINDOW_CONFIGS,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    moveWindow,
    resizeWindow,
    updateWindow,
  };
}
