import { cn } from "@/lib/utils";
import useTheme from "@/shared/hooks/useTheme";
import { Link } from "react-router-dom";

const Logo = ({ className }: { className?: string }) => {
  const [theme] = useTheme();
  console.log(theme);
  return (
    <Link to="/">
      {theme === "dark" ? (
        <>
          <img
            src="/images/phone-dark-logo.png"
            alt="logo"
            className={cn("lg:hidden size-9", className)}
          />
          <img
            src="/images/dark-logo.png"
            alt="logo"
            className="hidden lg:inline-block  md:h-8"
          />
        </>
      ) : (
        <>
          <img
            src="/images/phone-light-logo.png"
            alt="logo"
            // className=" md:hidden size-9"
            className={cn("lg:hidden size-9", className)}
          />
          <img
            src="/images/light-logo.png"
            alt="logo"
            // width={175}
            className="hidden lg:inline-block md:h-8 "
          />
        </>
      )}
    </Link>
  );
};

export default Logo;
