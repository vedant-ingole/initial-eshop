import React from 'react'
import ProductPage from '../components/ProductPage'

const product = () => {
    return (
        <div>
            <div className="grid grid-cols-2 min-h-[70vh] mt-40 ">
                <div className="bg-yellow-100 col-span-1 p-10">
                    <img src="" className="h-72 bg-green-300 w-72 "/>
                    <div className="bg-green-300 h-20 w-20 mt-8 "/>
                </div>
                <div className="bg-yellow-300 col-span-1 p-10">
                    <h1>Prodcut Name</h1> <p>₹Price</p>
                    <button className="">Add to cart</button>
                    <p>Description</p>
                </div>
            </div>
        </div>
    )
}

export default product
