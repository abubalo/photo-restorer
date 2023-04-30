import React, { useState, useCallback } from "react";
import type { FC } from "react";
import Loader from "./Loader";
import { S3 } from "aws-sdk/clients/all";
import s3 from "../pages/api/config/s3Config";
import Dropzone, {
  DropzoneRootProps,
  DropzoneInputProps,
} from "react-dropzone";

type UploadProps = {
  setImageUrl: React.Dispatch<React.SetStateAction<File | string>>;
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
      setSelectedFile(file);
      const formData = new FormData();
      formData.append("file", file);
      const params = {
        Bucket: "photo-restorer",
        Key: file.name,
        Body: file
      };

      s3.upload(params, (error: any, data: S3.ManagedUpload.SendData) => {
        if (error) {
          setOnError(true);
          setErrorMessage(error.message);
        } else {
          setImageUrl(data.Location);
        }
      });

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
          className="w-1/2 h-52 p-4 flex flex-col justify-center items-center border-dashed border-2 border-gray-800 rounded-md cursor-pointer hover:bg-slate-900 hover:bg-opacity-50 transition-all ease-linear dark:border-neutral-800"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isLoading ? (
            <Loader />
          ) : selectedFile ? (
            <p className="text-base mt-2 px-5 py-3 rounded-md bg-neutral-800/50">
              Selected file: {selectedFile.name}
            </p>
          ) : (
            <p className="text-base mt-2 px-5 py-3 rounded-md bg-neutral-800/50">
              Drag and drop a .png or .jpg file here, or click to select a file
            </p>
          )}
        </label>
      )}
    </Dropzone>
  );
};

export default UploadWidget;
