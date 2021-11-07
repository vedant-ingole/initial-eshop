import React from 'react'
import { motion } from 'framer-motion'
import Link from "next/link"

const transition = { duration: 2, ease: [0.6, -0.05, 0.01, 0.9] }
const titleSlideUp = {
    initial: { y: 200 },
    animate: { y: 0 },
  }


const Header = () => {
    return (
        <>
            <div className=" w-full grid grid-cols-2 h-[100vh]  relative" 
                style={{
                        backgroundColor:"rgb(22,22,22)",
                        background: "linear-gradient(90deg, rgba(22,22,22,1) 0%, rgba(54,54,54,1) 100%)"}}
                         >
            <div className='absolute bg-secondary w-full h-24  top-[18.5rem] mix-blend-soft-light '></div>

        {/* Right Box */}
                <div className="flex justify-center items-center">
                    <img 
                        src="images/Sarees1.png" alt="image"
                        className='h-3/4 z-20' />    
                </div>

         {/* Left Box       */}
                <div className="flex justify-start items-center h-full ">
                    <div className='p-1'>
                        <motion.div 
                            variants={titleSlideUp}
                            initial="initial"
                            animate="animate"
                            transition={transition}
                            className="h-full serif p-10">
                            <h2 className='text-8xl  text-white overflow-hidden font-thin font-serif tracking-widest'>
                                    BE THE  <br />
                                    <p className='text-secondary font-serif font-thin  '>CHANGE</p> 
                            </h2>
                            <p className='text-lg text-white mt-8 p-1 tracking-wider'>
                                Change for better <br />
                                Wear the change you want to be  <br />
                                Bold outfits for bold people,
                            </p>

                            <Link href="/categories/cookware">
                                <button className='bg-white mt-32 p-3 w-40 '>Discover More</button>
                            </Link>

                        </motion.div>
                    </div>
                </div>

            </div>   
        </>
    )
}

export default Header
