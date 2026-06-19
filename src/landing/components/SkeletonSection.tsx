import { SkeletonBlock } from "@/shared/components/common/SkeletonBlock";

// should create one for each section
const SkeletonSection = () => {
  return (
    <div className="py-24 sm:py-28 md:py-32 bg-surface">
      <div className="section-container">
        <SkeletonBlock className="h-75"/>
      </div>
    </div>
  );
};

export default SkeletonSection;
