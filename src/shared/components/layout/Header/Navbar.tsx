import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Heart,
  ShoppingBasket,
  ListOrderedIcon,
  LogOutIcon,
  Sun,
  Moon,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useGetBasketCount } from "@/features/basket/hooks/useBasket";
import { useMobileMenuAnimation, useNavAnimation } from "./navbar.animation";
import { mergeWishlistCount } from "@/features/wishlist/store/wishlistSlice";
import { useGetWishlistCount } from "@/features/wishlist/hooks/useWishlist";
import { mergeBasketCount } from "@/features/basket/store/basketSlice";
import { useLocation } from "react-router-dom";
// import { HashLink } from "react-router-hash-link";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Spinner } from "@/components/ui/spinner";
// import useTheme from "@/shared/hooks/useTheme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "../../common/Logo";
import { toggleTheme } from "@/shared/store/themeSlice";
import useUser from "@/features/auth/hooks/useUser";
// import { useQueryClient } from "@tanstack/react-query";
// import { USER_QUERY_KEY } from "@/features/auth/constants/auth.constants";
// import type { User } from "@/features/auth/types/auth.types";
// import useGetBasketId from "@/shared/hooks/useGetBasketId";

const NAV_LINKS = [
  { label: "Discover", to: "/" },
  { label: "Library", to: "/library" },
  { label: "Collections", to: "/#collections" },
  { label: "Pricing", to: "/#pricing" },
];
const Navbar = () => {
  // const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  // const me: User | undefined = useQueryClient().getQueryData(USER_QUERY_KEY);
  const { user: me, isAuthenticated } = useUser();

  const theme = useAppSelector((state) => state.theme);
  // const basketId = useGetBasketId();
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: wishlistCount } = useGetWishlistCount(isAuthenticated);
  const { data: basketCount } = useGetBasketCount(isAuthenticated, me?.userId);
  const { logout, isLoggingOut } = useAuth();
  // const [theme, toggleTheme] = useTheme();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const wishListCountState = useAppSelector(
    (state) => state.wishlist.wishlistCount,
  );

  const basketCountState = useAppSelector((state) => state.basket.basketCount);

  useEffect(() => {
    if (wishlistCount !== undefined) {
      dispatch(mergeWishlistCount(wishlistCount));
    }
  }, [wishlistCount, dispatch]);

  useEffect(() => {
    if (basketCount !== undefined) {
      dispatch(mergeBasketCount(basketCount));
    }
  }, [basketCount, dispatch]);

  //animations
  useNavAnimation({ sectionRef: navRef });
  useMobileMenuAnimation({ sectionRef: navRef, active: mobileOpen });

  // Close mobile menu on route change / escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  return (
    <header>
      <nav
        ref={navRef}
        className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-xl shadow-soft border-b border-border"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="relative z-30 container w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16 flex justify-between items-center h-12 sm:h-14  lg:h-16">
          {/* Brand */}

          <Logo />
          {/* Desktop nav links */}
          <div className="hidden lg:flex gap-6 lg:gap-8 items-center">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={label + to}
                to={to}
                className={`font-inter tracking-tight text-sm lg:text-base font-bold text-on-surface hover:text-on-surface transition-colors duration-300 ${pathname === to ? "border-b border-primary text-primary" : ""}`}
              >
                {label}
              </Link>
            ))}
          </div>
          {/* Right controls */}
          <div className="flex items-start gap-3 sm:gap-4 lg:gap-6 text-on-surface">
            <Link
              to="/library/basket"
              style={
                {
                  "--count": `"${!basketCountState ? 0 : basketCountState > 9 ? "9+" : basketCountState}"`,
                } as React.CSSProperties
              }
              className="nav-icon"
              aria-label="Basket"
            >
              <ShoppingBasket className="size-5 sm:size-6 lg:size-7 text-on-surface" />
            </Link>
            <Link
              to="/library/wishlisted"
              aria-label="Wishlist"
              style={
                {
                  "--count": `"${!wishListCountState ? 0 : wishListCountState > 9 ? "9+" : wishListCountState}"`,
                } as React.CSSProperties
              }
              className="nav-icon"
            >
              <Heart className="size-5 sm:size-6 lg:size-7 text-on-surface" />
            </Link>
            <div className="hidden lg:block h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden border-2 border-outline-variant/15 hover:border-primary/50 transition-colors cursor-pointer shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <img
                    alt="User Profile"
                    className="w-8 h-8 sm:w-10 sm:h-10 object-cover"
                    src="/icons/user.png"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {isAuthenticated && (
                    <DropdownMenuItem
                      onSelect={() => navigate("/library/orders")}
                    >
                      <div className="flex-center gap-2">
                        <ListOrderedIcon />
                        Orders
                      </div>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onSelect={() => dispatch(toggleTheme())}>
                    {theme === "light" ? (
                      <>
                        <Moon /> Dark Mode
                      </>
                    ) : (
                      <>
                        <Sun /> Light Mode
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {!isAuthenticated ? (
                    <DropdownMenuItem>
                      <Link to="/login" className="flex-center gap-2">
                        <LogOutIcon />
                        Login in
                      </Link>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      onSelect={(e) => {
                        e.preventDefault();
                        logout();
                      }}
                      variant="destructive"
                    >
                      {isLoggingOut ? (
                        <>
                          <Spinner /> Logging out
                        </>
                      ) : (
                        <>
                          <LogOutIcon />
                          Log out
                        </>
                      )}
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <button
              className="lg:hidden text-on-surface-variant hover:bg-primary/10 p-2 rounded-full transition-colors active:scale-95"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            data-animate="mobile-menu"
            className={`container w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16 lg:hidden fixed inset-0  h-dvh  will-change-transform bg-background`}
          >
            <div
              className={`flex flex-col items-start pt-4 pb-12 h-full space-y-1 overflow-y-scroll hide-scrollbar`}
            >
              {NAV_LINKS.map(({ label, to }) => (
                <div data-animate="nav-link" className="nav-link" key={label}>
                  <Link to={to} onClick={() => setMobileOpen(false)}>
                    {label}
                  </Link>
                </div>
              ))}
              {isAuthenticated && (
                <div data-animate="nav-link" className="nav-link">
                  <Link
                    to={"/library/orders"}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2"
                  >
                    Orders
                    <ListOrderedIcon size={16} />
                  </Link>
                </div>
              )}
              <div data-animate="nav-link" className="nav-link">
                <button
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    dispatch(toggleTheme());
                    setMobileOpen(false);
                  }}
                >
                  {theme === "light" ? (
                    <>
                      Dark Mode
                      <Moon size={16} />
                    </>
                  ) : (
                    <>
                      Light Mode
                      <Sun size={16} />
                    </>
                  )}
                </button>
              </div>
              <div data-animate="nav-link" className="nav-link">
                {!isAuthenticated ? (
                  <Link to="/login" className="flex-center gap-2">
                    <LogOutIcon />
                    Login in
                  </Link>
                ) : (
                  <button
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      logout();
                    }}
                  >
                    {isLoggingOut ? (
                      <>
                        Logging out
                        <Spinner fontSize={16} />
                      </>
                    ) : (
                      <>
                        Log out
                        <LogOutIcon size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
