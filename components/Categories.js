import React from 'react'
import Link from 'next/link'
import {motion} from 'framer-motion'

const Categories = ({ categories }) => {
    return (
       
        <div className='grid grid-cols-3 gap-3 p-2 grid-rows-2 min-h-screen w-full m-auto my-2 ' >

            {
                categories.map(category => (
                    <motion.div 
                        key={category.id }  
                        className='h-96 category col-span-1 bg-red-200 rounded-md '>
                        <Link href={`/categories/${category.slug}`} >
                            <p className='self-end p-5 text-blue-900'> {category.name} </p>
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