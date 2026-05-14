
import BookCard from "@/features/books/components/BookCard";
import { useBooks } from "@/features/books/hooks/useBooks";
import { changeCategory, changePage } from "@/features/books/store/booksSlice";
import CustomPagination from "@/shared/components/common/Pagination/CustomPagination";
import { useAppDispatch, useAppSelector, } from "@/store/hooks";
const About = () => {
  const category = useAppSelector((state) => state.books.category);
  const page = useAppSelector((state) => state.books.page);
  console.log("Current category:", category, "Current page:", page);
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useBooks({ category, pageIndex: page });
  console.log(data);
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching books</div>
  return (
    <section id="about" >
      About section
      <div className="flex justify-center items-center gap-5">

      {data?.data?.map((book: { id: number, title: string, imageUrl: string }) => (
        <BookCard key={book.id} img={book.imageUrl} title={book.title} />
      ))}
      </div>


      <button onClick={() => dispatch(changeCategory("fiction"))}>Choose Category</button>

      <CustomPagination pageIndex={page} pageSize={data?.pageSize} count={data?.count} onPageChange={(newPage) => dispatch(changePage(newPage))} />

    </section >
  )
}

export default About