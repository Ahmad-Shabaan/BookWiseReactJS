export type PaginationProps = {
  pageIndex: number;
  pageSize: number;
  count: number;
  onPageChange: (page: number) => void;
};

export type SectionAnimationProps = {
  sectionRef: React.RefObject<HTMLDivElement | null>;
};