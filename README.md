# Portfolio OS

A personal portfolio that looks and feels like a desktop operating system. Built with React, Vite, and Tailwind CSS — featuring draggable windows, a working terminal, built-in games, and a fully responsive mobile layout.

**Live site:** [gfedolfi.dev](https://gfedolfi.dev)

---

## Features

**Desktop (≥768px)**
- Draggable, resizable windows with macOS-style traffic-light buttons
- Window layering (z-index focus management) and minimize/restore via taskbar
- Right-click context menu with wallpaper cycling
- Games folder containing Minesweeper, Snake, and Connect Four

**Mobile (<768px)**
- Tab-bar navigation rendering the same app panels
- Framer Motion transitions between tabs

**Apps**
| App | Description |
|-----|-------------|
| About | Bio, skills, and current focus |
| Resume | Inline resume viewer |
| Projects | Project cards with links |
| Contact | Contact links and email |
| Terminal | Interactive terminal with custom commands |
| Finder | File-browser-style project explorer |
| Minesweeper | Fully playable Minesweeper |
| Snake | Keyboard-controlled Snake game |
| Connect Four | Two-player Connect Four |

---

## Tech Stack

- **React 19** — UI and component state
- **Vite** — dev server and build tool
- **Tailwind CSS v3** — styling (dark glassmorphism aesthetic)
- **Framer Motion** — window open/close/minimize animations and mobile tab transitions

---

## Getting Started

```bash
npm install
npm run dev       # start dev server at localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build locally
npm run lint      # ESLint
```

---

## Customization

All portfolio content (bio, projects, resume, skills, links) lives in one file:

```
src/data/portfolio.js
```

Edit that file to make the portfolio your own — no other files need to change for content updates.

### Adding a new app

1. Create `src/components/apps/MyApp.jsx`
2. Add an entry to `WINDOW_CONFIGS` in `src/hooks/useWindowManager.js`
3. Add it to `APP_COMPONENTS` and `DESKTOP_ICONS` in `src/components/Desktop.jsx`
4. Optionally add it to `TABS` in `src/components/MobileLayout.jsx`

---

## Project Structure

```
src/
├── App.jsx                  # Entry point — routes to Desktop or MobileLayout
├── data/
│   └── portfolio.js         # All personal content lives here
├── hooks/
│   └── useWindowManager.js  # Window state (position, size, z-index, minimize)
└── components/
    ├── Desktop.jsx           # Desktop layout, icons, wallpaper, context menu
    ├── MobileLayout.jsx      # Mobile tab-bar layout
    ├── Window.jsx            # Draggable/resizable window shell
    ├── Taskbar.jsx           # Bottom taskbar
    ├── ContextMenu.jsx       # Right-click menu
    └── apps/                 # Individual app panels
        ├── About.jsx
        ├── Contact.jsx
        ├── Finder.jsx
        ├── Minesweeper.jsx
        ├── Projects.jsx
        ├── Resume.jsx
        ├── Snake.jsx
        ├── ConnectFour.jsx
        └── Terminal.jsx
```

---

## License

MIT
