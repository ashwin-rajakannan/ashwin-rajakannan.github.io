"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

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
    <div>
      {/* Filter Controls */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Book Filters</CardTitle>
          <CardDescription>Discover books by genre, author, or search</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Genre</label>
              <select 
                value={genre} 
                onChange={e => { setGenre(e.target.value); setPage(1); }} 
                className="w-full p-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/50"
              >
                <option value="">All Genres</option>
                {genres.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Author</label>
              <select 
                value={author} 
                onChange={e => { setAuthor(e.target.value); setPage(1); }} 
                className="w-full p-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/50"
              >
                <option value="">All Authors</option>
                {availableAuthors.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <input 
                value={search} 
                onChange={e => { setSearch(e.target.value); setPage(1); }} 
                className="w-full p-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/50" 
                placeholder="Book title or author..." 
              />
            </div>
            <div className="space-y-2 flex items-end">
              <Button 
                onClick={() => setPage(1)} 
                className="w-full bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Find Books
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Main Content Area */}
      <div className="grid md:grid-cols-4 gap-6">
        {/* Book of the Day - Sidebar */}
        <Card className="md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              📚 Book of the Day
            </CardTitle>
          </CardHeader>
          <CardContent>
            {bookOfTheDay && (
              <div className="flex flex-col items-center">
                <img 
                  src={bookOfTheDay.cover || "/covers/placeholder.jpg"} 
                  alt={bookOfTheDay.title} 
                  className="w-20 h-28 object-cover rounded shadow-md mb-3" 
                  onError={e => (e.currentTarget.src = "/covers/placeholder.jpg")}
                />
                <div className="text-sm font-medium text-center leading-tight mb-2 px-1" title={bookOfTheDay.title}>
                  {bookOfTheDay.title.length > 35 ? bookOfTheDay.title.substring(0, 35) + "..." : bookOfTheDay.title}
                </div>
                <div className="text-sm text-muted-foreground text-center mb-2" title={bookOfTheDay.author}>
                  {bookOfTheDay.author.length > 20 ? bookOfTheDay.author.substring(0, 20) + "..." : bookOfTheDay.author}
                </div>
                <div className="text-xs px-3 py-1 bg-[#06B6D4]/10 text-[#06B6D4] rounded-full border border-[#06B6D4]/30">
                  {bookOfTheDay.genre}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        {/* Results - Main Area */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Book Results</CardTitle>
            <CardDescription>{filtered.length} books found</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {paged.map(book => (
                <div key={book.id} className="border rounded-lg p-4 flex flex-col items-center relative hover:border-[#06B6D4]/50 transition-colors bg-muted/30">
                  <img 
                    src={book.cover || "/covers/placeholder.jpg"} 
                    alt={book.title} 
                    className="w-24 h-32 object-cover rounded mb-3 shadow-md" 
                    onError={e => (e.currentTarget.src = "/covers/placeholder.jpg")}
                  />
                  <div className="font-semibold text-center mb-2 text-sm px-1" title={book.title}>
                    {book.title.length > 40 ? book.title.substring(0, 40) + "..." : book.title}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2 text-center" title={book.author}>
                    {book.author.length > 25 ? book.author.substring(0, 25) + "..." : book.author}
                  </div>
                  <div className="text-xs text-[#06B6D4] mb-3 px-3 py-1 bg-[#06B6D4]/10 rounded-full border border-[#06B6D4]/30">
                    {book.genre}
                  </div>
                  <Button size="sm" className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white">
                    View Details
                  </Button>
                  <button 
                    onClick={() => toggleFavorite(book.id)} 
                    className="absolute top-2 right-2 p-1 rounded-full bg-background/80 hover:bg-background transition-colors border" 
                    title={favorites.includes(book.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    {favorites.includes(book.id) ? (
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="#FFD700" stroke="#FFD700" strokeWidth="1.5">
                        <polygon points="10,2 12.59,7.36 18.51,8.09 14,12.26 15.18,18.09 10,15.27 4.82,18.09 6,12.26 1.49,8.09 7.41,7.36"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#06B6D4" strokeWidth="1.5">
                        <polygon points="10,2 12.59,7.36 18.51,8.09 14,12.26 15.18,18.09 10,15.27 4.82,18.09 6,12.26 1.49,8.09 7.41,7.36"/>
                      </svg>
                    )}
                  </button>
                </div>
              ))}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button 
                  disabled={page === 1} 
                  onClick={() => setPage(page - 1)} 
                  variant="outline"
                  className="border-[#06B6D4]/30 text-[#06B6D4] hover:bg-[#06B6D4]/10"
                >
                  Previous
                </Button>
                
                <span className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                
                <Button 
                  disabled={page === totalPages} 
                  onClick={() => setPage(page + 1)} 
                  variant="outline"
                  className="border-[#06B6D4]/30 text-[#06B6D4] hover:bg-[#06B6D4]/10"
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        {/* Favorites - Sidebar */}
        <Card className="md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              ⭐ Your Favorites
            </CardTitle>
          </CardHeader>
          <CardContent>
            {favorites.length === 0 ? (
              <div className="text-center py-4">
                <div className="text-2xl mb-2">💫</div>
                <div className="text-sm text-muted-foreground mb-1">No favorites yet</div>
                <div className="text-xs text-muted-foreground">Click ⭐ on books!</div>
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
          </CardContent>
        </Card>
      </div>

      {/* Demo Info Footer */}
      <Card className="mt-6 border-[#06B6D4]/20 bg-[#06B6D4]/5">
        <CardContent className="p-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            <strong>This is a basic demo</strong> with 8 genres and 500 books for quick loading.
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            The full version has <strong>20,000+ books and 30 genres</strong> — try it on GitHub:
          </p>
          <Button
            asChild
            className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white"
          >
            <a 
              href="https://github.com/ashwin-rajakannan/genre-based-book-recommender" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Full Demo on GitHub
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
