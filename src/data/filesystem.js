// ============================================================
// EDIT THIS FILE to customize the Finder.app file system
// ============================================================

import { projects, bio, skills, person } from './portfolio';

function skillsText() {
  return Object.entries(skills)
    .map(([cat, items]) => `${cat}:\n  ${items.join(', ')}`)
    .join('\n\n');
}

// Each node: { name, type: 'folder'|'file', children?, content?, projectId? }
// projectId links a file to a projects entry so Finder can render a project card.

export const filesystem = {
  name: '~',
  type: 'folder',
  children: [
    {
      name: 'Projects',
      type: 'folder',
      children: projects.map(p => ({
        name: `${p.title.toLowerCase().replace(/[\s/]+/g, '-')}.md`,
        type: 'file',
        projectId: p.id,
        content: [
          `# ${p.title}`,
          '',
          p.description,
          '',
          `**Tags:** ${p.tags.join(', ')}`,
          p.github ? `\n[GitHub](${p.github})` : '',
          p.demo ? `  [Live Demo](${p.demo})` : '',
        ].join('\n'),
      })),
    },
    {
      name: 'About',
      type: 'folder',
      children: [
        {
          name: 'bio.txt',
          type: 'file',
          content: bio,
        },
        {
          name: 'skills.txt',
          type: 'file',
          content: skillsText(),
        },
      ],
    },
    {
      name: 'Writing',
      type: 'folder',
      children: [
        {
          name: 'why-i-code.md',
          type: 'file',
          content: `# Why I Code

I started coding because I genuinely love working and twiddling with code and computers. Since middle school, I've been fascinated by computers and technology. 

Whether it's building my own computers, fixing laptops, failing to work with Linux, or building my own websites, I've always been fascinated by the process of turning ideas into reality.

There's something really fun about seeing something you made come to life on your screen, something I haven't found in any other field of study.`,
        },
      ],
    },
    {
      name: 'Contact',
      type: 'folder',
      children: [
        {
          name: 'reach-me.txt',
          type: 'file',
          content: `Email:    ${person.email}
GitHub:   ${person.github}
LinkedIn: ${person.linkedin}
Website:  ${person.website}

Always open to interesting opportunities and conversations.`,
        },
      ],
    },
  ],
};
