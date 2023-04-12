import React from "react";

type Sizes = {
  size: string[];
};

function ProductSize({ size }: Sizes) {
  return (
    <div className="mt-6 flex flex-col">
      <div className="text-sm font-light">
        Size: <span className="font-medium">Small</span>
      </div>
      <div className="mt-4  flex space-x-2">
        {size.map((size) => (
          <div
            key={size}
            className="flex h-10 w-10 items-center justify-center border border-gray-100 bg-white"
          >
            {size}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductSize;
