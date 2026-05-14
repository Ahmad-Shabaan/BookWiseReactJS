//  # TanStack Query mutations/queries

import { config } from "@/config/env";
import axios from "axios";
import { type filters } from "../types/books.types";

export const fetchBooks = async (filters: filters) => {
  console.log("Fetching books with filters:", filters);
  if(filters.authorId === 0) {
    delete filters.authorId;
  }
  const response = await axios.get(config.apiUrl + "/books?pageSize=2", {
    params: filters,    
    
  });
  console.log("Fetched books with filters:", filters, "Response:", response.data);
  return response.data;
};

export const fetchBookById = async (id: number) => {
  const response = await axios.get(config.apiUrl + `/books/${id}`);
  return response.data;
}