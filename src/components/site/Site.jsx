import { useEffect, useState } from 'react';
import Flap from './Flap';
import Books from '../apps/Books';
import Contact from '../apps/Contact';
import { person, resume, skills, track } from '../../data/portfolio';
import { fetchBooks, getCachedBooks, isBooksConfigured } from '../../lib/books';
import { DEFAULT_ENTRY, ENTRIES, RESUME_PDF, readHash, tidy, writeHash } from '../../lib/programme';

const external = { target: '_blank', rel: 'noopener noreferrer' };
const CELLS = 22; // every destination sits in the same run of modules, so the board reads as one ruler

function Heading({ id, children, de }) {
  return (
    <h2 className="section-heading" id={id}>
      {children} {de && <span className="gloss" lang="de">{de}</span>}
    </h2>
  );
}

function useReading() {
  const [title, setTitle] = useState(() => getCachedBooks()?.find(b => b.is_reading)?.title ?? null);
  useEffect(() => {
    if (!isBooksConfigured()) return;
    let live = true;
    fetchBooks()
      .then(books => { if (live) setTitle(books.find(b => b.is_reading)?.title ?? null); })
      .catch(() => {});
    return () => { live = false; };
  }, []);
  return title;
}

const hamburgTime = () => new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit' }).format(new Date());

function Clock() {
  const [time, setTime] = useState(hamburgTime);
  useEffect(() => {
    const id = setInterval(() => setTime(hamburgTime()), 10000);
    return () => clearInterval(id);
  }, []);
  return (
    <p className="clock">
      <span>Hamburg</span>
      <Flap text={time} className="flap--clock" />
    </p>
  );
}

function Station() {
  const reading = useReading();
  return (
    <header className="station">
      <div className="station-id">
        <h1><Flap text={person.name} className="flap--name" /></h1>
        <p className="station-line">
          CS &amp; German at Wesleyan, class of 2027. I build systems in {tidy('C++')} and Go.
          Previously software engineering intern at turingpoint in Hamburg.
        </p>
        {reading && <p className="station-now">Reading <a href="#books">{reading}</a></p>}
      </div>
      <div className="station-side">
        <Clock />
        <nav className="station-links" aria-label="Links">
          <a className="ticket" href={RESUME_PDF} {...external}>Resume</a>
          <a href={person.github} {...external}>GitHub</a>
          <a href={person.linkedin} {...external}>LinkedIn</a>
          <a href={`mailto:${person.email}`}>Email</a>
        </nav>
      </div>
    </header>
  );
}

function Detail({ entry }) {
  const isProject = entry.kind === 'project';
  const meta = isProject
    ? [entry.period, entry.tags.join(', ')].filter(Boolean).join(' · ')
    : `${entry.role} · ${entry.place} · ${entry.period}`;
  return (
    <div className="detail">
      <div className="detail-text">
        <p className="detail-meta">{tidy(meta)}</p>
        <p className="detail-body">{tidy(isProject ? entry.body : entry.org)}</p>
        {isProject && (
          <div className="actions">
            {entry.demo && <a className="btn btn--go" href={entry.demo} {...external}>Live demo</a>}
            <a className={`btn ${entry.demo ? '' : 'btn--go'}`} href={entry.github} {...external}>GitHub</a>
          </div>
        )}
      </div>
      {entry.bullets.length > 0 && (
        <div className="route">
          <h3 className="route-head">Route <span className="gloss" lang="de">Zuglauf</span></h3>
          <ol className="route-stops">{entry.bullets.map(b => <li key={b}>{tidy(b)}</li>)}</ol>
        </div>
      )}
    </div>
  );
}

// Off hours ride the board as later departures, so the filter sees them too.
const OFF_ROWS = [
  { id: 'books', destination: 'Books', line: 'What I am reading, and a top 10', train: '·', status: 'Below' },
  { id: 'track', destination: 'Track', line: 'Varsity track and field captain, Wesleyan', train: '·', status: 'Below' },
  { id: 'hamburg', destination: 'Hamburg', line: 'Fall 2025 internship, and German as a second major', train: '·', status: 'Below' },
].map(r => ({ ...r, title: r.destination, time: '--/--' }));

const haystack = (e) => [e.title, e.line, e.meta, e.train, e.place, e.org, ...(e.tags ?? [])].join(' ').toLowerCase();

