import { projects, resume } from '../data/portfolio';

// ============================================================
// The shelf: every app is an Ordner (lever-arch file).
// Labels are German with an English gloss underneath.
// ============================================================

// The one Ordner marked IN BEARBEITUNG (in progress). Change when the current work changes.
export const CURRENT_ORDNER = 'remindr';

// Keep "C++" from breaking across lines ("C+ / +17").
export const tidy = (text) => text.replace(/C\+\+/g, 'C\u2060+\u2060+');

export const slugify = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const featured = projects.filter(p => p.featured);
const resumeProjects = Object.fromEntries(resume.projects.map(p => [p.title, p]));

function projectYear(project) {
  const period = resumeProjects[project.title]?.period;
  return period ? period.match(/\d{4}/)?.[0] : null;
}

const projectOrdner = featured.map(p => ({
  id: slugify(p.title),
  kind: 'project',
  projectId: p.id,
  label: p.title,
  spine: p.title.replace(/ Agent$/, ''),
  gloss: p.demo ? 'Live project' : 'Project',
  status: p.demo ? 'LIVE' : 'REPO',
  year: projectYear(p),
}));

export const SHELVES = [
  {
    id: 'work',
    label: 'Arbeit',
    gloss: 'Work',
    ordner: [
      ...projectOrdner,
      { id: 'more', kind: 'more', label: 'Weitere', gloss: 'More projects', status: 'MEHR' },
      { id: 'resume', kind: 'resume', label: 'Lebenslauf', gloss: 'Resume', status: 'CV' },
      { id: 'contact', kind: 'contact', label: 'Posteingang', gloss: 'Contact', status: 'MAIL' },
      { id: 'about', kind: 'about', label: 'Über mich', gloss: 'About', status: 'TXT' },
    ],
  },
  {
    id: 'off',
    label: 'Freizeit',
    gloss: 'Off hours',
    ordner: [
      { id: 'books', kind: 'books', label: 'Bücher', gloss: 'Books', status: 'LESEN' },
      { id: 'terminal', kind: 'terminal', label: 'Konsole', gloss: 'Terminal', status: 'SHELL' },
      { id: 'games', kind: 'games', label: 'Spiele', gloss: 'Games', status: 'SPIEL' },
    ],
  },
];

export const ALL_ORDNER = SHELVES.flatMap(s => s.ordner);
ALL_ORDNER.forEach((o, i) => { o.number = String(i + 1).padStart(2, '0'); });

export const ORDNER_BY_ID = Object.fromEntries(ALL_ORDNER.map(o => [o.id, o]));
export const DEFAULT_ORDNER = ALL_ORDNER[0].id;

// Old Win95-era hashes keep working.
const HASH_ALIASES = {
  projects: DEFAULT_ORDNER,
  inbox: 'contact',
  notepad: 'about',
  dos: 'terminal',
  'ms-dos': 'terminal',
  msdos: 'terminal',
  konsole: 'terminal',
  finder: 'more',
  computer: 'more',
  'my-computer': 'more',
  lebenslauf: 'resume',
  minesweeper: 'games/minesweeper',
  snake: 'games/snake',
  connect4: 'games/connect4',
};

/** Returns { id, section } for the current hash, or null. */
export function readHash() {
  const raw = window.location.hash.replace(/^#/, '').toLowerCase();
  if (!raw) return null;
  const [id, section = null] = (HASH_ALIASES[raw] || raw).split('/');
  return ORDNER_BY_ID[id] ? { id, section } : null;
}

export function writeHash(id, section) {
  const next = id ? `#${id}${section ? `/${section}` : ''}` : window.location.pathname + window.location.search;
  if (window.location.hash === next) return;
  window.history.replaceState(null, '', next);
}

export const RESUME_PDF = `${import.meta.env.BASE_URL}resume.pdf`;

// Register tabs (sections) per Ordner kind.
export const GAME_SECTIONS = [
  { id: 'minesweeper', label: 'Minesweeper', gloss: 'Game' },
  { id: 'snake', label: 'Snake', gloss: 'Game' },
  { id: 'connect4', label: 'Vier gewinnt', gloss: 'Connect Four' },
];

export function sectionsFor(ordner) {
  switch (ordner.kind) {
    case 'project': {
      const project = projects.find(p => p.id === ordner.projectId);
      return [
        { id: 'overview', label: 'Überblick', gloss: 'Overview' },
        ...(resumeProjects[project.title] ? [{ id: 'details', label: 'Details', gloss: 'What I built' }] : []),
      ];
    }
    case 'more':
      return projects.filter(p => !p.featured).map(p => ({ id: slugify(p.title), label: p.title, gloss: p.tags[0] }));
    case 'resume':
      return [
        { id: 'experience', label: 'Erfahrung', gloss: 'Experience' },
        { id: 'research', label: 'Forschung', gloss: 'Research' },
        { id: 'projects', label: 'Projekte', gloss: 'Projects' },
        { id: 'education', label: 'Ausbildung', gloss: 'Education' },
        { id: 'skills', label: 'Kenntnisse', gloss: 'Skills' },
      ];
    case 'games':
      return GAME_SECTIONS;
    default:
      return [];
  }
}
