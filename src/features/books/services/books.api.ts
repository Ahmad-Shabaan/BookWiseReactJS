//  # api methods for books

import { config } from "@/config/env";
import type { Book, BookFilters, Category, BooksResponse, TrendingBooks } from "../types/book";
import axiosClient from "@/shared/api/axiosClient";
import { AxiosError } from "axios";

export const getBooks = async (
  filters: BookFilters,
): Promise<BooksResponse> => {
  try {
    const response = await axiosClient.get(config.apiUrl + "/books?pageSize=12", {
      params: filters,
    });
    return response.data;
  } catch (error) {
    throw error instanceof AxiosError ? error : new Error("Unknown error");
  }
};

export const getTrendingBooks = async (): Promise<TrendingBooks[]> => {
  try {
    const response = await axiosClient.get(config.apiUrl + `/books/trending-books`);
    return response.data;
  } catch (error) {
    throw error instanceof AxiosError ? error : new Error("Unknown error");
  }
};

export const getBookById = async (id: string): Promise<Book> => {
  try {
    const response = await axiosClient.get(config.apiUrl + `/books/${id}`);
    return response.data;
  } catch (error) {
    throw error instanceof AxiosError ? error : new Error("Unknown error");
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axiosClient.get(config.apiUrl + `/books/categories`);
    return response.data;
  } catch (error) {
    throw error instanceof AxiosError ? error : new Error("Unknown error");
  }
};

export const getAuthors = async (): Promise<Category[]> => {
  try {
    const response = await axiosClient.get(config.apiUrl + `/books/authors`);
    return response.data;
  } catch (error) {
    throw error instanceof AxiosError ? error : new Error("Unknown error");
  }
};


