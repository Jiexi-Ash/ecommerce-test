import React from "react";

import Image from "next/image";
import Link from "next/link";

import { EyeIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

import { ProductData } from "~/data";

type TProduct = {
  id?: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

const Products = () => {
  const pVariant = {
    hidden: {},
    visible: {},
  };
  return (
    <motion.div
      variants={pVariant}
      animate="visible"
      initial="hidden"
      className="grid w-full grid-cols-1 gap-2  space-x-2 md:grid-cols-2 md:px-6  lg:grid-cols-3 xl:grid-cols-4  xl:py-2 xl:px-10"
    >
      {ProductData.map((product) => (
        <Product
          key={product.id}
          name={product.name}
          price={product.price}
          imageUrl={product.imageUrl}
          category={product.category}
        />
      ))}
    </motion.div>
  );
};

export default Products;
export const Product = ({ name, price, imageUrl, category }: TProduct) => {
  const productVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.5,
      },
    },
  };

  const productImageVariants = {
    hidden: {
      scale: 0,
    },
    visible: {
      scale: [1.2, 1.1, 1],
      transition: {
        duration: 0.6,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col"
      animate="visible"
      initial="hidden"
      variants={productVariants}
    >
      <div className="group  relative flex w-full flex-col  items-center justify-center rounded-lg bg-gray-100 xl:h-[600px] xl:w-full">
        <motion.div
          className="relative overflow-hidden"
          variants={productImageVariants}
        >
          <Image
            src={imageUrl}
            width={400}
            height={400}
            alt=""
            className="object-cover"
          />
        </motion.div>
        <div className="absolute bottom-0 block h-0 max-h-16 w-full  transform overflow-hidden rounded-b-lg rounded-bl-lg   bg-transparent text-white transition-all duration-200 ease-in-out group-hover:h-16">
          <div className="flex h-full w-full items-center justify-center">
            <div className="mx-2 flex w-full cursor-pointer items-center justify-center gap-2 bg-black py-2">
              <Link
                href=""
                className="text-center text-sm uppercase text-white"
              >
                Quick View
              </Link>
              <EyeIcon className="h-4 w-4 font-bold" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col  px-2 pt-2">
        <h4 className="font-bold tracking-wider">
          <Link href="">{name}</Link>
        </h4>
        <div className="font-light tracking-wider text-black ">
          R{price.toFixed(2)}
        </div>
        <div className="flex gap-2 pt-2 ">
          <div className="h-4 w-4 rounded-full border  border-white bg-red-500 hover:cursor-pointer"></div>
          <div className="h-4 w-4 rounded-full border  border-white bg-blue-500 hover:cursor-pointer"></div>
          <div className="h-4 w-4 rounded-full border  border-white bg-pink-500 hover:cursor-pointer"></div>
          <div className="h-4 w-4 rounded-full border border-white bg-yellow-500 hover:cursor-pointer"></div>
        </div>
      </div>
    </motion.div>
  );
};
