import { useSearchParams } from "react-router-dom";
import { cleanFilters } from "../utils/cleanFilters";

export const useFiltersFromURL = () => {
  const [searchParams] = useSearchParams();

  const filters = {
    search: searchParams.get("search") ?? undefined,
    sort: searchParams.get("sort") ?? undefined,
    categoryId: Number(searchParams.get("category") ?? undefined),
    authorId: Number(searchParams.get("author") ?? undefined),
    genre: searchParams.get("genre") ?? undefined,
    rating: Number(searchParams.get("rating") ?? undefined),
    yearFrom: Number(searchParams.get("yearFrom") ?? undefined),
    yearTo: Number(searchParams.get("yearTo") ?? undefined),
    pageIndex: Number(searchParams.get("page") ?? undefined),
  };
  return cleanFilters(filters);
};
