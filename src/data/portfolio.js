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
→ Bioinformatics Research @ Wesleyan University
→ Additive Manufacturing Research @ Wesleyan University
→ B.A. Computer Science & German (Expected May 2027)
→ Building personal projects

── Technical Stack ────────────────────────────
→ Languages: Python, C++, C, JavaScript, SQL, PHP, C#, GDScript
→ Frameworks: React, Django, Node.js, MongoDB, BeautifulSoup
→ Tools: Git, Figma, JIRA, LiteLLM

── Interests ──────────────────────────────────
→ Systems programming & game development
→ Bioinformatics & data pipelines
→ Full-stack web applications
→ Language learning (German B2)
→ Running, reading, and parkour!

Feel free to reach out, I'm always open to interesting projects or book recommendations!

fedolficarlo@gmail.com`;

export const skills = {
  languages: ["Python", "C++", "C", "JavaScript", "SQL", "PHP", "C#", "SMLNJ", "GDScript"],
  frameworks: ["React", "Django", "Node.js", "Git", "MongoDB", "Figma", "LiteLLM", "BeautifulSoup", "JIRA", "Microsoft Office"],
};

export const projects = [
  {
    id: 1,
    title: "Portfolio OS",
    description: "This site — a portfolio that looks and feels like a desktop OS, with draggable windows, a terminal, and built-in games.",
    tags: ["React", "Vite", "JavaScript"],
    github: "https://github.com/c-fido/os-portfolio",
    demo: "https://gfedolfi.dev",
    featured: true,
  },
  {
    id: 2,
    title: "TermiTama",
    description: "A Tamagotchi-like game playable entirely in the terminal, with a TUI and genetics for offspring from multiple Tamagotchi.",
    tags: ["C++", "TUI", "Terminal"],
    github: "https://github.com/c-fido/termitama",
    demo: null,
    featured: true,
  },
  {
    id: 3,
    title: "Typing Trainer",
    description: "A terminal-based typing trainer with WPM tracking, paired-letter accuracy, locally-hosted multiplayer, and targeted practice for weak keys.",
    tags: ["C++", "Terminal", "Multiplayer"],
    github: "https://github.com/c-fido/typing_trainer",
    demo: null,
    featured: true,
  },
  {
    id: 4,
    title: "Remindr",
    description: "A lightweight desktop notification scheduler for macOS and Linux, built with two binaries and a shared helper library.",
    tags: ["C++", "macOS", "Linux"],
    github: "https://github.com/c-fido/Remindr",
    demo: null,
    featured: false,
  },
  {
    id: 5,
    title: "Personal Site",
    description: "A personal website built with TypeScript — a simpler, earlier iteration of my web presence.",
    tags: ["TypeScript", "Web"],
    github: "https://github.com/c-fido/personal-site",
    demo: null,
    featured: false,
  },
  {
    id: 6,
    title: "Spark",
    description: "Led a cross-functional team of 5 to build an educational game teaching students about renewable energy, using Godot and GDScript.",
    tags: ["Godot", "GDScript", "Game Dev"],
    github: "https://github.com/The-Spark-Industries/spark-energy",
    demo: null,
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
      title: "Sports Warehouse",
      tags: "React Native, PHP, PostgreSQL, MongoDB",
      period: "May 2025",
      bullets: [
        "Built a full-stack Android app with React Native (Expo), a PHP backend, MongoDB for product data, and PostgreSQL for inventory queries, as part of a 3-person team.",
        "Added inventory and order management features with full CRUD support.",
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
      title: "Remindr",
      tags: "C++, Swift",
      period: "May 2026",
      bullets: [
        "Built a cross-platform (macOS/Linux) desktop notification scheduler with a daemon/CLI split architecture, Unix domain socket IPC, natural language time parsing, and recurrence scheduling.",
        "Swift helper for native macOS UNUserNotificationCenter notifications; persistent JSON reminder store via nlohmann/json.",
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
