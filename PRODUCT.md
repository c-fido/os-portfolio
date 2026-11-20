# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: tech recruiters and hiring managers** screening Giancarlo for SWE internship and new-grad roles (he graduates May 2027). They give the site a few seconds, want the resume and the strongest projects right away, and need to come away able to retell the work (Remindr, the turingpoint internship) in a sentence.
- **Secondary: engineers and peers** who go further: they read project details, follow GitHub links, try the board's "Where to?" filter, and judge craft from how the site itself is built.

## Product Purpose

A personal portfolio at gfedolfi.dev for Giancarlo Fedolfi (CS & German, Wesleyan, Class of 2027). It exists to turn a visit into a callback: the resume, projects, and a way to make contact should be reachable within about two seconds of landing, on both desktop and mobile. Success means a recruiter sees Resume + Projects without hunting, and an engineer finds enough depth to take the work seriously.

## Positioning

A one-page portfolio set as a German station departures board, with something to play with and no navigation friction: the Win95 desktop (to Oct 2026) and the Leitz-Ordner shelf were retired as gimmicky, and the Munich '72 programme (Nov 2026) as bland. Personality comes from real things: books (live), Hamburg and the German major, track. Small rewards for the curious (split-flap motion, the Where-to filter, the live Hamburg clock, German glosses) never sit in the way.

## Operating Context

- Visitors usually arrive from a resume, LinkedIn, or an application link, sometimes as a hash deep link (`#resume`, `#remindr`, `#about`, `#contact`; older `#projects`/`#inbox` still work).
- All widths: departures expand in place beneath their row; Remindr open on first load.
- Narrow screens (<900px): rows stack time/train/status over the destination modules.
- Engineers expand entries for build details and may read the repo itself.

## Capabilities and Constraints

- Sections: Projects & work (featured projects, internship, research, more projects), Resume (education, skills, PDF), Off hours (Books from Supabase, Track, Hamburg), Contact (email; Formspree send when `VITE_FORMSPREE_ENDPOINT` is set). Terminal and games were retired Nov 2026.
- Track personal bests live in `track` in `src/data/portfolio.js` and show only when filled in; never invent them.
- **Recruiter-first:** personal sections stay below the work and never sit between a visitor and the resume or projects.
- Content lives in `src/data/portfolio.js`; `public/resume.pdf` is what the Resume app shows, and the two must say the same thing.
- Deployed to GitHub Pages via GitHub Actions; env secrets for Supabase and Formspree. Stack: React 19, Vite, custom CSS, self-hosted Barlow and Barlow Condensed (@fontsource).

## Brand Commitments

- Name: Giancarlo Fedolfi; domain gfedolfi.dev; GitHub `c-fido`.
- Voice: plain, first-person, specific. Concrete systems and outcomes, no marketing adjectives (see `bio` in `src/data/portfolio.js`).
- The look is not a fixed commitment; the Win95 desktop was replaced in Oct 2026. Labels are English; German appears only as small glosses and detail.
- The turingpoint internship is past (Sep–Dec 2025); never describe it in the present tense.

## Evidence on Hand

- Projects with live code: Remindr (remindr.gfedolfi.dev, github.com/c-fido/Remindr), SolverRL, CVE Triage Agent, TermiTama, Portfolio OS.
- Experience: SWE intern at turingpoint GmbH, Hamburg (Sep–Dec 2025); research assistant roles in bioinformatics and additive manufacturing at Wesleyan; varsity track captain.
- Resume: `public/resume.pdf`.
- **Absent and never to be invented:** testimonials, user counts, adoption or performance metrics, employer endorsements. Every claim on the site must be backed by the resume, a repo, or a live demo.

## Product Principles

1. **Work first, play second.** Resume and projects come before any delight; easter eggs reward people who explore and never get in their way.
2. **Show, don't claim.** The site's own engineering and linked live work do the persuading; copy stays factual and checkable.
3. **Retellable in one breath.** Every surface should help a recruiter repeat what Giancarlo built and where.
4. **Depth for the curious.** Engineers who dig further (the filter, repos, project detail) should find real substance.
