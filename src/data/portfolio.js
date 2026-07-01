// ============================================================
// EDIT THIS FILE to customize your portfolio content
// ============================================================

export const person = {
  name: "Giancarlo Fedolfi",
  title: "CS & German Student · Wesleyan University",
  location: "Connecticut",
  phone: "+1 (860) 967-6556",
  email: "fedolficarlo@gmail.com",
  github: "https://github.com/c-fido",
  linkedin: "https://www.linkedin.com/in/giancarlo-fedolfi-652026306/",
  website: "https://gfedolfi.dev",
};

export const bio = `Hi, I'm Giancarlo!

I'm a Computer Science & German student at Wesleyan University (Class of 2027) based in Connecticut. I enjoy building things, from web apps and terminal games to bioinformatics pipelines.

Most recently I interned as a Software Engineer at turingpoint GmbH in Hamburg, where I built a vulnerability database using Python and the OpenAI API. I'm currently working as a Research Assistant in Wesleyan's Bioinformatics lab, analyzing genome sequencing data with Python, and Wesleyan's Additive Manufacturing Lab, running simulations and doing data analysis with Python and C++.

Outside of coding I'm a captain for the varsity indoor and outdoor track teams, and I speak German at a B2 level.

── Currently ──────────────────────────────────
→ Remindr — CLI reminder tool with web sync (remindr.gfedolfi.dev)
→ Bioinformatics Research @ Wesleyan University
→ Additive Manufacturing Research @ Wesleyan University
→ B.A. Computer Science & German (Expected May 2027)

── Technical Stack ────────────────────────────
→ Languages: Python, C++, C, Go, JavaScript, TypeScript, SQL, PHP, C#, GDScript
→ Frameworks: React, Django, Node.js, MongoDB, BeautifulSoup
→ Tools: Git, Figma, JIRA, LiteLLM

── Interests ──────────────────────────────────
→ Systems programming & CLI tools
→ Bioinformatics & data pipelines
→ Full-stack web applications
→ Language learning (German B2)
→ Running, reading, and parkour!

── Links ──────────────────────────────────────
→ GitHub:   github.com/c-fido
→ Website:  gfedolfi.dev
→ Remindr:  remindr.gfedolfi.dev
→ LinkedIn: linkedin.com/in/giancarlo-fedolfi-652026306

Feel free to reach out, I'm always open to interesting projects or book recommendations!

fedolficarlo@gmail.com`;

export const skills = {
  languages: ["Python", "C++", "C", "Go", "JavaScript", "TypeScript", "SQL", "PHP", "C#", "Swift", "SMLNJ", "GDScript"],
  frameworks: ["React", "Django", "Node.js", "PostgreSQL", "MongoDB", "Git", "Figma", "LiteLLM", "BeautifulSoup", "JIRA"],
};

export const projects = [
  {
    id: 1,
    title: "Remindr",
    description: "Offline-first CLI reminder tool for macOS and Linux — daemon/CLI split, native notifications, natural language scheduling, and optional cloud sync via a Go API and React web dashboard.",
    tags: ["C++", "Go", "React", "Swift"],
    github: "https://github.com/c-fido/Remindr",
    demo: "https://remindr.gfedolfi.dev",
    featured: true,
  },
  {
    id: 2,
    title: "Portfolio OS",
    description: "This site! A Win95-style portfolio with draggable windows, a working terminal, built-in games, a Books app, and a Finder file browser.",
    tags: ["React", "Vite", "JavaScript"],
    github: "https://github.com/c-fido/os-portfolio",
    demo: "https://gfedolfi.dev",
    featured: true,
  },
  {
    id: 3,
    title: "TermiTama",
    description: "A Tamagotchi-like game playable entirely in the terminal. Using FTXUI TUI, offline stat decay, genetics & breeding across up to 6 pets, and JSON persistence.",
    tags: ["C++", "TUI", "FTXUI"],
    github: "https://github.com/c-fido/termitama",
    demo: null,
    featured: true,
  },
  {
    id: 4,
    title: "Typing Trainer",
    description: "A terminal-based typing trainer with WPM tracking, SM-2 spaced repetition for bigrams, locally-hosted multiplayer, ghost-race replay, and per-session CSV logging.",
    tags: ["C++", "Terminal", "Multiplayer"],
    github: "https://github.com/c-fido/typing_trainer",
    demo: null,
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
      period: "Sep. 2025 – Dec. 2025",
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
      period: "Feb. 2026 – Present",
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
      title: "Remindr",
      tags: "C++, Go, React, Swift, PostgreSQL",
      period: "Jun. 2026 – Present",
      bullets: [
        "Built an offline-first reminder system with CLI/daemon split architecture, Unix domain socket IPC, natural language time parsing, and recurrence scheduling; Swift helper for native macOS Notification Center delivery.",
        "Added cloud sync with a Go REST API (Railway + Neon Postgres), JWT auth, and a React web dashboard — background push/pull every 60s with last-write-wins merge.",
      ],
    },
    {
      title: "TermiTama",
      tags: "C++17, CMake, FTXUI, JSON",
      period: "Apr. 2026",
      bullets: [
        "Built a terminal virtual pet game in C++17 using FTXUI with an FSM-driven lifecycle (Baby → Adult), four stat systems with offline time-delta decay capped at 12 hours, and a genetics engine with heritable stat caps and ±10% random mutation across breeding generations.",
        "Implemented a persistent save system using JSON serialization that auto-saves after every action, restores full game state on launch, and supports a Pet Box of up to 6 simultaneously active pets with free switching and adoption.",
      ],
    },
    {
      title: "Typing Trainer",
      tags: "C++, SM-2 Algorithm, Sockets",
      period: "May 2026",
      bullets: [
        "Implemented the SM-2 spaced repetition algorithm for adaptive bigram-difficulty scheduling; added local networked multiplayer, ghost-race replay, and per-session WPM/accuracy CSV logging in a custom terminal UI.",
        "Adapts to the user depending on what words and letters they make mistakes on, allowing for customized improvement for individual users.",
      ],
    },
    {
      title: "Portfolio OS",
      tags: "React, Vite, JavaScript",
      period: "Jun. 2026",
      bullets: [
        "Built a Win95-style portfolio site with draggable windows, a working terminal, built-in games, a Books app, and a Finder file browser.",
      ],
    },
  ],
  education: [
    {
      degree: "B.A. in Computer Science, German",
      school: "Wesleyan University · Middletown, CT",
      period: "Expected May 2027",
      details: "GPA: 3.74/4.0 · Dean's List · Scholar-Athlete Honors Award · Varsity Indoor and Outdoor Track and Field Captain",
      coursework: "Software Engineering, Automata Theory, Discrete Mathematics, Logic & Functional Programming, Computational Media (Game Development), Data Structures",
    },
  ],
};
