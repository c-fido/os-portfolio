const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

let booksCache = null;
let booksInflight = null;
const preloadedImages = new Set();

export function isBooksConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

export function getCachedBooks() {
  return booksCache;
}

function preloadCoverImages(books) {
  for (const book of books) {
    if (!book.image || preloadedImages.has(book.image)) continue;
    preloadedImages.add(book.image);
    const img = new Image();
    img.src = book.image;
  }
}

async function requestBooks() {
  if (!isBooksConfigured()) {
    throw new Error(
      'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.',
    );
  }

  const url = `${SUPABASE_URL}/rest/v1/books?select=id,title,image,pages,genre,description,url,sort_order,is_reading,top_rank&order=sort_order.asc,title.asc`;

  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to load books (${res.status})`);
  }

  const data = await res.json();
  preloadCoverImages(data);
  return data;
}

export function getBookUrl(book) {
  if (book.url) return book.url;
  if (book.title) {
    return `https://openlibrary.org/search?q=${encodeURIComponent(book.title)}`;
  }
  return null;
}

export async function fetchBooks({ force = false } = {}) {
  if (!force && booksCache) return booksCache;
  if (!force && booksInflight) return booksInflight;

  booksInflight = requestBooks()
    .then((data) => {
      booksCache = data;
      booksInflight = null;
      return data;
    })
    .catch((err) => {
      booksInflight = null;
      throw err;
    });

  return booksInflight;
}
