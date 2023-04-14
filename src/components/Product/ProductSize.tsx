import React, { useState } from "react";

type Sizes = {
  size: string[];
  onHandleSize: (size: string) => void;
};

function ProductSize({ size, onHandleSize }: Sizes) {
  const [selectedSize, setSelectedSize] = useState<string>("");

  const handleClick = (size: string) => {
    setSelectedSize(size);
    onHandleSize(size);
  };

  return (
    <div className="mt-6 flex flex-col">
      <div className="text-sm font-light">
        Size: <span className="font-medium">Small</span>
      </div>
      <div className="mt-4  flex space-x-2">
        {size.map((size) => (
          <div
            key={size}
            onClick={() => handleClick(size)}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center border border-gray-100 bg-white duration-200 ease-in-out hover:cursor-pointer hover:bg-slate-200 ${
              selectedSize === size ? "bg-gray-200" : ""
            }`}
          >
            {size}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductSize;
