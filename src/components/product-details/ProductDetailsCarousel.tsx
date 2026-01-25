"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselMainContainer,
  CarouselThumbsContainer,
  CarouselMainItem,
  CarouselThumbItem,
} from "@/components/product-details/extension/Carousel";

interface ProductDetailsCarouselProps {
  imgSrc: string;
  alt: string;
}

const ProductDetailsCarousel = ({
  imgSrc,
  alt,
}: ProductDetailsCarouselProps) => {
  const slides = Array(5).fill(imgSrc);
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal",
  );

  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(window.innerWidth >= 1024 ? "vertical" : "horizontal");
    };

    updateOrientation();
    window.addEventListener("resize", updateOrientation);
    return () => window.removeEventListener("resize", updateOrientation);
  }, []);

  return (
    <Carousel
      orientation={orientation}
      className={`flex gap-3 w-full ${orientation === "horizontal" ? "flex-col" : ""}`}
    >
      {/* Main Carousel */}
      <CarouselMainContainer className="w-full h-64 sm:h-80 lg:flex-1 lg:h-96 bg-card rounded-lg">
        {slides.map((src, index) => (
          <CarouselMainItem key={index}>
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={`${alt} ${index + 1}`}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>
          </CarouselMainItem>
        ))}
      </CarouselMainContainer>

      {/* Thumbnails */}
      <CarouselThumbsContainer
        className={
          orientation === "horizontal"
            ? "h-22 sm:h-20 w-full"
            : "h-72 sm:h-96 w-20 sm:w-24 shrink-0"
        }
      >
        {slides.map((src, index) => (
          <CarouselThumbItem key={index} index={index}>
            <Image
              src={src}
              alt={`${alt} thumbnail ${index + 1}`}
              fill
              className="object-contain p-1"
              sizes="80px"
            />
          </CarouselThumbItem>
        ))}
      </CarouselThumbsContainer>
    </Carousel>
  );
};

export default ProductDetailsCarousel;
