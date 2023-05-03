import React, { useState, useRef } from "react";
import Image from "next/image";
import { MultiUploader } from "./Uploader";

type UploadImageProps = {
  handleSelectedImage: (image: string) => void;
};

function UploadImage({ handleSelectedImage }: UploadImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //  reset image state
    setPreviewImage("");
    const { files } = e.target;
    if (files) {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewImage(e.target?.result as string);
          handleSelectedImage(e.target?.result as string);
        };

        // add image data to parent component
        reader.readAsDataURL(file);
      }
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center  bg-slate-50 ">
      {/* {previewImage && (
        <Image
          src={previewImage}
          alt="product image"
          width={250}
          height={250}
        />
      )}
      <input
        type="file"
        title=""
        className="hidden"
        ref={inputRef}
        onChange={handleFileChange}
      />
      <div className="flex w-full justify-center space-x-6">
        <button
          className="mt-6 rounded-lg border border-black px-4 py-2 "
          onClick={handleClick}
        >
          Upload Image
        </button>
        {previewImage && (
          <button className="mt-6 rounded-lg border border-black px-4 py-2 ">
            Add Image
          </button>
        )}
      </div> */}
      <MultiUploader />
    </div>
  );
}

export default UploadImage;
