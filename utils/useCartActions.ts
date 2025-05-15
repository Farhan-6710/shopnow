import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/src/redux/cart/cartSlice";
import { RootState } from "@/src/redux/store";
import { productsData } from "@/src/data/productsData";

export const useCartActions = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const currency = useSelector((state: RootState) => state.cart.currency);

  const handleAddToCart = (productId: number) => {
    if (!cartItems.some((item) => item.id === productId)) {
      const product = productsData.find((product) => product.id === productId);
      if (product) {
        dispatch(addToCart({ ...product, quantity: 1, currency }));
      }
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  return { handleAddToCart, handleRemoveFromCart };
};
