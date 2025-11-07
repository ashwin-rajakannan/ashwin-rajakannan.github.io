"use client";

"use client";
import React, { useEffect, useState } from "react";

const PAGE_SIZE = 8;

type Book = {
  id: number;
  isbn: string;
  title: string;
  author: string;
  genre: string;
  cover: string;
  rating?: string;
};

export default function BookRecommenderDemo() {
  const [books, setBooks] = useState<Book[]>([]);
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/genre-based-book-recommender/dataset/books-sample.json")
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: Book[]) => {
        setBooks(data);
        setGenres(Array.from(new Set(data.map(b => b.genre).filter(Boolean))).sort());
        setLoading(false);
      })
      .catch(error => {
        console.error("Error loading books:", error);
        setLoading(false);
      });
  }, []);

  // Filter books by genre and search first
  const genreAndSearchFiltered = books.filter(book =>
    (!genre || book.genre === genre) &&
    (!search.trim() || book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase()))
  );

  // Get available authors from the genre/search filtered books
  const availableAuthors = Array.from(new Set(genreAndSearchFiltered.map(b => b.author).filter(Boolean))).sort();

  // Final filter including author
  const filtered = genreAndSearchFiltered.filter(book =>
    (!author || book.author === author)
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleFavorite = (id: number) => {
    setFavorites(favs => favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id]);
  };

  // Pick a random book of the day
  const bookOfTheDay = books.length > 0 ? books[0] : null;

  if (loading) {
    return <div className="text-center py-8 text-slate-400">Loading books...</div>;
  }

  return (
    <div className="bg-[#181A20] text-white rounded p-4 mt-6 shadow-lg">
      {/* Top search bar */}
      <div className="flex flex-wrap gap-4 items-center mb-6 justify-between">
        <div className="flex gap-2 items-center">
          <label className="font-medium">Genre:</label>
          <select value={genre} onChange={e => { setGenre(e.target.value); setPage(1); }} className="text-black rounded px-2 py-1">
            <option value="">All</option>
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <label className="font-medium">Author:</label>
          <select value={author} onChange={e => { setAuthor(e.target.value); setPage(1); }} className="text-black rounded px-2 py-1">
            <option value="">All</option>
            {availableAuthors.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <label className="font-medium">Search:</label>
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="text-black rounded px-2 py-1" placeholder="Book title or author..." />
        </div>
        <button onClick={() => setPage(1)} className="px-4 py-2 bg-[#06B6D4] text-white rounded hover:bg-[#0891B2]">Search</button>
      </div>
      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Book of the Day */}
        <div className="md:col-span-1 bg-[#23272F] rounded-lg p-3 h-fit">
          <div className="text-sm font-bold mb-2 text-center text-[#06B6D4]">📚 Book of the Day</div>
          {bookOfTheDay && (
            <div className="flex flex-col items-center">
              <img 
                src={bookOfTheDay.cover || "/covers/placeholder.jpg"} 
                alt={bookOfTheDay.title} 
                className="w-20 h-28 object-cover rounded shadow-md mb-2" 
                onError={e => (e.currentTarget.src = "/covers/placeholder.jpg")}
              />
              <div className="text-xs font-medium text-center leading-tight mb-1 px-1" title={bookOfTheDay.title}>
                {bookOfTheDay.title.length > 35 ? bookOfTheDay.title.substring(0, 35) + "..." : bookOfTheDay.title}
              </div>
              <div className="text-xs text-slate-400 text-center mb-1" title={bookOfTheDay.author}>
                {bookOfTheDay.author.length > 20 ? bookOfTheDay.author.substring(0, 20) + "..." : bookOfTheDay.author}
              </div>
              <div className="text-xs px-2 py-1 bg-[#06B6D4]/20 text-[#06B6D4] rounded-full">
                {bookOfTheDay.genre}
              </div>
            </div>
          )}
        </div>
        {/* Results */}
        <div className="md:col-span-2">
          <div className="font-bold mb-2">Results ({filtered.length} found)</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {paged.map(book => (
              <div key={book.id} className="bg-[#23272F] rounded p-3 flex flex-col items-center relative hover:bg-[#2A2E34] transition-colors">
                <img 
                  src={book.cover || "/covers/placeholder.jpg"} 
                  alt={book.title} 
                  className="w-24 h-32 object-cover rounded mb-2 shadow-md" 
                  onError={e => (e.currentTarget.src = "/covers/placeholder.jpg")}
                />
                <div className="font-semibold text-center mb-1 text-sm px-1" title={book.title}>
                  {book.title.length > 40 ? book.title.substring(0, 40) + "..." : book.title}
                </div>
                <div className="text-xs text-slate-400 mb-1 text-center" title={book.author}>
                  {book.author.length > 25 ? book.author.substring(0, 25) + "..." : book.author}
                </div>
                <div className="text-xs text-[#06B6D4] mb-3 px-2 py-1 bg-[#06B6D4]/10 rounded">
                  {book.genre}
                </div>
                <button className="text-xs px-4 py-2 bg-[#06B6D4] rounded text-white hover:bg-[#0891B2] transition-colors font-medium">
                  Details
                </button>
                <button 
                  onClick={() => toggleFavorite(book.id)} 
                  className="absolute top-2 right-2 p-1 rounded-full bg-black/20 hover:bg-black/40 transition-colors" 
                  title={favorites.includes(book.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  {favorites.includes(book.id) ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="#FFD700" stroke="#FFD700" strokeWidth="1.5">
                      <polygon points="10,2 12.59,7.36 18.51,8.09 14,12.26 15.18,18.09 10,15.27 4.82,18.09 6,12.26 1.49,8.09 7.41,7.36"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#06B6D4" strokeWidth="1.5">
                      <polygon points="10,2 12.59,7.36 18.51,8.09 14,12.26 15.18,18.09 10,15.27 4.82,18.09 6,12.26 1.49,8.09 7.41,7.36"/>
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button 
                disabled={page === 1} 
                onClick={() => setPage(page - 1)} 
                className="px-3 py-2 rounded bg-[#23272F] border border-[#06B6D4] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#06B6D4] hover:text-white transition-colors"
              >
                Previous
              </button>
              
              {/* Show limited page numbers */}
              {totalPages <= 7 ? (
                // Show all pages if 7 or fewer
                [...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setPage(i + 1)} 
                    className={`px-3 py-2 rounded transition-colors ${
                      page === i + 1 
                        ? 'bg-[#06B6D4] text-white' 
                        : 'bg-[#23272F] border border-[#06B6D4] hover:bg-[#06B6D4] hover:text-white'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))
              ) : (
                // Show smart pagination for many pages
                <>
                  {page > 3 && (
                    <>
                      <button onClick={() => setPage(1)} className="px-3 py-2 rounded bg-[#23272F] border border-[#06B6D4] hover:bg-[#06B6D4] hover:text-white transition-colors">1</button>
                      {page > 4 && <span className="px-2 text-slate-400">...</span>}
                    </>
                  )}
                  
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
                    if (pageNum <= totalPages) {
                      return (
                        <button 
                          key={pageNum} 
                          onClick={() => setPage(pageNum)} 
                          className={`px-3 py-2 rounded transition-colors ${
                            page === pageNum 
                              ? 'bg-[#06B6D4] text-white' 
                              : 'bg-[#23272F] border border-[#06B6D4] hover:bg-[#06B6D4] hover:text-white'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    return null;
                  })}
                  
                  {page < totalPages - 2 && (
                    <>
                      {page < totalPages - 3 && <span className="px-2 text-slate-400">...</span>}
                      <button onClick={() => setPage(totalPages)} className="px-3 py-2 rounded bg-[#23272F] border border-[#06B6D4] hover:bg-[#06B6D4] hover:text-white transition-colors">{totalPages}</button>
                    </>
                  )}
                </>
              )}
              
              <button 
                disabled={page === totalPages} 
                onClick={() => setPage(page + 1)} 
                className="px-3 py-2 rounded bg-[#23272F] border border-[#06B6D4] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#06B6D4] hover:text-white transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
        {/* Favorites */}
        <div className="md:col-span-1 bg-[#23272F] rounded-lg p-3 h-fit">
          <div className="text-sm font-bold mb-2 text-center text-[#06B6D4]">⭐ Your Favorites</div>
          {favorites.length === 0 ? (
            <div className="text-center py-4">
              <div className="text-2xl mb-1">💫</div>
              <div className="text-xs text-slate-400">No favorites yet</div>
              <div className="text-xs text-slate-500 mt-1">Click ⭐ on books!</div>
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {favorites.slice(0, 5).map(fid => {
                const book = books.find(b => b.id === fid);
                return book ? (
                  <div key={fid} className="bg-[#1A1E24] rounded p-2 flex items-center gap-2 hover:bg-[#2A2E34] transition-colors">
                    <img 
                      src={book.cover || "/covers/placeholder.jpg"} 
                      alt={book.title} 
                      className="w-6 h-8 object-cover rounded flex-shrink-0" 
                      onError={e => (e.currentTarget.src = "/covers/placeholder.jpg")}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-white truncate" title={book.title}>
                        {book.title.length > 20 ? book.title.substring(0, 20) + "..." : book.title}
                      </div>
                      <div className="text-xs text-slate-400 truncate" title={book.author}>
                        {book.author.length > 15 ? book.author.substring(0, 15) + "..." : book.author}
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleFavorite(book.id)} 
                      className="flex-shrink-0 p-1 hover:bg-red-500/20 rounded transition-colors"
                      title="Remove"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ) : null;
              })}
              {favorites.length > 5 && (
                <div className="text-center text-xs text-slate-400 py-1">
                  +{favorites.length - 5} more favorites
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Footer message */}
      <div className="mt-6 p-4 bg-[#23272F] rounded text-center text-sm text-slate-300">
        <p className="mb-2">
          <strong>This is a basic demo</strong> with 8 genres and 500 books for quick loading.
        </p>
        <p>
          The full version has <strong>20,000+ books and 30 genres</strong> — try it on GitHub:
        </p>
        <a 
          href="https://github.com/ashwin-rajakannan/genre-based-book-recommender" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block mt-2 px-4 py-2 bg-[#06B6D4] text-white rounded hover:bg-[#0891B2] transition-colors"
        >
          View Full Demo on GitHub
        </a>
      </div>
    </div>
  );
}
