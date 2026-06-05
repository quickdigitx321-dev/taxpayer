"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PublicHeader } from "@/components/PublicHeader";
import { pressImages } from "@/data/press";

export function PressHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % pressImages.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + pressImages.length) % pressImages.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % pressImages.length);
  };

  return (
    <section className="relative h-[80vh] min-h-[620px] overflow-hidden bg-black text-white">
      <PublicHeader />
      {pressImages.map((image, index) => (
        <img
          alt={image.alt}
          className={`absolute inset-0 h-full w-full object-contain object-center transition-opacity duration-1000 ${
            activeIndex === index ? "opacity-100" : "opacity-0"
          }`}
          key={image.src}
          src={image.src}
        />
      ))}
      <div className="absolute inset-0 bg-black/30" />

      <div className="container-shell relative z-10 flex h-full items-end pb-20 pt-36">
        <div className="max-w-4xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)]">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-gold-200">
            Press Room
          </p>
          <h1 className="mt-5 font-display text-5xl leading-[0.98] md:text-7xl">
            Official Press Releases &amp; Media.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
            Policy positions, public statements, expert seminars, and media appearances from
            Tax Payers Alliance Pakistan.
          </p>
        </div>
      </div>

      <div className="absolute bottom-7 right-5 z-20 flex items-center gap-3 sm:right-10">
        <button
          aria-label="Previous press image"
          className="grid size-11 place-items-center rounded-full border border-white/30 bg-black/20 text-white transition hover:bg-white hover:text-[#003c77]"
          onClick={showPrevious}
          type="button"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2" role="group" aria-label="Press image slides">
          {pressImages.map((image, index) => (
            <button
              aria-label={`Show image ${index + 1}`}
              className={`h-1.5 transition-all ${
                activeIndex === index ? "w-8 bg-gold-300" : "w-4 bg-white/50"
              }`}
              key={image.src}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
        </div>
        <button
          aria-label="Next press image"
          className="grid size-11 place-items-center rounded-full border border-white/30 bg-black/20 text-white transition hover:bg-white hover:text-[#003c77]"
          onClick={showNext}
          type="button"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
