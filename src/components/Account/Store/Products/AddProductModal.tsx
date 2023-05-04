import React, { useState } from "react";

import { motion } from "framer-motion";

import Backdrop from "../../../Modal/Backdrop";
import { useInput } from "~/hooks/useInput";
import { api } from "~/utils/api";
import type { Product, Store } from "@prisma/client";

type TAddProductModal = {
  handleClose: () => void;
  handleProduct?: (product: Product) => void;
};

export type AddProductForm = {
  id?: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  quantity: number;
  sizes?: string[];
};

function AddProductModal({ handleClose, handleProduct }: TAddProductModal) {
  const [error, setError] = useState<string>("");
  const [sizes, setSizes] = useState<string[]>(["XS", "S", "M", "L", "XL"]);
  const [addProductForm, setAddProductForm] = useState<AddProductForm>({
    name: "",
    price: 0,
    category: "",
    description: "",
    quantity: 0,
    sizes: [],
  });

  const name = useInput(addProductForm.name, "name", setAddProductForm);
  const price = useInput(addProductForm.price, "price", setAddProductForm);
  const category = useInput(
    addProductForm.category,
    "category",
    setAddProductForm
  );
  const quantity = useInput(
    addProductForm.quantity,
    "quantity",
    setAddProductForm
  );

  const store = api.store.getStore.useQuery().data as Store;
  const { mutate: createProduct } = api.products.createProduct.useMutation({
    onSuccess: (data) => {
      const product = data as Product;
      handleProduct && handleProduct(product);
      handleClose();
    },
  });

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

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddProductForm((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check if form is valid
    if (
      addProductForm.name === "" ||
      addProductForm.price === 0 ||
      addProductForm.category === "" ||
      addProductForm.quantity === 0 ||
      addProductForm.sizes?.length === 0
    ) {
      setError("Please fill out all fields");
      return;
    }

    createProduct({
      name: addProductForm.name,
      price: Number(addProductForm.price),
      category: addProductForm.category,
      size: addProductForm.sizes!,
      quantity: Number(addProductForm.quantity),
      storeId: store.id,
    });
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
        className="mx-6 max-h-[750px] w-full overflow-y-auto rounded-sm bg-white px-6  py-10 shadow-lg lg:mx-0 lg:max-w-xl"
      >
        <div className="flex flex-col">
          <div className="flex w-full justify-between">
            <h2 className="text-xl font-bold">Add Product</h2>
          </div>

          <div className="mt-6 flex h-full w-full justify-between space-x-6">
            <div className="flex h-full  w-full bg-white">
              <div className="w-full">
                <form onSubmit={handleSubmit}>
                  <div className="mb-6 flex flex-col">
                    <FormInput type="text" label="Name" {...name} />
                  </div>
                  <div className="mb-6 flex flex-col">
                    <label htmlFor="description" className="mb-2">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      name="description"
                      onChange={handleDescription}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-gray-300 focus:ring-0"
                    />
                  </div>
                  <div className="mb-6 flex flex-col">
                    <FormInput type="text" label="Category" {...category} />
                  </div>
                  <div className="mb-6 flex space-x-4 ">
                    <FormInput type="number" label="Price" {...price} />
                    <FormInput type="number" label="Quantity" {...quantity} />
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

                  {error && (
                    <p className="mt-2 pl-2 text-xs italic text-red-500">
                      {error}
                    </p>
                  )}
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
  type: string;
  name: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormInput = ({ type, name, label, value, onChange }: FormInputProps) => {
  return (
    <div className="flex w-full flex-col">
      <label htmlFor={name} className="mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-gray-300 focus:ring-0"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
