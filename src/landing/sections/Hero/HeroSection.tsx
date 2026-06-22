import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useHeroAnimation } from "./hero.animations";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  useHeroAnimation(sectionRef, imageLoaded);

  const handleSearch = () => {
    navigate(`/library?search=${searchQuery}`, { replace: true });
  };
  return (
    <div
      ref={sectionRef}
      className="relative w-full flex items-center overflow-hidden min-h-svh"
    >
      <div className=" section-container">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10" />
          <img
            className="w-full h-full object-cover opacity-60"
            alt="Stack of open books with reading glasses"
            src="/images/hero-image.webp"
            loading="eager"
            fetchPriority="high"
            onLoad={() => {
              requestAnimationFrame(() => {
                setImageLoaded(true);
              });
            }}
          />
        </div>

        {/* Content */}
        <section className="relative z-20 w-full max-w-5xl space-y-5 sm:space-y-6 md:space-y-8 py-24 sm:py-28">
          {/* Badge */}
          <div>
            <p className="badge opacity-0 text-primary uppercase tracking-normal md:tracking-widest font-normal text-sm sm:text-base">
              Evolution of Reading
            </p>
          </div>

          <h1
            className="heading opacity-0 font-black tracking-tight leading-[1.05] text-on-background"
            style={{ fontSize: "clamp(1.9rem, 6.5vw, 5.5rem)" }}
          >
            Discover your <br />
            <span className="nosplit text-gradient inline-block">
              next favorite
            </span>{" "}
            book
          </h1>

          {/* Search */}
          <div className="search opacity-0 relative w-full max-w-lg sm:max-w-xl md:max-w-2xl">
            <Search
              onClick={handleSearch}
              className="absolute z-1 left-4 sm:left-5 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
            />
            <Input
              type="text"
              value={searchQuery}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, author..."
              className="h-10 sm:h-11 md:h-12 pl-10 sm:pl-14 pr-24 sm:pr-28 md:pr-32 rounded-full text-sm sm:text-base md:text-lg font-normal"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
