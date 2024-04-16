import React, { useState } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import {popularProducts} from '../../data'
import {motion, AnimatePresence} from 'framer-motion'


// Animation (framer)
const transition = {duration: 1, ease: [0.43, 0.13, 0.23, 0.96]}
const imageVariants = {
    exit: { y: "50%", opacity: 0, transition },
    enter: {
      y: "0%",
      opacity: 1,
      transition
    }
  }



const ImageSlider = ({product}) => {

   
    const NextArrow = ({onClick}) => {
        return(
            <div 
                onClick={onClick} 
                className='arrow right-0 top-1/2'>
                <FaArrowRight className='transition-colors duration-300 text-blue-300  hover:text-blue-700'/>
            </div>
        )
    }
    
    const PrevArrow = ({ onClick }) => {
        return(
            <div 
                onClick={onClick}
                className='arrow left-0 top-1/2'>
                <FaArrowLeft className='transition-colors duration-300 text-blue-300  hover:text-blue-700' />
            </div>
        )
    }

    const [catIndex, setCatIndex] = useState(0)

    const settings = {
        arrows: true,
        infinite: true,
        lazyload: true,
        speed: 400,
        slidesToShow: 1,
        centerMode: true,
        centerPadding: 1,
        // autoplay:true,
        // autoplaySpeed: 3000,
        dots: true,
        nextArrow: <NextArrow />, 
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => setCatIndex(next)
    }

    const [selectedId, setSelectedId] = useState(null)

    return (
        <motion.div 
            // whileTap={{scale:0.95}}
            className=''>
            <Slider {...settings}>
                {
                   product.assets.map((img, index) => (
                        // <div 
                        //     key={index}  
                        //     className={` ${index === catIndex ? "activeSlide slide" : "slide"}`}> 
                        //      <motion.img 
                        // variants={imageVariants}
                        // src={product.image.url} 
                        // layoutId={product.id}
                        // onClick={() => setSelectedId(product.id)}
                        // className="h-[500px] w-[600px] object-cover object-center rounded-md ml-10 cursor-pointer "
                        // />

                        // <AnimatePresence>
                        //     {
                        //         selectedId && 
                        //             <>
                        //             <motion.div 
                        //                 transition={transition}
                        //                 initial={{opacity:0}}
                        //                 animate={{opacity:0.8}}
                        //                 exit={{opacity:0}}
                        //                 onClick={() => setSelectedId(null)}
                        //                 className='fixed top-0 left-0 h-full w-full z-40 bg-black opacity-50 hover:cursor-pointer'>
                        //                 </motion.div>
                        //             <motion.img 
                        //                 src={product.image.url} 
                        //                 layoutId={product.id}
                        //                 initial={{opacity:0}}
                        //                 animate={{opacity:1}}
                        //                 transition={transition}
                        //                 exit={{opacity:0, scale:0.6, top:"10%", left:"10%"}}
                        //                 // onClick={() => setSelectedId(null)}
                        //                 className="fixed z-40 h-[600px] w-[700px] object-cover object-center rounded-md ml-10  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
                        //                 />
                                    
                        //             </>
                        //     }
                        // </AnimatePresence>
                        // </div>
                        <img src={img.url} alt="img"
                             className="h-[550px] w-[650px] object-cover object-center rounded-md m-auto my-10 cursor-pointer " />
                    ))
                }
            </Slider>
        </motion.div>
    )
}

export default ImageSlider