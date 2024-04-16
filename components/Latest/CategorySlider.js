import React, { useState } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import {popularProducts} from '../../data'
import {motion} from 'framer-motion'

const category = [
    "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
    "https://cdn.shopify.com/s/files/1/0101/4832/products/Angela_Natural_Tee.png?v=1606780388",
    "https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png",
    "https://www.burdastyle.com/pub/media/catalog/product/cache/7bd3727382ce0a860b68816435d76e26/107/BUS-PAT-BURTE-1320516/1170x1470_BS_2016_05_132_front.png",
    "https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png",
    "https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png",
    "https://www.vintageindustries.nl/download_front/qympzk1762/2217_Arrow_Jacket_Forest.png",
]

const CategorySlider = ({categories, products}) => {

   
    const NextArrow = ({onClick}) => {
        return(
            <div 
                onClick={onClick} 
                className='arrow right-0 top-1/2'>
                <FaArrowRight className='transition-colors duration-300  hover:text-blue-700'/>
            </div>
        )
    }
    
    const PrevArrow = ({ onClick }) => {
        return(
            <div 
                onClick={onClick}
                className='arrow left-0 top-1/2'>
                {/* className='arrow left-0 bg-white h-full w-24'> */}
                    {/* <div /> */}
                <FaArrowLeft className='transition-colors duration-300  hover:text-blue-700' />
            </div>
        )
    }

    const [catIndex, setCatIndex] = useState(0)

    const settings = {
        arrows: true,
        infinite: true,
        lazyload: true,
        speed: 400,
        slidesToShow: 2.25,
        centerMode: true,
        centerPadding: 1,
        autoplay:true,
        autoplaySpeed: 3000,
        // dots: true,
        nextArrow: <NextArrow />, 
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => setCatIndex(next)
    }

// Popualting the slider
    const cookware = categories.find(item => {
        return item.name === "Cookware"
    })
    // console.log(cookware)

    // console.log(products)
    // const test = products.map(product => {
    //     return product.categories.forEach(cat => (
    //         cat
    //     ))
    // })
    // console.log(test)
    // console.log(products);;


    // const Latestproducts = products.filter(product => {
    //      product.categories.find(items => {
    //         items.filter(cat => {
    //             cat.name === "Cookware"
    //         })
    //     })
    // })
    // console.log(Latestproducts) 

    return (
        <motion.div 
            // whileTap={{scale:0.95}}
            className=''>
            <Slider {...settings}>
                {
                   category.map((product, index) => (
                        <div 
                            key={index}  
                            className={` ${index === catIndex ? "activeSlide slide" : "slide"} w-40 h-96 bg-white m-5`}
                            > 
                            {/* <p className='text-4xl p-5 text-center'>{cat}</p> */}
                            <img src={product} alt="" className='' />
                        </div>
                    ))
                }
            </Slider>
        </motion.div>
    )
}

export default CategorySlider
