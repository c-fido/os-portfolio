// ============================================================
// EDIT THIS FILE to customize your portfolio content
// ============================================================

export const person = {
  name: "Giancarlo Fedolfi",
  title: "CS & German · Wesleyan University · Class of 2027",
  location: "Middletown, CT",
  email: "fedolficarlo@gmail.com",
  github: "https://github.com/c-fido",
  linkedin: "https://www.linkedin.com/in/giancarlo-fedolfi-652026306/",
  website: "https://gfedolfi.dev",
};

export const bio = `Hi, I'm Giancarlo.

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

fedolficarlo@gmail.com`;

export const skills = {
  languages: ["C++", "Go", "Python", "TypeScript", "JavaScript", "SQL"],
  frameworks: ["React", "Go (chi)"],
  tools: ["PostgreSQL", "Docker", "CMake", "Git", "GitHub Actions", "Vite", "Railway", "Vercel"],
};

export const projects = [
  {
    id: 1,
    title: "Remindr",
    description: "Offline-first reminder daemon in C++17 (Unix sockets, background sync) with a Go API on Postgres and a React dashboard. Live at remindr.gfedolfi.dev.",
    tags: ["C++17", "Go", "React", "PostgreSQL"],
    github: "https://github.com/c-fido/Remindr",
    demo: "https://remindr.gfedolfi.dev",
    featured: true,
  },
  {
    id: 2,
    title: "SolverRL",
    description: "C++/Python reproduction of a paper that turns a PPO policy into an executable Prolog program, then only keeps edits that raise exact return. Tests and one-command pipeline on GitHub.",
    tags: ["C++17", "Python", "SWI-Prolog"],
    github: "https://github.com/c-fido/solverRL",
    demo: null,
    featured: true,
  },
  {
    id: 3,
    title: "CVE Triage Agent",
    description: "Python agent that looks up dependency CVEs (OSV/NVD/GitHub), checks whether your code actually calls the vulnerable path, and writes a severity report. Not just CVSS copy-paste.",
    tags: ["Python", "Anthropic API"],
    github: "https://github.com/c-fido/cve-triage-agent",
    demo: null,
    featured: true,
  },
  {
    id: 4,
    title: "TermiTama",
    description: "Terminal Tamagotchi in C++17 / FTXUI: lifecycle FSM, offline stat decay, breeding, JSON save.",
    tags: ["C++17", "FTXUI", "CMake"],
    github: "https://github.com/c-fido/termitama",
    demo: null,
    featured: false,
  },
  {
    id: 5,
    title: "Portfolio OS",
    description: "This site: Win95-style desktop in React.",
    tags: ["React", "Vite", "JavaScript"],
    github: "https://github.com/c-fido/os-portfolio",
    demo: "https://gfedolfi.dev",
    featured: false,
  },
];

export const resume = {
  pdfUrl: "/resume.pdf",
  experience: [
    {
      role: "Software Engineer Intern",
      company: "turingpoint GmbH",
      location: "Hamburg, Germany",
      period: "September 2025 – December 2025",
      bullets: [
        "Built a Python CVE classification app (LiteLLM → Anthropic) that non-engineers used to triage findings instead of reading advisories by hand.",
        "Pulled advisory text via Brave Search + BeautifulSoup so reviewers started from evidence, not a CVSS number.",
        "Designed Figma flows with PMs so the tool shipped to non-technical reviewers.",
      ],
    },
  ],
  research: [
    {
      role: "Research Assistant",
      company: "Bioinformatics Research · Wesleyan University — Prof. Cohan, Prof. Krizanc",
      location: "Middletown, CT",
      period: "February 2026 – Present",
      bullets: [
        "Wrote a Python pipeline (Bakta → Roary → VeryFastTree → EcoSim) that replaced a manual gene presence/absence workflow.",
        "Separated species-level genomes from sequencing data with Pandas; plotted trees in Matplotlib for the lab.",
      ],
    },
    {
      role: "Research Assistant",
      company: "Additive Manufacturing Research · Wesleyan University — Prof. Chang-Davidson",
      location: "Middletown, CT",
      period: "June 2026 – Present",
      bullets: [
        "Modeled heat spread in a DED metal print as a graph and compared simulated vs printed geometries to calibrate the tool.",
      ],
    },
  ],
  projects: [
    {
      title: "Remindr",
      tags: "C++17, Go, React, PostgreSQL, Docker, GitHub Actions",
      period: "June 2026",
      bullets: [
        "Shipped an offline-first reminder daemon in C++17 (Unix-socket IPC, libcurl sync, last-write-wins + tombstones) with a Go/Postgres API and React dashboard at remindr.gfedolfi.dev.",
        "Added JWT auth, Docker deploy on Railway, and GitHub Actions for Go tests, web build, and C++ on Linux + macOS.",
      ],
    },
    {
      title: "SolverRL",
      tags: "C++17, pybind11, Python, SWI-Prolog, CMake, GoogleTest",
      period: "August 2026",
      bullets: [
        "Reproduced a 2026 paper: distill a PPO policy into a Prolog decision list, then only accept program edits that raise exact discounted return on a finite KeyDoor MDP.",
        "C++17 core (FOIL-style induction, Bellman solve, EXPAND loop) with pybind11, GoogleTest/pytest CI, and a one-command pipeline from checkpoint to metrics.",
      ],
    },
    {
      title: "CVE Triage Agent",
      tags: "Python, Anthropic API",
      period: "July 2026",
      bullets: [
        "Built a Python agent that looks up dependency CVEs, checks whether the vulnerable code path is actually reachable, and writes a severity report with evidence.",
      ],
    },
  ],
  education: [
    {
      degree: "B.A. in Computer Science, German",
      school: "Wesleyan University · Middletown, CT",
      period: "Expected May 2027",
      details: "GPA: 3.74/4.0 · Dean's List · Scholar-Athlete Honors Award · Varsity Indoor and Outdoor Track and Field Captain",
      coursework: "Software Engineering, Automata Theory, Discrete Mathematics, Logic & Functional Programming, Computational Media (Game Development), Data Structures, Information Security and Privacy",
    },
  ],
};
