#!/usr/bin/env python3
"""
Look up book(s) and manga by title and print Supabase INSERT SQL.

Uses Open Library for books and AniList for manga.

Usage:
  python scripts/book_to_sql.py "Dune"
  python scripts/book_to_sql.py "Dune" "1984" "The Hobbit"
  python scripts/book_to_sql.py --manga "One Piece" "Chainsaw Man"
  python scripts/book_to_sql.py "Dune" "manga:One Piece"
  python scripts/book_to_sql.py "1984" --list
  python scripts/book_to_sql.py "Foundation" --pick 2

Requires network access. Uses only the Python standard library.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import textwrap
import urllib.error
import urllib.parse
import urllib.request

USER_AGENT = "os-portfolio-book-script/1.0 (personal portfolio)"
SEARCH_URL = "https://openlibrary.org/search.json"
WORK_URL = "https://openlibrary.org{key}.json"
ANILIST_URL = "https://graphql.anilist.co"
COVER_URL = "https://covers.openlibrary.org/b/id/{cover_id}-L.jpg"
MANGA_PREFIX = re.compile(r"^manga:\s*", re.IGNORECASE)
HTML_TAG = re.compile(r"<[^>]+>")
ARTICLE_PREFIX = re.compile(r"^(the|a|an)\s+", re.IGNORECASE)
DERIVATIVE_TITLE = re.compile(
    r"\b("
    r"cliff'?s? notes|sparknotes|study guide|companion|notes on|"
    r"history and criticism|study and teaching|teacher'?s guide|"
    r"summary and analysis|book analysis"
    r")\b",
    re.IGNORECASE,
)

GENERIC_SUBJECTS = {
    "accessible book",
    "protected daisy",
    "in library",
    "fiction",
    "nonfiction",
    "large type books",
}

NON_GENRE_PREFIXES = (
    "series:",
    "place:",
    "person:",
    "people:",
    "time:",
    "collection:",
    "award:",
    "language:",
)


def fetch_json(url: str) -> dict | list:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=20) as response:
        return json.load(response)


def post_json(url: str, payload: dict) -> dict:
    body = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=body,
        headers={
            "User-Agent": USER_AGENT,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=20) as response:
        return json.load(response)


def parse_title_entry(title: str, default_manga: bool = False) -> tuple[str, bool]:
    if MANGA_PREFIX.match(title):
        return MANGA_PREFIX.sub("", title).strip(), True
    return title.strip(), default_manga


def normalize_title(title: str) -> str:
    collapsed = re.sub(r"\s+", " ", title.strip().lower())
    return ARTICLE_PREFIX.sub("", collapsed)


def is_derivative_title(title: str) -> bool:
    return bool(DERIVATIVE_TITLE.search(title))


def search_books(title: str, limit: int = 8) -> list[dict]:
    params = urllib.parse.urlencode(
        {
            "title": title,
            "limit": limit,
            "fields": "title,author_name,cover_i,number_of_pages_median,subject,first_sentence,key,edition_count",
        }
    )
    payload = fetch_json(f"{SEARCH_URL}?{params}")
    return payload.get("docs", [])


def description_from_work(work: dict) -> str | None:
    raw = work.get("description")
    if isinstance(raw, str) and raw.strip():
        return raw.strip()
    if isinstance(raw, dict):
        value = raw.get("value", "").strip()
        if value:
            return value

    excerpts = work.get("excerpts")
    if isinstance(excerpts, list):
        for item in excerpts:
            if isinstance(item, dict):
                excerpt = item.get("excerpt", "").strip()
                if excerpt:
                    return excerpt

    return None


def first_sentence_from_doc(doc: dict) -> str | None:
    first_sentence = doc.get("first_sentence")
    if isinstance(first_sentence, list) and first_sentence:
        return first_sentence[0].strip()
    if isinstance(first_sentence, str) and first_sentence.strip():
        return first_sentence.strip()
    return None


def pick_description(doc: dict) -> str | None:
    work_key = doc.get("key")
    if work_key:
        try:
            work = fetch_json(WORK_URL.format(key=work_key))
            description = description_from_work(work)
            if description:
                return description
        except (urllib.error.URLError, urllib.error.HTTPError, json.JSONDecodeError, TimeoutError):
            pass

    return first_sentence_from_doc(doc)


def split_subject(subject: str) -> tuple[str | None, str]:
    if ":" not in subject:
        return None, subject.strip()

    prefix, value = subject.split(":", 1)
    return prefix.strip().lower(), value.strip()


def is_generic_subject(value: str) -> bool:
    return value.strip().lower() in GENERIC_SUBJECTS


def is_weak_subject(value: str) -> bool:
    lower = value.strip().lower()
    if is_generic_subject(value):
        return True
    weak_markers = (
        "in literature",
        "fictional works",
        "fictitious character",
        "study and teaching",
        "history and criticism",
    )
    return any(marker in lower for marker in weak_markers)


def pick_genre(doc: dict) -> str | None:
    subjects = doc.get("subject") or []
    if not subjects:
        return None

    genre_tags: list[str] = []
    fallback_tags: list[str] = []

    for subject in subjects:
        cleaned = subject.strip()
        if not cleaned:
            continue

        prefix, value = split_subject(cleaned)
        if not value or is_weak_subject(value):
            continue

        if prefix == "genre":
            genre_tags.append(value)
            continue

        if prefix in NON_GENRE_PREFIXES or prefix is not None:
            continue

        if len(value) <= 40:
            fallback_tags.append(value)

    if genre_tags:
        return genre_tags[0][:40]

    if fallback_tags:
        return fallback_tags[0][:40]

    return None


def pick_cover_url(doc: dict) -> str | None:
    cover_id = doc.get("cover_i")
    if cover_id:
        return COVER_URL.format(cover_id=cover_id)
    return None


def trim_description(text: str | None, max_len: int = 500) -> str | None:
    if not text:
        return None
    collapsed = re.sub(r"\s+", " ", text.strip())
    if len(collapsed) <= max_len:
        return collapsed
    return collapsed[: max_len - 1].rstrip() + "…"


def format_authors(doc: dict) -> str:
    authors = doc.get("author_name") or []
    if not authors:
        return "Unknown author"
    if len(authors) == 1:
        return authors[0]
    if len(authors) == 2:
        return f"{authors[0]} and {authors[1]}"
    return f"{authors[0]} et al."


def open_library_url(doc: dict) -> str | None:
    work_key = doc.get("key")
    if work_key:
        return f"https://openlibrary.org{work_key}"
    return None


def anilist_manga_url(media: dict) -> str | None:
    media_id = media.get("id")
    if media_id:
        return f"https://anilist.co/manga/{media_id}"
    return None


def build_book_record(doc: dict) -> dict:
    title = doc.get("title", "").strip()
    description = trim_description(pick_description(doc))

    return {
        "title": title,
        "image": pick_cover_url(doc),
        "pages": doc.get("number_of_pages_median"),
        "genre": pick_genre(doc),
        "description": description,
        "authors": format_authors(doc),
        "url": open_library_url(doc),
    }


def score_doc(doc: dict, query_norm: str) -> int:
    title = doc.get("title", "")
    title_norm = normalize_title(title)
    score = 0

    if title_norm == query_norm:
        score += 100
    elif query_norm in title_norm or title_norm in query_norm:
        score += 40

    if is_derivative_title(title):
        score -= 250

    subjects = [str(subject).lower() for subject in (doc.get("subject") or [])]
    if any("study and teaching" in subject for subject in subjects):
        score -= 80
    if any("history and criticism" in subject for subject in subjects):
        score -= 80

    edition_count = doc.get("edition_count") or 0
    score += min(edition_count, 100)

    pages = doc.get("number_of_pages_median")
    if pages and 120 <= pages <= 900:
        score += 15

    if doc.get("cover_i"):
        score += 5

    if first_sentence_from_doc(doc):
        score += 15

    return score


def choose_doc(docs: list[dict], query: str, pick: int | None) -> dict:
    if not docs:
        raise SystemExit(f'No Open Library results for "{query}".')

    if pick is not None:
        if pick < 1 or pick > len(docs):
            raise SystemExit(f"--pick must be between 1 and {len(docs)}.")
        return docs[pick - 1]

    query_norm = normalize_title(query)
    return max(docs, key=lambda doc: score_doc(doc, query_norm))


ANILIST_SEARCH_QUERY = """
query ($search: String, $perPage: Int) {
  Page(page: 1, perPage: $perPage) {
    media(search: $search, type: MANGA, sort: SEARCH_MATCH) {
      id
      title { romaji english native }
      description(asHtml: false)
      genres
      chapters
      volumes
      coverImage { large extraLarge }
      format
    }
  }
}
"""


def strip_html(text: str | None) -> str | None:
    if not text:
        return None
    cleaned = HTML_TAG.sub("", text)
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    return cleaned or None


def manga_display_title(media: dict) -> str:
    title = media.get("title") or {}
    for key in ("english", "romaji", "native"):
        value = title.get(key)
        if value and value.strip():
            return value.strip()
    return "Untitled"


def search_manga(title: str, limit: int = 8) -> list[dict]:
    payload = {
        "query": ANILIST_SEARCH_QUERY,
        "variables": {"search": title, "perPage": limit},
    }
    response = post_json(ANILIST_URL, payload)
    if "errors" in response:
        message = response["errors"][0].get("message", "AniList query failed")
        raise SystemExit(f"AniList error for \"{title}\": {message}")

    return response.get("data", {}).get("Page", {}).get("media") or []


def score_manga(media: dict, query_norm: str) -> int:
    titles = [manga_display_title(media)]
    title_obj = media.get("title") or {}
    titles.extend(filter(None, [title_obj.get("romaji"), title_obj.get("native")]))

    score = 0
    for title in titles:
        title_norm = normalize_title(title)
        if title_norm == query_norm:
            score = max(score, 100)
        elif query_norm in title_norm or title_norm in query_norm:
            score = max(score, 40)

    if media.get("coverImage", {}).get("large"):
        score += 5

    chapters = media.get("chapters")
    if chapters and chapters >= 10:
        score += min(chapters // 10, 20)

    return score


def choose_manga(results: list[dict], query: str, pick: int | None) -> dict:
    if not results:
        raise SystemExit(f'No AniList manga results for "{query}".')

    if pick is not None:
        if pick < 1 or pick > len(results):
            raise SystemExit(f"--pick must be between 1 and {len(results)}.")
        return results[pick - 1]

    query_norm = normalize_title(query)
    return max(results, key=lambda media: score_manga(media, query_norm))


def pick_manga_genre(media: dict) -> str | None:
    genres = media.get("genres") or []
    if genres:
        return f"Manga · {genres[0]}"[:40]
    return "Manga"


def pick_manga_pages(media: dict) -> int | None:
    chapters = media.get("chapters")
    if chapters:
        return int(chapters)
    volumes = media.get("volumes")
    if volumes:
        return int(volumes * 180)
    return None


def pick_manga_cover(media: dict) -> str | None:
    cover = media.get("coverImage") or {}
    return cover.get("extraLarge") or cover.get("large")


def build_manga_record(media: dict) -> dict:
    title = manga_display_title(media)
    description = trim_description(strip_html(media.get("description")))

    return {
        "title": title,
        "image": pick_manga_cover(media),
        "pages": pick_manga_pages(media),
        "genre": pick_manga_genre(media),
        "description": description,
        "authors": media.get("format") or "Manga",
        "url": anilist_manga_url(media),
    }


def print_manga_matches(query: str, results: list[dict]) -> None:
    print(f'"{query}" [manga]:')
    for index, media in enumerate(results, start=1):
        title = manga_display_title(media)
        chapters = media.get("chapters")
        volumes = media.get("volumes")
        if chapters:
            length = f"{chapters} ch"
        elif volumes:
            length = f"{volumes} vol"
        else:
            length = "? ch"
        genres = ", ".join((media.get("genres") or [])[:2]) or "Manga"
        print(f"  {index}. {title} — {genres} ({length})")


def lookup_manga(title: str, pick: int | None) -> tuple[dict, list[dict]]:
    results = search_manga(title)
    if not results:
        raise SystemExit(f'No AniList manga results for "{title}".')

    media = choose_manga(results, title, pick)
    book = build_manga_record(media)

    if not book["title"] or book["title"] == "Untitled":
        raise SystemExit(f'Best manga match for "{title}" had no title; try --list and --pick.')

    if len(results) > 1 and pick is None:
        query_norm = normalize_title(title)
        chosen_norm = normalize_title(book["title"])
        if chosen_norm != query_norm:
            print(
                f'-- "{title}" → closest manga match: "{book["title"]}"',
                file=sys.stderr,
            )

    return book, results


def sql_literal(value: str | None) -> str:
    if value is None:
        return "NULL"
    escaped = value.replace("'", "''")
    return f"'{escaped}'"


def sql_bool(value: bool) -> str:
    return "true" if value else "false"


def sql_int(value: int | None) -> str:
    if value is None:
        return "NULL"
    return str(int(value))


def format_values_row(
    book: dict,
    *,
    sort_order: int,
    is_reading: bool,
    top_rank: int | None,
    trailing_comma: bool,
) -> str:
    suffix = "," if trailing_comma else ""
    return (
        f"  ({sql_literal(book['title'])}, "
        f"{sql_literal(book.get('image'))}, "
        f"{sql_int(book.get('pages'))}, "
        f"{sql_literal(book.get('genre'))}, "
        f"{sql_literal(book.get('description'))}, "
        f"{sql_literal(book.get('url'))}, "
        f"{sort_order}, "
        f"{sql_bool(is_reading)}, "
        f"{sql_int(top_rank)}){suffix}"
    )


def build_insert(
    book: dict,
    *,
    sort_order: int,
    is_reading: bool,
    top_rank: int | None,
) -> str:
    return "\n".join([
        "insert into public.books (title, image, pages, genre, description, url, sort_order, is_reading, top_rank)",
        "values",
        format_values_row(
            book,
            sort_order=sort_order,
            is_reading=is_reading,
            top_rank=top_rank,
            trailing_comma=False,
        ) + ";",
    ])


def build_bulk_insert(
    rows: list[tuple[dict, int, bool, int | None]],
) -> str:
    lines = [
        "insert into public.books (title, image, pages, genre, description, url, sort_order, is_reading, top_rank)",
        "values",
    ]
    for index, (book, sort_order, is_reading, top_rank) in enumerate(rows):
        lines.append(format_values_row(
            book,
            sort_order=sort_order,
            is_reading=is_reading,
            top_rank=top_rank,
            trailing_comma=index < len(rows) - 1,
        ))
    lines.append(";")
    return "\n".join(lines)


def print_matches(query: str, docs: list[dict]) -> None:
    print(f'"{query}":')
    for index, doc in enumerate(docs, start=1):
        title = doc.get("title", "Untitled")
        authors = format_authors(doc)
        pages = doc.get("number_of_pages_median")
        pages_text = f"{pages} pp" if pages else "? pp"
        print(f"  {index}. {title} — {authors} ({pages_text})")


def lookup_book(title: str, pick: int | None) -> tuple[dict, list[dict]]:
    docs = search_books(title)
    if not docs:
        raise SystemExit(f'No Open Library results for "{title}".')

    doc = choose_doc(docs, title, pick)
    book = build_book_record(doc)

    if not book["title"]:
        raise SystemExit(f'Best match for "{title}" had no title; try --list and --pick.')

    if len(docs) > 1 and pick is None:
        query_norm = normalize_title(title)
        chosen_norm = normalize_title(book["title"])
        if chosen_norm != query_norm:
            print(
                f'-- "{title}" → closest match: "{book["title"]}" ({book["authors"]})',
                file=sys.stderr,
            )

    return book, docs


def lookup_title(title: str, *, is_manga: bool, pick: int | None) -> tuple[dict, list]:
    if is_manga:
        return lookup_manga(title, pick)
    return lookup_book(title, pick)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Look up book(s) by title and print Supabase INSERT SQL.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=textwrap.dedent(
            """
            examples:
              python scripts/book_to_sql.py "Dune"
              python scripts/book_to_sql.py "Dune" "1984" "The Hobbit"
              python scripts/book_to_sql.py --manga "One Piece" "Chainsaw Man"
              python scripts/book_to_sql.py "Dune" "manga:One Piece"
              python scripts/book_to_sql.py "The Hobbit" --top-rank 2
              python scripts/book_to_sql.py --manga "Berserk" --list
              python scripts/book_to_sql.py "Foundation" --pick 2
            """
        ),
    )
    parser.add_argument(
        "titles",
        nargs="+",
        help='One or more titles; prefix with manga: for manga, e.g. "Dune" "manga:One Piece"',
    )
    parser.add_argument(
        "--manga",
        action="store_true",
        help="Treat all titles as manga (AniList lookup)",
    )
    parser.add_argument("--reading", action="store_true", help="Set is_reading = true for all rows")
    parser.add_argument(
        "--top-rank",
        type=int,
        metavar="N",
        help="Set top_rank (1-10); only allowed with a single title",
    )
    parser.add_argument(
        "--sort-order",
        type=int,
        default=0,
        help="Starting sort_order; increments by 1 for each title (default: 0)",
    )
    parser.add_argument("--list", action="store_true", help="List matches only, no SQL")
    parser.add_argument(
        "--pick",
        type=int,
        metavar="N",
        help="Use the Nth search result (1-based); only allowed with a single title",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()

    if args.top_rank is not None and not 1 <= args.top_rank <= 10:
        raise SystemExit("--top-rank must be between 1 and 10.")

    if len(args.titles) > 1:
        if args.pick is not None:
            raise SystemExit("--pick only works with a single title.")
        if args.top_rank is not None:
            raise SystemExit("--top-rank only works with a single title.")

    try:
        if args.list:
            for index, raw_title in enumerate(args.titles):
                if index:
                    print()
                title, is_manga = parse_title_entry(raw_title, args.manga)
                if is_manga:
                    results = search_manga(title)
                    if not results:
                        print(f'"{title}" [manga]: no results')
                        continue
                    print_manga_matches(title, results)
                else:
                    docs = search_books(title)
                    if not docs:
                        print(f'"{title}": no results')
                        continue
                    print_matches(title, docs)
            return

        rows: list[tuple[dict, int, bool, int | None]] = []

        for index, raw_title in enumerate(args.titles):
            title, is_manga = parse_title_entry(raw_title, args.manga)
            label = f"{title} [manga]" if is_manga else title
            if len(args.titles) > 1:
                print(f"-- Looking up: {label}", file=sys.stderr)

            book, _results = lookup_title(
                title,
                is_manga=is_manga,
                pick=args.pick if len(args.titles) == 1 else None,
            )
            rows.append((
                book,
                args.sort_order + index,
                args.reading,
                args.top_rank if len(args.titles) == 1 else None,
            ))

        if len(rows) == 1:
            book, sort_order, is_reading, top_rank = rows[0]
            print(build_insert(
                book,
                sort_order=sort_order,
                is_reading=is_reading,
                top_rank=top_rank,
            ))
        else:
            print(build_bulk_insert(rows))
            print(f"\n-- {len(rows)} books", file=sys.stderr)

    except urllib.error.URLError as exc:
        raise SystemExit(f"Network error while looking up titles: {exc}") from exc
    except TimeoutError as exc:
        raise SystemExit(f"Timed out while looking up titles: {exc}") from exc


if __name__ == "__main__":
    main()
