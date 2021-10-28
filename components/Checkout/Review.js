import React from 'react'

const Review = ({checkoutToken}) => {
    return (
        <div className='p-3'>
            <h1 className='text-center p-5 text-gray-700 text-3xl'>Order Summary</h1>
            <ul className='border border-solid w-1/2 m-auto my-8 p-3 flex'>
                {
                    checkoutToken.live.line_items.map((product) => (
                    <li className='flex-1' key={product.id}>
                            <img className='w-24 h-24 object-cover object-center' src={product.media.source} alt={product.media.source} />
                            <span>{product.name}</span>
                            <span>{product.quantity}</span>
                            <span>{product.line_total.formatted_with_symbol}</span>
                    </li>
                    ))
                 }
                 <li>
                     <p>{checkoutToken.live.subtotal.formatted_with_symbol}</p>
                 </li>

            </ul>
        </div>
    )
}

export default Review
