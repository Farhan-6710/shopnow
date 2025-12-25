import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";

interface ProductImageProps {
  imgSource: string;
  alt: string;
  fetchImageWithTimeout: (url: string) => Promise<Blob | null>;
}

const ProductImage: React.FC<ProductImageProps> = ({
  imgSource,
  alt,
  fetchImageWithTimeout,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const loadImage = async () => {
      setLoading(true); // Set loading to true when starting to fetch
      const imageBlob = await fetchImageWithTimeout(imgSource);
      if (imageBlob) {
        setImage(URL.createObjectURL(imageBlob));
      }
      setLoading(false); // Set loading to false once the image is fetched (either success or failure)
    };

    loadImage();
  }, [imgSource, fetchImageWithTimeout]);

  if (loading) {
    // Display loader until image is loaded
    return (
      <div className="relative w-2/3 aspect-16/14 mb-0 flex items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!image) {
    return null; // You can return null, or a default image if you prefer
  }

  return (
    <div className="relative w-2/3 aspect-16/14 mb-0">
      <Image
        src={image}
        alt={alt}
        fill
        style={{ objectFit: "contain" }}
        className="rounded-t-lg w-full"
        priority
      />
    </div>
  );
};

export default ProductImage;
