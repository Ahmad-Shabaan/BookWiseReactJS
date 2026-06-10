import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookGrid from "@/shared/components/common/Grid";
import CustomPagination from "@/shared/components/common/Pagination/CustomPagination";
import { useBooks } from "../hooks/useBooks";
import { useTransition } from "react";
import { useAppDispatch } from "@/store/hooks";
import Aside from "@/shared/components/common/Aside";
import SectionHeader from "@/shared/components/common/SectionHeader";
import { BookAIcon, SlidersHorizontal, X } from "lucide-react";
import Search from "../components/Search";
import Sort from "../components/Sort";
import Filter from "../components/Filter";
import { mergeWishlist } from "@/features/wishlist/store/wishlistSlice";
import { useFiltersFromURL } from "../hooks/useFilter";
import { Spinner } from "@/components/ui/spinner";
import { useAsideAnimation } from "@/shared/animations/aside.animation";
import ErrorMessage from "@/shared/components/common/ErrorBoundary/ErrorMessage";

// ── BooksPage ─────────────────────────────────────────────────────────────────
export default function BooksPage() {

  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useFiltersFromURL();
  const dispatch = useAppDispatch();

  const activeCount = Object.entries(filters).length - 1;
  const { data, isLoading, error , isFetching} = useBooks(filters);
  const [uiPageIndex, setUiPageIndex] = useState<number>(data?.pageIndex ?? 1);
  const [isPending, startTransition] = useTransition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  useAsideAnimation({ sectionRef: sidebarRef });

  // ── Page change ──────────────────────────────────────────────────────────
  const handlePageChange = useCallback(
    (p: number) => {
      setUiPageIndex(p);
      startTransition(() => {
        setSearchParams(
          (prev) => {
            const next = new URLSearchParams(prev);
            next.set("page", String(p));
            return next;
          },
          { replace: true },
        );
      });
    },
    [setSearchParams],
  );

  useEffect(() => {
    if (!data) return;
    const ids: number[] = data.data
      .filter((book) => book.isWished === true)
      .map((book) => book.id);
    dispatch(mergeWishlist(ids));
  }, [data, dispatch]);


  // Close mobile menu on route change / escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  const clearFilters = () => {
    const next = new URLSearchParams(searchParams.toString());
    [
      "genre",
      "rating",
      "yearFrom",
      "yearTo",
      "sort",
      "search",
      "category",
      "author",
    ].forEach((k) => next.delete(k));
    next.set("page", "1");
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="main-container lg:pt-16 relative">
      <div className="page-container">
        <div className="w-full col-center lg:flex-row gap-6 lg:items-start">
          <div className="w-full flex-1 relative">
            <SectionHeader
              to="/library"
              link="Explore more Books"
              hideLink={true}
            >
              <>
                <div className="flex items-center gap-6 z-10">
                  <div className="icon-card">
                    <BookAIcon className="size-6 sm:size-8 text-primary-dim" />
                  </div>
                  <div>
                    <h1 className="section-header text-nowrap">My Library</h1>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4 z-10 w-full">
                  <Search />
                </div>
              </>
            </SectionHeader>

            {/* ── Content area ────────────────────────────────────────── */}
            <div className="min-w-0 flex-1 w-full">
              {error ? (
                <ErrorMessage msg="Oops! Something went wrong while loading books. Please try again in a minute." />
              ) : (
                <>
                  {/* Grid — passes isLoading so BookGrid owns skeleton rendering */}
                  <BookGrid
                    books={data?.data ?? []}
                    isLoading={ isLoading || isFetching}
                    skeletonCount={12}
                    parentType="Main"
                  />

                  {/* Pagination */}
                  {data && !isLoading && !isPending && (
                    <div className="mt-10">
                      <CustomPagination
                        pageIndex={uiPageIndex}
                        pageSize={data.pageSize}
                        count={data.count}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
            {!mobileOpen && (
              <div className=" absolute -top-8 sm:-top-10.5 right-0 lg:hidden z-20 pr-2 sm:pr-0">
                <SlidersHorizontal
                  size={20}
                  onClick={() => setMobileOpen((prev) => !prev)}
                  className="cursor-pointer"
                />
              </div>
            )}
          </div>
          {/* ── Sidebar ─────────────────────────────────────────────── */}

          {mobileOpen && (
            <aside
              className={`fixed bottom-0 left-0 right-0 z-20   bg-background h-[calc(100dvh-60px)]
          overflow-y-auto hide-scrollbar overflow-x-hidden transition-all duration-300 ease-in-out 
          `}
            >
              {mobileOpen && (
                <>
                  {isLoading && (
                    <div className="h-dvh fixed inset-0 pointer-events-auto bg-surface/50 z-50 flex-center ">
                      <Spinner className="size-8 text-primary" />
                    </div>
                  )}
                  <div className="fixed top-12 sm:top-14 z-40 h-12 w-full flex justify-end items-center text-on-surface bg-background p-6">
                    <X
                      size={20}
                      onClick={() => setMobileOpen((prev) => !prev)}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="fixed bottom-0 z-40 h-12 w-full flex justify-between items-center text-on-surface bg-background px-6 py-8">
                    <button
                      onClick={clearFilters}
                      className="text-sm font-semibold text-on-surface rounded-full transition hover:text-primary border border-on-surface-variant px-4 py-2 cursor-pointer"
                    >
                      Clear Filters
                    </button>
                    <div className="bg-primary text-on-primary px-4 py-2 flex-center font-semibold text-sm rounded-full">
                      Show {data?.count} results
                    </div>
                  </div>
                </>
              )}
              <div
                className=" flex flex-col gap-6 px-6 pt-12 pb-16 w-full"
                ref={sidebarRef}
              >
                <Aside asideHeader="Sort by">
                  <>
                    <Sort />
                  </>
                </Aside>
                <Aside
                  asideHeader={
                    <>
                      Filters
                      {activeCount > 0 && (
                        <span className="flex gap-1 items-center">
                          {activeCount}
                          <SlidersHorizontal />
                        </span>
                      )}
                    </>
                  }
                >
                  <>
                    <Filter />
                  </>
                </Aside>
              </div>
            </aside>
          )}

          <aside
            className="hidden w-full max-w-65 lg:flex flex-col gap-6"
            ref={sidebarRef}
          >
            <Aside asideHeader="Sort by">
              <>
                <Sort />
              </>
            </Aside>
            <Aside
              asideHeader={
                <>
                  Filters
                  {activeCount > 0 && (
                    <span className="flex gap-1 items-center">
                      {activeCount}
                      <SlidersHorizontal />
                    </span>
                  )}
                </>
              }
            >
              <>
                <Filter />
                <div className="w-full flex justify-between items-center flex-wrap text-on-surface pt-4 gap-y-2">
                  <button
                    onClick={clearFilters}
                    className="text-sm lg:text-xs font-semibold  text-on-surface rounded-full transition hover:text-primary border border-on-surface-variant px-4 lg:px-3 py-2 cursor-pointer"
                  >
                    Clear Filters
                  </button>
                  <div className="bg-primary text-on-primary px-4 lg:px-3 py-2 flex-center font-semibold text-sm lg:text-xs rounded-full ">
                    Show {data?.count} results
                  </div>
                </div>
              </>
            </Aside>
          </aside>
        </div>
      </div>
    </div>
  );
}

// export default BooksPage;
