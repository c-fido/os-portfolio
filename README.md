# Portfolio OS

A personal portfolio that looks and feels like a Windows 95 desktop. Built with React, Vite, and CSS — draggable windows, a working terminal, built-in games, and a recruiter-first mobile layout.

**Live site:** [gfedolfi.dev](https://gfedolfi.dev)

Deep links: [About.txt](https://gfedolfi.dev#about) · [Projects](https://gfedolfi.dev#projects) · [Resume.pdf](https://gfedolfi.dev#resume) · [Inbox](https://gfedolfi.dev#inbox)

---

## Features

**Desktop (≥768px)**
- Click desktop icons (or Start) to open apps
- Draggable, resizable windows with Win95 minimize / maximize / close
- Window layering and minimize/restore via the taskbar
- Right-click context menu
- Games folder: Minesweeper, Snake, and Connect Four
- Hash routes so you can share a specific app (`#resume`, `#projects`, …)

**Mobile (<768px)**
- Pinned tabs: Projects, Resume, Inbox
- Start menu for Notepad, Books, MS-DOS Prompt, My Computer, and games

**Apps**
| App | Description |
|-----|-------------|
| Notepad (About.txt) | Bio, skills, and current focus |
| Resume.pdf | Inline resume viewer with download |
| Projects | Project cards with links |
| Inbox | Message form, copy-email, and links |
| Books | Currently reading and a top 10 |
| MS-DOS Prompt | Interactive prompt with custom commands |
| My Computer | File-browser-style explorer |
| Minesweeper | Fully playable Minesweeper |
| Snake | Keyboard-controlled Snake |
| Connect Four | Play against a bot |

---

## Tech Stack

- **React 19** — UI and component state
- **Vite** — dev server and build tool
- **Tailwind CSS v3** — present, most chrome is custom Win95 CSS
- **Framer Motion** — window mount presence

---

## Getting Started

```bash
npm install
npm run dev       # start dev server at localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build locally
npm run lint      # ESLint
```

The first visit plays a short boot splash (Skip, Enter, or Escape). Later visits skip it. A hash in the URL also skips the boot and opens that app.

---

## Customization

All portfolio content (bio, projects, resume, skills, links) lives in one file:

```
src/data/portfolio.js
```

Edit that file to make the portfolio your own — no other files need to change for content updates.

Books data comes from Supabase. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env` (and in GitHub Actions secrets for deploy).

### Adding a new app

1. Create `src/components/apps/MyApp.jsx`
2. Add an entry to `WINDOW_CONFIGS` in `src/hooks/useWindowManager.js`
3. Add it to `APP_COMPONENTS` in `src/components/Desktop.jsx` and `src/components/MobileLayout.jsx`
4. Add the id to `APP_IDS` / `START_MENU_ITEMS` in `src/lib/apps.js`

---

## Project Structure

```
src/
├── App.jsx                  # Boot gate, then Desktop or MobileLayout
├── lib/
│   └── apps.js              # App ids, hash routes, boot skip
├── data/
│   └── portfolio.js         # All personal content lives here
├── hooks/
│   └── useWindowManager.js  # Window state (position, size, z-index, maximize)
└── components/
    ├── Desktop.jsx           # Desktop layout, icons, wallpaper, context menu
    ├── MobileLayout.jsx      # Mobile pinned tabs + Start menu
    ├── Window.jsx            # Draggable/resizable window shell
    ├── Taskbar.jsx           # Bottom taskbar
    ├── StartCluster.jsx      # Start button + menu
    ├── ContextMenu.jsx       # Right-click menu
    └── apps/                 # Individual app panels
```

---

## License

MIT
