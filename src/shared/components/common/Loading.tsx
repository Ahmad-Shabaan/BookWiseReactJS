import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <main className="main-container pt-0">
      <section className="page-container flex-center h-dvh">
        <Spinner className="size-10 text-primary" />
      </section>
    </main>
  );
};

export default Loading;
