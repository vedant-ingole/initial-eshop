import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toggleModal } from '../redux/modalStore'
import Link from 'next/link'
import { useRouter } from "next/router";
import CartModal from './CartModal';

const Modal = () => {

    const router = useRouter()
    const dispatch = useDispatch()

    console.log(router)

    const handleModalClose = () => {
        dispatch(toggleModal(false))
    }

    useEffect(() => {
        router.events.on("routeChangeStart", handleModalClose)
    
        return () => {
          router.events.off("routeChangeStart", handleModalClose)
        }
      }, [])

    return (
        <div>
            <CartModal closeModal={handleModalClose} />
        </div>
    )
}

export default Modal
