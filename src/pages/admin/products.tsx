import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import {
  Squares2X2Icon,
  ArchiveBoxIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

import AdminNav from "~/components/admin/AdminNav";
import AdminSearch from "~/components/admin/AdminSearch";
import AddProductModal from "~/components/admin/AddProductModal";

const Products: NextPage = () => {
  const [openModal, setOpenModal] = useState(false);
  // const user = useUser();
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  // const user = useUser();

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const MenuVariant = {
    hidden: { width: 0 },
    visible: {
      width: 300,
    },
  };

  const listItemVariant = {};

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen w-full">
        <AdminNav />
        <div className="w-[calc(100%-300px)] bg-gray-50 px-10 py-10">
          <AdminSearch />
          <div className="mt-10 flex items-center justify-between">
            <div className="text-sm">
              Total Products: <span>1000</span>
            </div>
            <button
              className="rounded-lg bg-black px-6 py-2 text-white transition-all duration-200 ease-in-out hover:scale-105"
              onClick={() => setOpenModal(true)}
            >
              Add Product
            </button>
          </div>
        </div>
      </main>

      <AnimatePresence mode="wait" initial={false} onExitComplete={() => null}>
        {openModal && <AddProductModal handleClose={handleCloseModal} />}
      </AnimatePresence>
    </>
  );
};

export default Products;
