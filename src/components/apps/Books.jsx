import { useEffect, useMemo, useState } from 'react';
import { fetchBooks, getBookUrl, getCachedBooks, isBooksConfigured } from '../../lib/books';

const TABS = [
  { id: 'reading', label: 'Currently Reading' },
  { id: 'top10', label: 'Top 10' },
];

function BookCard({ book, rank }) {
  const href = getBookUrl(book);

  const card = (
    <>
      <div className="book-card-cover">
        {rank != null && <span className="book-card-rank">{rank}</span>}
        {book.image ? (
          <img src={book.image} alt="" loading="lazy" />
        ) : (
          <div className="book-card-cover-placeholder">No cover</div>
        )}
      </div>

      <div className="book-card-body">
        <div className="book-card-title">{book.title}</div>

        <div className="book-card-meta">
          {book.genre && <span className="project-tag">{book.genre}</span>}
          {book.pages != null && (
            <span style={{ fontSize: 'var(--text-xs)', color: '#444' }}>
              {book.pages} pages
            </span>
          )}
        </div>

        {book.description && (
          <p className="book-card-description text-prose">
            {book.description}
          </p>
        )}
      </div>
    </>
  );

  if (!href) {
    return <div className="book-card">{card}</div>;
  }

  return (
    <a
      className="book-card book-card--link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={`Read more about ${book.title}`}
    >
      {card}
    </a>
  );
}

function BookGrid({ books, showRank = false }) {
  if (books.length === 0) return null;

  return (
    <div className="books-grid">
      {books.map(book => (
        <BookCard
          key={book.id}
          book={book}
          rank={showRank ? book.top_rank : null}
        />
      ))}
    </div>
  );
}

function LoadingGrid() {
  return (
    <div className="books-grid">
      {[1, 2, 3].map(n => (
        <div key={n} className="book-card book-card--loading">
          <div className="book-card-cover book-card-cover--loading" />
          <div className="book-card-body">
            <div className="book-card-skeleton" style={{ width: '70%', height: '14px' }} />
            <div className="book-card-skeleton" style={{ width: '40%', height: '12px' }} />
            <div className="book-card-skeleton" style={{ width: '100%', height: '40px' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyTab({ tab }) {
  if (tab === 'reading') {
    return (
      <p style={{ margin: 0, color: '#444' }}>
        Nothing on the shelf right now. Set <code>is_reading</code> to true in Supabase.
      </p>
    );
  }

  return (
    <p style={{ margin: 0, color: '#444' }}>
      No top 10 yet. Set <code>top_rank</code> from 1–10 in Supabase.
    </p>
  );
}

export default function Books() {
  const [activeTab, setActiveTab] = useState('reading');
  const [books, setBooks] = useState(() => getCachedBooks() ?? []);
  const [loading, setLoading] = useState(() => !getCachedBooks());
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!getCachedBooks()) setLoading(true);
      setError(null);

      try {
        const data = await fetchBooks();
        if (!cancelled) setBooks(data);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Could not load books.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const readingBooks = useMemo(
    () => books.filter(book => book.is_reading),
    [books],
  );

  const top10Books = useMemo(
    () => books
      .filter(book => book.top_rank != null)
      .sort((a, b) => a.top_rank - b.top_rank)
      .slice(0, 10),
    [books],
  );

  const visibleBooks = activeTab === 'reading' ? readingBooks : top10Books;
  const statusText = loading
    ? 'Loading...'
    : error
      ? 'Error'
      : `${visibleBooks.length} item${visibleBooks.length === 1 ? '' : 's'}`;

  return (
    <div className="win95-app" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#c0c0c0' }}>
      <div
        className="win95-app-toolbar"
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '3px 6px', borderBottom: '1px solid #808080', flexShrink: 0,
        }}
      >
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
        <span style={{ color: '#808080' }}>{statusText}</span>
      </div>

      <div className="books-tabs" role="tablist">
        {TABS.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`books-tab${isActive ? ' books-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        className="os-scrollbar win95-content"
        style={{
          flex: 1, overflow: 'auto', padding: '10px',
          background: '#fff', margin: '0 4px 4px',
          boxShadow: 'inset 1px 1px 0 #808080, inset -1px -1px 0 #fff, inset 2px 2px 0 #000, inset -2px -2px 0 #dfdfdf',
        }}
      >
        {loading && <LoadingGrid />}

        {!loading && error && (
          <div style={{ padding: '12px', background: '#ffffe0', border: '1px solid #808080' }}>
            <strong>Could not load books</strong>
            <p style={{ margin: '8px 0 0', color: '#222' }}>{error}</p>
            {!isBooksConfigured() && (
              <p style={{ margin: '8px 0 0', color: '#444', fontSize: 'var(--text-xs)' }}>
                Create a <code>.env</code> file with <code>VITE_SUPABASE_URL</code> and{' '}
                <code>VITE_SUPABASE_ANON_KEY</code>, then restart the dev server.
              </p>
            )}
          </div>
        )}

        {!loading && !error && visibleBooks.length === 0 && (
          <EmptyTab tab={activeTab} />
        )}

        {!loading && !error && visibleBooks.length > 0 && (
          <BookGrid books={visibleBooks} showRank={activeTab === 'top10'} />
        )}
      </div>

      <div className="win95-statusbar" style={{ flexShrink: 0 }}>
        <span className="win95-statusbar-panel">
          {loading ? 'Reading shelf...' : `${visibleBooks.length} object(s)`}
        </span>
      </div>
    </div>
  );
}
