import { queryOptions } from "@tanstack/react-query";
import type { BookFilters } from "../types/book";
import {
  AUTHORS_QUERY_KEY,
  BOOKS_GC_TIME,
  BOOKS_QUERY_KEYS,
  BOOKS_STALE_TIME,
  CATEGORIES_QUERY_KEY,
  TRENDING_BOOKS_QUERY_KEY,
} from "../constants/books.constants";
import { getAuthors, getBookById, getBooks, getCategories, getTrendingBooks } from "../services/books.api";

export const booksQueryOptions = (filters: BookFilters) =>
  queryOptions({
    queryKey: BOOKS_QUERY_KEYS.list(filters),
    queryFn: () => getBooks(filters),
    staleTime: BOOKS_STALE_TIME,
    gcTime: BOOKS_GC_TIME,
  });

export const bookDetailsQueryOptions = (id: number) =>
  queryOptions({
    queryKey: BOOKS_QUERY_KEYS.details(id),
    queryFn: () => getBookById(id),
    staleTime: BOOKS_STALE_TIME,
    gcTime: BOOKS_GC_TIME,
  });

export const categoriesQueryOptions = () =>
  queryOptions({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: getCategories,
    staleTime: BOOKS_STALE_TIME,
    gcTime: BOOKS_GC_TIME,
  });

  export const authorsQueryOptions = () =>
  queryOptions({
    queryKey: AUTHORS_QUERY_KEY,
    queryFn: getAuthors,
    staleTime: BOOKS_STALE_TIME,
    gcTime: BOOKS_GC_TIME,
  });

    export const trendingBooksQueryOptions = () =>
  queryOptions({
    queryKey: TRENDING_BOOKS_QUERY_KEY,
    queryFn: getTrendingBooks,
    staleTime: BOOKS_STALE_TIME,
    gcTime: BOOKS_GC_TIME,
  });
