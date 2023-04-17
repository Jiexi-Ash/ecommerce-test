import React, { useState } from "react";
import Link from "next/link";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArchiveBoxIcon,
  BookmarkIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

function AdminNav() {
  const [openNav, setOpenNav] = useState(false);

  const handleNav = () => {
    setOpenNav(!openNav);
  };

  const navVariant = {
    hidden: {
      height: 0,
    },
    visible: {
      height: "100vh",
      transition: {
        duration: 0.5,
      },
    },
    rest: {
      height: 0,
    },
  };

  return (
    <header className="block w-full  bg-gray-50 py-6 px-6 lg:hidden">
      <div className="flex w-full items-center justify-between border-b border-black pb-6">
        <h1 className="text-lg font-bold">FM - Admin</h1>

        {openNav ? (
          <XMarkIcon className="h-6 w-6 cursor-pointer" onClick={handleNav} />
        ) : (
          <Bars3Icon
            className="h-6 w-6 hover:cursor-pointer"
            onClick={() => handleNav()}
          />
        )}
      </div>

      <AnimatePresence mode="wait" initial={false} onExitComplete={() => null}>
        {openNav && (
          <motion.div
            className="absolute top-[75px] left-0 z-10 w-full bg-black"
            variants={navVariant}
            initial="hidden"
            animate="visible"
            exit="rest"
          >
            <div className="flex h-full px-6 py-10">
              <nav className="">
                <ul className="flex flex-col space-y-8">
                  <li className="flex items-center space-x-2 text-white">
                    <Squares2X2Icon className="h-6 w-6" />
                    <Link href="/admin" className="text-lg">
                      Dashboard
                    </Link>
                  </li>
                  <li className="flex items-center space-x-2 text-white">
                    <ArchiveBoxIcon className="h-6 w-6" />
                    <Link href="/admin" className="text-lg">
                      Product
                    </Link>
                  </li>
                  <li className="flex items-center space-x-2 text-white">
                    <BookmarkIcon className="h-6 w-6" />
                    <Link href="/admin" className="text-lg">
                      Orders
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default AdminNav;
