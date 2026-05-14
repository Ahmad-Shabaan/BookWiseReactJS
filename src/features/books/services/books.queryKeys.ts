export const BOOKS_QUERY_KEYS = {
  all: ['books'] as const,

  list: (filters: {
    category?: string;
    pageIndex?: number;
    rating?: number;
    authorId?: number;
  }) => ['books', filters] as const,

  details: (id: number) => ['book', id] as const,
};
