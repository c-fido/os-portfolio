import { bio, person } from '../../../data/portfolio';
import { tidy } from '../../../lib/archive';

// bio is plain text with "── Heading ──" rules and "→" list lines; turn it into real structure.
const LINKABLE = /((?:https?:\/\/)?(?:[a-z0-9-]+\.)+(?:dev|com|io|org|edu)(?:\/[^\s]*)?|[\w.+-]+@[\w-]+\.[\w.]+)/gi;

function linkify(text) {
  return text.split(LINKABLE).map((part, i) => {
    if (i % 2 === 0) return part;
    const href = part.includes('@') ? `mailto:${part}` : part.startsWith('http') ? part : `https://${part}`;
    return <a key={part} href={href} target={part.includes('@') ? undefined : '_blank'} rel="noopener noreferrer">{part}</a>;
  });
}

function parseBio(text) {
  const blocks = [];
  let current = { heading: null, paragraphs: [], items: [] };
  let para = [];
  const flushPara = () => { if (para.length) current.paragraphs.push(para.join(' ')); para = []; };

  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (line.startsWith('──')) {
      flushPara();
      blocks.push(current);
      current = { heading: line.replace(/─/g, '').trim(), paragraphs: [], items: [] };
    } else if (line.startsWith('→')) {
      flushPara();
      current.items.push(line.replace(/^→\s*/, ''));
    } else if (!line) {
      flushPara();
    } else {
      para.push(line);
    }
  }
  flushPara();
  blocks.push(current);
  return blocks.filter(b => b.heading || b.paragraphs.length || b.items.length);
}

const blocks = parseBio(tidy(bio));

export default function AboutFile() {
  const [intro, ...rest] = blocks;
  return (
    <>
      <h2 className="page-title" data-ordner-heading tabIndex={-1}>Über mich <span>About</span></h2>
      <section className="page-section page-prose">
        {intro.paragraphs.map(p => <p key={p}>{linkify(p)}</p>)}
      </section>
      {rest.map(b => (
        <section key={b.heading} className="page-section">
          <h3 className="section-title">{b.heading}</h3>
          {b.paragraphs.map(p => <p key={p}>{linkify(p)}</p>)}
          {b.items.length > 0 && <ul className="page-list">{b.items.map(item => <li key={item}>{linkify(item)}</li>)}</ul>}
        </section>
      ))}
      <p className="cv-muted">Based in {person.location}.</p>
    </>
  );
}
