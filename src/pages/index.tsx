import { useState } from "react";
import Link from "next/link";
import Modal from "../components/Modal";
import axios, { AxiosResponse } from "axios";
import Head from "next/head";
import UploadWidget from "../components/UploadWidget";
import ErrorMessage from "../components/ErrorMessage";
import Image from "next/image";


export default function Home() {
  const [imageUrl, setimageUrl] = useState<string>("");
  const [restoredImg, setRestoredImg] = useState<string>("");

  const [onClose, setOnClose] = useState(false);
  const [onError, setOnError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleImageRestore() {
    try {
      const response: AxiosResponse = await axios.post(`api/server`,
        {imageUrl: imageUrl}
      );
      const restoreImage = await response.data;
      setRestoredImg(restoreImage);
      console.log(restoreImage)
    } catch (error: any) {
      setOnError(true);
      setErrorMessage(error.message);
    }
  }
  
  console.log(imageUrl, restoredImg);

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
        </nav>
      </header>
      <div className="container relative flex flex-col items-center justify-center h-screen mx-auto space-y-12 overflow-hidden">
        <div className="space-y-4 text-center">
          <h1 className="font-bold text-7xl">Effortlessly Restore Images</h1>
          <p className="mx-auto md:w-3/4 md:text-lg">
            Say goodbye to blurry, faded, and damaged images.{" "}
            <strong>PixelRevive.io</strong> restores your photos to their
            original quality and beyond.
          </p>
        </div>

        <UploadWidget
          setImageUrl={setimageUrl}
          onUpload={handleImageRestore}
          setOnError={setOnError}
          setErrorMessage={setErrorMessage}
        />
        {imageUrl && (
          <div className="w-1/3 h-1/4">
            <Image src={imageUrl} alt="" width={50} height={50} />
          </div>
        )}
      </div>

      <Modal
        original={imageUrl}
        restored={restoredImg}
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
