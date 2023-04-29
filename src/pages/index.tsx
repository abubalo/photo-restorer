import { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "../components/Modal";
import axios, { AxiosResponse } from "axios";
import Head from "next/head";
import UploadWidget from "../components/UploadWidget";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  const [originalImg, setOriginalImg] = useState<File | null>(null);
  const [restoredImg, setRestoredImg] = useState<File | null>(null);

  const [displayOrignalImg, setDisplayOrignalImg] = useState<string>("");
  const [displayRestoredImg, setDisplayRestoredImg] = useState<string>("");

  const [onClose, setOnClose] = useState(false);
  const [onError, setOnError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleImageRestore() {
    const imageUrl = originalImg;
    try {
      const response: AxiosResponse = await axios.post("api/server", {
        imageUrl,
      });
      const restoreImgResponse = await response.data;
      setRestoredImg(restoreImgResponse);
    } catch (error: any) {
      setOnError(true);
      setErrorMessage(error.message);
    }
  }

  console.log({ originalImg, restoredImg });

  return (
    <main className="">
      <Head>
        <title>PixelRevive</title>
        <meta name="description" content="Effortlessly restore images" />
        <meta name="author" content="Abubakar Balogun" />
        <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
      </Head>
      <header className="w-[90%] fixed container left-0 right-0 top-0 mx-auto flex justify-between items-center p-4 z-50">
        <div className="text-2xl font-bold">PixelRevive.io</div>
        <nav className="flex space-x-6">
          <Link
            href="https://github.com/abubalo/photo-restorer.git"
            target={"_blank"}
          >
            Github
          </Link>
          <Link
            href=""
            onClick={() => setOnClose(true)}
            className="border hover:border-gray-500"
          >
            {onClose ? "Button" : "Modal"}
          </Link>
          <Link
            href=""
            onClick={() => setOnError(true)}
            className="border hover:border-gray-500"
          >
            Error
          </Link>
        </nav>
      </header>
      <div className="relative container mx-auto h-screen flex flex-col justify-center items-center  space-y-12 overflow-hidden">
        <div className="text-center space-y-4">
          <h1 className="text-7xl font-bold">Effortlessly Restore Images</h1>
          <p className=" md:w-3/4 mx-auto md:text-lg">
            Say goodbye to blurry, faded, and damaged images.{" "}
            <strong>PixelRevive.io</strong> restores your photos to their
            original quality and beyond.
          </p>
        </div>

        <UploadWidget
          setOriginalImg={setOriginalImg}
          onUpload={handleImageRestore}
          setOnError={setOnError}
          setErrorMessage={setErrorMessage}
        />
      </div>

      <Modal
        original={displayOrignalImg}
        restored={displayRestoredImg}
        // originalImg={"/img2.jpg"}
        // restoredImg={"/img2.jpg"}
        setOnClose={setOnClose}
        onClose={onClose}
      />
      <ErrorMessage
        onError={onError}
        setOnError={setOnError}
        message={errorMessage}
      />
    </main>
  );
}
