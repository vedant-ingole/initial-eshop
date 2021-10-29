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
import {motion} from 'framer-motion'

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


    return (
        <div>
            <motion.div 
                initial="exit" animate="enter" exit="exit"
                className="grid grid-cols-2 min-h-[150vh] mt-40 ">
               
            {/* Image section */}
                {/* <div className=" col-span-1 p-2 h-[50vh] w-[70vh]  mx-auto overflow-hidden"> */}
                    <motion.img 
                        variants={imageVariants}
                        src={product.image.url} 
                        className="h-[500px] w-[600px] object-cover object-center rounded-md ml-10 "
                        />
                {/* </div> */}
                    {/* <div className="bg-green-300 h-20 w-20 mt-8 "/> */}

            {/* Product Info */}

                <div className=" col-span-1 p-10">
                    <div className="flex min-h-[5rem]" >
                        <h1 className='flex-1 text-3xl font-medium'>{product.name}</h1>
                        <p className='text-2xl font-bold'>{product.price.formatted_with_symbol}</p>
                    </div>
                   <div className=' mb-2 font-semibold'>
                    {
                        product.inventory.available === 0 
                            ? <h1 className='text-lg text-red-600'> Out of Stock </h1>
                            : <h1 className="text-lg text-green-600">In Stock</h1>
                    } 
                   </div>


            {/* Color */}
                <div className=" min-h-[7rem]">
                     <h3 className="text-lg text-gray-900 font-medium ">Color</h3>

                    <RadioGroup 
                        value={selectedColor} onChange={setSelectedColor} 
                        className="py-6 mx-1">
                    <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                        <div className="flex items-center space-x-3">
                            {colors.map((color, index) => (
                                <RadioGroup.Option
                                    key={index}
                                    value={color}
                                    className={({ active, checked }) =>
                                    classNames(
                                        color.selectedClass,
                                        active && checked ? 'ring ring-offset-1' : '',
                                        !active && checked ? 'ring-2' : '',
                                        '-m-0.5 p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                    )
                                    }
                                >
                                    <RadioGroup.Label as="p" className="sr-only">
                                    {color}
                                    </RadioGroup.Label>
                                    <span
                                    aria-hidden="true"
                                    className={classNames(
                                        color,
                                        'h-8 w-8 border border-black border-opacity-10 rounded-full'
                                    )}
                                    />
                                </RadioGroup.Option>
                            ))}
                        </div>
                    </RadioGroup>
                 </div>


                {/* Size  */}
                <div className="my-7 ">
                    <div className="flex items-center justify-between ">
                    <h3 className="text-lg text-gray-900 font-medium ">Size</h3>
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Size guide
                    </a>
                    </div>

                    <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4 ">
                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-5 sm:grid-cols-8 lg:grid-cols-4">
                        {sizes.map((size, index) => (
                        <RadioGroup.Option
                            key={index}
                            value={size}
                            // disabled={!size.inStock}
                            className={({ active }) =>
                            classNames(
                                // size.inStock
                                size
                                ? 'bg-white shadow-sm text-gray-900 cursor-pointer '
                                : 'bg-gray-50 text-gray-200 cursor-not-allowed ',
                                active ? 'ring-2 ring-indigo-500' : '',
                                'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                            )
                            }
                        >
                            {({ active, checked }) => (
                            <>
                                {/* <RadioGroup.Label as="p">{size.name}</RadioGroup.Label> */}
                                <RadioGroup.Label as="p">{size}</RadioGroup.Label>
                                {/* {size.inStock ? ( */}
                                {size ? (
                                <div
                                    className={classNames(
                                    active ? 'border' : 'border-2',
                                    checked ? 'border-indigo-500' : 'border-transparent',
                                    'absolute -inset-px rounded-md pointer-events-none'
                                    )}
                                    aria-hidden="true"
                                />
                                ) : (
                                <div
                                    aria-hidden="true"
                                    className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                                >
                                    {/* <svg
                                    className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                    >
                                    <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                    </svg> */}
                                </div>
                                )}
                            </>
                            )}
                        </RadioGroup.Option>
                        ))}
                    </div>
                    </RadioGroup>
              </div>




                {/* Quantity Selector */}
                {
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
                }

                {/* Add To Bag */}
                   <button 
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
                            <h1 className='text-lg text-gray-900 font-medium ' >Description</h1>
                            <div className='text-gray-500' dangerouslySetInnerHTML={{ __html: product.description }} />
                        </div>

                </div>
            </motion.div>
        </div>

    )
}

export default ProductPage
