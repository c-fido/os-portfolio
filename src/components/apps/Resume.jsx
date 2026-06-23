import { resume, person, skills } from '../../data/portfolio';

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <h2 style={{
          fontSize: 'var(--text-xs)', fontWeight: 'bold', color: '#000',
          textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0, flexShrink: 0,
        }}>{title}</h2>
        <div style={{ flex: 1, height: '1px', background: '#808080', borderBottom: '1px solid #fff' }} />
      </div>
      {children}
    </div>
  );
}

export default function Resume() {
  return (
    <div className="win95-app" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#c0c0c0' }}>
      <div className="win95-app-toolbar" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '3px 6px', borderBottom: '1px solid #808080', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: '4px' }}>
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
        </div>
        <span style={{ color: '#808080' }}>resume.pdf</span>
      </div>

      <div
        className="os-scrollbar win95-content"
        style={{
          flex: 1, overflow: 'auto', background: '#fff',
          padding: '20px 28px', margin: '4px',
          boxShadow: 'inset 1px 1px 0 #808080, inset -1px -1px 0 #fff, inset 2px 2px 0 #000, inset -2px -2px 0 #dfdfdf',
        }}
      >
        <div className="text-prose" style={{ maxWidth: '540px', margin: '0 auto' }}>
          <div style={{ marginBottom: '24px', paddingBottom: '14px', borderBottom: '2px solid #000' }}>
            <h1 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 6px' }}>{person.name}</h1>
            <p style={{ color: '#000080', margin: '0 0 10px' }}>{person.title}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', color: '#333' }}>
              <span>{person.location}</span>
              <span>·</span>
              <span>{person.email}</span>
              <span>·</span>
              <a href={person.github} style={{ color: '#000080' }} target="_blank" rel="noopener noreferrer">GitHub</a>
              <span>·</span>
              <a href={person.linkedin} style={{ color: '#000080' }} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>

          <Section title="Experience">
            {resume.experience.map((job, i) => (
              <div key={i} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '4px', flexWrap: 'wrap' }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontWeight: 'bold' }}>{job.role}</div>
                    <div style={{ color: '#000080' }}>{job.company}</div>
                  </div>
                  <span style={{ color: '#808080', flexShrink: 0 }}>{job.period}</span>
                </div>
                <ul style={{ margin: '6px 0 0 18px', padding: 0 }}>
                  {job.bullets.map((b, j) => (
                    <li key={j} style={{ lineHeight: 1.5, marginBottom: '2px' }}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>

          {resume.research?.length > 0 && (
            <Section title="Research">
              {resume.research.map((item, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontWeight: 'bold' }}>{item.role}</div>
                      <div style={{ color: '#000080' }}>{item.company}</div>
                    </div>
                    <span style={{ color: '#808080', flexShrink: 0 }}>{item.period}</span>
                  </div>
                  <ul style={{ margin: '6px 0 0 18px', padding: 0 }}>
                    {item.bullets.map((b, j) => (
                      <li key={j} style={{ lineHeight: 1.5 }}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>
          )}

          <Section title="Skills">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {Object.entries(skills).map(([cat, items]) => (
                <div key={cat} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{
                    textTransform: 'uppercase', color: '#808080',
                    width: '90px', flexShrink: 0, fontSize: 'var(--text-xs)',
                  }}>{cat}</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {items.map(s => (
                      <span key={s} className="project-tag">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Education">
            {resume.education.map((ed, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 'bold' }}>{ed.degree}</div>
                  <div style={{ color: '#000080' }}>{ed.school}</div>
                  {ed.details && <div style={{ color: '#808080', fontSize: 'var(--text-xs)' }}>{ed.details}</div>}
                </div>
                <span style={{ color: '#808080', flexShrink: 0 }}>{ed.period}</span>
              </div>
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
}
