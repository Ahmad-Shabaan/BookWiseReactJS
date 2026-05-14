import { useQuery } from '@tanstack/react-query';
import { booksQueryOptions } from '../services/books.queries';
import type { filters } from '../types/books.types';

export const useBooks = (filters : filters) => {
  return useQuery(booksQueryOptions(filters));
};
