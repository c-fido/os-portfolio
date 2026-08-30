import { bio, person } from '../../data/portfolio';

const lines = bio.split('\n');

export default function About() {
  return (
    <div className="win95-app" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--color-surface)' }}>
      <div
        className="os-scrollbar"
        style={{
          flex: 1,
          overflow: 'auto',
          background: '#fff',
          padding: '12px 16px',
          margin: '4px',
          boxShadow: 'inset 1px 1px 0 #808080, inset -1px -1px 0 #fff, inset 2px 2px 0 #000, inset -2px -2px 0 #dfdfdf',
          fontFamily: 'var(--font-sys)',
          fontSize: '11px',
          lineHeight: '18px',
        }}
      >
        <table style={{ borderCollapse: 'collapse', width: '100%', tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '40px' }} />
            <col />
          </colgroup>
          <tbody>
            {lines.map((line, i) => {
              const isHeading = line.startsWith('──');
              const isArrow = line.startsWith('→');
              const isH1 = i === 0;
              return (
                <tr key={i}>
                  <td
                    aria-hidden
                    style={{
                      textAlign: 'right',
                      color: '#808080',
                      userSelect: 'none',
                      padding: '0 12px 0 0',
                      verticalAlign: 'baseline',
                      whiteSpace: 'nowrap',
                      lineHeight: '18px',
                    }}
                  >
                    {i + 1}
                  </td>
                  <td
                    style={{
                      whiteSpace: 'pre-wrap',
                      overflowWrap: 'break-word',
                      wordBreak: 'normal',
                      hyphens: 'none',
                      verticalAlign: 'baseline',
                      lineHeight: '18px',
                      color: isH1 ? '#000' : isHeading ? '#000080' : isArrow ? '#800080' : '#000',
                      fontWeight: isH1 || isHeading ? 'bold' : 'normal',
                    }}
                  >
                    {line || '\u00a0'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="win95-statusbar" style={{ flexShrink: 0, justifyContent: 'space-between' }}>
        <span className="win95-statusbar-panel">Plain Text</span>
        <span className="win95-statusbar-panel" style={{ maxWidth: '50%' }}>{person.email}</span>
      </div>
    </div>
  );
}
