import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import type { PaginationProps } from "@/shared/types/common.types";
import { useMemo } from 'react'

const CustomPagination = ({ pageIndex, pageSize, count, onPageChange }: PaginationProps) => {
  const totalPages = useMemo(() => {
    return Math.ceil(count / pageSize);
  }, [count, pageSize]);
  const pages = useMemo(() => {
    const pages: (number | "ellipsis")[] = [];

    const delta = 1; // the nearest page from current
    const left = Math.max(2, pageIndex - delta);
    const right = Math.min(totalPages - 1, pageIndex + delta);

    // First page
    pages.push(1);

    // ellipsis before left
    if (left > 2) pages.push("ellipsis");

    // middle pages
    for (let i = left; i <= right; i++) {
      pages.push(i);
    }
    // ellipsis after right
    if (right < totalPages - 1) pages.push("ellipsis");
    // Last page
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  }, [totalPages, pageIndex]);

  // Early return for single page (better performance)
  if (totalPages <= 1) {
    return null;
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (pageIndex > 1) onPageChange(pageIndex - 1);
            }}
            className={pageIndex === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {pages.map((p, idx) =>
          p === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={`page-${p}`}>
              <PaginationLink
                // href={`#${p}`}
                className="cursor-pointer"
                isActive={p === pageIndex}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(p);
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (pageIndex < totalPages) onPageChange(pageIndex + 1);
            }}
            className={pageIndex === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default CustomPagination