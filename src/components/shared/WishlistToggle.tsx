import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { showToast } from "@/config/ToastConfig";
import { selectIsInWishlist, toggleWishlistRequest } from "@/redux/wishlist";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "@/types/product";

interface WishlistToggleProps {
  item: Product;
  className?: string;
}

const WishlistToggle: React.FC<WishlistToggleProps> = ({ item, className }) => {
  const dispatch = useDispatch();
  const isWishlisted = useSelector(selectIsInWishlist(item.id));

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    showToast({
      type: isWishlisted ? "info" : "success",
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted
        ? `${item.name} has been removed from your wishlist`
        : `${item.name} has been added to your wishlist`,
    });

    dispatch(toggleWishlistRequest(item));
  };

  return (
    <motion.button
      className={`absolute left-2 top-2 z-10 h-10 w-10 rounded-lg bg-card shadow-md flex items-center justify-center border cursor-pointer ${className}`}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggleWishlist}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <FontAwesomeIcon
        icon={isWishlisted ? faHeartSolid : faHeartRegular}
        className={`text-lg ${
          isWishlisted ? "text-destructive" : "text-gray-400"
        }`}
      />
    </motion.button>
  );
};

export default WishlistToggle;
