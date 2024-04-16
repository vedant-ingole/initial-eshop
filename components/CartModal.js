import React from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import getCommerce from '../lib/commerce'
import { getCart } from '../redux/cartRedux' 
import {selectUser} from '../redux/userStore'
import {AnimatePresence, motion} from 'framer-motion'
import { useEffect } from 'react'


// Animation (framer)
const menuTransition = {
  type: "spring",
  duration: 1,
  stiffness: 33,
  delay: 0.1,
};
const menuVariants = {
  open: {
    transform: "translateX(0%)",
  },
  closed: {
    transform: "translateX(103%)",
  },
};



const CartModal = ({closeModal, commercePublicKey}) => {

    const commerce = getCommerce()
    const dispatch = useDispatch()

    const {modalState} = useSelector(state => state.modal)
    console.log(modalState);

    const {carts} = useSelector(state => state.cart)
    const user = useSelector(selectUser)

    const removeProductFromCart = async (id) => {
        const {cart} = await commerce.cart.remove(id)
        dispatch(getCart(cart))
    } 
    // console.log(user);

    return (
      <AnimatePresence>
        <motion.div 
          className={`${modalState ? 'translate-x-0' : 'translate-x[100%]'} transition-transform h-full w-5/6 sm:w-1/2 md:w-1/3 bg-gray-100 p-5 fixed top-0 right-0 z-50 overflow-auto`}
          style={{}}
          >

            {/* Heading */}
            <div className='flex items-center'>
                <h1 className='flex-1 text-3xl font-sana'>Your Bag</h1>
                <p className='cursor-pointer' onClick={closeModal}>X</p>
            </div>

            {/* Cart Items */}
            <div className='mt-14 min-h-[60vh] '>
                <ul role="list" className='-my-6 divide-y divide-gray-200'>
                    {  Object.keys(carts).length > 0 &&
                        carts.line_items.map((product) => (
                          <li key={product.id} className='py-6 flex'>
                        {/* Product Image */}
                               <div className="w-24 h-24 border border-gray-500 rounded-md overflow-hidden ">
                                <img
                                  src={product.media.source}
                                  alt={product.media.source}
                                  className="w-full h-full object-center object-cover"
                                />
                              </div>
                        {/* Product Info */}
                              <div className="ml-4 flex-1 flex flex-col mr-2">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href={`/products/${product.permalink}`}>{product.name}</a>
                                    </h3>
                                    {/* <p className="ml-4">{product.price.formatted_with_symbol}</p> */}
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">green</p>
                                </div>
                                <div className="flex-1 flex items-end justify-between text-sm">
                                  <p className="text-gray-500">Qty {product.quantity}</p>

                                  <div className="flex">
                                    <button 
                                        onClick={() => removeProductFromCart(product.id)} 
                                        type="button" 
                                        className="font-medium text-indigo-600 hover:text-indigo-500">
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                        ))
                      }
                </ul>
            </div>

            {/* Details & Checkout */}

            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{ Object.keys(carts).length > 0 && carts.subtotal.formatted}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                   
                   
                    <div className="mt-6">
                      {
                        user ? 
                              <Link href="/checkout">
                                <a className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                  Checkout
                                </a>
                              </Link>
                            : 
                              <Link href="/login">
                                <a className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                  Checkout
                                </a>
                              </Link>
                      }
                    </div>


                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                      <p>
                        or{' '}

                        <Link href="/cart">
                        <button
                          type="button"
                          className="text-indigo-600 font-medium hover:text-indigo-500"
                          >
                          Go to Bag<span aria-hidden="true"> &rarr;</span>
                        </button>
                            </Link>
                      </p>
                    </div>
                  </div>
            <div>

            </div>
        </motion.div>
      </AnimatePresence>
    )
}

export default CartModal