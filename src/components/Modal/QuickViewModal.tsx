import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Backdrop from "./Backdrop";
import { ProductData } from "~/data";

type TQuickViewModal = {
  handleClose: () => void;
  id?: string;
};

function QuickViewModal({ handleClose, id }: TQuickViewModal) {
  const product = ProductData.find((product) => product.id === id);
  console.log("product", product);

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

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="] mx-6 h-[800px] w-full overflow-y-auto rounded-sm border bg-white p-10 lg:mx-0 lg:h-[700px] lg:max-w-4xl"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex flex-col lg:flex-row lg:space-x-10">
          <div className="flex h-full w-full items-center justify-center bg-gray-100 lg:max-w-sm">
            <Image src={product!.imageUrl} width={400} height={400} alt="" />
          </div>
          <div className="flex-grow flex-col">
            <div className="mt-6 flex flex-col">
              <h1 className="text-2xl font-bold text-black">{product!.name}</h1>
              <span className="text-black-500 mt-1 font-bold">
                R{product!.price.toFixed(2)}
              </span>
            </div>
            <div className="mt-4 flex flex-col">
              <div className="text-sm">Size:</div>
              <div className="mt-4  flex space-x-2">
                <div className="flex h-10 w-10 items-center justify-center border border-gray-100 bg-white">
                  XS
                </div>
                <div className="flex h-10 w-10 items-center justify-center border border-gray-100 bg-white">
                  S
                </div>
                <div className="flex h-10 w-10 items-center justify-center border border-gray-100 bg-white">
                  M
                </div>
                <div className="flex h-10 w-10 items-center justify-center border border-gray-100 bg-white">
                  L
                </div>
              </div>
            </div>
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
                  className="flex h-10 w-10 items-center justify-center border border-gray-100 bg-white"
                >
                  -
                </button>
                <span className="flex h-10 w-10 items-center justify-center border border-gray-100 bg-white">
                  1
                </span>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center border border-gray-100 bg-white"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-6 flex w-full flex-col space-y-2">
              <button className="border border-black bg-white px-4 py-2 text-black">
                Add to wishlist
              </button>
              <button className="bg-black px-4 py-2 text-center text-white">
                Add to cart
              </button>
            </div>
          </div>
        </div>

        {/* <button
          onClick={handleClose}
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Close
        </button> */}
      </motion.div>
    </Backdrop>
  );
}

export default QuickViewModal;
