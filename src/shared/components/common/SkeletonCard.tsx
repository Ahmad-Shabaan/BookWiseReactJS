const SkeletonCard = () => {
  return (
    <div className="overflow-hidden bg-surface-container-low">
      <div className="aspect-2/2 animate-pulse bg-surface-container" />
      <div className="space-y-2 px-4 pb-4 pt-3">
        <div className="h-3 w-4/5 animate-pulse rounded bg-surface-container" />
        <div className="h-2.5 w-3/5 animate-pulse rounded bg-surface-container" />
        <div className="h-2.5 w-2/5 animate-pulse rounded bg-surface-container" />
      </div>
    </div>
  );
};

export default SkeletonCard;
