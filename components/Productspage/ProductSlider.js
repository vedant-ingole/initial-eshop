import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const ProductSlider = () => {


    const settings = {
        customPaging: function(i) {
          return (
            <a>
              <img src='' />
            </a>
          );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    return (
        <div className='h-[70vh] w-1/2 m-auto'>
           <h1>Custom Paging</h1> 
            <Slider>
               
                <div className='w-40 h-96 product '>
                    <img 
                        src="/images/nat1.webp" alt=""
                        className='object-cover object-center' />
                </div>

                <div className='w-40 h-96 product '>
                    <img 
                        src="/images/nat2.jpg" alt="" 
                        className=' ' />
                </div>

                <div className='w-40 h-96 product'>
                    <img src="/images/nature.jpg" alt="" />
                </div>
            </Slider>
        </div>
    )
}

export default ProductSlider
