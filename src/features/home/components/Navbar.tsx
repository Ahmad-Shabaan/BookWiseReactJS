import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import {  Bell } from "lucide-react";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] border-b border-white/5"
    >
      <div className="max-w-350 w-full mx-auto px-6 md:px-12 lg:px-16 flex justify-between items-center h-20">
        <Link
          to="/"
          className="text-2xl font-black tracking-tighter bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          BookWise
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          <Link
            to="/"
            className="font-inter tracking-tight headline-lg font-bold text-primary border-b-2 border-primary pb-1"
          >
            Discover
          </Link>
          <Link
            to="/library"
            className="font-inter tracking-tight headline-lg font-bold text-on-surface-variant hover:text-on-surface transition-colors duration-300"
          >
            Library
          </Link>
          <Link
            to="/collections"
            className="font-inter tracking-tight headline-lg font-bold text-on-surface-variant hover:text-on-surface transition-colors duration-300"
          >
            Collections
          </Link>
          <Link
            to="/community"
            className="font-inter tracking-tight headline-lg font-bold text-on-surface-variant hover:text-on-surface transition-colors duration-300"
          >
            Community
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-on-surface-variant hover:bg-primary/10 p-2 rounded-full transition-colors duration-300 active:scale-95">
            <Bell size={20} />
          </button>
          <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-outline-variant/15 hover:border-primary/50 transition-colors cursor-pointer">
            <img
              alt="User profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwUgAKKTV61TXsG7P0E70fv68_nLKzbR6i2Q6OdAlX2hEpTDAFihyT4HiZ_DmsOpzbyDnAyRTkkYByxD7VSz7YNOJP3HVYGQS4fjfGMEGQSkevtP1hXmt04z7iYzujjlZHx-6GqCDJ6RBHrY3Es7-EKK1nHQdzRTQzdFKCVbqxjP8uak9M38iVQ1kLMZxSMxBdNo4SOoU4aJ5Bux8VZzgvvO-QYh94_xBfF46Bs4CmcCxbUITdbn9AGwEzx78wZNOeR43IPHHW2V0"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
