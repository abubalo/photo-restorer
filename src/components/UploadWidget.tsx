import React, { useState, useCallback } from "react";
import type { FC } from "react";
import Loader from "./Loader";
// import { S3 } from "aws-sdk/clients/all";
import s3 from "../pages/api/config/s3Config";
import Dropzone, {
  DropzoneRootProps,
  DropzoneInputProps,
} from "react-dropzone";

type UploadProps = {
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setOnError: React.Dispatch<React.SetStateAction<boolean>>;
  onUpload: () => void;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

const UploadWidget: FC<UploadProps> = ({
  onUpload,
  setImageUrl,
  setOnError,
  setErrorMessage,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsLoading(true);
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("file", file);

      const fileMineType = file.type;
      formData.append("Content-Type", fileMineType);

      setSelectedFile(file);

      const params = {
        Bucket: "photo-restorer",
        Key: file.name,
        Body: file,
        ACL: "public-read",
      };

      try {
        const data = await s3.upload(params).promise();
        setImageUrl(data.Location);
      } catch (error: any) {
        setOnError(true);

        setErrorMessage(error.message);
        console.log(error.message);
      }

      onUpload();
      setIsLoading(false);
    },
    [setOnError, setErrorMessage, onUpload, setImageUrl]
  );

  return (
    <Dropzone onDrop={onDrop} maxFiles={1}>
      {({
        getRootProps,
        getInputProps,
      }: {
        getRootProps: () => DropzoneRootProps;
        getInputProps: () => DropzoneInputProps;
      }) => (
        <label
          htmlFor="file"
          className="flex flex-col items-center justify-center w-1/2 p-4 transition-all ease-linear border-2 border-gray-800 border-dashed rounded-md cursor-pointer h-52 hover:bg-slate-900 hover:bg-opacity-50 dark:border-neutral-800"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isLoading ? (
            <Loader />
          ) : selectedFile ? (
            <p className="px-5 py-3 mt-2 text-base rounded-md bg-neutral-800/50">
              Selected file: {selectedFile.name}
            </p>
          ) : (
            <p className="px-5 py-3 mt-2 text-base rounded-md bg-neutral-800/50">
              Drag and drop a .png or .jpg file here, or click to select a file
            </p>
          )}
        </label>
      )}
    </Dropzone>
  );
};

export default UploadWidget;
