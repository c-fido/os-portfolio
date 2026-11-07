# Portfolio OS

A personal portfolio built as a German office shelf: every project, the resume, and the inbox is a labelled Leitz Ordner. Pull one off the shelf and it opens on the desk as a cover-and-page spread. Built with React and Vite. Alles ist eine Datei.

**Live site:** [gfedolfi.dev](https://gfedolfi.dev)

Deep links: [Remindr](https://gfedolfi.dev#remindr) · [Resume](https://gfedolfi.dev#resume) · [About](https://gfedolfi.dev#about) · [Contact](https://gfedolfi.dev#contact)

---

## Features

**Wide screens (≥1100px)**
- Shelf on the left, desk on the right; Remindr is open on first load
- Pulling an Ordner slides its neighbours together; nothing overlaps
- Register tabs on each cover jump between sections (`#resume/skills`)
- Arrow keys walk the shelf, Enter opens; status tabs (LIVE, REPO, CV…) show before opening

**Narrow screens**
- The shelf becomes a list; opening an Ordner shows it full-screen with a "← Regal" back button

**Ordner**
| Ordner | Description |
|-----|-------------|
| Remindr, SolverRL, CVE Triage Agent | One Ordner per featured project: overview, stack, links, what I built |
| Weitere (More projects) | Non-featured projects |
| Lebenslauf (Resume) | HTML resume from `portfolio.js`, plus PDF download |
| Posteingang (Contact) | Email, links; Formspree form if `VITE_FORMSPREE_ENDPOINT` is set |
| Über mich (About) | Bio |
| Bücher (Books) | Currently reading and a top 10 (Supabase) |
| Konsole (Terminal) | Shell with `ls`, `open <name>`, `help`… |
| Spiele (Games) | Minesweeper, Snake, Vier gewinnt (Connect Four) |

Old hashes (`#projects`, `#inbox`, `#notepad`, `#snake`…) still resolve.

---

## Tech Stack

- **React 19** — UI and component state
- **Vite** — dev server and build tool
- **CSS** — one stylesheet (`src/index.css`); Tailwind v3 is present but barely used
- **Barlow Condensed + Public Sans** — self-hosted via Fontsource

---

## Getting Started

```bash
npm install
npm run dev       # start dev server at localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build locally
npm run lint      # ESLint
```

A hash in the URL opens that Ordner (`#solverrl`, `#resume/education`). Otherwise Remindr opens on wide screens and the shelf shows on narrow ones.

---

## Customization

All portfolio content (bio, projects, resume, skills, links) lives in one file:

```
src/data/portfolio.js
```

Edit that file to make the portfolio your own — no other files need to change for content updates.

Books data comes from Supabase. Inbox send uses Formspree. Copy `.env.example` to `.env` and set:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_FORMSPREE_ENDPOINT=
```

Also add those as GitHub Actions secrets for deploy. If `VITE_FORMSPREE_ENDPOINT` is empty, Inbox only offers Copy email.

### Adding an Ordner

1. Add an entry to `SHELVES` in `src/lib/archive.js` (`id`, `kind`, German `label`, English `gloss`, `status`)
2. Add its page to `KINDS` in `src/components/archive/Ordner.jsx` (pages live in `src/components/archive/files/`)
3. If it has Register tabs, return them from `sectionsFor` in `src/lib/archive.js`

Featured projects in `portfolio.js` get an Ordner automatically. `CURRENT_ORDNER` in `src/lib/archive.js` marks the one shown as in progress.

---

## Project Structure

```
src/
├── App.jsx                     # Renders the archive
├── lib/
│   └── archive.js              # Shelf contents, hash routes, Register sections
├── data/
│   └── portfolio.js            # All personal content lives here
└── components/
    ├── archive/
    │   ├── Archive.jsx         # Name band, shelf, desk; narrow/wide behaviour
    │   ├── Shelf.jsx           # Spines with roving keyboard focus
    │   ├── Ordner.jsx          # Cover (label, Register tabs) + page
    │   ├── Stamp.jsx           # Rubber stamps and their ink filter
    │   └── files/              # Page content per Ordner kind
    └── apps/                   # Contact, Books, Terminal, games
```

---

## License

MIT
