import React from 'react'
import Link from 'next/link'
import getCommerce from '../lib/commerce'
import { getCart, updateStart } from '../redux/cartRedux'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'


const CartItem = ({ product }) => {
    
    const dispatch = useDispatch()
    const commerce = getCommerce()

    const [stock, setStock] = useState()

    const { carts, pending } = useSelector(state => state.cart)

    const getInventory = async (productId) => {
        const {inventory} = await commerce.products.retrieve(productId)
        setStock(inventory.available)
    }
    
    useEffect(() => {
        getInventory(product.product_id)
    }, [])



    const removeProductFromCart = async (id) => {
        dispatch(updateStart())

        const {cart} = await commerce.cart.remove(id)
        dispatch(getCart(cart))
    }
    
    const quantityChangeHandler = async (id, quantity) => {
        const {cart} = await commerce.cart.update(id, {quantity})
        dispatch(getCart(cart))
        
    }
    // console.log( product )

    return (
        <div className='grid grid-cols-4 gap-5'>

        {/* Product Info */}
            <div className=" col-span-2 mx-1 flex flex-row">
                    <div className=" w-36 h-36 rounded-md overflow-hidden">
                        <Link href={`/products/${product.permalink}`}>
                            <img 
                                src={product.media.source} alt="" 
                                className="w-full h-full object-center object-cover  cursor-pointer"/>
                        </Link>
                    </div>
                    <div className='p-2'>
                        <p>{product.name}</p>
                        {/* <p>{product.inventory.available}</p> */}
                    </div>
            </div>

        {/* Quantity & Remove Item */}
            <div className='col-span-1 p-2 flex justify-between items-center flex-col'>
                {/* <div className=""><p>{product.quantity}</p></div> */}
                <select 
                    name="" 
                    id="quantity" 
                    value={product.quantity} 
                    className='bg-gray-100 rounded-sm w-12 p-1 outline-none leading-10 cursor-pointer' 
                    onChange={(e) => quantityChangeHandler(product.id, e.target.value)}>
                {[...Array(stock && stock < 10 ? stock : 10).keys()].map((x) => (
                                <option 
                                    className='text-center w-20 cursor-pointer'
                                    key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                </select>

            {/* Remove Item     */}
                <button 
                    disabled={pending}
                    onClick={()  => removeProductFromCart(product.id)}
                    className={`${pending ? 'cursor-progress opacity-80' : ''} border h-9 bg-indigo-600 text-lg text-white rounded-md px-3 mb-1`}>
                    Remove
                </button>
                
            </div>

         {/* Price    */}
            <div className='col-span-1  flex justify-end p-2 pr-5'>
                    <p>{product && product.price.formatted_with_symbol}</p>
            </div>
          
        </div>
       
    )
}

export default CartItem


// <p>{product.name}</p>
// <p>{i.id}</p>
{/* <img src={i.media.source} alt="" /> */}

{/* <br /> <button onClick={() => incrementQuantity(i.id, i.quantity)} > + </button>
<p>{i.quantity}</p>
<button onClick={() => decrementQuantity(i.id, i.quantity)} > - </button> <br />

<button onClick={() => removeProductFromCart(i.id)}>
Remove
</button> */}