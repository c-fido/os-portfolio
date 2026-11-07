import { useEffect, useState } from 'react';
import { SHELVES } from '../../lib/archive';
import { stampDate } from '../../lib/gelesen';
import { fetchBooks, getBookUrl, getCachedBooks, isBooksConfigured } from '../../lib/books';
import Arrow from './Arrow';

const WORK = SHELVES.find(s => s.id === 'work').ordner;

function useCurrentBook() {
  const pick = (books) => books?.find(b => b.is_reading) || null;
  const [book, setBook] = useState(() => pick(getCachedBooks()));
  useEffect(() => {
    if (book || !isBooksConfigured()) return undefined;
    let live = true;
    fetchBooks().then(books => { if (live) setBook(pick(books)); }).catch(() => {});
    return () => { live = false; };
  }, [book]);
  return book;
}

// Routing slip: one row per Work Ordner, stamped as the visitor opens each.
function Laufzettel({ read, onOpen, onReset }) {
  const done = WORK.filter(o => read[o.id]).length;
  const complete = done === WORK.length;
  const nextUnread = WORK.find(o => !read[o.id]);

  return (
    <section className="laufzettel" aria-labelledby="laufzettel-title" data-complete={complete || undefined}>
      <header className="laufzettel-head">
        <h2 id="laufzettel-title" className="laufzettel-title">Laufzettel <span>Routing slip</span></h2>
        <p className="laufzettel-count" aria-live="polite">
          <strong>{done} / {WORK.length}</strong> gelesen <span>read</span>
        </p>
      </header>

      <ol className="laufzettel-rows">
        {WORK.map(o => (
          <li key={o.id}>
            <button type="button" className="laufzettel-row" onClick={() => onOpen(o.id)}>
              <span className="laufzettel-nr">{o.number}</span>
              <span className="laufzettel-name">
                <span className="laufzettel-label" lang="de">{o.label}</span>
                <span className="laufzettel-gloss">{o.gloss}</span>
              </span>
              {read[o.id] ? (
                <span className="laufzettel-mark">
                  <span className="mini-stamp">Gelesen</span>
                  <span className="laufzettel-date">{stampDate(read[o.id])}</span>
                </span>
              ) : (
                <span className="laufzettel-open">Öffnen <Arrow /></span>
              )}
            </button>
          </li>
        ))}
      </ol>

      {complete && <span className="stamp laufzettel-stamp" aria-hidden="true">Erledigt</span>}

      <footer className="laufzettel-foot">
        {complete ? (
          <>
            <p>That&rsquo;s the whole Work shelf. If something stuck, the inbox is open.</p>
            <div className="laufzettel-actions">
              <button type="button" className="btn btn--primary" onClick={() => onOpen('contact')}>Write to me</button>
              <button type="button" className="btn btn--quiet" onClick={onReset}>Start over</button>
            </div>
          </>
        ) : (
          <div className="laufzettel-actions">
            <button type="button" className="btn btn--primary" onClick={() => onOpen(nextUnread.id)}>
              {done === 0 ? 'Start with' : 'Next unread:'} {nextUnread.label}
            </button>
            {done > 0 && <button type="button" className="btn btn--quiet" onClick={onReset}>Clear slip</button>}
          </div>
        )}
      </footer>
    </section>
  );
}

function Lektuere({ book, onOpen }) {
  const href = getBookUrl(book);
  const Cover = href ? 'a' : 'div';
  return (
    <figure className="lektuere">
      <Cover className="lektuere-book" {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {book.image ? <img src={book.image} alt={`Cover of ${book.title}`} /> : <span className="lektuere-blank">{book.title}</span>}
      </Cover>
      <figcaption className="lektuere-tag">
        <span className="lektuere-title">{book.title}</span>
        <span className="lektuere-gloss"><span lang="de">Lektüre</span> · Currently reading</span>
        <button type="button" className="lektuere-more" onClick={() => onOpen('books')}>
          All books <Arrow />
        </button>
      </figcaption>
    </figure>
  );
}

export default function Schreibtisch({ read, onOpen, onReset }) {
  const book = useCurrentBook();
  return (
    <div className="schreibtisch">
      <Laufzettel read={read} onOpen={onOpen} onReset={onReset} />
      {book && <Lektuere book={book} onOpen={onOpen} />}
    </div>
  );
}
