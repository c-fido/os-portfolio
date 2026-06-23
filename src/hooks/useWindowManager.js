import { useState, useCallback, useRef } from 'react';

const WINDOW_CONFIGS = {
  projects:    { title: 'Projects.app',    width: 780, height: 520 },
  about:       { title: 'About.txt',       width: 560, height: 480 },
  resume:      { title: 'Resume.pdf',      width: 620, height: 580 },
  terminal:    { title: 'Terminal.app',    width: 600, height: 420 },
  contact:     { title: 'Contact.app',     width: 500, height: 480 },
  minesweeper: { title: 'Minesweeper.app', width: 420, height: 460 },
  snake:       { title: 'Snake.app',       width: 480, height: 520 },
  finder:      { title: 'Finder.app',      width: 760, height: 500 },
  connect4:    { title: 'Connect Four',    width: 480, height: 560 },
};

function clampPosition(x, y, width, height) {
  const maxX = Math.max(0, window.innerWidth - width);
  const maxY = Math.max(0, window.innerHeight - 80 - 40); // subtract taskbar + titlebar
  return {
    x: Math.max(0, Math.min(x, maxX)),
    y: Math.max(28, Math.min(y, maxY)), // 28 = menu bar height if any
  };
}

function getInitialPosition(id, width, height) {
  const offsets = { projects: 0, about: 1, resume: 2, terminal: 3, contact: 4, minesweeper: 5, connect4: 6, snake: 7, finder: 8 };
  const offset = (offsets[id] ?? 0) * 30;
  const x = Math.max(60, (window.innerWidth - width) / 2 + offset);
  const y = Math.max(40, (window.innerHeight - height) / 2 + offset - 40);
  return clampPosition(x, y, width, height);
}

export function useWindowManager() {
  const [windows, setWindows] = useState({});
  const zCounter = useRef(100);

  const openWindow = useCallback((id) => {
    setWindows(prev => {
      if (prev[id]) {
        // Already exists — un-minimize and bring to front
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
      if (!prev[id]) return prev;
      const { width, height } = prev[id];
      const clamped = clampPosition(x, y, width, height);
      return {
        ...prev,
        [id]: { ...prev[id], ...clamped },
      };
    });
  }, []);

  const resizeWindow = useCallback((id, width, height) => {
    setWindows(prev => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
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
    focusWindow,
    moveWindow,
    resizeWindow,
    updateWindow,
  };
}
