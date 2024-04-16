import React, { useState } from 'react'
import getCommerce from '../lib/commerce'
import { useSelector, useDispatch } from 'react-redux'
import { getCart, updateStart } from '../redux/cartRedux'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify';
import CartItem from '../components/CartItem'
import Head from 'next/head'


const Cart = () => {

    const dispatch = useDispatch()
    const commerce = getCommerce()

    const { carts, pending } = useSelector(state => state.cart)
    // const isEmpty = carts && carts.line_items.length === 0
 

    // const incrementQuantity = async (id, quantity) => {
    //     const {cart} = await commerce.cart.update(id, { quantity: quantity + 1})
    //     dispatch(getCart(cart))
    // }
    


    const emptyCart = async () => {
        dispatch(updateStart())

        const {cart} = await commerce.cart.empty()
        dispatch(getCart(cart))
        toast.success("All items are removed from your bag",{ theme:"coloured" })
    }

    
    return (
        <>
        <Head>
            <title>Cart Page</title>
        </Head>
            <div className='mt-40 text-center'>
                <h1 className='text-5xl font-sans'>YOUR BAG</h1>
            </div>

        {
            Object.keys(carts).length > 0  && carts.line_items.length === 0 ? 
                <div className='h-screen w-screen  p-10 mt-5'>
                    <h1>Your cart is Empty.</h1>
                    <br /> 
                    <h1>Start By adding some</h1>
                    
                </div>
              :    
                <div className="min-h-screen">
                    <div className='grid grid-cols-3 mt-20 '>

                    {/* Bag Items */}
                        <div className='col-span-2  grid grid-cols-1 divide-y divide-gray-400 gap-2 px-2 mx-auto w-11/12 '>
                            <h1 className="inline text-4xl text-gray-600 p-3 ml-2 font-semibold">Your Products</h1>
                            {  Object.keys(carts).length > 0 &&
                                carts.line_items.map(product => (
                                    <div className='px-5 py-2' key={product.id} >
                                        <CartItem product={product} />
                                    </div>
                                ))
                            }

                        {/* Subtotal & Items */}
                            {/* <div className='grid grid-cols-4 p-2 mt-3'>
                                <div className="col-span-2">
                                    <p className='text-xl font-bold'>Subtotal</p>
                                </div>
                                <div className='col-span-1 justify-self-center'>
                                    <p className='text-xl font-bold'>Total Items : {carts && carts.total_items === 1 ? '1 item' : `${carts && carts.total_items} items`  } </p>
                                    <p className='text-xl font-bold'>Total Items : {carts && carts.total_items} </p>
                                </div>
                                <div className='col-span-1 justify-self-end mr-5'>
                                    <p className='text-xl font-bold'> {carts && carts.subtotal.formatted_with_symbol}</p>
                                </div>
                            </div>                     */}


                        {/* Empty Cart */}
                            <button 
                                disabled={pending}
                                onClick={emptyCart}
                                className="m-auto my-10  w-3/5 border h-16 bg-indigo-600 text-lg text-white rounded-md px-3">
                                    { pending ? <div className=''>
                                                    <div className='loader cursor-none'/>
                                                </div>  
                                                :  <p>Empty Bag</p> } 
                            </button>
                        </div>

                    {/* Order Summary */}
                        <div className='col-span-1 p-7 ' >
                            <div className="bg-gray-50 h-[500px] rounded-md p-3">
                                <h1 className='text-center text-3xl my-5' >Order Summary</h1>
                            
                                <div className='divide divide-y p-2'>
                                <div className='flex  p-3 mt-5 text-xl text-gray-600 '>
                                        <h1 className='flex-1 p-1 '>Subtotal</h1>
                                        {/* <h1 className='p-1'>{carts && carts.subtotal.formatted_with_symbol}</h1> */}
                                </div>
                                <div className='flex  p-5 mt-5 text-xl text-gray-600 '>
                                        <h1 className='flex-1 p-1'>Total Items</h1>
                                        <h1 className='p-1'>{carts && carts.total_items === 1 ? '1 item' : `${carts && carts.total_items} items`  }</h1>
                                </div>
                                <div className='flex p-5 mt-5 text-xl text-gray-600 '>
                                        <h1 className='flex-1 p-1'>Shipping</h1>
                                        <h1 className='p-1'> ₹50 </h1>
                                </div>
                                <div className='flex p-5 mt-5 text-xl text-gray-600 '>
                                        <h1 className='flex-1 p-1'>Subtotal</h1>
                                        <h1 className='p-1'> {  Object.keys(carts).length > 0 && carts.subtotal.formatted } </h1>
                                </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    </div>
        }

            </>
    )
}

export default Cart