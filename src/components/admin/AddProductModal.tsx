import React, { useState } from "react";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

import Backdrop from "../Modal/Backdrop";
import UploadImage from "./UploadImage";

type TAddProductModal = {
  handleClose: () => void;
};

type AddProductForm = {
  id?: string;
  name: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  sizes?: string[];
};

function AddProductModal({ handleClose }: TAddProductModal) {
  const [addProductForm, setAddProductForm] = useState<AddProductForm>({
    name: "",
    image: "",
    price: 0,
    category: "",
    quantity: 0,
    sizes: [],
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "price" || "quantity" || "salePrice") {
      // regex numbers only
      const regex = /^[0-9\b]+$/;

      if (value === "" || regex.test(value)) {
        setAddProductForm((prevState) => ({
          ...prevState,
          [name]: Number(value),
        }));
      }
    }

    if (name === "name" || "image" || "category" || "image") {
      setAddProductForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(addProductForm);
  };

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
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="mx-6 max-h-[700px] w-full overflow-y-auto rounded-sm bg-white  p-10 shadow-lg  lg:mx-0 lg:max-w-4xl"
      >
        <div className="flex h-full flex-col">
          <div className="flex w-full justify-between">
            <h2 className="text-xl font-bold">Add Product</h2>
          </div>

          <div className="mt-6 flex h-full w-full justify-between space-x-6">
            <UploadImage />
            <div className="flex h-full  w-full bg-white">
              <div className="w-full">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <label htmlFor="name" className="mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-gray-300 focus:ring-0"
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="mt-6 flex flex-col">
                    <label htmlFor="category" className="mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      id="category"
                      className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-gray-300 focus:ring-0"
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="mt-6 flex space-x-4">
                    <div className="flex flex-col">
                      <label htmlFor="price" className="mb-2">
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-gray-300 focus:ring-0"
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="quantity" className="mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-gray-300 focus:ring-0"
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col">
                    <p>Sizes</p>
                    <div className="mt-3 flex w-full space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center border hover:cursor-pointer hover:bg-gray-100">
                        XS
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center border hover:cursor-pointer hover:bg-gray-100">
                        S
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center border hover:cursor-pointer hover:bg-gray-100">
                        M
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center border hover:cursor-pointer hover:bg-gray-100">
                        L
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center border hover:cursor-pointer hover:bg-gray-100">
                        XL
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col">
                    <p>Images</p>
                    <div className="mt-3 flex space-x-3">
                      <div className="flex h-20 w-20 items-center justify-center border">
                        <PlusCircleIcon className="h-6 w-6 text-gray-300" />
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full justify-between space-x-6">
                    <button
                      type="submit"
                      className="mt-6 w-full rounded-lg border bg-black px-4 py-2 text-white "
                    >
                      Create Product
                    </button>
                    <button
                      type="submit"
                      className="mt-6 w-full rounded-lg border border-gray-100 px-4 py-2 hover:border-gray-300 "
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
}

export default AddProductModal;
