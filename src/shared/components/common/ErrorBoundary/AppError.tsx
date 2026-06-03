import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PaymentErrorProps {
  message?: string;
  link: string;
  to: string;
  onRetry?: () => void;
}

const AppError = ({ message, onRetry, link, to }: PaymentErrorProps) => {
  return (
    <main className="main-container">
      <section className="page-container">
        <div className="flex flex-col items-center justify-center min-h-[60dvh] text-center max-w-md mx-auto">
          <div className="size-16 rounded-full bg-error/10 flex items-center justify-center mb-6">
            <AlertTriangle className="size-7 text-error" />
          </div>

          <h1 className="aside-header">Something went wrong</h1>

          <p className="text-sm text-on-surface-variant mb-8 max-w-sm">
            {message ??
              "We couldn't load the checkout page.<br/>This might be a temporary issue."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <Link
              to={to}
              className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-8 rounded-lg bg-surface-container-highest hover:bg-surface-container-high transition-colors text-label-md uppercase tracking-widest font-label text-on-surface-variant hover:text-primary"
            >
              <ArrowLeft className="size-3.5" />
              {link}
            </Link>
            {onRetry && (
              <Button
                onClick={onRetry}
                className="w-full sm:w-auto bg-linear-to-r from-primary to-secondary text-on-primary font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(163,166,255,0.2)] flex items-center justify-center gap-2 cursor-pointer h-auto"
              >
                <RefreshCw className="size-4" />
                Try Again
              </Button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AppError;
