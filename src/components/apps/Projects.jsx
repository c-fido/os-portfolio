import { projects } from '../../data/portfolio';

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

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        {project.tags.map(tag => (
          <span key={tag} className="project-tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <div className="win95-app" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#c0c0c0' }}>
      <div className="win95-app-toolbar" style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '3px 6px', borderBottom: '1px solid #808080', flexShrink: 0,
      }}>
        {['File', 'View', 'Help'].map(m => (
          <button
            key={m}
            style={{ background: 'none', border: 'none', cursor: 'default', padding: '2px 6px', color: '#000' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#000080'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#000'; }}
          >
            {m}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <span style={{ color: '#808080' }}>{projects.length} items</span>
      </div>

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
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '10px',
        }}>
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <div className="win95-statusbar" style={{ flexShrink: 0 }}>
        <span className="win95-statusbar-panel">{projects.length} object(s)</span>
      </div>
    </div>
  );
}
