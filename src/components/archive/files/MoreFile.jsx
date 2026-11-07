import { projects } from '../../../data/portfolio';
import { slugify, tidy } from '../../../lib/archive';

const others = projects.filter(p => !p.featured);
const host = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

export default function MoreFile() {
  return (
    <>
      <h2 className="page-title" data-ordner-heading tabIndex={-1}>Weitere <span>More projects</span></h2>
      <p className="page-lede">Smaller and older work, filed here so the shelf stays focused.</p>
      {others.map(p => (
        <section key={p.id} id={slugify(p.title)} className="page-section">
          <h3 className="section-title">{p.title}</h3>
          <p>{tidy(p.description)}</p>
          <dl className="form-rows">
            <dt>Stack</dt><dd>{tidy(p.tags.join(', '))}</dd>
            {p.github && (<><dt>Code</dt><dd><a href={p.github} target="_blank" rel="noopener noreferrer">{host(p.github)}</a></dd></>)}
            {p.demo && (<><dt>Live</dt><dd><a href={p.demo} target="_blank" rel="noopener noreferrer">{host(p.demo)}</a></dd></>)}
          </dl>
        </section>
      ))}
    </>
  );
}
