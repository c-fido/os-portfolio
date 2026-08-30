export const APP_IDS = [
  'about',
  'resume',
  'projects',
  'books',
  'contact',
  'terminal',
  'finder',
  'minesweeper',
  'snake',
  'connect4',
];

export const MOBILE_PINNED = [
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Inbox' },
];

export const START_MENU_ITEMS = [
  { id: 'about', label: 'Notepad' },
  { id: 'resume', label: 'Resume.pdf' },
  { id: 'projects', label: 'Projects' },
  { id: 'books', label: 'Books' },
  { id: 'contact', label: 'Inbox' },
  { id: 'terminal', label: 'MS-DOS Prompt' },
  { id: 'finder', label: 'My Computer' },
  { separator: true },
  { id: 'minesweeper', label: 'Minesweeper' },
  { id: 'snake', label: 'Snake' },
  { id: 'connect4', label: 'Connect Four' },
];

const HASH_ALIASES = {
  inbox: 'contact',
  notepad: 'about',
  dos: 'terminal',
  'ms-dos': 'terminal',
  msdos: 'terminal',
  'my-computer': 'finder',
  computer: 'finder',
};

export function getHashApp() {
  const raw = window.location.hash.replace(/^#/, '').toLowerCase();
  const id = HASH_ALIASES[raw] || raw;
  return APP_IDS.includes(id) ? id : null;
}

export function setAppHash(id) {
  if (typeof window === 'undefined') return;
  const next = id ? `#${id}` : window.location.pathname + window.location.search;
  const current = id ? `#${id}` : '';
  if (window.location.hash === current) return;
  window.history.replaceState(null, '', next);
}

const BOOT_KEY = 'portfolio-os-booted';

export function shouldSkipBoot() {
  if (typeof window === 'undefined') return false;
  if (getHashApp()) return true;
  try {
    if (window.localStorage.getItem(BOOT_KEY) === '1') return true;
  } catch {
    /* private mode */
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  return false;
}

export function markBooted() {
  try {
    window.localStorage.setItem(BOOT_KEY, '1');
  } catch {
    /* private mode */
  }
}
