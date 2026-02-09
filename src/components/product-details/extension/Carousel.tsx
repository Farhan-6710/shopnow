"use client";

import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

type CarouselContextType = {
  mainRef: ReturnType<typeof useEmblaCarousel>[0];
  thumbsRef: ReturnType<typeof useEmblaCarousel>[0];
  activeIndex: number;
  onThumbClick: (index: number) => void;
  orientation: "vertical" | "horizontal";
};

const CarouselContext = createContext<CarouselContextType | null>(null);

const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a CarouselProvider");
  }
  return context;
};

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal";
}

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  ({ orientation = "horizontal", children, className, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const axis = orientation === "vertical" ? "y" : "x";

    const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ axis });
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
      axis,
      containScroll: "keepSnaps",
      dragFree: true,
    });

    const onThumbClick = useCallback(
      (index: number) => {
        if (!emblaMainApi || !emblaThumbsApi) return;
        emblaMainApi.scrollTo(index);
      },
      [emblaMainApi, emblaThumbsApi],
    );

    const onSelect = useCallback(() => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      const selected = emblaMainApi.selectedScrollSnap();
      setActiveIndex(selected);
      emblaThumbsApi.scrollTo(selected);
    }, [emblaMainApi, emblaThumbsApi]);

    useEffect(() => {
      if (!emblaMainApi) return;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      onSelect();
      emblaMainApi.on("select", onSelect).on("reInit", onSelect);
      return () => {
        emblaMainApi.off("select", onSelect);
      };
    }, [emblaMainApi, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          mainRef: emblaMainRef,
          thumbsRef: emblaThumbsRef,
          activeIndex,
          onThumbClick,
          orientation,
        }}
      >
        <div
          ref={ref}
          className={cn("relative w-full focus:outline-none", className)}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselMainContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { mainRef, orientation } = useCarousel();

  return (
    <div ref={mainRef} className={cn("overflow-hidden", className)} {...props}>
      <div
        ref={ref}
        className={cn(
          "flex h-full",
          orientation === "vertical" ? "flex-col" : "",
        )}
      >
        {children}
      </div>
    </div>
  );
});
CarouselMainContainer.displayName = "CarouselMainContainer";

const CarouselThumbsContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { thumbsRef, orientation } = useCarousel();

  return (
    <div ref={thumbsRef} className={cn("overflow-hidden")} {...props}>
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "vertical" ? "flex-col" : "",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
});
CarouselThumbsContainer.displayName = "CarouselThumbsContainer";

const CarouselMainItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("min-w-0 shrink-0 grow-0 basis-full h-full", className)}
      {...props}
    >
      {children}
    </div>
  );
});
CarouselMainItem.displayName = "CarouselMainItem";

interface CarouselThumbItemProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

const CarouselThumbItem = forwardRef<HTMLDivElement, CarouselThumbItemProps>(
  ({ className, index, children, ...props }, ref) => {
    const { activeIndex, onThumbClick, orientation } = useCarousel();
    const isActive = activeIndex === index;

    return (
      <div
        ref={ref}
        onClick={() => onThumbClick(index)}
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-1/4 cursor-pointer",
          orientation === "vertical" ? "pb-2" : "pr-2",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "relative aspect-square w-full rounded-md overflow-hidden transition-all",
            isActive
              ? "border-2 border-primary opacity-100"
              : "border border-border opacity-60 hover:opacity-80",
          )}
        >
          {children}
        </div>
      </div>
    );
  },
);
CarouselThumbItem.displayName = "CarouselThumbItem";

export {
  Carousel,
  CarouselMainContainer,
  CarouselThumbsContainer,
  CarouselMainItem,
  CarouselThumbItem,
};
