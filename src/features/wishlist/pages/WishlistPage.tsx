import { useSearchParams } from "react-router-dom";
import { useGetWishlist } from "../hooks/useWishlist";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import CustomPagination from "@/shared/components/common/Pagination/CustomPagination";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { mergeWishlist } from "../store/wishlistSlice";
import type { WishlistBook } from "../types/wishlist";
import SectionHeader from "@/shared/components/common/SectionHeader";
import Aside from "@/shared/components/common/Aside";
import {
  BookMarked,
  CloudBackup,
  Heart,
  SoapDispenserDropletIcon,
  Star,
} from "lucide-react";
import BookGrid from "@/shared/components/common/Grid";
import AppError from "@/shared/components/common/ErrorBoundary/AppError";
import { useAsideAnimation } from "@/shared/animations/aside.animation";

const WishlistPage = () => {
  const [searchParam, setSearchParams] = useSearchParams();
  const pageIndex: number = parseInt(searchParam.get("page") || "1");
  const { data, isLoading, isError, isFetching } = useGetWishlist(pageIndex);
  const [isPending, startTransition] = useTransition();
  const [uiPageIndex, setUiPageIndex] = useState<number>(data?.pageIndex ?? 1);
  const dispatch = useAppDispatch();
  const wishlistItemsCount = useAppSelector(
    (state) => state.wishlist.wishlistCount,
  );
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
    const ids: number[] = data.data.map((item: WishlistBook) => item.id);
    dispatch(mergeWishlist(ids));
  }, [data, dispatch]);

  if (isError)
    return (
      <AppError
        message="We couldn’t load your wishlist right now. Please try again in a moment."
        link="Back to Library"
        to="/library"
      />
    );
  return (
    <div className="main-container">
      <div className="page-container">
        <div className="w-full col-center lg:flex-row gap-6 lg:items-start">
          <div className="w-full flex-1">
            <SectionHeader to="/library" link="Explore more Books">
              <div className="flex items-center gap-6 z-10">
                <div className="icon-card">
                  <Heart className="size-6 sm:size-8 text-primary-dim" />
                </div>
                <h1 className="section-header">
                  Wishlist
                  <span className="items-count-span">
                    {wishlistItemsCount}{" "}
                    {wishlistItemsCount === 1 ? "Item" : "Items"}
                  </span>
                </h1>
              </div>
            </SectionHeader>
            <div className="min-w-0 flex-1 w-full">
              <BookGrid
                books={data?.data ?? []}
                isLoading={isLoading || isFetching}
                skeletonCount={12}
                parentType="Wishlist"
              />

              {/* Pagination */}
              {data && !isLoading && !isPending && data.data.length > 0 && (
                <div className="mt-10">
                  <CustomPagination
                    pageIndex={uiPageIndex}
                    pageSize={data.pageSize}
                    count={data.count}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>
          <aside
            className="w-full lg:max-w-65 lg:flex flex-col gap-6"
            ref={sidebarRef}
          >
            <Aside asideHeader="My Library">
              <>
                <p className="text-on-surface-variant text-body-md mb-6">
                  Manage your saved worlds.
                </p>
                <div className="flex flex-col gap-2 relative z-10">
                  <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-surface-container text-primary transition-colors border border-outline-variant/15">
                    <Heart
                      className="w-6 h-6 text-primary-dim"
                      fill="#6063ee"
                    />
                    <span className="font-medium text-sm">Wishlist</span>
                    <span className="ml-auto text-xs bg-surface-container-highest px-2 py-1 rounded-full">
                      {wishlistItemsCount}
                    </span>
                  </button>
                  <button className="flex items-center gap-3 w-full p-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                    <CloudBackup className="h-6 w-6" />
                    <span className="font-medium text-sm">Reading History</span>
                  </button>
                </div>
              </>
            </Aside>
            <Aside asideHeader="Collections">
              <>
                <p className="text-on-surface-variant text-body-md mb-6">
                  Manage your saved worlds.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      <BookMarked className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-on-surface group-hover:text-primary transition-colors">
                      To Read Next
                    </span>
                  </div>
                  <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                      <Star className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-on-surface group-hover:text-secondary transition-colors">
                      All-Time Favorites
                    </span>
                  </div>

                  <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-tertiary/20 flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors">
                      <SoapDispenserDropletIcon className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-on-surface group-hover:text-tertiary transition-colors">
                      Sci-Fi Research
                    </span>
                  </div>
                </div>
              </>
            </Aside>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
