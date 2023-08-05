import Image from "next/image";
import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./Loader";

interface ImageProps {
  original: string ;
  restored: string ;
  onClose: boolean;
  setOnClose: React.Dispatch<React.SetStateAction<boolean>>;
}
const Modal: FC<ImageProps> = ({
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
            className="fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-screen cursor-pointer bg-neutral-800/30 backdrop-blur-xl"
          ></motion.div>
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full fixed h-[95%] bottom-0 left-0 right-0 flex flex-col bg-white  dark:bg-slate-900 z-50 text-7xl rounded-t-md"
          >
            <div className="flex items-center justify-center w-full h-full gap-3">
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
                className="px-6 py-4 text-lg text-center transition-all rounded-full cursor-pointer dark:bg-neutral-700/50 backdrop-blur-2xl hover:bg-neutral-700/30 "
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
