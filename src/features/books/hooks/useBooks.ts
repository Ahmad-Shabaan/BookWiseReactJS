import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { authorsQueryOptions, bookDetailsQueryOptions, booksQueryOptions, categoriesQueryOptions, trendingBooksQueryOptions } from '../options/books.query.option';
import type { BookFilters, BooksResponse, TrendingBooks } from '../types/book';

export const useBooks = (filters: BookFilters): UseQueryResult<BooksResponse , Error> => {
  return useQuery(booksQueryOptions(filters));
};

export const useGetTrendingBooks = () : UseQueryResult<TrendingBooks[] , Error> =>{
  return useQuery(trendingBooksQueryOptions());
}

export const useBookDetail = (id: string) => {
  return useQuery(bookDetailsQueryOptions(id));
}


export const useCategories = () => {
  return useQuery(categoriesQueryOptions());
}


export const useAuthors = () => {
  return useQuery(authorsQueryOptions());
}
