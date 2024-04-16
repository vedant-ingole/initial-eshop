import React, { useEffect, useState } from 'react'
import { HiMenuAlt1 } from 'react-icons/hi'
import { FaOpencart } from 'react-icons/fa'
import { IoMdCart } from 'react-icons/io'
import {BsBag, BsHandbag} from 'react-icons/bs'
import Link from 'next/link'
import NextLink from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import getCommerce from '../lib/commerce'
import { getCart } from '../redux/cartRedux'
import { toggleModal } from '../redux/modalStore'
import Router from 'next/router'
import { selectUser, login, logout } from '../redux/userStore' 
import { auth, facebookProvider, googleProvider } from '../firebase'
import Example from './Hamburger/Menu/Examples'

// import {motion, AnimatePresence} from 'framer-motion'
 

const Navbar = ({commercePublicKey}) => {

    
    // const [route, setRoute] = useState('')
    // useEffect(() => {
    //     setRoute(Router.route)
    // },[Router])
    // console.log(route)

    const user = useSelector(selectUser)

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
    
    // Authenticatio
    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
          if(authUser){
            dispatch(login({
              id:authUser.uid,
              name: authUser.displayName ? authUser.displayName : authUser.email,
              verified: String(authUser.emailVerified),
              pic: authUser.photoURL
                  ? authUser.photoURL
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTYL2WjLzEQQQV8aWcjuLe6E_cctg37q-6fw&usqp=CAU",
              lastSignedIn: authUser.metadata.lastSignInTime
            }))
          }
          else{
            dispatch(logout())
          }
        })
      }, [])

    // ${route === '/' ? "text-white" : 'text-black'}

    return (
        <>
            <div className= {` ${colorChange ?  'bg-white shadow-lg transition-all ease-in-out duration-500' : 'text-black'}  fixed top-0 w-full h-20 grid grid-cols-3 gap-2 z-20 `} >
                <div className='grid-span-1 justify-items-center  flex items-center'>
                    {/* <HiMenuAlt1 className='mx-7' />  */}
                    {/* <Example /> */}
                </div>
                <div className='grid-span-1 '>
                        <Link href="/">
                            <h1 exit={{y:-100}} className='text-center text-3xl tracking-widest font-thin cursor-pointer uppercase'>Sarees <br /> Collection</h1>
                        </Link>
                </div>
                <div className='grid-span-1  flex justify-end items-center' >
                <h1 className='text-xl font-medium   px-5' >
               
                {
                    user ? <Link href="/account">Acccount</Link>
                         : <Link href="/login">Login</Link>
                }
                
                </h1>

                    <div className='relative mx-6'>
                        <p className='absolute right-[0.6em] top-[4px] text-lg font-semibold'>{carts && carts.total_unique_items}</p> 
                        <BsBag className=" text-3xl cursor-pointer" onClick={handleModal}/>
                    </div>

                </div>
            </div>  
        </>
    )
}

export default Navbar
