import { useRef } from 'react';
import { SHELVES, ALL_ORDNER, CURRENT_ORDNER } from '../../lib/archive';

const TAB_TONE = { LIVE: 'red', REPO: 'blue', MAIL: 'ochre' };

// Pencil tick beside the spine number once the visitor has opened that Ordner.
function Tick() {
  return (
    <svg className="spine-tick" width="14" height="12" viewBox="0 0 14 12" aria-hidden="true">
      <path d="M1.5 6.5 5 10l7.5-8.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spine({ ordner, pulled, read, tabbable, onOpen, onKeyDown, buttonRef }) {
  const isCurrent = ordner.id === CURRENT_ORDNER;
  return (
    <li className="spine-slot" data-pulled={pulled || undefined}>
      <button
        ref={buttonRef}
        type="button"
        className="spine"
        tabIndex={tabbable ? 0 : -1}
        aria-current={pulled ? 'true' : undefined}
        aria-label={`${ordner.label} (${ordner.gloss}), ${ordner.status}${isCurrent ? ', current work' : ''}${read ? ', read' : ''}`}
        onClick={() => onOpen(ordner.id)}
        onKeyDown={onKeyDown}
      >
        <span className={`spine-tab spine-tab--${TAB_TONE[ordner.status] || 'grey'}`}>{ordner.status}</span>
        {isCurrent && <span className="spine-tab spine-tab--now">Jetzt</span>}
        <span className="spine-window">
          <span className="spine-label" lang="de">{ordner.spine || ordner.label}</span>
          <span className="spine-gloss">{ordner.gloss}</span>
        </span>
        <span className="spine-number">{ordner.number}{read && <Tick />}</span>
        <span className="spine-ring" aria-hidden="true" />
        {pulled && <span className="spine-out" aria-hidden="true">{ordner.spine || ordner.label} · Auf dem Tisch{isCurrent ? ' · Jetzt' : ''}</span>}
      </button>
    </li>
  );
}

export default function Shelf({ openId, onOpen, read = {} }) {
  const refs = useRef({});
  const focusedId = openId || ALL_ORDNER[0].id;

  const handleKeyDown = (e) => {
    const index = ALL_ORDNER.findIndex(o => refs.current[o.id] === e.currentTarget);
    let next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = index + 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = index - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = ALL_ORDNER.length - 1;
    if (next === null) return;
    e.preventDefault();
    const target = ALL_ORDNER[(next + ALL_ORDNER.length) % ALL_ORDNER.length];
    Object.values(refs.current).forEach(el => el && (el.tabIndex = -1));
    const el = refs.current[target.id];
    el.tabIndex = 0;
    el.focus();
  };

  return (
    <nav className="shelf" aria-label="Regal (shelf): pick an Ordner">
      {SHELVES.map(board => (
        <section key={board.id} className="shelf-board" aria-labelledby={`board-${board.id}`}>
          <h2 id={`board-${board.id}`} className="shelf-board-label">
            {board.label} <span>{board.gloss}</span>
            {board.id === 'work' && (
              <span className="shelf-board-count">{board.ordner.filter(o => read[o.id]).length}/{board.ordner.length} read</span>
            )}
          </h2>
          <ul className="shelf-row">
            {board.ordner.map(o => (
              <Spine
                key={o.id}
                ordner={o}
                pulled={o.id === openId}
                read={Boolean(read[o.id])}
                tabbable={o.id === focusedId}
                onOpen={onOpen}
                onKeyDown={handleKeyDown}
                buttonRef={el => { refs.current[o.id] = el; }}
              />
            ))}
          </ul>
        </section>
      ))}
    </nav>
  );
}
