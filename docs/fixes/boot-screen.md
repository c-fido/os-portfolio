# Boot screen

**Problem:** The first paint is a 2-second splash that talks about Snake and Connect Four. Recruiters bounce before they see a resume.

**Goal:** First visit lands on the desktop (Resume + Projects already open). Keep the boot as an optional toy, not a gate.

## Files

- `src/lib/apps.js` — `shouldSkipBoot()`, `BOOT_KEY`
- `src/App.jsx` — boot gate
- `src/components/BootScreen.jsx` — splash UI and tips
- `src/components/StartMenu.jsx` / `src/lib/apps.js` — add a Restart entry if you keep the splash

## Steps

1. **Skip boot on first paint.** In `src/lib/apps.js`, make `shouldSkipBoot()` return `true` unless the URL explicitly asks for it:

   ```js
   export function shouldSkipBoot() {
     if (typeof window === 'undefined') return true;
     return new URLSearchParams(window.location.search).get('boot') !== '1';
   }
   ```

   Optional: keep localStorage so `?boot=1` still plays once, then never again.

2. **Stop advertising games on the splash.** If you keep `BootScreen.jsx`, replace `BOOT_TIPS` with recruiter-facing lines:

   - `Resume.pdf and Projects open on the desktop`
   - `Type HELP in MS-DOS Prompt`
   - `Hash links: #resume #projects #inbox`

   Delete the Snake / Connect Four / high-score tips.

3. **Optional: Restart from Start.** Add a Start menu item that sets `booted` back to false (lift that state from `App.jsx` or pass a callback). Do not put Restart on the desktop.

4. **Reduced motion stays skipped.** `prefers-reduced-motion` already skips boot — leave that.

## Verify

- Cold load of `https://gfedolfi.dev` (or `localhost:5173`) in a private window: desktop in under a second, no splash.
- `?boot=1` still plays the splash if you kept it.
- `#resume` still skips boot and opens Resume (already true via `getHashApp()`).
- Mobile (`<768px`) also skips the splash.
