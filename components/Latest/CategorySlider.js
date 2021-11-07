import React, { useState } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

const category = [1,2,3,4]

const CategorySlider = () => {

   
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
        // arrows: true,
        infinite: true,
        lazyload: true,
        speed: 400,
        slidesToShow: 3,
        centerMode: true,
        centerPadding: 1,
        dots: true,
        nextArrow: <NextArrow />, 
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => setCatIndex(next)
    }

    return (
        <div className=''>
            <Slider {...settings}>
                {
                   category.map((cat, index) => (
                        <div 
                            key={cat}  
                            className={` ${index === catIndex ? "activeSlide slide" : "slide"} w-40 h-96 bg-red-300`}> 
                            <p className='text-4xl p-5 text-center'>{cat}</p>
                        </div>
                    ))
                }
            </Slider>
        </div>
    )
}

export default CategorySlider
