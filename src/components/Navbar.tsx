import React from "react";
import Link from "next/link";

import { useUser } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { Bars3Icon } from "@heroicons/react/24/solid";

const UserButton = () => {
  const user = useUser();

  const username = user.user?.username;

  if (!user) return null;
  return (
    <div>
      {user.isSignedIn && <button>{username}</button>}
      {!user.isSignedIn && <SignInButton />}
    </div>
  );
};

function Navbar() {
  const user = useUser();

  return (
    <header className="border-b border-black p-6 ">
      <nav className="flex items-center justify-between">
        <ul className="hidden items-center space-x-6 lg:flex">
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

        <h1 className="text-lg font-medium uppercase">Flee-mark</h1>

        <ul className="hidden space-x-6 lg:flex">
          <li>{user.isSignedIn && <UserButton />}</li>
          <li className="border-l border-black pl-4">
            <Link href="/cart" className="font-medium ">
              Cart
            </Link>
          </li>
        </ul>

        <div className="lg:hidden">
          <Bars3Icon className="h-6 w-6" />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
