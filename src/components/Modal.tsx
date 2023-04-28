import Image from "next/image";
import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./Loader";

interface Image {
  original: string ;
  restored: string ;
  onClose: boolean;
  setOnClose: React.Dispatch<React.SetStateAction<boolean>>;
}
const Modal: FC<Image> = ({
  original,
  restored,
  setOnClose,
  onClose,
}) => {

  const [loading, setIsLoading] = useState(false);

  return (
    <AnimatePresence>
      {onClose && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => setOnClose(false)}
            className="w-full h-screen fixed top-0 bottom-0 left-0 right-0 bg-neutral-800/30 backdrop-blur-xl cursor-pointer z-50"
          ></motion.div>
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full fixed h-[95%] bottom-0 left-0 right-0 flex flex-col bg-white  dark:bg-slate-900 z-50 text-7xl rounded-t-md"
          >
            <div className="flex w-full h-full gap-3 justify-center items-center">
              <div className="flex flex-col items-center gap-3">
                <p className="text-lg">Orignal image</p>
                <Image
                  src={original}
                  width={500}
                  height={500}
                  alt="orignal image"
                  className="block text-sm"
                />
              </div>
              <div className="flex flex-col items-center gap-3">
                <p className="text-lg">Restored image</p>
                <Image
                  src={restored}
                  width={500}
                  height={500}
                  alt="restored image"
                  className="text-sm"
                />
              </div>
            </div>
            <div className="flex items-center justify-center my-4">
              <button
                type="button"
                className="text-lg px-6 py-4  text-center dark:bg-neutral-700/50 rounded-full cursor-pointer backdrop-blur-2xl hover:bg-neutral-700/30 transition-all "
              >
                Download restored Image
              </button>
            </div>
            <Loader />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
