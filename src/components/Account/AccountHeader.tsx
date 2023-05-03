import React from "react";
import Link from "next/link";

function AccountHeader() {
  return (
    <div className="my-4 w-full border shadow-sm">
      <div className="flex items-center py-2 px-6">
        <div className="flex w-full max-w-[130px] space-x-1 rounded-lg bg-gray-100 px-1 py-1">
          <div className="rounded-md bg-white px-2 py-2 text-xs">Selling</div>
          <div className="px-2 py-2 text-xs">Buying</div>
        </div>
        <div className="ml-4 flex space-x-6">
          <Link href="" className="text-sm">
            Profile
          </Link>
          <Link href="" className="text-sm">
            Products
          </Link>
          <Link href="" className="text-sm">
            Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccountHeader;
