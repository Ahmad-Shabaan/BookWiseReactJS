import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useBooks } from "../hooks/useBooks";
import type { Book } from "../types/books.types";
import BookCard from "../components/BookCard";
import { changeAuthor, changePage } from "../store/booksSlice";
import { useEffect, useState } from "react";
import { config } from "@/config/env";
import SearchBar from "../components/SearchBar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import CustomPagination from "@/shared/components/common/Pagination/CustomPagination";

const BooksListPage = () => {
  const dispatch = useAppDispatch();
  const { isLoggingOut, logout } = useAuth();
  const { category, rating, page, authorId } = useAppSelector(
    (state) => state.books,
  );

  const { data, isLoading, isError } = useBooks({
    category,
    rating,
    pageIndex: page,
    authorId,
  });

  const [authors, setAuthors] = useState<
    { id: number; firstName: string; lastName: string }[]
  >([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${config.apiUrl}/authors`);
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col items-center gap-5">
      <select
        value={authorId?.toString() || ""}
        onChange={(e) => dispatch(changeAuthor(+e.target.value))}
      >
        <option value="">All Authors</option>
        {authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.firstName} {author.lastName}
          </option>
        ))}
      </select>

      <SearchBar />

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error fetching books</div>}
      {data?.data?.map((book: Book) => {
        return (
          <BookCard key={book.id} imageUrl={book.imageUrl} title={book.title} />
        );
      })}

      <div>
        <CustomPagination pageIndex={data?.pageIndex} pageSize={data?.pageSize} count={data?.count} onPageChange={function (page: number): void {
          dispatch(changePage(page));
        } } />
      </div>

      <button onClick={logout} disabled={isLoggingOut}>
        {isLoggingOut ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
};

export default BooksListPage;
