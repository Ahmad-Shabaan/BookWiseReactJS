import { useEffect, useState } from "react";

type Theme = "dark" | "light";
const useTheme = (): [Theme, () => void] => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "light") return storedTheme;
    return "dark";
  });

  useEffect(() => {
    const html = document.documentElement;
    html.dataset.theme = theme;
    // html.classList.remove("dark", "light");
    // html.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  return [theme, toggleTheme];
};

export default useTheme;
