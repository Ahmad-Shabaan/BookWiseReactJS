import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmptyShoppingCart = () => {
  return (
    <main className="min-h-svh bg-surface font-sans text-on-surface pt-24 main-container">
      <section className="container w-full mx-auto px-4 page-container">
        <div className="col-center min-h-[60dvh] text-center max-w-md mx-auto">
          <div className="size-20 rounded-full bg-surface-container-highest flex items-center justify-center mb-8">
            <ShoppingBag className="size-9 text-on-surface-variant" />
          </div>

          <h2 className="text-display-sm font-display tracking-tight text-on-surface mb-3">
            Your cart is empty
          </h2>

          <p className="text-sm text-on-surface-variant mb-8 max-w-sm">
            Looks like you haven't added anything to your cart yet. Browse our
            collection and find your next great read.
          </p>

          <Link to="/library">
            <Button className="bg-linear-to-r from-primary to-secondary text-on-primary font-semibold py-3 px-10 rounded-lg hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(163,166,255,0.2)] cursor-pointer h-auto">
              Browse Books
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default EmptyShoppingCart;
