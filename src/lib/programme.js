import { projects, resume } from '../data/portfolio';

// Keep "C++" from breaking across lines ("C+ / +17").
export const tidy = (text) => text.replace(/C\+\+/g, 'C⁠+⁠+');

export const slugify = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const RESUME_PDF = `${import.meta.env.BASE_URL}resume.pdf`;

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

// "June 2026" or "September 2025 – December 2025" → "06/26", the board's departure time.
const boardTime = (period) => {
  const m = period?.toLowerCase().match(/([a-z]+) (\d{4})/);
  const i = m ? MONTHS.indexOf(m[1]) : -1;
  return i < 0 ? '--/--' : `${String(i + 1).padStart(2, '0')}/${m[2].slice(2)}`;
};

const resumeProjects = Object.fromEntries(resume.projects.map(p => [p.title, p]));

const fromProject = (p) => ({
  id: slugify(p.title),
  kind: 'project',
  title: p.title,
  line: p.short,
  meta: p.tags.slice(0, 2).join(' · '),
  body: p.description,
  bullets: resumeProjects[p.title]?.bullets ?? [],
  period: resumeProjects[p.title]?.period ?? null,
  tags: p.tags,
  train: p.tags[0].replace(/\d+$/, '').replace('Python', 'PY').replace('JavaScript', 'JS').replace('React', 'JS'),
  destination: p.title,
  time: boardTime(resumeProjects[p.title]?.period),
  status: p.demo ? 'Live' : 'GitHub',
  demo: p.demo,
  github: p.github,
});

const fromRole = (kind, id) => (r) => ({
  id,
  kind,
  title: kind === 'work' ? r.company.replace(/ GmbH$/, '') : r.company.split(' · ')[0],
  train: kind === 'work' ? 'HH' : 'WES',
  destination: kind === 'work' ? r.company.replace(/ GmbH$/, '') : r.company.split(' · ')[0].replace(/ Research$/, ''),
  time: boardTime(r.period),
  status: /present/i.test(r.period) ? 'Running' : 'Arrived',
  line: `${r.role}, ${r.location}`,
  meta: r.period.replace(/(\w+) (\d{4})/g, (_, m, y) => `${m.slice(0, 3)} ${y}`),
  role: r.role,
  org: r.company,
  place: r.location,
  period: r.period,
  bullets: r.bullets,
});

const featured = projects.filter(p => p.featured).map(fromProject);
const more = projects.filter(p => !p.featured).map(fromProject);

// Programme order is reading priority: live work first, toys last.
export const ENTRIES = [
  ...featured,
  ...resume.experience.map(fromRole('work', 'turingpoint')),
  ...resume.research.map((r, i) => fromRole('research', ['bioinformatics', 'additive-manufacturing'][i] ?? `research-${i}`)(r)),
  ...more,
];
ENTRIES.forEach((e, i) => { e.number = String(i + 1).padStart(2, '0'); });

export const ENTRY_BY_ID = Object.fromEntries(ENTRIES.map(e => [e.id, e]));
export const DEFAULT_ENTRY = ENTRIES[0].id;

// Hashes from the Win95 desktop and the Leitz shelf keep working.
const ALIASES = {
  projects: DEFAULT_ENTRY,
  'portfolio-os': 'this-site',
  lebenslauf: 'resume',
  inbox: 'contact',
  about: 'off-hours',
  notepad: 'off-hours',
  more: 'termitama',
};
const SECTIONS = new Set(['resume', 'contact', 'off-hours', 'books', 'track', 'hamburg', 'programme']);

/** Resolves the hash to { entry } or { section }, or null. */
export function readHash() {
  const raw = window.location.hash.replace(/^#/, '').toLowerCase().split('/')[0];
  const id = ALIASES[raw] || raw;
  if (ENTRY_BY_ID[id]) return { entry: id };
  if (SECTIONS.has(id)) return { section: id };
  return null;
}

export function writeHash(id) {
  if (window.location.hash !== `#${id}`) window.history.replaceState(null, '', `#${id}`);
}
