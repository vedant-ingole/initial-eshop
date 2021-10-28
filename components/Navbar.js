import React, { useEffect, useState } from 'react'
import { HiMenuAlt1 } from 'react-icons/hi'
import { FaOpencart } from 'react-icons/fa'
import { IoMdCart } from 'react-icons/io'
import Link from 'next/link'
import NextLink from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import getCommerce from '../lib/commerce'
import { getCart } from '../redux/cartRedux'
import { toggleModal } from '../redux/modalStore'
 

const Navbar = ({commercePublicKey}) => {

    const commerce = getCommerce(commercePublicKey)
    const [colorChange, setColorChange] = useState(false)

    const {carts} = useSelector(state => state.cart)

    useEffect(() => {
        window.addEventListener('scroll',() => {

            if(window.scrollY >= 80){
                setColorChange(true)
            }
            else{
                setColorChange(false)
            }
        } )
    })


    const dispatch = useDispatch()

    useEffect(() => {
      const fetchCart = async () => {
       const cart= await commerce.cart.retrieve()
       dispatch(getCart(cart))
      }
      fetchCart()
    },[])
  
    const handleModal = () => {
        dispatch(toggleModal(true))
    }
    

    return (
        <>
            <div className= {` ${colorChange ?  'bg-white shadow-lg transition-all ease-in-out duration-500' : '' } fixed top-0 w-full h-20 grid grid-cols-3 gap-2 `} >
                <div className='grid-span-1 justify-items-center  flex items-center'>
                    <HiMenuAlt1 className='mx-7' /> 
                </div>
                <div className='grid-span-1 '>
                    {/* <NextLink href="/"> */}
                        <Link href="/">
                            <h1 className='text-center text-3xl tracking-widest font-semibold cursor-pointer'>Sarees <br /> Collection</h1>
                        </Link>
                    {/* </NextLink> */}
                </div>
                <div className='grid-span-1  flex justify-end items-center' >
                <h1 className='text-lg px-5' >Register</h1>

                    <p>{carts && carts.total_unique_items}</p> 
                    <IoMdCart className="mx-5 cursor-pointer" onClick={handleModal}/>
                </div>
            </div>  
        </>
    )
}

export default Navbar
