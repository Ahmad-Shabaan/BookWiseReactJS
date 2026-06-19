// LazySection.jsx
import ErrorMessage from "@/shared/components/common/ErrorBoundary/ErrorMessage";
import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";

type LazySectionProps = {
  load: () => Promise<{ default: ComponentType }>;
  fallback?: ReactNode;
};
export default function LazySection({
  load,
  fallback = null,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const [hasError, setHasError] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    let cancelled = false;
    const observer = new IntersectionObserver(
      async (entries, observer) => {
        const entry = entries[0]; // target observe

        if (entry.isIntersecting && !loadedRef.current) {
          loadedRef.current = true;
          observer.disconnect();
          //   observer.unobserve(entry.target); // just if there is multiple targets and need just unobserve one of them
          try {
            const mod = await load();
            if (!cancelled) setComponent(() => mod.default);
          } catch {
            if (!cancelled) setHasError(true);
          }
        }
      },
      {
        root: null,
        rootMargin: "300px",
      },
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [load]);

  if (hasError)
    return (
      <div ref={ref}>
        <ErrorMessage msg="Oops! Something went wrong while loading section. Please try again in a minute." />
      </div>
    );
  return <div ref={ref}>{Component ? <Component /> : fallback}</div>;
}
