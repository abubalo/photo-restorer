import Image from 'next/image'
import {FC} from "react"
import {motion, AnimatePresence} from "framer-motion"

interface Image{
  originalImg: string;
  restoredImg: string;
}
const Modal: FC<Image> = ({originalImg, restoredImg}) => {
  return (
    <AnimatePresence>
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{}}
        className="w-full h-screen fixed top-0 bottom-0 left-0 right-0 bg-neutral-800/30 backdrop-blur-xl"></motion.div>
        <motion.div 
        initial={{x: "-100%"}}
        animate={{x: "100%"}}
        exit={{x: "-100%", opacity: 0}}
        transition={{duration: 0.3, ease: "ease-in-out"}}
        className="w-full fixed h-[90%] bottom-0 left-0 right-0  bg-white z-10 text-7xl rounded-t-md">
          <div className='flex gap-3 justify-center items-center'>
            <div>
              <Image src="" width={200} height={200} alt="orignal image" />
            </div>
            <div><Image src="" width={200} height={200} alt="restored image" /></div>
          </div>
        </motion.div>
    </AnimatePresence>
  )
}

export default Modal