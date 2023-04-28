import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

type Props = {
  message: string;
  onError: boolean;
  setOnError: React.Dispatch<React.SetStateAction<boolean>>
};


const ErrorMessage = ({ message, onError, setOnError, }: Props) => {

  useEffect(()=>{
    if(onError){
      setTimeout(()=>{
        setOnError(false)
      },3000)
    }
  },[onError, setOnError])

  return (
    <AnimatePresence>
    {onError && (
       
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed  top-3 right-2  z-50"
          >
            <div className="flex gap-2 bg-red-400 p-4 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>

            <p className="flex">{message}</p>
            </div>
          </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorMessage;
