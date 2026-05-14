import { useQuery } from "@tanstack/react-query";
import { bookDetailsQueryOptions } from "../services/books.queries";

export const useBookDetails = (id: number) => {
  return useQuery(bookDetailsQueryOptions(id));
}