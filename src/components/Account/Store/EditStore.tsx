import React, { useState } from "react";

import { api } from "~/utils/api";

type EditStoreProps = {
  name: string;
  description?: string | null;
  industry?: string | null;
};

function EditStore({ name, description, industry }: EditStoreProps) {
  const [storeName, setStoreName] = useState<string>(name);
  const [storeDescription, setStoreDescription] = useState<string>(
    description || ""
  );
  const [storeIndustry, setStoreIndustry] = useState<string>(industry || "");

  const { mutate: updateStore } = api.store.updateStore.useMutation({
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      storeName === "" ||
      storeName === name ||
      storeIndustry === "" ||
      storeIndustry === industry ||
      storeDescription === "" ||
      storeDescription === description
    ) {
      return;
    }

    updateStore({
      name: storeName,
      description: storeDescription,
      industry: storeIndustry,
    });
  };

  return (
    <>
      <div className="w-full">
        <div className="flex flex-col space-y-1">
          <h2 className="text-xl font-medium">Edit Store</h2>
          <p className="text-sm text-slate-400">
            Review and update store details
          </p>
        </div>
        <form className="mt-6 grid grid-cols-2 gap-10" onSubmit={handleEdit}>
          <div className="flex flex-col">
            <div className="mb-4">
              <label className="text-sm text-slate-400">Store Name</label>
              <input
                type="text"
                className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-gray-300 focus:ring-0"
                placeholder=""
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="text-sm text-slate-400">Industry</label>
              <input
                type="text"
                className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-gray-300 focus:ring-0"
                placeholder=""
                value={storeIndustry}
                onChange={(e) => setStoreIndustry(e.target.value)}
              />
            </div>
            <div>
              <button className="mt-4 rounded-md bg-black py-1 px-6 text-white">
                Update
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="text-sm text-slate-400">Store Description</label>
            <textarea
              className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-gray-300 focus:ring-0"
              rows={5}
              placeholder=""
              value={storeDescription}
              onChange={(e) => setStoreDescription(e.target.value)}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default EditStore;
