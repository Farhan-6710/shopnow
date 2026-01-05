import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";

interface ProductImageProps {
  imgSource: string;
  alt: string;
  fetchImageWithTimeout: (url: string) => Promise<Blob | null>;
  priority?: boolean;
}

const ProductImage: React.FC<ProductImageProps> = ({
  imgSource,
  alt,
  fetchImageWithTimeout,
  priority = false,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadImage = async () => {
      setLoading(true);
      const imageBlob = await fetchImageWithTimeout(imgSource);
      if (imageBlob) {
        setImage(URL.createObjectURL(imageBlob));
      }
      setLoading(false);
    };

    loadImage();
  }, [imgSource, fetchImageWithTimeout]);

  if (loading) {
    // Display loader until image is loaded
    return (
      <div className="relative w-2/3 aspect-square mb-0 flex items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!image) {
    return null; // You can return null, or a default image if you prefer
  }

  return (
    <div className="relative w-2/3 aspect-square mb-0">
      <Image
        src={image}
        alt={alt}
        fill
        style={{ objectFit: "contain" }}
        className="rounded-t-lg w-full"
        loading={priority ? "eager" : "lazy"}
        priority={priority}
      />
    </div>
  );
};

export default ProductImage;
