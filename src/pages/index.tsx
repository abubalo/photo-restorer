import {useState} from "react"
import Link from "next/link";
import Modal from "./Modal";
import DropZone from "./DropZone";
import axios from "axios"
export default function Home() {

  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [onClose, setOnclose] = useState(false)

  async function handleFileUpload(){
    // const file = e.target.files[0];
    const data = new FormData();
    try{
      await axios.post("/api/server", data)
    }catch(error: any){
      console.log(error.message);
    }
    
  }

  return (
    <main className="">
      <header className="w-[90%] fixed container left-0 right-0 top-0 mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold">PixelRevive.io</div>
        <nav className="flex space-x-6">
          <Link href="https://github.com/abubalo/photo-restorer.git">Github</Link>
        </nav>
      </header>
      <div className="container mx-auto h-screen flex flex-col justify-center items-center mt-10 space-y-12">
       
        <div className="text-center space-y-4">
          <h1 className="text-7xl font-bold">Effortlessly Restore Images</h1>
          <p className=" md:w-3/4 mx-auto md:text-lg">
          Say goodbye to blurry, faded, and damaged images. Our app restores your photos to their original quality and beyond.
          </p>
        </div>
        <label
          htmlFor="file"
          className="w-1/2 h-52 p-4 flex flex-col justify-center items-center border-dashed border-2 border-gray-800 rounded-md cursor-pointer hover:bg-slate-900 hover:bg-opacity-50 transition-all ease-linear dark:border-neutral-800/50"
        >
          <p className="px-5 py-3 rounded-md bg-neutral-800/50">Upload a photo to restore here</p>
          <p className="p-1 text-sm">Drag the photo here</p>
          <input type="file" name="file" id="file" hidden />
          <DropZone />
        </label>
  
      </div>
      <div className="grid grid-cols-2"></div>
      <Modal originalImg={""} restoredImg={""}/>
    </main>
  );
}
