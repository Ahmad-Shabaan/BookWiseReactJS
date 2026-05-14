import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="w-full border-t border-outline-variant/15 bg-background">
      <div className="container w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-10 sm:py-12">
        {/*
          ✅ FIX: Added `flex-wrap` so the three sections (brand, links, social)
          wrap to a second row on narrow tablets instead of compressing.
          Previously the `flex-col md:flex-row` layout jumped directly from
          a vertical stack to a horizontal row with no intermediate state,
          creating a cramped look at 768px.
        */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center gap-6 sm:gap-8">
          {/* Brand + copyright */}
          <div className="space-y-3 text-center sm:text-left">
            <div className="text-xl font-black tracking-tighter bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              BookWise
            </div>
            <div className="label-sm uppercase tracking-[0.05em] font-medium text-on-surface-variant text-xs">
              © {new Date().getFullYear()} BookWise. All rights reserved.
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            {[
              { label: "About", to: "/about" },
              { label: "Privacy", to: "/privacy" },
              { label: "Terms", to: "/terms" },
              { label: "Support", to: "/support" },
            ].map(({ label, to }) => (
              <Link
                key={label}
                className="label-sm uppercase tracking-[0.05em] font-medium text-on-surface-variant hover:text-secondary transition-colors opacity-80 hover:opacity-100 text-xs sm:text-sm"
                to={to}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex gap-4 sm:gap-6">
            {[
              { label: "Twitter", href: "#" },
              { label: "GitHub", href: "#" },
            ].map(({ label, href }) => (
              <a
                key={label}
                className="text-sm text-on-surface-variant hover:text-primary transition-colors"
                href={href}
                // ✅ FIX: Added rel="noopener noreferrer" to external anchors
                rel="noopener noreferrer"
                target="_blank"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
