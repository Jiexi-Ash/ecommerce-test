import React from "react";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "~/store/hooks";
import Image from "next/image";
import Link from "next/link";

import { XMarkIcon } from "@heroicons/react/24/solid";

import {
  removeItem,
  increaseProductQuantity,
  decreaseProductQuantity,
} from "~/store/slices/cartSlice";

type TcartModal = {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
};

function CartModal({ handleClose }: TcartModal) {
  const dispatch = useAppDispatch();
  const cartQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const cartItems = useAppSelector((state) => state.cart.cart);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);

  const containerVariants = {
    hidden: { width: 0 },
    visible: {
      width: 500,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      width: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleIncreaseQuantity = (id: string) => {
    dispatch(increaseProductQuantity(id));
  };

  const handleDecreaseQuantity = (id: string) => {
    dispatch(decreaseProductQuantity(id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed left-0 top-0 z-10 flex  h-full w-full justify-end bg-[#fff]/80"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="z-50 flex h-full w-[400px] flex-col bg-white px-6 py-14 shadow-xl lg:px-14"
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex space-x-2 text-2xl font-bold">
            <p className="text-black">Cart</p>
            <span className="">({cartQuantity})</span>
          </div>

          <XMarkIcon
            className="h-6 w-6 hover:cursor-pointer"
            onClick={() => handleClose(false)}
          />
        </div>

        <div className="mt-6 flex h-[660px] flex-col  overflow-auto border-t-8 border-black">
          {cartItems.map((item) => (
            <div className="mt-4  flex justify-start space-x-6 " key={item.id}>
              <div className="relative flex items-center justify-center bg-gray-100">
                <Image
                  priority
                  src={item.imageUrl}
                  className=""
                  width={130}
                  height={130}
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <Link
                  className="font-bold md:text-lg"
                  href={`/products/${item.id}`}
                >
                  {item.name}
                </Link>
                <p className="text-black-500 mt-4">R{item.price.toFixed(2)}</p>
                <div className="mt-4">
                  <div className="flex space-x-1">
                    <span>Size:</span>
                    <span className="font-bold">{item.size}</span>
                  </div>
                  <div className="flex space-x-1">
                    <span>Color:</span>
                    <span className="font-bold">Red</span>
                  </div>
                </div>

                {/* buttons */}
                <div className="mt-6 flex">
                  <button
                    className="bg-gray-100 px-4 py-2 hover:bg-gray-200"
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="bg-gray-100 px-4 py-2">{item.quantity}</span>
                  <button
                    className="bg-gray-100 px-4 py-2 hover:cursor-pointer hover:bg-gray-200"
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>

                {/* remove button */}
                <button
                  className=" mt-2 text-start text-sm text-black hover:cursor-pointer"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col">
          <div className="flex w-full justify-between">
            <p className="text-xl font-bold">Subtotal</p>
            <p className="text-lg ">R{totalPrice.toFixed(2)}</p>
          </div>
          <div className="mt-6 flex w-full space-x-2">
            <button className="w-2/4 bg-black py-4 text-white">
              View cart
            </button>
            <button className="w-2/4 bg-black py-4 text-white">Checkout</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default CartModal;
