import { useEffect, useMemo, useRef, useState } from 'react';
import ProjectFile from './files/ProjectFile';
import MoreFile from './files/MoreFile';
import ResumeFile from './files/ResumeFile';
import AboutFile from './files/AboutFile';
import GamesFile from './files/GamesFile';
import Contact from '../apps/Contact';
import Books from '../apps/Books';
import Terminal from '../apps/Terminal';
import { sectionsFor } from '../../lib/archive';
import Arrow from './Arrow';

// Register tabs either jump within one long page ("scroll") or swap what the page holds ("switch").
const KINDS = {
  project: { Page: ProjectFile, mode: 'scroll' },
  more: { Page: MoreFile, mode: 'scroll' },
  resume: { Page: ResumeFile, mode: 'scroll' },
  about: { Page: AboutFile },
  contact: { Page: Contact },
  games: { Page: GamesFile, mode: 'switch' },
  books: {
    Page: () => (
      <>
        <h2 className="page-title" data-ordner-heading tabIndex={-1}>Bücher <span>Books</span></h2>
        <div className="app-frame"><Books /></div>
      </>
    ),
  },
  terminal: {
    Page: ({ onOpenOrdner }) => (
      <>
        <h2 className="page-title" data-ordner-heading tabIndex={-1}>Konsole <span>Terminal</span></h2>
        <div className="app-frame app-frame--terminal"><Terminal onOpenOrdner={onOpenOrdner} /></div>
      </>
    ),
  },
};

const TAB_COLORS = ['red', 'blue', 'moss', 'ochre', 'grey'];

export default function Ordner({ ordner, section, onSection, onNext, nextLabel, onClose, onOpenOrdner, focusOnMount, narrow }) {
  const kind = KINDS[ordner.kind];
  const sections = useMemo(() => sectionsFor(ordner), [ordner]);
  const pageRef = useRef(null);
  const [visible, setVisible] = useState(section || sections[0]?.id || null);
  const active = kind.mode === 'switch' ? (section || sections[0]?.id) : visible;

  useEffect(() => {
    if (focusOnMount) pageRef.current?.querySelector('[data-ordner-heading]')?.focus({ preventScroll: true });
    if (kind.mode === 'scroll' && section) {
      pageRef.current?.querySelector(`#${CSS.escape(section)}`)?.scrollIntoView({ block: 'start' });
    }
  // Only on open; later tab clicks scroll themselves.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (kind.mode !== 'scroll' || sections.length < 2) return undefined;
    const root = pageRef.current;
    const observer = new IntersectionObserver(entries => {
      const hit = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (hit) setVisible(hit.target.id);
    }, { root, rootMargin: '0px 0px -65% 0px' });
    sections.forEach(s => { const el = root.querySelector(`#${CSS.escape(s.id)}`); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [kind.mode, sections]);

  const goToSection = (id) => {
    onSection(id);
    if (kind.mode === 'scroll') {
      const el = pageRef.current.querySelector(`#${CSS.escape(id)}`);
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      setVisible(id);
    }
  };

  const { Page } = kind;

  return (
    <article className="ordner" data-kind={ordner.kind} aria-label={`${ordner.label} (${ordner.gloss})`}>
      <aside className="ordner-cover">
        {narrow && (
          <button type="button" className="cover-back" onClick={onClose}><span className="cover-back-label"><Arrow direction="left" /> Regal</span> <span>Shelf</span></button>
        )}
        <div className="cover-window" aria-hidden="true">
          <span className="cover-number">{ordner.number}</span>
          <span className="cover-label" lang="de">{ordner.label}</span>
          <span className="cover-gloss">{ordner.gloss}{ordner.year ? ` · ${ordner.year}` : ''}</span>
        </div>

        {sections.length > 1 && (
          <nav className="register" aria-label="Register (sections)">
            <ul>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className={`register-tab register-tab--${TAB_COLORS[i % TAB_COLORS.length]}`}
                    aria-current={active === s.id ? 'true' : undefined}
                    onClick={() => goToSection(s.id)}
                  >
                    <span className="register-label">{s.label}</span>
                    <span className="register-gloss">{s.gloss}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {!narrow && (
          <button type="button" className="cover-close" onClick={onClose}>
            Zurückstellen <span>Put back on shelf</span>
          </button>
        )}
      </aside>

      <div className="ordner-page" ref={pageRef}>
        <div className="page-holes" aria-hidden="true" />
        <div className="page-body">
          <Page ordner={ordner} section={active} onNext={onNext} nextLabel={nextLabel} onOpenOrdner={onOpenOrdner} />
        </div>
      </div>
    </article>
  );
}
