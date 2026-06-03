import { cn } from "@/lib/utils";
type Msg = {
  msg?: string;
  className?: string;
};
const ErrorMessage = ({
  msg = "Oops! Something went wrong while loading filters. Please try again in a minute.",
  className = "",
}: Msg) => {
  return (
    <div
      role="alert"
      className={cn(
        "mx-auto flex-center gap-3 rounded-xl border border-error/20 bg-error/8 px-4 py-3 text-sm text-error",
        className,
      )}
    >
      <span className="mt-px text-base leading-none">⚠</span>
      <p className="text-error">{msg}</p>
    </div>
  );
};
export default ErrorMessage;
