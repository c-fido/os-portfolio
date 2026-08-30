# About.txt

**Problem:** Notepad is a wall of numbered lines: laundry-list languages, research jargon, and a greeting. It is the default window today, so it is often the first text a recruiter reads.

**Goal:** Ten-second bio a sourcer can retell. Proven stack only. Class year consistent with LinkedIn and GitHub.

## Files

- `src/data/portfolio.js` — `person`, `bio`, `skills` (About, Terminal, and My Computer all read these)
- `src/components/apps/About.jsx` — rendering only; do not put copy here
- `src/components/apps/Terminal.jsx` — `about` / `skills` / `whoami` commands pick up `person` + `skills` automatically after you edit `portfolio.js`
- `src/data/filesystem.js` — `bio.txt` / `skills.txt` in My Computer use the same exports

## Steps

1. **Fix identity in `person`.**

   - `title`: `CS & German · Wesleyan University · Class of 2027` (senior year as of Fall 2026).
   - Remove `phone` from this object (or stop exporting it). It is unused in the UI today but should not come back.

2. **Rewrite `bio`.** Keep the Notepad voice. Cut the stack dump and the SolverRL one-liner. Target ~20–25 lines, scannable sections:

   ```
   Hi, I'm Giancarlo.

   Senior at Wesleyan (CS & German, May 2027). SWE intern at
   turingpoint in Hamburg. I build systems in C++ and Go —
   shipped Remindr (offline-first daemon + API + web app) and
   a CVE triage tool used by non-engineers.

   Research assistant in bioinformatics and additive
   manufacturing. Captain of varsity indoor and outdoor track.

   ── Now ──────────────────────────────────────
   → Remindr — remindr.gfedolfi.dev
   → SolverRL — github.com/c-fido/solverRL
   → Bioinformatics + Additive Manufacturing @ Wesleyan

   ── Stack I actually use ─────────────────────
   → C++17, Go, Python, TypeScript, SQL
   → React, PostgreSQL, Docker, GitHub Actions

   ── Links ────────────────────────────────────
   → GitHub    github.com/c-fido
   → Remindr   remindr.gfedolfi.dev
   → LinkedIn  linkedin.com/in/giancarlo-fedolfi-652026306
   ```

   Rules: no PHP / C# / SMLNJ / GDScript / Django / MongoDB / Node.js unless a public repo proves them. No “PPO teacher → SWI-Prolog” in this file.

3. **Cut `skills` to what GitHub can prove.**

   ```js
   export const skills = {
     languages: ["C++", "Go", "Python", "TypeScript", "JavaScript", "SQL"],
     frameworks: ["React", "Go (chi)"],
     tools: ["PostgreSQL", "Docker", "CMake", "Git", "GitHub Actions", "Vite", "Railway", "Vercel"],
   };
   ```

   Course-only languages (SMLNJ, GDScript, C, PHP, C#) belong in resume coursework, not a skills bar. `Terminal.jsx` `SKILLS` will update on its own.

4. **Default window is no longer About** (see [desktop.md](./desktop.md)). About stays one click away as `About.txt`.

## Verify

- Open About.txt: you can explain who you are before scrolling.
- `SKILLS` in MS-DOS Prompt matches the short list.
- My Computer → About → `skills.txt` matches.
- No phone number anywhere in this app.
- Class of 2027 / senior is consistent with LinkedIn and github.com/c-fido.
