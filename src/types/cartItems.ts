// types/cartItem.ts
import { Product } from "./product";

export interface CartItem extends Product {
  quantity: number;
  currency: "USD" | "INR"; // Added currency property
}
