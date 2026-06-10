import type { Book, BookFilters, Category, BooksResponse, TrendingBooks } from "../types/book";
import axiosClient from "@/shared/api/axiosClient";
import { AxiosError } from "axios";
import { BOOKS_PAGE_SIZE } from "../constants/books.constants";

export const getBooks = async (
  filters: BookFilters,
): Promise<BooksResponse> => {
  try {
    const response = await axiosClient.get(`/books?pageSize=${BOOKS_PAGE_SIZE}`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    throw error instanceof AxiosError ? error : new Error("Unknown error");
  }
};

export const getTrendingBooks = async (): Promise<TrendingBooks[]> => {
  try {
    const response = await axiosClient.get(`/books/trending-books`);
    return response.data;
  } catch (error) {
    throw error instanceof AxiosError ? error : new Error("Unknown error");
  }
};

export const getBookById = async (id: number): Promise<Book> => {
  try {
    const response = await axiosClient.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw error instanceof AxiosError ? error : new Error("Unknown error");
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axiosClient.get(`/v1/categories`);
    return response.data;
  } catch (error) {
    throw error instanceof AxiosError ? error : new Error("Unknown error");
  }
};

export const getAuthors = async (): Promise<Category[]> => {
  try {
    const response = await axiosClient.get(`/v1/authors`);
    return response.data;
  } catch (error) {
    throw error instanceof AxiosError ? error : new Error("Unknown error");
  }
};


