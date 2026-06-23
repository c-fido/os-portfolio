// ============================================================
// EDIT THIS FILE to customize your portfolio content
// ============================================================

export const person = {
  name: "Giancarlo Fedolfi",
  title: "CS & German Student · Wesleyan University",
  location: "Connecticut",
  email: "fedolficarlo@gmail.com",
  github: "https://github.com/c-fido",
  linkedin: "https://www.linkedin.com/in/giancarlo-fedolfi-652026306/",
  website: "https://gfedolfi.dev",
};

export const bio = `Hi, I'm Giancarlo!

I'm a Computer Science & German student at Wesleyan University (Class of 2027) based in Connecticut. I enjoy building things, from web apps and terminal games to bioinformatics pipelines.

Most recently I interned as a Software Engineer at turingpoint GmbH in Hamburg, where I built a vulnerability database using Python and the OpenAI API. I'm currently working as a Research Assistant in Wesleyan's Bioinformatics lab, analyzing genome sequencing data with Python.

Outside of coding I run varsity indoor and outdoor track, and I speak German at a B2 level.

── Currently ──────────────────────────────────
→ Bioinformatics Research @ Wesleyan University
→ Additive Manufacturing Research @ Wesleyan University
→ B.A. Computer Science & German (Expected May 2027)
→ Building personal projects and contributing to open source

── Technical Stack ────────────────────────────
→ Languages: Python, C++, C, JavaScript, SQL, PHP, C#, GDScript
→ Frameworks: React, Django, Node.js, MongoDB, BeautifulSoup
→ Tools: Git, Figma, JIRA, LiteLLM

── Interests ──────────────────────────────────
→ Systems programming & game development
→ Bioinformatics & data pipelines
→ Full-stack web applications
→ Language learning (German B2)

Feel free to reach out, I'm always open to interesting projects!

fedolficarlo@gmail.com`;

export const skills = {
  languages: ["Python", "C++", "C", "JavaScript", "SQL", "PHP", "C#", "SMLNJ", "GDScript"],
  frameworks: ["React", "React Native", "Django", "Node.js", "MongoDB", "BeautifulSoup", "LiteLLM"],
  tools: ["Git", "Figma", "JIRA", "PostgreSQL", "OpenAI API", "Google Search API", "Microsoft Office"],
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
  experience: [
    {
      role: "Software Engineer Intern",
      company: "turingpoint GmbH",
      location: "Hamburg, Germany",
      period: "Sep. 2025 – Dec. 2025",
      bullets: [
        "Designed and built a web-based vulnerability database using Python and the OpenAI API, improving classification accuracy and reducing manual research time by 85%.",
        "Integrated automated data retrieval via Google Search API to enhance coverage and reliability of records.",
        "Collaborated cross-functionally with engineers and designers to prototype and refine UI components in Figma.",
      ],
    },
  ],
  research: [
    {
      role: "Research Assistant",
      company: "Bioinformatics Research · Wesleyan University",
      location: "Middletown, CT",
      period: "Jan. 2026 – Present",
      bullets: [
        "Analyzed genome sequencing data to identify and separate species-level genomes using Python with Pandas.",
        "Built a pipeline to gather data from the web, feeding it into Bakta then Roary to produce gene presence/absence trees — improving previous efficiency by 50%.",
        "Visualized data with Matplotlib for gene presence/absence trees.",
      ],
    },
    {
      role: "Research Assistant",
      company: "Metal Manufacturing Research · Wesleyan University",
      location: "Middletown, CT",
      period: "June. 2026 – Present",
      bullets: [
        "Worked with graph theory to simulate heat dispersion for geometries",
        "Wrote a python script to analyze the data using Matplotlib, Numpy, and Pandas to compare the simulation to the real data",
        "Learned how to operate a welding robot using RAPID and RobotStudio.",
      ],
    }
  ],
  education: [
    {
      degree: "B.A. in Computer Science, German Studies",
      school: "Wesleyan University · Middletown, CT",
      period: "Expected May 2027",
      details: "GPA: 3.74 · Dean's List · Scholar-Athlete Honors Award · Varsity Track Captain",
    },
  ],
};
