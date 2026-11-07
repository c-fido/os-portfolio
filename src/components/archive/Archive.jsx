import { useCallback, useEffect, useRef, useState } from 'react';
import Shelf from './Shelf';
import Ordner from './Ordner';
import Schreibtisch from './Schreibtisch';
import { person } from '../../data/portfolio';
import { useGelesen } from '../../lib/gelesen';
import { ALL_ORDNER, ORDNER_BY_ID, DEFAULT_ORDNER, RESUME_PDF, readHash, writeHash } from '../../lib/archive';

const NARROW_QUERY = '(max-width: 1099px)';

function useNarrow() {
  const [narrow, setNarrow] = useState(() => window.matchMedia(NARROW_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(NARROW_QUERY);
    const handler = () => setNarrow(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return narrow;
}

export default function Archive() {
  const narrow = useNarrow();
  const [read, markRead, resetRead] = useGelesen();
  // Deep links win. Otherwise wide screens open the current project for first-time visitors and
  // the clear desk (routing slip) for returning ones; narrow screens start at the shelf.
  const [open, setOpen] = useState(() => {
    const fromHash = readHash();
    if (fromHash) return fromHash;
    if (window.matchMedia(NARROW_QUERY).matches || Object.keys(read).length > 0) return null;
    return { id: DEFAULT_ORDNER, section: null };
  });
  const shelfRef = useRef(null);

  useEffect(() => { if (open?.id) markRead(open.id); }, [open?.id, markRead]);

  const openOrdner = useCallback((id, section = null) => {
    if (!ORDNER_BY_ID[id]) return;
    setOpen({ id, section, focus: true });
    writeHash(id, section);
  }, []);

  const closeOrdner = useCallback(() => {
    const id = open?.id;
    setOpen(null);
    writeHash(null);
    requestAnimationFrame(() => shelfRef.current?.querySelector(`[aria-label^="${ORDNER_BY_ID[id]?.label}"]`)?.focus());
  }, [open]);

  useEffect(() => {
    const onHash = () => { const h = readHash(); if (h) setOpen(h); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const ordner = open ? ORDNER_BY_ID[open.id] : null;
  const index = ordner ? ALL_ORDNER.indexOf(ordner) : -1;
  const next = ALL_ORDNER[(index + 1) % ALL_ORDNER.length];

  return (
    <div className="akte" data-view={narrow ? (ordner ? 'desk' : 'shelf') : 'both'}>
      <header className="band">
        <div className="band-id">
          <h1 className="band-name">{person.name}</h1>
          <p className="band-summary">
            CS &amp; German · Wesleyan '27 · <span>Builds systems in C{'\u2060+\u2060+'} and Go</span> · <span>Former SWE intern, turingpoint Hamburg</span>
          </p>
        </div>
        <nav className="band-links" aria-label="Links">
          <a href={RESUME_PDF} download="Giancarlo-Fedolfi-Resume.pdf">Resume PDF</a>
          <a href={person.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={person.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={`mailto:${person.email}`}>Email</a>
        </nav>
      </header>

      <div className="shelf-wrap" ref={shelfRef}>
        <Shelf openId={ordner?.id} onOpen={openOrdner} read={read} />
      </div>

      <main className="desk" aria-label="Schreibtisch (desk)">
        {ordner ? (
          <Ordner
            key={ordner.id}
            ordner={ordner}
            section={open.section}
            onSection={(s) => { setOpen({ id: ordner.id, section: s }); writeHash(ordner.id, s); }}
            onNext={() => openOrdner(next.id)}
            nextLabel={next.label}
            onClose={closeOrdner}
            onOpenOrdner={openOrdner}
            focusOnMount={Boolean(open.focus)}
            narrow={narrow}
          />
        ) : (
          <Schreibtisch read={read} onOpen={openOrdner} onReset={resetRead} />
        )}
      </main>
    </div>
  );
}
