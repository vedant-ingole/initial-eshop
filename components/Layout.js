import React from 'react'
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

    return (
        <>
            <div className={`${modalState ? 'modalstyle fixed w-screen h-screen top-0 left-0 cursor-pointer z-10 ' : ""}`} onClick={closeModal}></div>
            <div className=''>
                <Navbar />
                <ToastContainer {...toastOptions} />
                {
                    modalState ?  <Modal /> : ''
                }
                {children}
                <Footer />
            </div>
            </>
    )
}

export default Layout
