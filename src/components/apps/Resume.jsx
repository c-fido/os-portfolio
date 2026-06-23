import { person } from '../../data/portfolio';

const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf`;

export default function Resume() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = RESUME_URL;
    link.download = 'Giancarlo-Fedolfi-Resume.pdf';
    link.click();
  };

  return (
    <div className="win95-app" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#c0c0c0' }}>
      <div className="win95-app-toolbar" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '3px 8px', borderBottom: '1px solid #808080', flexShrink: 0, gap: '8px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button className="win95-btn" style={{ minWidth: 'auto', padding: '3px 12px' }} onClick={handleDownload}>
            Download
          </button>
          <div style={{ width: '2px', height: '20px', borderLeft: '1px solid #808080', borderRight: '1px solid #fff' }} />
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
        <span style={{ color: '#808080' }}>Giancarlo Fedolfi Resume.pdf</span>
      </div>

      <div
        style={{
          flex: 1,
          margin: '4px',
          background: '#808080',
          boxShadow: 'inset 1px 1px 0 #808080, inset -1px -1px 0 #fff, inset 2px 2px 0 #000, inset -2px -2px 0 #dfdfdf',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <object
          data={RESUME_URL}
          type="application/pdf"
          style={{ flex: 1, width: '100%', border: 'none', minHeight: 0 }}
          title={`${person.name} — Resume`}
        >
          <div className="win95-content" style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: '12px', padding: '24px', background: '#fff', textAlign: 'center',
          }}>
            <p style={{ margin: 0 }}>Your browser cannot display PDFs inline.</p>
            <button className="win95-btn" onClick={handleDownload}>Download Resume</button>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#000080' }}>
              Open in new tab
            </a>
          </div>
        </object>
      </div>

      <div className="win95-statusbar" style={{ flexShrink: 0 }}>
        <span className="win95-statusbar-panel">1 page(s)</span>
        <span className="win95-statusbar-panel" style={{ marginLeft: 'auto' }}>{person.email}</span>
      </div>
    </div>
  );
}
