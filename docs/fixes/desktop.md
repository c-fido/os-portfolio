# Desktop

**Problem:** Minesweeper, Snake, and Connect Four sit at the same visual weight as Resume.pdf. Default window is About.txt. Sticky note tells people to play games.

**Goal:** Recruiter scan path is Resume + Projects. Games live behind Start (or a Games folder), not on the desktop.

## Files

- `src/components/Desktop.jsx` — icons, default windows, sticky note, context menu
- `src/lib/apps.js` — `START_MENU_ITEMS` (games stay here)
- `src/hooks/useWindowManager.js` — window sizes/positions if two windows overlap badly
- `src/components/apps/Finder.jsx` + `src/data/filesystem.js` — optional Games folder in My Computer

## Steps

1. **Bury the games.** In `Desktop.jsx`, remove the right-hand `GAME_ICONS` column (the `desktop-icon-col--right` block). Leave Minesweeper / Snake / Connect Four in `START_MENU_ITEMS` only.

   Optional nicer version: one desktop icon `Games` that opens My Computer at a `Games` folder. Do not leave three game icons on the teal wallpaper.

2. **Open Resume + Projects on first load.** In the `useEffect` in `Desktop.jsx`, replace the `openWindow('about')` default:

   ```js
   if (id) {
     openWindow(id);
   } else {
     openWindow('resume');
     openWindow('projects');
     setAppHash('projects');
   }
   ```

   Open resume first, then projects, so Projects is on top (higher z-index). Recruiter sees work, can click the Resume taskbar button.

3. **Reorder desktop icons.** In `PORTFOLIO_ICONS`, put hire-related apps first:

   ```
   Resume.pdf → Projects → Inbox → About.txt → Books → MS-DOS Prompt → My Computer
   ```

4. **Rewrite the sticky note.** Replace `STICKY_TIPS` so none mention games:

   - `Resume.pdf and Projects are already open`
   - `Inbox copies my email in one click`
   - `MS-DOS Prompt — type HELP`

5. **Context menu.** In `contextItems`, put Open Resume / Open Projects / Open Inbox first. Move the three games below the separator (or drop them).

6. **Check overlap.** With both Resume (`620×580`) and Projects (`780×520`) open, drag-test on 1366×768 and 1920×1080. If they fully cover each other, stagger `getInitialPosition` in `useWindowManager.js` for `resume` vs `projects` (offset ~40px).

## Verify

- Desktop shows no game icons.
- Fresh load (no hash) opens Resume and Projects, Projects focused.
- `#about` still opens only About.
- Games still launch from Start.
- Sticky note never mentions Snake / Minesweeper / Connect Four.
- Mobile is unchanged (already pins Projects / Resume / Inbox).
