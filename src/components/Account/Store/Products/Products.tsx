import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import AddProductModal from "./AddProductModal";
import { useRouter } from "next/router";

import type { Product } from "@prisma/client";

function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      void router.push(
        "/account/selling/products",
        "/account/selling/products/add",
        {
          shallow: true,
        }
      );
    } else {
      void router.push(
        "/account/selling/products",
        "/account/selling/products",
        {
          shallow: true,
        }
      );
    }

    if (selectedProduct) {
      void router.push(
        "/account/selling/products",
        `/account/selling/products/${selectedProduct.id}`,
        {
          shallow: true,
        }
      );
    } else {
      void router.push(
        "/account/selling/products",
        "/account/selling/products",
        {
          shallow: true,
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, selectedProduct]);

  const handleProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <div className="mt-6 flex flex-col px-6">
        {selectedProduct ? (
          <EditProduct product={selectedProduct} />
        ) : (
          <div className="flex flex-col">
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col space-y-1">
                <h2 className="text-xl font-medium">Products</h2>
                <p className="text-sm text-slate-400">
                  View and manage your products
                </p>
              </div>

              <button
                className="rounded-md bg-black px-6 py-1 text-white"
                onClick={() => setIsOpen(true)}
              >
                Add Products
              </button>
            </div>
            <div className="mt-4 flex h-80 w-full flex-col items-center justify-center border bg-slate-100">
              <p className="text-xl font-bold text-black">
                {"You don't have any products"}
              </p>
              <div className="flex flex-col items-center justify-center space-y-4">
                <p className="text-sm text-slate-400">
                  Create your first product to get started
                </p>
                <button
                  className="rounded-md bg-black px-6 py-1 text-white"
                  onClick={() => setIsOpen(true)}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait" initial={false} onExitComplete={() => null}>
        {isOpen && (
          <AddProductModal
            handleClose={() => setIsOpen(false)}
            handleProduct={handleProduct}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Products;

export const EditProduct = ({ product }: { product: Product }) => {
  const { id, name, description, price, quantity } = product;
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="flex flex-col space-y-1">
        <h2 className="text-xl font-medium">Edit Product</h2>
        <p className="text-sm text-slate-400">
          View and update your products details
        </p>
      </div>

      <form className="mt-6" onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="text-sm text-slate-400">Product Name</label>
          <input
            type="text"
            className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-gray-300 focus:ring-0"
            placeholder="Product Name"
            value={name}
            onChange={() => null}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-slate-400">Description</label>
          <textarea
            className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-gray-300 focus:ring-0"
            placeholder="Description"
            rows={4}
            value={description as string}
            onChange={() => null}
          />
        </div>
        <button className="mt-4 rounded-md bg-black py-1 px-6 text-white">
          Update
        </button>
      </form>
    </div>
  );
};
