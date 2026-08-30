# Resume.pdf

**Problem:** The Resume app shows `public/resume.pdf`, not the JS object. The PDF’s SolverRL bullets are a paper abstract. Skills are padded. “85%” and “cut runtime by half” are round and will be the first interview challenge. Phone is on the PDF.

**Goal:** One page a sourcer can skim in 20 seconds. Every bullet is verb + system + outcome. Metrics are interview-proof or gone.

## Files

- `public/resume.pdf` — **this is what recruiters download**
- `src/data/portfolio.js` — `resume` object (keep in sync even though `Resume.jsx` ignores it today)
- `src/components/apps/Resume.jsx` — viewer + download filename only

Edit the PDF in whatever you already use (Typst, LaTeX, Word, Google Docs). Then export to `public/resume.pdf` and copy the same bullets into `resume` in `portfolio.js`.

## Steps

1. **Page layout (keep one page).** Order:

   1. Header (name, email, LinkedIn, GitHub, gfedolfi.dev — **no phone**)
   2. Education (one block)
   3. Experience (turingpoint)
   4. Research (two labs, shorter)
   5. Projects: Remindr, then SolverRL, then CVE triage *or* TermiTama — not Portfolio OS
   6. Skills (short)

2. **Rewrite bullets.** Pattern: `Did X on Y so that Z`. If you cannot say Z in the interview, delete the number.

   **turingpoint — replace the 85% unless you can walk through the method.**

   - `Built a Python CVE classification app (LiteLLM → Anthropic) that non-engineers used to triage findings instead of reading advisories by hand.`
   - `Pulled advisory text via Brave Search + BeautifulSoup so reviewers started from evidence, not a CVSS number.`
   - `Designed Figma flows with PMs so the tool shipped to non-technical reviewers.`

   If you keep a time metric, write the method: e.g. `timed N tickets before/after on the same queue`. Inventing a method after the fact is worse than dropping the number.

   **Bioinformatics — replace “half” the same way.**

   - `Wrote a Python pipeline (Bakta → Roary → VeryFastTree → EcoSim) that replaced a manual gene presence/absence workflow.`
   - `Separated species-level genomes from sequencing data with Pandas; plotted trees in Matplotlib for the lab.`

   **Additive manufacturing**

   - `Modeled heat spread in a DED metal print as a graph and compared simulated vs printed geometries to calibrate the tool.`

   **Remindr (lead project)**

   - `Shipped an offline-first reminder daemon in C++17 (Unix-socket IPC, libcurl sync, last-write-wins + tombstones) with a Go/Postgres API and React dashboard at remindr.gfedolfi.dev.`
   - `Added JWT auth, Docker deploy on Railway, and GitHub Actions for Go tests, web build, and C++ on Linux + macOS.`

   **SolverRL (one bullet a human can repeat, then one technical)**

   - `Reproduced a 2026 paper: distill a PPO policy into a Prolog decision list, then only accept program edits that raise exact discounted return on a finite KeyDoor MDP.`
   - `C++17 core (FOIL-style induction, Bellman solve, EXPAND loop) with pybind11, GoogleTest/pytest CI, and a one-command pipeline from checkpoint to metrics.`

   Drop the CartPole / MiniGrid transfer sentence from the resume unless you have a third line of space. Keep it on GitHub.

   **TermiTama:** one line or cut it. Do not spend two bullets on a Tamagotchi clone if Remindr and SolverRL need room.

   **Do not list Portfolio OS** as a resume project.

3. **Cut Technical Skills** to the same list as [about.md](./about.md). Add a second line if needed:

   - `Also in coursework: C, SML, C#, PHP`

   Do not put Django, MongoDB, Node.js, or GDScript on the skills line without a repo.

4. **Coursework.** If you have taken Algorithms (or Discrete + a theory course you would defend as algorithms), name it. If not, do not fake it — see the last item in [github.md](./github.md) for the interview gap.

5. **Remove the phone number** from the PDF header.

6. **Export and drop in** `public/resume.pdf`. Filename in `Resume.jsx` is already `Giancarlo-Fedolfi-Resume.pdf`.

7. **Copy the same bullets** into `resume.experience` / `resume.research` / `resume.projects` in `portfolio.js` so the site data does not drift.

## Verify

- Download from the live Resume window. One page. No phone.
- Read only the first line of each bullet out loud. If you cannot finish it in one breath, shorten it.
- For every number (85%, half, 16K states): write three sentences you would say in an interview. If you cannot, delete the number.
- `portfolio.js` `resume` matches the PDF.
- PDF still renders in Chrome/Firefox; if inline `<object>` fails, Download still works (already implemented).
