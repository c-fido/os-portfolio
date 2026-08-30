// ============================================================
// EDIT THIS FILE to customize your portfolio content
// ============================================================

export const person = {
  name: "Giancarlo Fedolfi",
  title: "CS & German Student · Wesleyan University",
  location: "Middletown, CT",
  phone: "+1 (860) 967-6556",
  email: "fedolficarlo@gmail.com",
  github: "https://github.com/c-fido",
  linkedin: "https://www.linkedin.com/in/giancarlo-fedolfi-652026306/",
  website: "https://gfedolfi.dev",
};

export const bio = `Hi, I'm Giancarlo!

I'm a Computer Science & German student at Wesleyan
University (Class of 2027). I interned as a Software
Engineer at turingpoint GmbH in Hamburg, where I built
a web-based CVE classification system in Python using
LiteLLM to route Anthropic API calls.

I'm a Research Assistant in Wesleyan's Bioinformatics
lab (genome sequencing pipelines in Python) and the
Additive Manufacturing lab (heat-dispersion simulation
with graph theory). Outside the lab I'm captain of
varsity indoor and outdoor track.

── Currently ──────────────────────────────────
→ SolverRL — PPO teacher → SWI-Prolog decision lists
→ Remindr — offline-first reminders (remindr.gfedolfi.dev)
→ Bioinformatics Research @ Wesleyan University
→ Additive Manufacturing Research @ Wesleyan University
→ B.A. Computer Science & German (Expected May 2027)

── Technical Stack ────────────────────────────
→ Languages: Python, C++, C, Go, JS/TS, SQL, PHP, C#,
  SMLNJ, GDScript
→ Frameworks & Tools: React, Go (chi), Django, Node.js,
  PostgreSQL, Docker, Git, GitHub Actions, MongoDB,
  Vite, Railway, Vercel, Figma, LiteLLM, BeautifulSoup,
  JIRA

── Education ──────────────────────────────────
→ GPA: 3.74/4.0 · Dean's List · Scholar-Athlete Honors
→ Coursework: Software Engineering, Automata Theory,
  Discrete Mathematics, Logic & Functional Programming,
  Computational Media (Game Development), Data Structures,
  Information Security and Privacy

── Links ──────────────────────────────────────
→ GitHub:   github.com/c-fido
→ SolverRL: github.com/c-fido/solverRL
→ Website:  gfedolfi.dev
→ Remindr:  remindr.gfedolfi.dev
→ LinkedIn: linkedin.com/in/giancarlo-fedolfi-652026306

Feel free to reach out — I'm always open to interesting
projects or book recommendations.

fedolficarlo@gmail.com`;

export const skills = {
  languages: ["Python", "C++", "C", "Go", "JavaScript", "TypeScript", "SQL", "PHP", "C#", "SMLNJ", "GDScript"],
  frameworks: ["React", "Go (chi)", "Django", "Node.js"],
  tools: ["PostgreSQL", "Docker", "Git", "GitHub Actions", "MongoDB", "Vite", "Railway", "Vercel", "Figma", "LiteLLM", "BeautifulSoup", "JIRA"],
};

