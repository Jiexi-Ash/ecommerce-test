import React, { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import { EyeIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

import { ProductData } from "~/data";
import QuickViewModal from "../Modal/QuickViewModal";

type TProduct = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  handleClick: (id: string) => void;
};

function Products() {
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedId, setSelectedId] = useState("");

  const closeModal = () => setModalOpen(false);

  const handleModal = (id: string) => {
    setModalOpen(true);
    setSelectedId(id);
    console.log("id", id);
  };

  // stop body scroll when modal is open

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modalOpen]);

  return (
    <>
      <div className="my-4 grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-6 md:px-6 lg:grid-cols-3 xl:grid-cols-4 xl:px-10">
        {ProductData.map((product) => (
          <Product
            key={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            category={product.category}
            handleClick={handleModal}
            id={product.id}
          />
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false} onExitComplete={() => null}>
        {modalOpen && selectedId && (
          <QuickViewModal handleClose={closeModal} id={selectedId} />
        )}
      </AnimatePresence>
    </>
  );
}

export default Products;

export const Product = ({
  id,
  name,
  price,
  imageUrl,
  category,
  handleClick,
}: TProduct) => {
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
};

export const ImageMobile = ({ imageUrl }: { imageUrl: string }) => {
  return <Image src={imageUrl} width={300} height={300} alt="" className="" />;
};

{
  /* <div className="group  relative flex w-full flex-col items-center  justify-center bg-gray-100 py-6 md:rounded-lg xl:h-[600px] xl:w-full">
<motion.div
  className="relative overflow-hidden"
  variants={productImageVariants}
  initial="hidden"
  animate="visible"
>
  <Image
    src={imageUrl}
    width={400}
    height={400}
    alt=""
    className="object-cover"
  />
</motion.div>
<div className="absolute bottom-0 block h-0 max-h-16 w-full  transform overflow-hidden rounded-b-lg rounded-bl-lg bg-transparent text-white transition-all duration-200 ease-in-out group-hover:h-16">
  <div className="flex h-full w-full items-center justify-center">
    <div
      className="mx-2 flex w-full cursor-pointer items-center justify-center gap-2 bg-black py-2"
      onClick={onClick}
    >
      <span className="text-center text-sm uppercase text-white">
        Quick View
      </span>
      <EyeIcon className="h-4 w-4 font-bold" />
    </div>
  </div>
</div>
</div> */
}
