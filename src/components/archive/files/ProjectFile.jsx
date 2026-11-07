import { projects, resume } from '../../../data/portfolio';
import { tidy } from '../../../lib/archive';
import Stamp from '../Stamp';
import Arrow from '../Arrow';

const host = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

export default function ProjectFile({ ordner, onNext, nextLabel }) {
  const project = projects.find(p => p.id === ordner.projectId);
  const details = resume.projects.find(r => r.title === project.title);

  return (
    <>
      <section id="overview" className="page-section">
        <div className="page-stamps">
          <Stamp tone={project.demo ? 'red' : 'blue'}>{project.demo ? 'Live' : 'Repo'}</Stamp>
        </div>
        <h2 className="page-title" data-ordner-heading tabIndex={-1}>{project.title}</h2>
        <p className="page-lede">{tidy(project.description)}</p>

        <div className="page-actions">
          {project.demo && <a className="btn btn--primary" href={project.demo} target="_blank" rel="noopener noreferrer">Live demo</a>}
          {project.github && <a className={`btn ${project.demo ? '' : 'btn--primary'}`} href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
          <button type="button" className="btn btn--quiet" onClick={onNext}>Next: {nextLabel} <Arrow /></button>
        </div>

        <dl className="form-rows">
          <dt>Stack</dt>
          <dd>{tidy(details?.tags || project.tags.join(', '))}</dd>
          {details?.period && (<><dt>Datum <span>When</span></dt><dd>{details.period}</dd></>)}
          <dt>Status</dt>
          <dd>
            {project.demo
              ? <>Live at <a href={project.demo} target="_blank" rel="noopener noreferrer">{host(project.demo)}</a></>
              : 'Code on GitHub'}
          </dd>
          {project.github && (<><dt>Code</dt><dd><a href={project.github} target="_blank" rel="noopener noreferrer">{host(project.github)}</a></dd></>)}
        </dl>
      </section>

      {details && (
        <section id="details" className="page-section">
          <h3 className="section-title">Details <span>What I built</span></h3>
          <ul className="page-list">
            {details.bullets.map(b => <li key={b}>{tidy(b)}</li>)}
          </ul>
        </section>
      )}
    </>
  );
}
