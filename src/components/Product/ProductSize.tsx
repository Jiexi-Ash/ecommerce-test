import React, { useState } from "react";

type Sizes = {
  size: string[];
  onHandleSize: (size: string) => void;
};

function ProductSize({ size, onHandleSize }: Sizes) {
  const [selectedSize, setSelectedSize] = useState<string>("");

  const handleClick = (size: string) => {
    console.log(size);
    setSelectedSize(size.toUpperCase());
    onHandleSize(size);
  };

  return (
    <div className="mt-6 flex flex-col">
      <div className="text-sm font-light">
        Size: <span className="font-medium">Small</span>
      </div>
      <div className="mt-4  flex space-x-2">
        {size.map((size, index) => (
          <div
            key={`${size}-${index}`}
            onClick={() => handleClick(size)}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center border border-gray-100 duration-200 ease-in-out hover:cursor-pointer ${
              size === selectedSize ? "bg-black text-white" : ""
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
