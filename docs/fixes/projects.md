# Projects

**Problem:** Four equal cards. SolverRL’s description is unreadable in a 6-second scan. Portfolio OS and TermiTama sit next to the only two hireable projects. `cve-triage-agent` is not on the site. `featured` is unused.

**Goal:** Remindr first, then SolverRL, then the CVE agent. This Win95 site is a vehicle, not a peer project. Every description is two sentences max.

## Files

- `src/data/portfolio.js` — `projects` array (order = display order)
- `src/components/apps/Projects.jsx` — cards; only change this if you want featured badges or screenshots
- `src/data/filesystem.js` — My Computer project files are generated from `projects`

## Steps

1. **Reorder `projects`.** Array index is what the grid shows. Use:

   1. Remindr  
   2. SolverRL  
   3. CVE Triage Agent (new card)  
   4. TermiTama *or* omit it  

   Do not feature Portfolio OS. If you keep it, last, `featured: false`, and a one-line description.

2. **Rewrite descriptions** so a non-ML recruiter can parse them.

   **Remindr**

   > Offline-first reminder daemon in C++17 (Unix sockets, background sync) with a Go API on Postgres and a React dashboard. Live at remindr.gfedolfi.dev.

   **SolverRL**

   > C++/Python reproduction of a paper that turns a PPO policy into an executable Prolog program, then only keeps edits that raise exact return. Tests and one-command pipeline on GitHub.

   **CVE Triage Agent**

   > Python agent that looks up dependency CVEs (OSV/NVD/GitHub), checks whether your code actually calls the vulnerable path, and writes a severity report. Not just CVSS copy-paste.

   Link: `https://github.com/c-fido/cve-triage-agent`. Demo can stay `null` unless you host a sample HTML report.

   **TermiTama** (if kept)

   > Terminal Tamagotchi in C++17 / FTXUI: lifecycle FSM, offline stat decay, breeding, JSON save.

   **Portfolio OS** (if kept, last)

   > This site: Win95-style desktop in React.

3. **Tags.** Only tech that is in that repo. Remindr: `C++17`, `Go`, `React`, `PostgreSQL`. SolverRL: `C++17`, `Python`, `SWI-Prolog`. Do not tag this site with TypeScript.

4. **Use `featured` or delete it.** `Projects.jsx` ignores `featured` today. Either:

   - Filter: `projects.filter(p => p.featured)` for the grid, or  
   - Remove the flag so it cannot lie.

   Featured should be Remindr + SolverRL + CVE agent only.

5. **Optional card upgrade** in `Projects.jsx` (only after copy is done): one line under the title (`Live demo` vs `GitHub only`) so Remindr visually wins. Do not add screenshots of Minesweeper.

## Verify

- Projects window: Remindr is top-left.
- No card leads with “frozen PPO teacher” or “certified EXPAND.”
- CVE repo link 404s? Fix the URL before shipping.
- My Computer → Projects folder matches the new set.
- `npm run dev` → `#projects` on desktop and mobile.
