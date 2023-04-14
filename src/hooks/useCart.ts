import { useState, useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { setCart } from "~/store/slices/cartSlice";

type cart = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  category: string;
  isSale: boolean;
  salePrice: number;
  quantity: number;
  size: string;
};

const getFromLocalStorage = () => {
  if (typeof window === "undefined") return null;
  const cart = localStorage.getItem("cart");

  if (cart) {
    return JSON.parse(cart) as cart[];
  }

  return null;
};

export default function useCart() {
  const dispatch = useAppDispatch();
  const [cartState, setCartState] = useState<cart[]>(
    getFromLocalStorage() || []
  );

  useEffect(() => {
    const cart = getFromLocalStorage();
    if (cart) {
      dispatch(setCart(cart));
    }
  }, [cartState, dispatch]);
}
