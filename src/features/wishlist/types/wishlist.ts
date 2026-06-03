
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

export interface WishlistBookProps {
  bookId: number;
  isWished: boolean;
  pageIndex: number;
  search?: string;
  category?: string;
  authorId?: number;
}
