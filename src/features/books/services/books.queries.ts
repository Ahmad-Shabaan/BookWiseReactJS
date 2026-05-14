import { queryOptions } from "@tanstack/react-query";
import { BOOKS_QUERY_KEYS } from "./books.queryKeys";
import type { filters } from "../types/books.types";
import { fetchBookById, fetchBooks } from "./books.api";



export const booksQueryOptions = (filters: filters) =>
  queryOptions({
    queryKey: BOOKS_QUERY_KEYS.list(filters),
    queryFn: () => fetchBooks(filters),
    staleTime: 1000 * 60 * 5,
  });

export const bookDetailsQueryOptions = (id: number) => queryOptions({
  queryKey: BOOKS_QUERY_KEYS.details(id),
    queryFn: () => fetchBookById(id),
});
