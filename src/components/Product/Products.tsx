import React, { useState, useEffect } from "react";

import { AnimatePresence } from "framer-motion";

import { ProductData } from "~/data";
import QuickViewModal from "../Modal/QuickViewModal";
import Product from "./ProductItem";

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
