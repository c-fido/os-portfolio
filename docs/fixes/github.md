# GitHub (and the links on this site)

**Problem:** The site sends recruiters to github.com/c-fido. That profile still says Junior, Remindr still says the web app is “coming soon,” SolverRL has no description, TermiTama’s README clone URL is wrong, and `ai-job-search` sits next to the work you want hired for.

**Goal:** Every outbound GitHub click matches the live demos and the resume. Profile year matches Class of 2027.

These steps are on GitHub.com and in other repos. Only the last item is in this repo.

## Steps

1. **Profile (`github.com/c-fido` and repo `c-fido/c-fido`).**

   - Bio: `CS & German @ Wesleyan · Class of 2027` (not Junior).
   - Pin, in order: Remindr, solverRL, cve-triage-agent, os-portfolio (or termitama). Unpin toys if you are over six pins.
   - Location / website: Middletown, CT and `https://gfedolfi.dev`.

2. **Remindr (`c-fido/Remindr`).**

   - Description: `Offline-first reminder daemon (C++17) + Go API + React dashboard`.
   - Website field: `https://remindr.gfedolfi.dev` (not `remindr-xi.vercel.app`).
   - Confirm README “Live demo” table matches that URL and the current Railway health URL.
   - If the project is idle, that is fine — stale *copy* is the bug, not a quiet repo.

3. **SolverRL (`c-fido/solverRL`).**

   - Description: `Distill a PPO teacher into a Prolog decision list with a certified EXPAND loop`.
   - Leave the long README; recruiters who click through can handle it. The empty GitHub blurb is what shows in search and on your profile.

4. **TermiTama README.**

   - Clone URL is `github.com/cfido/termitama` today. Change it to `github.com/c-fido/termitama`.
   - Binary name vs folder: make `git clone` + the documented `./virtual_pet` path actually work, or fix the docs to the real target name.

5. **CVE Triage Agent.**

   - Keep public if it is yours and not intern IP. Add a 1–2 sentence GitHub description.
   - If any of it is turingpoint’s, make the repo private and only describe the intern work in prose on the resume.

6. **`ai-job-search`.**

   - Make private, or delete the fork from this account. A hiring manager who sees “let Claude tailor CVs and cover letters” on the same profile as your application will distrust the writing. Use a throwaway account if you still want the tool.

7. **LinkedIn.** Same class year as GitHub and About.txt (senior / Class of 2027 as of Fall 2026). Headline can mention Remindr or turingpoint, not “Junior.”

8. **This repo (`os-portfolio`).**

   - README already points at `#resume` / `#projects` / `#inbox`. After [desktop.md](./desktop.md), those hashes should match the default desktop.
   - `CNAME` / `gfedolfi.dev` stay as they are.

9. **Interview gap (not a GitHub click, but the same “land a job” work).**  
   Competitive intern loops start with timed coding. If Algorithms is not on the transcript, take it or grind a named set (e.g. NeetCode 150) until you can pass a 45-minute screen. One real PR on someone else’s repo beats another solo game.

## Verify

- Incognito → github.com/c-fido: bio is Class of 2027, pinned repos match the Projects window.
- Remindr repo header: description + homepage match remindr.gfedolfi.dev. Open the demo; register still works.
- `git clone` instructions in TermiTama do not 404.
- `ai-job-search` is not visible on the public profile.
- LinkedIn + GitHub + `person.title` in `portfolio.js` agree.
