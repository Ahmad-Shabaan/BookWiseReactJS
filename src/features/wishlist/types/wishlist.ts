import type { BookFilters } from "@/features/books/types/book";

export interface WishlistToggleResponse {
  message: string;
}
export interface WishlistBook {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  price: number;
  categories: null;
  genre: null;
  publisher: string;
}
export interface WishlistResponse {
  items: WishlistBook[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
}

export interface WishlistBookParams {
  bookId: number;
  isWished: boolean;
  filters:BookFilters;
  checkoutIdempotencyKey:string | null
  
}
