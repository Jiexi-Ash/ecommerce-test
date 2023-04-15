import React, { useState } from "react";
import Backdrop from "../Modal/Backdrop";

import { XMarkIcon } from "@heroicons/react/24/solid";

type TAddProductModal = {
  handleClose: () => void;
};

function AddProductModal({ handleClose }: TAddProductModal) {
  return (
    <Backdrop onClick={() => handleClose}>
      <div className="mx-6  max-h-[700px] w-full overflow-y-auto rounded-sm border bg-white p-10  lg:mx-0 lg:max-w-xl">
        <div className="flex flex-col">
          <div className="flex w-full justify-between">
            <h2 className="text-xl font-bold">Add Product</h2>
            <div onClick={handleClose}>
              <XMarkIcon className="h-6 w-6" />
            </div>
          </div>

          <div className="mt-6">
            <form className="flex flex-col space-y-6">
              <div className="flex flex-col space-y-4">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  className="rounded-lg border border-gray-200 p-2 focus:border-gray-300 focus:ring-0"
                />
              </div>
              <div className="flex flex-col space-y-4">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  className="rounded-lg border border-gray-200 p-2 focus:border-gray-300 focus:ring-0"
                />
              </div>
              <div className="flex flex-col space-y-4">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className="rounded-lg border border-gray-200 p-2 focus:border-gray-300 focus:ring-0"
                />
              </div>
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-4">
                  <label htmlFor="quantity">Is Item on sale?</label>
                  <select className="rounded-lg border border-gray-200 p-2 focus:border-gray-300 focus:ring-0">
                    \{/* add select choice option and make it default */}
                    <option selected disabled>
                      Select option
                    </option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-4">
                  <label htmlFor="salePrice">Sale Price</label>
                  <input
                    type="number"
                    name="salePrice"
                    className="rounded-lg border border-gray-200 p-2 focus:border-gray-300 focus:ring-0"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Backdrop>
  );
}

export default AddProductModal;
