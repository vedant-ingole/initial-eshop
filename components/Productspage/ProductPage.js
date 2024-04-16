import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import getCommerce from '../../lib/commerce';
import Router from 'next/router';
import { updateStart, getCart } from '../../redux/cartRedux';
import { ImSpinner2 } from 'react-icons/im'
import { toast } from 'react-toastify';
import { toggleModal } from '../../redux/modalStore';
import { RadioGroup } from '@headlessui/react';
import Image from 'next/image'
import {motion, AnimatePresence} from 'framer-motion'
import ImageSlider from './ImageSlider';


const colors=[1,2,3,4]
const sizes=[0,2,3,4,5,6]

// Animation (framer)
const transition = {duration: 1, ease: [0.43, 0.13, 0.23, 0.96]}
const imageVariants = {
    exit: { y: "50%", opacity: 0, transition },
    enter: {
      y: "0%",
      opacity: 1,
      transition
    }
  }


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const ProductPage = ({ product, commercePublicKey }) => {

    // css
        const [selectedColor, setSelectedColor] = useState(colors[0])
        const [selectedSize, setSelectedSize] = useState(sizes[2])
    // css

    
    const [quantity, setQuantity] = useState(product.inventory.available === 0 ? 0 : 1)
    // console.log(quantity)

    const dispatch = useDispatch()

    const { carts, pending } = useSelector(state => state.cart)
    // console.log(pending);

    const commerce = getCommerce(commercePublicKey)
    
    const addToCart = async () => {
        // const lineItem = carts.line_items.find(x => x.product_id === product.id)

        // if(lineItem) {
        //     const commerceCart = await commerce.cart.update(lineItem.id, {
        //         quantity : quantity
        //     })
        // }
        dispatch(updateStart())
        const {cart} = await commerce.cart.add(product.id, quantity)
        dispatch(getCart(cart))
        dispatch(toggleModal(true))
        toast.success("Added to cart", {theme:"coloured"})
    }

    //Img zoom
    const [selectedId, setSelectedId] = useState(null)

    return (
        <div>
            <motion.div 
                initial="exit" animate="enter" exit="exit"
                className="flex min-h-[80vh] mt-40 mx-10">
               
            {/* Image section */}
                    {/* <motion.img 
                        variants={imageVariants}
                        src={product.image.url} 
                        layoutId={product.id}
                        onClick={() => setSelectedId(product.id)}
                        className="h-[500px] w-[600px] object-cover object-center rounded-md ml-10 cursor-pointer "
                        />

                        <AnimatePresence>
                            {
                                selectedId && 
                                    <>
                                    <motion.div 
                                        transition={transition}
                                        initial={{opacity:0}}
                                        animate={{opacity:0.8}}
                                        exit={{opacity:0}}
                                        onClick={() => setSelectedId(null)}
                                        className='fixed top-0 left-0 h-full w-full z-40 bg-black opacity-50 hover:cursor-pointer'>
                                        </motion.div>
                                    <motion.img 
                                        src={product.image.url} 
                                        layoutId={product.id}
                                        initial={{opacity:0}}
                                        animate={{opacity:1}}
                                        transition={transition}
                                        exit={{opacity:0, scale:0.6, top:"10%", left:"10%"}}
                                        // onClick={() => setSelectedId(null)}
                                        className="fixed z-40 h-[600px] w-[700px] object-cover object-center rounded-md ml-10  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
                                        />
                                    
                                    </>
                            }
                        </AnimatePresence> */}
                        <div className="h-full w-[60%] mb-28  ">
                            <ImageSlider product={product} />
                        </div>


            {/* Product Info */}

                <div className=" w-full px-10 py-3">
                    <div className="flex items-center" >
                        <h1 className='flex-1 text-3xl font-semibold'>{product.name}</h1>
                    {/* <p className="font-bold text-2xl">{product.categories.slug}</p> */}
                    </div>
                    <div className='my-5'>
                        <p className='text-2xl font-medium'>{product.price.formatted_with_symbol}</p>
                    </div>
                   <div className=' mb-2 font-semibold'>
                    {
                        product.inventory.available === 0 
                            ? <h1 className='text-lg text-red-600'> Out of Stock </h1>
                            : <h1 className="text-lg text-green-600">In Stock</h1>
                    } 
                   </div>


            {/* Color */}
            


                {/* Size  */}




                {/* Quantity Selector */}
                {/* {
                    product.inventory.available === 0 ? "" :
                        <div className='flex justify-center my-10'>
                        <button 
                                
                                className={` ${quantity === 10 ? "pointer-events-none border-gray-300 bg-gray-50" : ""} w-20 border border-blue-200 rounded-md p-3 hover:bg-gray-100 hover:border-blue-500 hover:font-bold`} 
                                onClick={() => setQuantity(quantity < product.inventory.available ? quantity + 1 : product.inventory.available)} > +
                            </button>
                        <div  
                                className='mx-5 w-20 p-3 text-center border border-blue-200 rounded-md '
                                >
                                    {quantity}
                            </div>
                            <button 
                                className=' w-20 border border-blue-200 rounded-md p-3 hover:bg-gray-100 hover:border-blue-500 hover:font-bold'
                                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} > -
                            </button>
                        </div>
                } */}

                {/* Add To Bag */}
                   <button   data-scroll data-scroll-speed={1}
                        disabled={pending || product.inventory.available === 0 }
                        onClick={addToCart}
                        className={` ${pending || product.inventory.available === 0 ? 'pointer-events-none' : ''}   w-full addtocartbutton border h-16 bg-indigo-600 text-white rounded-md p-5`}>
                           
                            { pending  ? <div className=''>
                                            <div className='loader cursor-pointer'/>
                                        </div>  
                                      :  <p>Add to Bag</p> } 
                    </button>

                    {/* Description */}
                        <div className='my-10 '> 
                            {/* <h1 className='text-lg text-gray-900 font-medium ' >Description</h1> */}
                            <div className='text-gray-500' dangerouslySetInnerHTML={{ __html: product.description }} />
                        </div>

                </div>
            </motion.div>
        </div>

    )
}

export default ProductPage
