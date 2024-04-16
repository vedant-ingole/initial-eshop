import React from 'react'
import CategorySlider from './CategorySlider'
import Button from '../Button/Button'

const Latest = ({categories, products}) => {
    return (
        <div className='grid grid-cols-3 h-[70vh] w-full bg-primary'>
            <div className='col-span-1 p-4  flex flex-col justify-around items-center'>
                <h1 className='text-7xl text-center text-blue-900'>Latest Collection</h1>
                {/* <button className='bg-black  text-white text-xl p-4 w-52'>DISCOVER ALL</button> */}
                <Button title="Discover All" />
            </div>
            <div className='col-span-2 items-center self-center mx-5 '>
                <CategorySlider categories={categories} products={products}/>
            </div>
        </div>
    )
}

export default Latest
