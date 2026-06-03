export interface BookFilters {
  categoryId?: number;
  pageIndex?: number;
  rating?: number;
  authorId?: number;
  search?: string;
  sort?:string;
}

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

export interface TrendingBooks {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  author: string;
}

export interface PaginatedBooks {
  data: Book[];
  count: number; // Total matching records (for pagination UI)
  pageIndex: number; // Current page (1-indexed)
  pageSize: number; // Items per page (12)
}

export interface BookDetailResponse {
  success: boolean;
  data: Book;
}

export type BookStatus = "available" | "borrowed";

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}



export interface Category {
  id: number;
  name: string;
}


export interface Author {
  id: number;
  name: string;
}