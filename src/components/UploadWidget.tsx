import React, { useState, useCallback } from "react";
import axios, { AxiosResponse} from "axios";
import Dropzone, {
  DropzoneRootProps,
  DropzoneInputProps,
} from "react-dropzone";

type Props = {
  setOriginalImg: React.Dispatch<React.SetStateAction<File | null>>;
  setRestoredImg: React.Dispatch<React.SetStateAction<File | null>>;
  setOnError: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};



const UploadWidget = ({ setOriginalImg, setRestoredImg, setOnError, setErrorMessage }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
  setSelectedFile(file);
   
    async function handleFileUpload() {
      if(selectedFile){
        const formData = new FormData();
        formData.append("file", selectedFile)
        try {
          const response: AxiosResponse = await axios.post("/api/server", formData);
          const imageResponse = response.data;
          setOriginalImg(selectedFile);
          setRestoredImg(imageResponse);
        } catch (error: any) {
          setOnError(true)
          setErrorMessage(error.message)
          console.log(error.message);
        }
      }
    }
    handleFileUpload()
  }, [setOriginalImg, setRestoredImg, selectedFile, setOnError, setErrorMessage]);

  
  console.log(selectedFile);
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
          {selectedFile ? (
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
