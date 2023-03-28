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
    <div className="border-b border-black px-6 py-2">
      <form className="flex">
        <input
          type="text"
          className="w-full px-2 py-2 focus:border-none focus:outline-none"
          placeholder="Search"
          onChange={handleSearch}
        />

        {showClear && (
          <button className="px-2 py-2 focus:border-none">
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
      </form>
    </div>
  );
}

export default Search;
