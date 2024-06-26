import React from 'react'
import ProductList from './ProductList'
import {motion} from 'framer-motion'
// import { useSelector } from 'react-redux'


const CategoryPage = ({ category, products }) => {


    return (
        <div className=''>
            <motion.div 
                className='h-96 bg-red-200 flex justify-start items-center p-7'>
                <p className='text-5xl text-red-500 font-bold font-sans'> {category.name} </p>
            </motion.div>
        
           <div className='grid grid-cols-4 min-h-screen' >
               
                <div className='col-span-4'>
                   <h1 className='text-2xl py-7'> Filters </h1>
                </div>

                <motion.div 
                    initial={{y:20}}
                    animate={{y:0, transition: { ease: 'easeOut', duration:0.5 }}}
                    exit={{opacity:0, transition: { ease: 'easeOut', duration:0.5 }}}
                    className='col-span-4' >
                 <ProductList products={products} />
                </motion.div>

            </div>
        </div>
    )
}

export default CategoryPage
