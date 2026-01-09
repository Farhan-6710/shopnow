import Image from "next/image";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

interface ProductImageProps {
  imgSource: string;
  alt: string;
  priority?: boolean;
}

const ProductImage: React.FC<ProductImageProps> = ({
  imgSource,
  alt,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-2/3 aspect-square mb-0 overflow-hidden">
      {/* Spinner overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Spinner className="size-12" />
        </div>
      )}

      {/* Image is ALWAYS rendered */}
      <Image
        src={imgSource}
        alt={alt}
        fill
        className={`rounded-t-lg object-contain transition-all! duration-300 group-hover:scale-110 p-4 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        sizes="(max-width: 768px) 100vw, 25vw"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default ProductImage;
