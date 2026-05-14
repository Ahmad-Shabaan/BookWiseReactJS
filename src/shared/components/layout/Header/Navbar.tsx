import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Bell, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Discover", to: "/" },
  { label: "Library", to: "/library" },
  { label: "Collections", to: "/collections" },
  { label: "Community", to: "/community" },
];
const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  // ✅ FIX: Added mobile menu state — previously nav items were `hidden md:flex`
  // with no mobile alternative. Users on phones had no way to navigate.
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 },
      );
    });

    // ✅ FIX: The original had no cleanup. GSAP contexts must be reverted
    // on unmount to prevent memory leaks (tweens holding refs to detached DOM).
    return () => ctx.revert();
  }, []);

  // Close mobile menu on route change / escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] border-b border-white/5"
      // ✅ A11Y: role="navigation" + aria-label for screen readers
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-350 w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16 flex justify-between items-center h-16 sm:h-18 md:h-20">
        {/* Brand */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-black tracking-tighter bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent shrink-0"
        >
          BookWise
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-6 lg:gap-8 items-center">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="font-inter tracking-tight text-sm lg:text-base font-bold text-on-surface-variant hover:text-on-surface transition-colors duration-300 first:text-primary first:border-b-2 first:border-primary first:pb-0.5"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          <button
            className="text-on-surface-variant hover:bg-primary/10 p-2 rounded-full transition-colors duration-300 active:scale-95"
            aria-label="Notifications"
          >
            <Bell size={18} className="sm:w-5 sm:h-5" />
          </button>

          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden border-2 border-outline-variant/15 hover:border-primary/50 transition-colors cursor-pointer shrink-0">
            <img
              alt="User profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwUgAKKTV61TXsG7P0E70fv68_nLKzbR6i2Q6OdAlX2hEpTDAFihyT4HiZ_DmsOpzbyDnAyRTkkYByxD7VSz7YNOJP3HVYGQS4fjfGMEGQSkevtP1hXmt04z7iYzujjlZHx-6GqCDJ6RBHrY3Es7-EKK1nHQdzRTQzdFKCVbqxjP8uak9M38iVQ1kLMZxSMxBdNo4SOoU4aJ5Bux8VZzgvvO-QYh94_xBfF46Bs4CmcCxbUITdbn9AGwEzx78wZNOeR43IPHHW2V0"
            />
          </div>
          {/* ✅ NEW: Hamburger button — only visible on mobile */}
          <button
            className=" md:hidden text-on-surface-variant hover:bg-primary/10 p-2 rounded-full transition-colors active:scale-95"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/*
        ✅ NEW: Mobile dropdown menu.
        Uses CSS max-height transition for a smooth open/close without GSAP
        (keeps this lightweight — GSAP is overkill for a simple disclosure).
        `overflow-hidden` + `max-h-0`→`max-h-64` gives a smooth slide-down.
      */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-72 border-t border-white/5" : "max-h-0"
        }`}
      >
        <div className="px-4 py-4 space-y-1 bg-background/90 backdrop-blur-xl">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-xl font-bold text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
