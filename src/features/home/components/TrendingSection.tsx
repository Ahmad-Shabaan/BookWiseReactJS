import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BookCard from "./BookCard";

gsap.registerPlugin(ScrollTrigger);
const BOOKS = [
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-Ktog1jSrhmiK5nZmSbBAV8cH61CnoDVP63Lni4xoJx-1qv9_6095ySAY3prntzv6JJdCwlqfTjxCi5rHrHyd0n7lWrhyfgKg1WMzM3EuyjXpi0xlabTHVd9Eg3Mfm7x6cDSxcfRHxpP-bx2tON9cNdY2894idN1ZPspauFA7nCZHlvxNupuCmrAdNr6z7St8qr4Qs9mSXla0cDJ_WYPewEoBxMcIyzndeymefoMXEi1nmZU1-fAJNMFqXEulu8z4cmG6YddWSBE",
    title: "The Midnight Horizon",
    author: "Evelyn St. Claire",
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBux9T39psytzwC1Jfrk2oY_6RzhoIoRrV21J-nYtDrg_K4p1gIVacV8Gksj2OjDTdYUnI7hMvUWWL5lrBgaVofX-rqpDwkdd8dvHoa_nacOqNPaUxG2kS02rsuJiyNHaiZbvnNL96G-YHmmEKBdUz95h5NXQbld0hLXj2WQ4q2fs_mpG88MRYYgXT9hNz_V_A9g7hSkYw3mtX-J-14WZtO4hZfK7iX-2jO0nOeBvumtgysGk9ciVc0RgdNK3EdrRDjT_ORJj0SvpI",
    title: "Quiet Whispers",
    author: "Marcus Thorne",
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQbOVx6q5AeWSxvM2-UNR2z9ujfP6r1Sb9NnJnNIv8e2afwEphRj0YHxBV8MaygQgmZ1fe_JrMvi5JqF0UhUi_uUjcslwNHq_neLcYT87ZflSIqQZtXgQ2s6vP7z6M6wAAfmAloYoE0S-LuPTRIFsKB62fwWyskKCxD6ESmkc9F8LhFZBdvXTjieXFKMgcxB3fVhkByX7gj4wv2fFScYmKoomLxGfB8ZY5NNKcdmEsilUcrkJrWErkGKJtdkr7scpQb6oKPx-bcT0",
    title: "Vector Dawn",
    author: "Aris Koda",
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2l9nbl0DqdnloHlholtYMRihor3ShQrZDtOAPXa_zWFOmRpF5mferW3iPs-zNahoS8zWDGY8e2_EvpJ1I3QY61jhsRBgy8GPxlkgcv_y3cos4fOMMm4a8eW66dsVjiwUP7hLYT-MUfWZSpehlS2h4PQNgXAGlM9-IDxKtrrzaq0-ii58nYRBdVoNwdLqQ170tL3N6njCwMRFtbSHQJfW7WEkbgpeddbbnKxQFOsi__elsLWS--kfoGmavq92KoVXnuqoPH9RVXkU",
    title: "Neural Constellations",
    author: "Dr. Sarah Jenkins",
  },
];

export function TrendingSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".trending-card");
      gsap.set(cards, {
        x: 30,
        opacity: 0,
      });
      gsap.to(cards, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          once: true,
        },
      });
      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === containerRef.current) st.kill();
        });
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="container mx-auto  px-6 md:px-12 lg:px-16  py-16 sm:py-20 md:py-24 bg-surface-container-low"
    >
      <div
        className="
            flex gap-4 sm:gap-6 md:gap-8
            overflow-x-auto
            hide-scrollbar
            pb-8
            snap-x snap-mandatory
          "
      >
        {BOOKS.map((book, i) => (
          <div
            key={i}
            className="trending-card shrink-0 snap-center sm:snap-start flex-1"
          >
            <BookCard {...book} />
          </div>
        ))}
      </div>
    </section>
  );
}
