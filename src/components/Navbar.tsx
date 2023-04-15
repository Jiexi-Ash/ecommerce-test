import React, { useState, useEffect } from "react";
import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";

import { useUser, SignIn } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

import useCart from "~/hooks/useCart";
import { useAppSelector, useAppDispatch } from "~/store/hooks";
import { setCartModal } from "~/store/slices/cartSlice";

const UserButton = () => {
  useCart();
  const user = useUser();

  const username = user.user?.username;

  if (!user) return null;
  return (
    <>
      <div>
        {user.isSignedIn && <div>{username}</div>}
        {!user.isSignedIn && <SignInButton />}
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </div>
    </>
  );
};

function Navbar() {
  const dispatch = useAppDispatch();
  const cartQuantity = useAppSelector((state) => state.cart.totalQuantity);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleCartModal = () => {
    dispatch(setCartModal(true));
  };

  return (
    <header className="relative w-full border-b border-black px-6 py-6 xl:px-10">
      <>
        <nav className="flex w-full items-center justify-between">
          <ul className="hidden items-center space-x-6 lg:flex ">
            <li>
              <Link
                href="/shop"
                className="border-black uppercase transition-all duration-100 ease-in-out hover:border-b hover:pb-1 hover:font-bold"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="border-black uppercase transition-all duration-100 ease-in-out hover:border-b hover:pb-1 hover:font-bold"
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="border-black uppercase transition-all duration-100 ease-in-out hover:border-b hover:pb-1 hover:font-bold"
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="border-black uppercase transition-all duration-100 ease-in-out hover:border-b hover:pb-1 hover:font-bold"
              >
                Kids
              </Link>
            </li>
          </ul>

          <Link href="/">
            <h1 className="text-lg font-medium uppercase">Flee-mark</h1>
          </Link>

          <ul className="hidden space-x-6 lg:flex">
            <li>{<UserButton />}</li>
            <li className="border-l border-black pl-4">
              <div
                className="relative hover:cursor-pointer"
                onClick={handleCartModal}
              >
                <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs text-white">
                  {cartQuantity}
                </div>

                <ShoppingBagIcon className="h-6 w-6" />
              </div>
            </li>
          </ul>

          <button
            type="button"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </nav>
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => null}
        >
          {isOpen && (
            <MobileNav quantity={cartQuantity} handleClose={setIsOpen} />
          )}
        </AnimatePresence>
      </>
    </header>
  );
}

export default Navbar;

type MobileNavProps = {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  quantity: number;
};
export const MobileNav = ({ quantity, handleClose }: MobileNavProps) => {
  const dispatch = useAppDispatch();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const navVariants = {
    close: {
      x: "-100%",
    },
    open: {
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      x: "-100%",
      transition: {
        duration: 0.3,
      },
    },
  };

  const handleCartModal = () => {
    dispatch(setCartModal(true));
    handleClose(false);
  };

  return (
    <motion.div
      className="absolute top-[75px] left-0 z-50 h-screen w-full bg-black"
      variants={navVariants}
      initial="close"
      animate="open"
      exit="exit"
    >
      <div className="relative flex h-full flex-col">
        <div className="block border-t border-b border-slate-50 px-4">
          <form className="flex py-2">
            <input
              type="text"
              className="placeholder:text-slate-100-400 w-full border-none bg-inherit py-2 text-sm text-slate-100 focus:border-none focus:ring-1 focus:ring-slate-100"
              placeholder="Search"
              onChange={handleSearch}
            />

            <button type="button" className="px-2 py-2 focus:border-none">
              <XMarkIcon className="h-6 w-6 font-bold text-slate-50" />
            </button>
          </form>
        </div>

        <div className="mt-6 flex h-full flex-col">
          <ul className="flex flex-col space-y-6 px-6">
            <li>
              <Link href="/" className="text-sm uppercase text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="text-sm uppercase text-white">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/" className="text-sm uppercase text-white">
                About Us
              </Link>
            </li>

            <li>
              <Link href="/" className="text-sm uppercase text-white">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="absolute bottom-20 w-full">
          <ul className="flex  w-full items-center  justify-between  py-6 px-6 text-white">
            <li className="">
              <UserButton />
            </li>
            <li className="border-slate-50">
              <div className="relative">
                <div
                  className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                  onClick={handleCartModal}
                >
                  {quantity}
                </div>
                <ShoppingBagIcon className="h-6 w-6" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
