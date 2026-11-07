import { person, resume, skills } from '../../../data/portfolio';
import { RESUME_PDF, tidy } from '../../../lib/archive';

function Entry({ title, org, place, period, bullets }) {
  return (
    <article className="cv-entry">
      <header className="cv-entry-head">
        <h4>{title}</h4>
        <span className="cv-period">{period}</span>
      </header>
      <p className="cv-org">{tidy(org)}{place ? ` · ${place}` : ''}</p>
      {bullets?.length > 0 && <ul className="page-list">{bullets.map(b => <li key={b}>{tidy(b)}</li>)}</ul>}
    </article>
  );
}

export default function ResumeFile() {
  return (
    <>
      <h2 className="page-title" data-ordner-heading tabIndex={-1}>{person.name}</h2>
      <p className="page-lede">{person.title} · {person.location}</p>
      <div className="page-actions">
        <a className="btn btn--primary" href={RESUME_PDF} download="Giancarlo-Fedolfi-Resume.pdf">Download PDF</a>
        <a className="btn" href={`mailto:${person.email}`}>{person.email}</a>
      </div>

      <section id="experience" className="page-section">
        <h3 className="section-title">Erfahrung <span>Experience</span></h3>
        {resume.experience.map(e => (
          <Entry key={e.company} title={e.role} org={e.company} place={e.location} period={e.period} bullets={e.bullets} />
        ))}
      </section>

      <section id="research" className="page-section">
        <h3 className="section-title">Forschung <span>Research</span></h3>
        {resume.research.map(e => (
          <Entry key={e.company} title={e.role} org={e.company} place={e.location} period={e.period} bullets={e.bullets} />
        ))}
      </section>

      <section id="projects" className="page-section">
        <h3 className="section-title">Projekte <span>Projects</span></h3>
        {resume.projects.map(p => (
          <Entry key={p.title} title={p.title} org={p.tags} period={p.period} bullets={p.bullets} />
        ))}
      </section>

      <section id="education" className="page-section">
        <h3 className="section-title">Ausbildung <span>Education</span></h3>
        {resume.education.map(e => (
          <article key={e.school} className="cv-entry">
            <header className="cv-entry-head"><h4>{e.degree}</h4><span className="cv-period">{e.period}</span></header>
            <p className="cv-org">{e.school}</p>
            <p>{e.details}</p>
            <p className="cv-muted">Coursework: {e.coursework}</p>
          </article>
        ))}
      </section>

      <section id="skills" className="page-section">
        <h3 className="section-title">Kenntnisse <span>Skills</span></h3>
        <dl className="form-rows">
          {Object.entries(skills).map(([cat, items]) => (
            <div key={cat} className="form-row"><dt>{cat}</dt><dd>{tidy(items.join(', '))}</dd></div>
          ))}
        </dl>
      </section>
    </>
  );
}
