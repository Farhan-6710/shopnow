import Image from "next/image";

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
  return (
    <div className="relative w-2/3 aspect-square mb-0">
      <Image
        src={imgSource}              // ✅ direct URL
        alt={alt}
        fill
        className="rounded-t-lg object-contain"
        priority={priority}          // ✅ LCP image only
        fetchPriority={priority ? "high" : "auto"}
        sizes="(max-width: 768px) 100vw, 25vw"
      />
    </div>
  );
};

export default ProductImage;