function Board({ openId, onOpen }) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const matches = q ? [...ENTRIES, ...OFF_ROWS].filter(e => haystack(e).includes(q)) : [...ENTRIES, ...OFF_ROWS];

  const submit = (ev) => {
    ev.preventDefault();
    const first = matches.find(e => ENTRIES.includes(e)) ?? matches[0];
    if (!first || !q) return;
    // Off-hours matches go by hash, whose own handler scrolls; a second scroll here would race it.
    if (!ENTRIES.includes(first)) { window.location.hash = first.id; return; }
    onOpen(first.id);
    requestAnimationFrame(() => document.getElementById(`dep-${first.id}`)?.scrollIntoView({ block: 'nearest' }));
  };

  return (
    <section className="board" aria-labelledby="programme">
      <div className="board-head">
        <Heading id="programme" de="Abfahrt">Departures</Heading>
        <form className="where" onSubmit={submit} role="search">
          <label htmlFor="where">Where to?</label>
          <input
            id="where"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Go, C++, Hamburg, research…"
            autoComplete="off"
            spellCheck="false"
          />
          <p className="where-status" role="status">
            {!q ? 'Type a stack, a place or a project; Enter opens the first match.'
              : matches.length ? `${matches.length} departure${matches.length === 1 ? '' : 's'} via “${query.trim()}”`
              : <>No departures to “{query.trim()}”. The <a href={RESUME_PDF} {...external}>resume</a> has everything.</>}
          </p>
        </form>
      </div>

      <div className="board-frame">
        <div className="board-cols" aria-hidden="true">
          <span>Time</span><span>Train</span><span>Destination</span><span>Pl.</span><span>Status</span>
        </div>
        <ol className="rows">
          {ENTRIES.map((e, i) => {
            const isOpen = e.id === openId;
            const dim = q && !matches.includes(e);
            return (
              <li key={e.id} id={`dep-${e.id}`} className="row" data-open={isOpen || undefined} data-dim={dim || undefined}>
                <button type="button" className="row-button" aria-expanded={isOpen} onClick={() => onOpen(e.id)}>
                  <Flap text={e.time} className="row-time" />
                  <Flap text={e.train} cells={3} className="row-train" />
                  {/* Re-keying on the query and on open re-runs the flaps, as a real board re-sets a row. */}
                  <Flap key={`${q}|${isOpen}`} text={dim ? '' : e.destination} cells={CELLS} className="row-dest" />
                  <span className="row-via">{tidy(e.line)}</span>
                  <span className="row-platform">{i + 1}</span>
                  <span className="row-status" data-live={e.status === 'Live' || e.status === 'Running' || undefined}>{e.status}</span>
                </button>
                {isOpen && <Detail entry={e} />}
              </li>
            );
          })}
          {OFF_ROWS.map((e, i) => (
            <li key={e.id} id={`dep-${e.id}`} className="row row--off" data-dim={(q && !matches.includes(e)) || undefined}>
              <a className="row-button" href={`#${e.id}`}>
                <Flap text={e.time} className="row-time" />
                <Flap text={e.train} cells={3} className="row-train" />
                <Flap key={q} text={q && !matches.includes(e) ? '' : e.destination} cells={CELLS} className="row-dest" />
                <span className="row-via">{e.line}</span>
                <span className="row-platform">{ENTRIES.length + i + 1}</span>
                <span className="row-status">{e.status}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Resume() {
  const edu = resume.education[0];
  return (
    <section className="resume" aria-labelledby="resume">
      <Heading id="resume" de="Lebenslauf">Resume</Heading>
      <div className="resume-grid">
        <div>
          <h3 className="sub-heading">{edu.degree}</h3>
          <p className="muted">{edu.school} · {edu.period}</p>
          <p>{edu.details}</p>
          <p className="muted">Coursework: {edu.coursework}</p>
          <div className="actions">
            <a className="btn btn--ink" href={RESUME_PDF} {...external}>Open resume PDF</a>
            <a className="btn" href={RESUME_PDF} download="Giancarlo-Fedolfi-Resume.pdf">Download</a>
          </div>
        </div>
        <dl className="skills">
          {Object.entries(skills).map(([cat, items]) => (
            <div key={cat}><dt>{cat}</dt><dd>{tidy(items.join(', '))}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function OffHours() {
  return (
    <section className="off" aria-labelledby="off-hours">
      <Heading id="off-hours" de="Feierabend">Off hours</Heading>
      <div className="off-grid">
        <div className="off-books">
          <h3 className="sub-heading" id="books">Books</h3>
          <Books />
        </div>
        <div className="off-side">
          <div>
            <h3 className="sub-heading" id="track">Track</h3>
            <p>Captain of Wesleyan's varsity indoor and outdoor track and field teams. Scholar-Athlete Honors Award.</p>
            {track.length > 0 && (
              <table className="marks">
                <caption className="sr-only">Personal bests</caption>
                <tbody>{track.map(t => <tr key={t.event}><th scope="row">{t.event}</th><td>{t.mark}</td></tr>)}</tbody>
              </table>
            )}
          </div>
          <div>
            <h3 className="sub-heading" id="hamburg">Hamburg</h3>
            <p>
              Fall 2025 at turingpoint in Hamburg, building a CVE triage tool that non-engineers used. German is my
              second major at Wesleyan, alongside computer science.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Site() {
  const [openId, setOpenId] = useState(() => readHash()?.entry ?? DEFAULT_ENTRY);

  useEffect(() => {
    const go = () => {
      const h = readHash();
      if (!h) return;
      if (h.entry) setOpenId(h.entry);
      document.getElementById(h.entry ? 'programme' : h.section)?.scrollIntoView();
    };
    go();
    window.addEventListener('hashchange', go);
    return () => window.removeEventListener('hashchange', go);
  }, []);

  const openEntry = (id) => { setOpenId(id); writeHash(id); };

  return (
    <>
      <a className="skip" href="#programme">Skip to projects</a>
      <Station />
      <main>
        <Board openId={openId} onOpen={openEntry} />
        <Resume />
        <OffHours />
        <section className="contact" aria-labelledby="contact">
          <Heading id="contact" de="Kontakt">Contact</Heading>
          <Contact />
        </section>
      </main>
      <footer className="colophon">
        <p>
          Set in Barlow on a split-flap departures board, the kind that clattered over every German Hauptbahnhof.
          React and Vite, no UI library. <a href={`${person.github}/os-portfolio`} {...external}>Source on GitHub</a>.
        </p>
      </footer>
    </>
  );
}
