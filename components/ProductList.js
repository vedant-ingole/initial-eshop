import React from 'react'
import Link from 'next/link'
import getCommerce from '../lib/commerce'
import Product from '../components/Productspage/Product'

const ProductList = ({ products }) => {

    return (
        <div>
            <div className='grid grid-cols-4 p-10 mt-20 gap-10' >
            {
               products && products.map(product => (
                   <div key={product.id}>
                        <Product product={product} />
                   </div>
                    ))
                }
                </div>
        </div>
    )
}

export default ProductList
