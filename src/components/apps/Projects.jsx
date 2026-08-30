import { projects } from '../../data/portfolio';

const featured = projects.filter(p => p.featured);

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
          <span className="project-card-title">{project.title}</span>
        </div>
        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="win95-btn"
              style={{ minWidth: 'auto', padding: '2px 8px', textDecoration: 'none', color: '#000' }}
              onClick={e => e.stopPropagation()}
            >
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="win95-btn"
              style={{ minWidth: 'auto', padding: '2px 8px', textDecoration: 'none', color: '#000' }}
              onClick={e => e.stopPropagation()}
            >
              Demo
            </a>
          )}
        </div>
      </div>

      <p className="text-prose" style={{ margin: 0, color: '#222' }}>
        {project.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
        {project.tags.map(tag => (
          <span key={tag} className="project-tag">{tag}</span>
        ))}
        <span style={{ marginLeft: 'auto', color: '#666', fontSize: '11px' }}>
          {project.demo ? 'Live demo' : 'GitHub only'}
        </span>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <div className="win95-app" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--color-surface)' }}>
      <div
        className="os-scrollbar win95-content"
        style={{
          flex: 1, overflow: 'auto', padding: '10px',
          background: '#fff', margin: '4px',
          boxShadow: 'inset 1px 1px 0 #808080, inset -1px -1px 0 #fff, inset 2px 2px 0 #000, inset -2px -2px 0 #dfdfdf',
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))',
          gap: '10px',
        }}>
          {featured.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <div className="win95-statusbar" style={{ flexShrink: 0 }}>
        <span className="win95-statusbar-panel">{featured.length} object(s)</span>
      </div>
    </div>
  );
}

