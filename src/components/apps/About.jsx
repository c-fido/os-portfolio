import { bio, person } from '../../data/portfolio';

const lines = bio.split('\n');

export default function About() {
  return (
    <div className="win95-app" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#c0c0c0' }}>
      <div className="win95-app-toolbar" style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '3px 6px', borderBottom: '1px solid #808080', flexShrink: 0,
      }}>
        {['File', 'Edit', 'Format', 'View', 'Help'].map(m => (
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

      <div
        className="os-scrollbar win95-content"
        style={{
          flex: 1, overflow: 'auto', background: '#fff', padding: '12px 16px',
          margin: '4px',
          boxShadow: 'inset 1px 1px 0 #808080, inset -1px -1px 0 #fff, inset 2px 2px 0 #000, inset -2px -2px 0 #dfdfdf',
        }}
      >
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{
            textAlign: 'right', color: '#808080', userSelect: 'none',
            flexShrink: 0, minWidth: '28px', lineHeight: '1.6',
          }}>
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          <div className="text-prose" style={{ whiteSpace: 'pre-wrap', flex: 1, lineHeight: '1.6' }}>
            {lines.map((line, i) => {
              const isHeading = line.startsWith('──');
              const isArrow   = line.startsWith('→');
              const isH1      = i === 0;
              return (
                <div
                  key={i}
                  style={{
                    color: isH1 ? '#000' : isHeading ? '#000080' : isArrow ? '#800080' : '#000',
                    fontWeight: isH1 || isHeading ? 'bold' : 'normal',
                    fontSize: isH1 ? 'var(--text-lg)' : undefined,
                  }}
                >
                  {line || ' '}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="win95-statusbar" style={{ flexShrink: 0, justifyContent: 'space-between' }}>
        <span className="win95-statusbar-panel">Plain Text</span>
        <span className="win95-statusbar-panel" style={{ maxWidth: '50%' }}>{person.email}</span>
      </div>
    </div>
  );
}