export const projects = [
  {
    id: 1,
    title: "SolverRL",
    description: "Reproduces a research pipeline that distills a frozen PPO teacher into an executable SWI-Prolog decision list over a finite KeyDoor MDP (~16K reachable states): FOIL-style rule induction in C++, a certified EXPAND loop, MiniGrid DoorKey transfer, and one-command reproduction from checkpoint to metrics.",
    tags: ["C++17", "Python", "SWI-Prolog", "pybind11"],
    github: "https://github.com/c-fido/solverRL",
    demo: null,
    featured: true,
  },
  {
    id: 2,
    title: "Remindr",
    description: "Cross-platform desktop reminder daemon (C++17) with offline-first cloud sync: background REST push/pull, Unix-socket IPC, last-write-wins merge, a Go API on PostgreSQL, and a React dashboard deployed with Docker / Railway / Vercel.",
    tags: ["C++17", "Go", "React", "PostgreSQL"],
    github: "https://github.com/c-fido/Remindr",
    demo: "https://remindr.gfedolfi.dev",
    featured: true,
  },
  {
    id: 3,
    title: "TermiTama",
    description: "A terminal virtual pet in C++17 with FTXUI: FSM lifecycle (Baby → Adult), four stat systems with offline decay capped at 12 hours, genetics with heritable caps, and JSON persistence for a Pet Box of up to 6 pets.",
    tags: ["C++17", "FTXUI", "CMake"],
    github: "https://github.com/c-fido/termitama",
    demo: null,
    featured: true,
  },
  {
    id: 4,
    title: "Portfolio OS",
    description: "This site — a Windows 95-style desktop with draggable windows, MS-DOS Prompt, Minesweeper, Snake, Connect Four, Books, and My Computer.",
    tags: ["React", "Vite", "JavaScript"],
    github: "https://github.com/c-fido/os-portfolio",
    demo: "https://gfedolfi.dev",
    featured: true,
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
        "Built a web-based CVE classification system in Python using LiteLLM to route Anthropic API calls, cutting manual research time by 85%.",
        "Automated data ingestion by integrating the Brave Search API with BeautifulSoup scraping.",
        "Designed and iterated on UI/UX mockups in Figma with engineers and product managers to make the tool usable by non-technical reviewers.",
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
        "Analyzed genome sequencing data to separate species-level genomes using Python and Pandas.",
        "Built a pipeline to gather data from the web, feeding it into Bakta, Roary, Veryfasttree, then Ecosim to get gene presence/absence trees, replacing a manual process and cutting runtime by half.",
        "Visualized gene presence/absence trees with Matplotlib.",
      ],
    },
    {
      role: "Research Assistant",
      company: "Additive Manufacturing Research · Wesleyan University — Prof. Chang-Davidson",
      location: "Middletown, CT",
      period: "June 2026 – Present",
      bullets: [
        "Developed a model using graph theory to simulate heat dispersion in a DED metal print.",
        "Simulated and printed different geometries to test accuracy and calibrate the software.",
      ],
    },
  ],
  projects: [
    {
      title: "SolverRL",
      tags: "C++17, pybind11, Python, SWI-Prolog, Stable-Baselines3, CMake, GoogleTest",
      period: "August 2026",
      bullets: [
        "Reproduced a research pipeline that distills a frozen PPO teacher into an executable SWI-Prolog decision list over a finite KeyDoor MDP (~16K reachable states): reachable-state census, FOIL-style relational rule induction in C++, and first-match Prolog emission with cut semantics.",
        "Built a certified EXPAND loop in C++ that accepts program edits only when exact discounted return rises (Bellman linear solves over the full model), reports monotone certified-return curves and an advantage-gap certificate vs. the greedy teacher, and targets paper-comparable R1 optimum / R2 recovery from undertrained teachers.",
        "Extended the same C++ rule-learning core to MiniGrid DoorKey relational transfer (8×8 train → 6×6 / 16×16 eval with unchanged Prolog) and a thin CartPole DAgger honesty baseline; wired pybind11 + pytest/GoogleTest CI and one-command reproduction from checkpoint → census → distill → expand → metrics.",
      ],
    },
    {
      title: "Remindr",
      tags: "C++17, Go, React, PostgreSQL, Docker, GitHub Actions",
      period: "June 2026",
      bullets: [
        "Extended a cross-platform desktop reminder daemon (C++17) with offline-first cloud sync: background worker pushes/pulls via REST, Unix-socket IPC, and a last-write-wins merge with soft-delete tombstones.",
        "Built a Go REST API (JWT auth, CRUD, sync endpoint) backed by PostgreSQL (Neon); deployed on Railway with Docker; React dashboard on Vercel with custom domain and CORS.",
        "Implemented libcurl sync client in the daemon, credential persistence for launchd, and GitHub Actions CI (Go tests, web build, C++/Linux + macOS).",
      ],
    },
    {
      title: "TermiTama",
      tags: "C++17, CMake, FTXUI, JSON",
      period: "April 2026",
      bullets: [
        "Built a terminal virtual pet game in C++17 using FTXUI with an FSM-driven lifecycle (Baby → Adult), four stat systems with offline time-delta decay capped at 12 hours, and a genetics engine with heritable stat caps and ±10% random mutation across breeding generations.",
        "Implemented a persistent save system using JSON serialization that auto-saves after every action, restores full game state on launch, and supports a Pet Box of up to 6 simultaneously active pets with free switching and adoption.",
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
