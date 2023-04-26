import React, { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import Backdrop from "./Backdrop";
import { ProductData } from "~/data";
import ProductSize from "../Product/ProductSize";

import { useAppDispatch } from "~/store/hooks";
import {
  addToCart,
  increaseProductQuantity,
  decreaseProductQuantity,
} from "~/store/slices/cartSlice";

type TQuickViewModal = {
  handleClose: () => void;
  id?: string;
};

function QuickViewModal({ handleClose, id }: TQuickViewModal) {
  const dispatch = useAppDispatch();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [itemMaxQuantity, setItemMaxQuantity] = useState<number>(1);
  const [itemQuantity, setItemQuantity] = useState<number>(1);

  const product = ProductData.find((product) => product.id === id);

  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize) return;

    dispatch(
      addToCart({
        ...product,
        quantity: itemQuantity,
        size: selectedSize,
      })
    );
  };

  const handleIncreaseQuantity = () => {
    if (itemQuantity === itemMaxQuantity) return;

    setItemQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (itemQuantity === 1) return;

    setItemQuantity((prev) => prev - 1);
  };

  useEffect(() => {
    if (product) {
      setItemMaxQuantity(product.quantity);
    }
  }, [product]);

  const modalVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const containerVariants = {
    rest: { width: 0 },
    hover: {
      width: "100%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const linkVariants = {
    rest: {},
    hover: {
      width: "100%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="mx-6  max-h-[700px] w-full overflow-y-auto rounded-sm border bg-white p-10 lg:mx-0 lg:max-w-4xl"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex flex-col lg:flex-row lg:space-x-10">
          <div className="flex flex-col">
            <div className="flex h-full w-full flex-col items-center justify-center bg-gray-100 lg:max-w-sm">
              <Image src={product!.imageUrl} width={400} height={400} alt="" />
            </div>
          </div>

          <div className="flex-grow flex-col">
            <div className="mt-6 flex flex-col">
              <h1 className="text-2xl font-bold text-black">{product!.name}</h1>
              <span className="text-black-500 mt-1 font-bold">
                R{product!.price.toFixed(2)}
              </span>
            </div>
            <ProductSize size={product!.sizes} onHandleSize={setSelectedSize} />
            <div className="mt-4 flex flex-col ">
              <div className="text-sm">Color:</div>
              <div className="mt-4 flex gap-2">
                <div className="h-4 w-4 rounded-full border  border-white bg-red-500 hover:cursor-pointer"></div>
                <div className="h-4 w-4 rounded-full border  border-white bg-blue-500 hover:cursor-pointer"></div>
                <div className="h-4 w-4 rounded-full border  border-white bg-pink-500 hover:cursor-pointer"></div>
                <div className="h-4 w-4 rounded-full border border-white bg-yellow-500 hover:cursor-pointer"></div>
              </div>
            </div>
            <div className="mt-6 flex flex-col ">
              <div className="text-sm">Quantity</div>
              <div className="mt-4 flex">
                <button
                  type="button"
                  className={` flex h-10 w-10 items-center justify-center border border-gray-100 bg-white disabled:bg-gray-100`}
                  disabled={itemQuantity === 1}
                  onClick={handleDecreaseQuantity}
                >
                  -
                </button>
                <span className="flex h-10 w-10 items-center justify-center border border-gray-100 bg-white">
                  {itemQuantity}
                </span>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center border border-gray-100 bg-white disabled:bg-gray-100"
                  disabled={itemQuantity === itemMaxQuantity}
                  onClick={handleIncreaseQuantity}
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-6 flex w-full flex-col space-y-2">
              <button className="border border-black bg-white px-4 py-2 text-black transition-all duration-200 ease-out ">
                Add to wishlist
              </button>
              <button
                className="bg-black px-4 py-2 text-center text-white"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>
            <div></div>
            <motion.div
              className="mt-6 flex max-w-[80px] flex-col"
              initial="rest"
              whileHover="hover"
              variants={containerVariants}
            >
              <Link
                href={`/products/${product!.id}`}
                className="whitespace-nowrap pb-2 text-sm"
              >
                View Product
              </Link>
              <motion.hr
                className="h-[3px] w-0 bg-black"
                variants={linkVariants}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
}

export default QuickViewModal;
