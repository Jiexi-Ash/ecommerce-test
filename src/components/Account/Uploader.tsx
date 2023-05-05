import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "~/server/api/uploadthing";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export function MultiUploader() {
  const { getRootProps, getInputProps, isDragActive, files, startUpload } =
    useUploadThing("imageUploader");

  // handle upload return promise void
  const handleUpload = async () => {
    const test = await startUpload();
    console.log(test);

    return null;
  };

  return (
    <div {...getRootProps()} className="h-10  w-20 border border-white">
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
