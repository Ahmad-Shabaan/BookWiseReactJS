export interface Book {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  isbn: string;
  publicationYear: number;
  genre: string;
  status: "Available" | "Unavailable" | "OutOfStock"; // adjust if needed
  totalCopies: number;
  availableCopies: number;
  author: string;
  publisher: string;
  categories: string[];
  isWished: boolean;
}

export interface BooksResponse {
  data: Book[];
  count: number; // Total matching records (for pagination UI)
  pageIndex: number; // Current page (1-indexed)
  pageSize: number; // Items per page (12)
}