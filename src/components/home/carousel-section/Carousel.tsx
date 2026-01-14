"use client";

import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  id: number;
  imgPath: string;
};

const Carousel = () => {
  const [slides, setSlides] = useState<Testimonial[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    loop: true,
  });

  // Navigation handlers
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  // Auto-scroll every 3000ms
  useEffect(() => {
    const interval = setInterval(() => {
      scrollNext();
    }, 3000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [emblaApi]); // Run effect when emblaApi is set

  return (
    <div className="relative container mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex w-full">
          {Array.from({ length: 5 }).map((slide, idx) => (
            <div
              key={idx}
              className="min-w-[100%] px-2 md:min-w-[50%] lg:min-w-[33.33333%]"
            >
              <div className="flex items-center justify-center gap-4">
                <p className="h-[200px] w-[500px] border rounded-md">Hello</p>
                {/* <Image
                                    src={slide.imgPath}
                                    width={500}
                                    height={200}
                                    alt={slide.id.toString()}
                                    className="border-mainBrown h-full w-full border-2 object-cover rounded-xl"
                                /> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="mt-4 flex justify-center gap-2 md:gap-4 lg:mt-10 xl:mt-0">
        <button
          onClick={scrollPrev}
          className="bg-opacity-10 hover:bg-white border-emeraldPrimary transform cursor-pointer rounded-full border-4 bg-lightBlue p-2 text-white lg:top-1/2 lg:-translate-y-1/2 xl:absolute xl:-left-5"
        >
          <ChevronLeft size={30} className="text-emeraldPrimary" />
        </button>
        <button
          onClick={scrollNext}
          className="bg-opacity-10 hover:bg-white border-emeraldPrimary transform cursor-pointer rounded-full border-4 bg-lightBlue p-2 text-white lg:top-1/2 lg:-translate-y-1/2 xl:absolute xl:-right-5"
        >
          <ChevronRight size={30} className="text-emeraldPrimary" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
