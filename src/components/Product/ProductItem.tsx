import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type TProduct = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  handleClick: (id: string) => void;
};

function ProductItem({
  id,
  name,
  price,
  imageUrl,
  category,
  handleClick,
}: TProduct) {
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
      scale: [1.1, 1.1, 1],
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
    },
  };

  return (
    <div className="flex h-full w-full flex-col items-start justify-center">
      <motion.div
        className="group relative flex w-full flex-col items-center justify-center bg-gray-100 md:h-[600px] md:rounded-lg"
        variants={productVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="relative overflow-hidden"
          animate="visible"
          variants={productImageVariants}
        >
          <div className="block md:hidden">
            <ImageMobile imageUrl={imageUrl} />
          </div>
          <div className="hidden md:block">
            <Image
              src={imageUrl}
              width={400}
              height={400}
              alt=""
              className=""
            />
          </div>
        </motion.div>
        <div className="absolute bottom-0 block h-0 w-full  transform overflow-hidden rounded-b-lg rounded-bl-lg bg-transparent text-white transition-all duration-200 ease-in-out group-hover:h-16">
          <div className="flex h-full w-full items-center justify-center">
            <div
              className="mx-2 flex w-full cursor-pointer items-center justify-center gap-2 bg-black py-2"
              onClick={() => handleClick(id)}
            >
              <span className="text-center text-sm uppercase text-white">
                Quick View
              </span>
              <EyeIcon className="h-4 w-4 font-bold" />
            </div>
          </div>
        </div>
      </motion.div>
      <div className="flex flex-col pt-2">
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
    </div>
  );
}

export default ProductItem;

export const ImageMobile = ({ imageUrl }: { imageUrl: string }) => {
  return <Image src={imageUrl} width={300} height={300} alt="" className="" />;
};
