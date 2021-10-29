import React from 'react'
import { motion } from 'framer-motion'

const transition = { duration: 2, ease: [0.6, -0.05, 0.01, 0.9] }
const titleSlideUp = {
    initial: { y: 200 },
    animate: { y: 0 },
  }


const Header = () => {
    return (
        <>
            <div className="bg-gray-200 w-full grid grid-cols-2 h-[100vh]" >
         {/* Left Box       */}
                <div className="flex justify-center items-center h-full bg-green-100">
                    <div className='p-1 bg-red-100'>
                        <h2 className='text-9xl overflow-hidden'>
                            <motion.div 
                                variants={titleSlideUp}
                                initial="initial"
                                animate="animate"
                                transition={transition}
                                className="h-full ">
                                Show Me
                            </motion.div>
                        </h2>
                    </div>
                </div>

        {/* Right Box */}
                <div className="bg-green-100"> </div>
            </div>   
        </>
    )
}

export default Header
