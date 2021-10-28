import React from 'react'
import Product from './Product'
import Link from 'next/link'

const RelatedProducts = ({products}) => {
    return (
        <div className='min-h-full w-full'>
            <h3 className="w-1/3 p-5 md:w-full leading-tight md:leading-normal font-serif text-xl md:text-3xl">
              Some other things you might like
            </h3>
            <div className='mt-10 grid grid-cols-4 gap-7 p-8'>
                { 
                    products && products.map((product) => (
                   <div key={product.id}>
                       <Product product={product} />
                   </div>
                ))
                }
            </div>

        </div>
    )
}

export default RelatedProducts

                     {/* <div className="w-full grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8 pt-4 md:pt-8">
                     {products.map((product) => (
                     <Product
                         key={product.id}
                         {...product}
                         className="h-72 md:h-96 lg:h-112"
                     />
                     ))}
               </div> */}