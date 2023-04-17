import {
  ArchiveBoxIcon,
  BookmarkIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

function SideNav() {
  return (
    <>
      <div className="hidden h-screen w-[300px] flex-col border-r bg-slate-50 py-10 shadow-sm lg:flex">
        <div className="px-6">
          <h1 className="text-xl font-bold">FleeMark - Admin</h1>
          <hr className="my-4" />
        </div>

        <div className="mt-6 flex h-full flex-col justify-between">
          <ul className="flex flex-col space-y-4">
            <li className="flex items-center space-x-2 py-2 px-6 duration-200 ease-in-out hover:cursor-pointer hover:bg-black hover:text-white">
              <Squares2X2Icon className="h-5 w-5" />
              <Link href="/admin">Dashboard</Link>
            </li>
            <li className="flex items-center space-x-2 py-2 px-6 duration-200 ease-in-out hover:cursor-pointer hover:bg-black hover:text-white">
              <ArchiveBoxIcon className="h-5 w-5" />
              <Link href="/admin/products">Product</Link>
            </li>
            <li className="flex items-center space-x-2 py-2 px-6 duration-200 ease-in-out hover:cursor-pointer hover:bg-black hover:text-white">
              <BookmarkIcon className="h-5 w-5" />
              <Link href="/orders">Orders</Link>
            </li>
          </ul>

          <div className="w-full bg-sky-300 px-6 py-6">test</div>
        </div>
      </div>
    </>
  );
}

export default SideNav;

const AdminNavMobile = () => {
  return <div className="block lg:hidden"></div>;
};
