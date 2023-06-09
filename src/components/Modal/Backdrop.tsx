import React from "react";
import { motion } from "framer-motion";
type TBackdrop = {
  onClick: () => void;
  children: React.ReactNode;
};

function Backdrop({ onClick, children }: TBackdrop) {
  return (
    <motion.div
      className="fixed left-0 top-0 z-10 flex h-full  w-full justify-center bg-[#fff]/80 pt-10 md:pt-40 lg:pt-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export default Backdrop;
