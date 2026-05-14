import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/15 bg-background">
      <div className="flex flex-col md:flex-row justify-between items-center py-12 gap-8 container w-full mx-auto px-6 md:px-12 lg:px-16 ">
        <div className="space-y-4 text-center md:text-left">
          <div className="text-xl font-black tracking-tighter bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            BookWise
          </div>
          <div className="label-sm uppercase tracking-[0.05em] font-medium text-on-surface-variant">
            © {new Date().getFullYear()} BookWise. All rights reserved.
          </div>
        </div>
        <div className="flex gap-8">
          <Link
            className="label-sm uppercase tracking-[0.05em] font-medium text-on-surface-variant hover:text-secondary transition-colors opacity-80 hover:opacity-100"
            to="/about"
          >
            About
          </Link>
          <Link
            className="label-sm uppercase tracking-[0.05em] font-medium text-on-surface-variant hover:text-secondary transition-colors opacity-80 hover:opacity-100"
            to="/privacy"
          >
            Privacy
          </Link>
          <Link
            className="label-sm uppercase tracking-[0.05em] font-medium text-on-surface-variant hover:text-secondary transition-colors opacity-80 hover:opacity-100"
            to="/terms"
          >
            Terms
          </Link>
          <Link
            className="label-sm uppercase tracking-[0.05em] font-medium text-on-surface-variant hover:text-secondary transition-colors opacity-80 hover:opacity-100"
            to="/support"
          >
            Support
          </Link>
        </div>
        <div className="flex gap-6">
          <a
            className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
            href="#"
          >
            Twitter
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
            href="#"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
