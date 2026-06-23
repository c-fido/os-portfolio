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
          p.github  ? `\n[GitHub](${p.github})`   : '',
          p.demo    ? `  [Live Demo](${p.demo})`   : '',
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

I started coding because I wanted to build things that didn't exist yet. There's something deeply satisfying about turning an idea into something real — something you can click, interact with, share.

For me, coding sits at the intersection of creativity and logic. You get to design systems, solve puzzles, and craft user experiences — all at once.

Whether it's a terminal game in C++, a bioinformatics pipeline, or a portfolio that looks like a desktop OS, I'm always looking for projects that let me learn something genuinely new.`,
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
