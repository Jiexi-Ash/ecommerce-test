import React, { useState } from "react";

import Image from "next/image";

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
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [sizes, setSizes] = useState<string[]>(["XS", "S", "M", "L", "XL"]);
  const [addProductForm, setAddProductForm] = useState<AddProductForm>({
    name: "",
    image: "",
    price: 0,
    category: "",
    quantity: 0,
    sizes: [],
  });

  const handleSelectedImage = (image: string) => {
    setSelectedImage(image);
  };

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

  const handleSelectedSizes = (size: string) => {
    // check if size is already on the form.size array
    const isSizeExist = addProductForm.sizes?.includes(size);

    if (isSizeExist) {
      // remove size from form.size
      setAddProductForm((prevState) => ({
        ...prevState,
        sizes: prevState.sizes?.filter((s) => s !== size),
      }));
    } else {
      // add size to form.size
      setAddProductForm((prevState) => ({
        ...prevState,
        sizes: [...prevState.sizes!, size],
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
            <UploadImage handleSelectedImage={handleSelectedImage} />
            <div className="flex h-full  w-full bg-white">
              <div className="w-full">
                <form onSubmit={handleSubmit}>
                  <FormInput
                    name="name"
                    type="text"
                    label="Name"
                    onChangeHandler={handleFormChange}
                  />
                  <FormInput
                    name="category"
                    type="text"
                    label="Category"
                    onChangeHandler={handleFormChange}
                  />
                  <div className="flex space-x-4">
                    <FormInput
                      type="number"
                      label="Price"
                      name="price"
                      onChangeHandler={handleFormChange}
                    />
                    <FormInput
                      type="number"
                      label="Quantity"
                      name="quantity"
                      onChangeHandler={handleFormChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <p>Sizes</p>
                    <div className="mt-3 flex w-full space-x-3">
                      {sizes.map((size, index) => (
                        <div
                          key={`${size}-${index}`}
                          className={`flex h-10 w-10 items-center justify-center border hover:cursor-pointer ${
                            addProductForm.sizes?.includes(size)
                              ? "bg-black text-white"
                              : "text-black"
                          }`}
                          onClick={() => handleSelectedSizes(size)}
                        >
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col">
                    <p>Images</p>
                    <div className="mt-3 flex space-x-3">
                      <div className="flex h-20 w-20 items-center justify-center border">
                        {selectedImage && (
                          <Image
                            src={selectedImage}
                            alt="product image"
                            width={50}
                            height={50}
                            objectFit="cover"
                          />
                        )}
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

type FormInputProps = {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  label: string;
};

const FormInput = ({ onChangeHandler, type, name, label }: FormInputProps) => {
  return (
    <div className="mb-6 flex flex-col">
      <label htmlFor={name} className="mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-gray-300 focus:ring-0"
        onChange={onChangeHandler}
      />
    </div>
  );
};
