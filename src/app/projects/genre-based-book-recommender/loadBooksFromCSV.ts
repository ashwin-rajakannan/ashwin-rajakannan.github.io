import Papa from "papaparse";

interface CSVRow {
  ISBN: string;
  Title: string;
  Author: string;
  Genre: string;
  ImageURL?: string;
  Rating?: string;
}

interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  genre: string;
  cover: string;
  rating: string;
}

export async function loadBooksFromCSV(csvUrl: string, maxRows = 200): Promise<Book[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (results: Papa.ParseResult<CSVRow>) => {
        // Filter and map to book objects
        const books = results.data
          .slice(0, maxRows)
          .map((row: CSVRow, idx: number) => ({
            id: idx + 1,
            isbn: row.ISBN,
            title: row.Title,
            author: row.Author,
            genre: row.Genre,
            cover: row.ImageURL || "/covers/placeholder.jpg",
            rating: row.Rating || "",
          }))
          .filter((b: Book) => b.title && b.author && b.genre);
        resolve(books);
      },
      error: reject,
    });
  });
}
