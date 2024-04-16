import React from 'react'
import { motion, useViewportScroll, useTransform } from 'framer-motion'
import Link from "next/link"
import Button from './Button/Button'

const transition = { delay: 0, duration: 1, ease: [0.6, -0.05, 0.01, 0.9] }
const transition2 = { duration: 1, ease: "easeInOut" }

const headerAnimation = {
    initial: { scale: 1.1 },
    animate: { scale: 1 },
    exit: { scale: 1.1 }
}

const titleSlideUp = {
    initial: { y: 200, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    // exit: {opacity:0}
}


const Header = () => {

    const { scrollYProgress } = useViewportScroll()
    const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2])

    return (
        <motion.div
            variants={headerAnimation}
            transition={transition2}
            initial="initial"
            animate="animate"
            exit="exit"
        // style={{ scaleY: scrollYProgress }} 
        >
            <div className=" w-full grid grid-cols-2 h-[100vh] relative"
                style={{
                    backgroundColor: "rgb(22,22,22)",
                    background: "linear-gradient(90deg, rgba(22,22,22,1) 0%, rgba(54,54,54,1) 100%)"
                }}
            >
                <div className='absolute bg-secondary w-full h-24  top-[19rem] mix-blend-soft-light '></div>

                {/* Right Box */}
                <div className="flex justify-center items-center">
                    <img
                        src="images/Sarees1.png" alt="image"
                        className='h-3/4 z-10' />
                </div>

                {/* Left Box  */}
                <div className="flex justify-start items-center h-full ">
                    <div className='p-1'>
                        <div className='overflow-hidden'>
                            <motion.h2
                                className='text-8xl   text-white overflow-hidden font-thin font-serif tracking-widest'
                                variants={titleSlideUp}
                                transition={transition}
                            >
                                BE THE
                            </motion.h2>
                        </div>
                        <div className='overflow-hidden'>
                            <motion.h2
                                className='text-8xl  text-secondary overflow-hidden font-thin font-serif tracking-widest'
                                variants={titleSlideUp}
                                transition={transition}
                            >
                                CHANGE
                            </motion.h2>
                        </div>
                        <p className='text-lg text-white mt-5 p-1 tracking-wider'>
                            Change for better <br />
                            Wear the change you want to be  <br />
                            Bold outfits for bold people,
                        </p>

                        <Link href="/categories/cookware">
                            <div className='mt-32'>
                                <Button title="Discover More" />
                            </div>
                        </Link>

                    </div>
                </div>

            </div>
        </motion.div>
    )
}

export default Header
