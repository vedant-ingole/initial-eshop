import React from 'react'
import Link from 'next/link'
import {motion} from 'framer-motion'

const Categories = ({ categories }) => {
    return (
       
        <div className='grid grid-cols-3 grid-rows-2 h-screen' >

            {
                categories.map(category => (
                    <motion.div 
                        key={category.id }  
                        className='category col-span-1 bg-red-200'>
                        <Link href={`/categories/${category.slug}`} >
                            <p> {category.name} </p>
                        </Link>
                    </motion.div>
                    
                ))
            }
        </div>
    ) }
    
    export default Categories
    
    // <div className='grid grid-cols-3 grid-rows-2 h-screen' >
    //    <div className='category col-span-2 bg-red-200'> Sarees </div>
    //    <div className='category col-span-1 bg-blue-100 '> Kurtis</div>
    //    <div className='category col-span-1 bg-green-100 '> Dresses</div>
    //    <div className='category col-span-2 bg-yellow-100'>Accessories</div>
    // </div>