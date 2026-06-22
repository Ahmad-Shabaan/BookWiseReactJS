import { SkeletonBlock } from "@/shared/components/common/SkeletonBlock";

const NavbarSkeleton = () => {
  return (
    <header>
      <nav className="fixed top-0 w-full z-50 bg-background/70">
        <SkeletonBlock className="relative z-30 container w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16 h-12 sm:h-14  lg:h-16" />
      </nav>
    </header>
  );
};

export default NavbarSkeleton;
