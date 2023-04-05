import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

function Search() {
  const [showClear, setShowClear] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value) {
      setShowClear(true);
    } else {
      setShowClear(false);
    }
  };

  return (
    <div className="hidden border-b px-6 py-2 md:block lg:border-black xl:px-8">
      <form className="flex">
        <input
          type="text"
          className="w-full border-none py-2 focus:outline-none focus:ring-0"
          placeholder="Search"
          onChange={handleSearch}
        />

        {showClear && (
          <button className="px-2 py-2 focus:border-none">
            <XMarkIcon className="h-5 w-5 font-bold" />
          </button>
        )}
      </form>
    </div>
  );
}

export default Search;
