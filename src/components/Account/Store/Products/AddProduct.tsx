import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import AddProductModal from "./AddProductModal";
import { useRouter } from "next/router";
function AddProduct() {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  return (
    <>
      <div className="mt-6 flex flex-col px-6">
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
            <button className="rounded-md bg-black px-6 py-1 text-white">
              Create
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false} onExitComplete={() => null}>
        {isOpen && <AddProductModal handleClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export default AddProduct;
