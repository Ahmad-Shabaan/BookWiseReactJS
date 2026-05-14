import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setSearchQuery } from "../store/booksSlice"
const SearchBar = () => {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector(state => state.books.searchQuery)  
  return (
    <input
      value={searchQuery}
      onChange={e => dispatch(setSearchQuery(e.target.value))}  // Redux updates instantly
      placeholder="Search posts…"
    />
  )
}
export default SearchBar;