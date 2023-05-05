import React, { useState, useRef } from "react";
import Image from "next/image";

import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "~/server/api/uploadthing";
import type { Image as Images, Product } from "@prisma/client";

import { api } from "~/utils/api";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

type Props = {
  product: Product;
  setImages: React.Dispatch<React.SetStateAction<Images[]>>;
};

function ImageUploader({ setImages, product }: Props) {
  const { getRootProps, getInputProps, isDragActive, files, startUpload } =
    useUploadThing("imageUploader");

  const { mutate: createImage } = api.products.uploadImage.useMutation({
    onSuccess: (data) => {
      if (!data) return;
      setImages((prev) => [...prev, data]);
    },
  });

  const handleUpload = async () => {
    const response = await startUpload();
    response.map((file) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const url = file.fileUrl as string;

      createImage({
        productId: product.id,
        url: url,
      });
    });
  };

  return (
    <>
      <div className="rounded-lg border border-gray-200 p-4">
        <div
          {...getRootProps()}
          className="h-32 w-32 rounded-lg border border-gray-200"
        >
          <input {...getInputProps()} />
          <div className="flex h-full w-full flex-col items-center justify-center">
            <p className="text-xs">Click to upload</p>
            <p className="text-xs">or drag and drop</p>
          </div>
        </div>
      </div>
      {files.length === 1 && (
        <button
          className="mt-4 rounded-md bg-black py-1 px-6 text-white"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleUpload}
        >
          Upload
        </button>
      )}
    </>
  );
}

export function MultiUploader() {
  const { getRootProps, getInputProps, isDragActive, files, startUpload } =
    useUploadThing("imageUploader");

  const handleUpload = async () => {
    const test = await startUpload();
    console.log(test);

    return null;
  };

  return (
    <div {...getRootProps()} className="h-10  w-20 border border-gray-200">
      <input {...getInputProps()} />
      <div>
        {files.length > 0 && files.length <= 4 && (
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          <button type="button" onClick={() => handleUpload()}>
            Upload {files.length} files
          </button>
        )}
      </div>
      Drop files here!
    </div>
  );
}

export default ImageUploader;
