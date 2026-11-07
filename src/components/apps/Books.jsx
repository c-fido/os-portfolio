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
            <span className="cv-muted">
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
      <p className="cv-muted">
        Nothing on the shelf right now.
      </p>
    );
  }

  return (
    <p className="cv-muted">
      No ranked favorites yet.
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

  return (
    <div className="books">
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

      <div className="books-body" role="tabpanel" aria-busy={loading}>
        {loading && <LoadingGrid />}

        {!loading && error && (
          <div className="books-error" role="alert">
            <strong>Couldn't load the book list</strong>
            <p>
              {import.meta.env.DEV ? error : 'Try again later.'}
            </p>
            {!isBooksConfigured() && import.meta.env.DEV && (
              <p className="cv-muted">
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

    </div>
  );
}
