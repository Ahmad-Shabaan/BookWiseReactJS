export type PaginationParams = {
  pageIndex: number;
  pageSize: number;
  count: number;
  onPageChange: (page: number) => void;
};

export type SectionAnimationParams = {
  sectionRef: React.RefObject<HTMLDivElement | null>;
    dependencies?: unknown[]; // allow passing dependencies to re-run animation on updates (e.g. when books data changes)
};

