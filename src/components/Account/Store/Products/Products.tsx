import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import AddProductModal from "./AddProductModal";
import { useRouter } from "next/router";

import { api } from "~/utils/api";

import type { Product, Image as Images, Size } from "@prisma/client";
import ImageUploader from "../../ImageUploader";

import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

type TProduct = Product & {
  Image: Images[];
  sizes: Size[];
};

function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const products = api.products.getAll.useQuery();
  const productData = products.data as (Product & {
    Image: Images[];
    sizes: Size[];
  })[];

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
            <div className="mt-4 flex h-80 w-full flex-col  border bg-slate-100">
              {productData && productData.length > 0 ? (
                <div className="mx-6 my-6 flex flex-col space-y-4">
                  {productData.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      images={product.Image}
                      sizes={product.sizes}
                      handleSelected={setSelectedProduct}
                    />
                  ))}
                </div>
              ) : (
                <div className="h-full w-full items-center justify-center">
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
              )}
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

const EditProduct = ({ product }: { product: Product }) => {
  const [images, setImages] = useState<Images[]>([]);
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
        <ImageUploader setImages={setImages} product={product} />
        <div className="mt-4 flex w-full space-x-10">
          <div className="mb-4 w-full flex-col space-y-2">
            <label className="text-sm text-slate-400">Quantity</label>
            <input
              type="number"
              className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-gray-300 focus:ring-0"
              value={quantity}
              onChange={() => null}
            />
          </div>
          <div className="mb-4 w-full flex-col space-y-2">
            <label className="text-sm text-slate-400">Price</label>
            <input
              type="number"
              className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-gray-300 focus:ring-0"
              value={price}
              onChange={() => null}
            />
          </div>
        </div>
        <div className="flex w-full justify-between">
          <button className="rounded-lg border border-red-300 px-6 py-2 text-sm text-red-300">
            Delete
          </button>
          <div className="flex space-x-2">
            <button className="rounded-lg border border-gray-200 px-6 py-2 text-sm text-black">
              Cancel
            </button>
            <button className="rounded-md bg-black py-2 px-6 text-sm text-white">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

type ProductCardProps = {
  product: Product;
  images: Images[];
  sizes: Size[];
  handleSelected: React.Dispatch<React.SetStateAction<Product | null>>;
};
const ProductCard = ({
  product,
  images,
  sizes,
  handleSelected,
}: ProductCardProps) => {
  const firstImage = images[0] as Images;

  const handleProduct = () => {
    handleSelected(product);
  };
  return (
    <div className="flex max-w-[128px] flex-col" onClick={handleProduct}>
      <div className="flex h-32 w-full items-center justify-center border">
        {!images || images.length === 0 ? (
          <PhotoIcon className="h-8 w-8 text-slate-400" />
        ) : (
          <Image
            src={firstImage.url}
            alt="Product Image"
            width={128}
            height={128}
          />
        )}
      </div>
      <div className="mt-2">
        <p className="text-xs font-bold text-slate-400">{product.name}</p>
      </div>
    </div>
  );
};
