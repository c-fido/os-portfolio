import { useCallback, useState } from 'react';

// Which Ordner this visitor has opened, kept per browser. Purely a convenience:
// if storage is blocked the slip simply starts empty every visit.
const KEY = 'akte:gelesen';

function load() {
  try {
    const raw = JSON.parse(window.localStorage.getItem(KEY));
    return raw && typeof raw === 'object' ? raw : {};
  } catch {
    return {};
  }
}

function save(value) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    // Private window or blocked storage: keep it in memory only.
  }
}

/** Returns [read map { id: isoDate }, markRead(id), reset()]. */
export function useGelesen() {
  const [read, setRead] = useState(load);

  const markRead = useCallback((id) => {
    setRead(prev => {
      if (prev[id]) return prev;
      const next = { ...prev, [id]: new Date().toISOString() };
      save(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    save({});
    setRead({});
  }, []);

  return [read, markRead, reset];
}

/** "07.11." — the date as a German office stamp would print it. */
export const stampDate = (iso) => {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.`;
};
