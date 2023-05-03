import React from "react";

function AdminSearch() {
  return (
    <div className="flex w-full">
      <form className="w-full">
        <input
          type="text"
          className="w-full rounded-lg border border-gray-200 bg-inherit px-4 py-2 focus:border focus:border-gray-300 focus:outline-none focus:ring-0"
          placeholder="Search..."
        />
      </form>
    </div>
  );
}

export default AdminSearch;
