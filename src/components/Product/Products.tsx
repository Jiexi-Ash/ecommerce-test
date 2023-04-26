import React, { useState, useEffect } from "react";

import { AnimatePresence } from "framer-motion";

import { ProductData } from "~/data";
import QuickViewModal from "../Modal/QuickViewModal";
import CartModal from "../Modal/CartModal";
import Product from "./ProductItem";

import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { setCartModal } from "~/store/slices/cartSlice";

function Products() {
  const cartModal = useAppSelector((state) => state.cart.cartModal);
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedId, setSelectedId] = useState("");

  const closeModal = () => setModalOpen(false);

  const handleModal = (id: string) => {
    setModalOpen(true);
    setSelectedId(id);
  };

  const handleCartModalClose = () => {
    dispatch(setCartModal(false));
  };

  useEffect(() => {
    if (modalOpen || cartModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modalOpen, cartModal]);

  return (
    <>
      <div className="my-4 grid grid-cols-1 gap-y-6 px-6 md:grid-cols-2 md:gap-x-6 md:px-6 lg:grid-cols-3 xl:grid-cols-4 xl:px-10">
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
        {cartModal && <CartModal handleClose={handleCartModalClose} />}
      </AnimatePresence>
    </>
  );
}

export default Products;
