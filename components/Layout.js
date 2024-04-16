import React, { useEffect, useRef } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import ProductList from './ProductList'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from './Modal'
import { useSelector, useDispatch } from 'react-redux'
import { toggleModal } from '../redux/modalStore'


const toastOptions = {
    position: "bottom-center",
    draggable: true,
    hideProgressBar: true,
    className: "w-full md:max-w-xl",
    toastClassName: "bg-ecru-white rounded-lg text-black px-3 shadow-md bg-green-200",
    pauseOnHover: true,
    // theme: "colored"
    }

const Layout = ({children}) => {

    const { modalState } = useSelector(state => state.modal)
    // console.log(state);

    const dispatch = useDispatch()
    
    const closeModal = () => {
        dispatch(toggleModal(false))
    }
    
// SMOOTH SCROLLLLLLLLLLLLL
    const app = useRef()
    const smoothscroll = useRef()
  
    const data = {
      ease: 0.1,
      current: 0,
      previous: 0,
      rounded: 0
    }
  
    useEffect(() => {
        document.body.style.height = `${smoothscroll.current.getBoundingClientRect().height}px`
        skewScrolling()
    }, [])
  
    const skewScrolling = () => {
      data.current = window.scrollY;
      data.previous += (data.current - data.previous) * data.ease;
      data.rounded = Math.round(data.previous * 100) / 100;      
      smoothscroll.current.style.transform = `translate3d(0, -${data.rounded}px, 0)`;
      requestAnimationFrame(() => skewScrolling());
    }

    return (
        <>
            <div 
            ref={app} 
            className={`${modalState ? 'modalstyle fixed w-screen h-screen top-0 left-0 cursor-pointer z-10 ' : ""}`} onClick={closeModal}
            ></div>
            <div className=''>
                <Navbar />
                <ToastContainer {...toastOptions} />
                {
                    modalState ?  <Modal /> : ''
                }
                {/* <div className='min-h-[70vh]' ref={smoothscroll}> */}
                <div className='h-[70vh]' ref={smoothscroll}>
                {children}
                <Footer />
                </div>
            </div>
            </>
    )
}

export default Layout
