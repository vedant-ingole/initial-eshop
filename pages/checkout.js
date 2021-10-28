import React, { useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import getCommerce from '../lib/commerce'
import AddressForm from '../components/Checkout/AddressForm'
import { useSelector, useDispatch } from 'react-redux'
import Payment from '../components/Checkout/Payment'
import {getCart} from '../redux/cartRedux'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Head from 'next/head'

const checkout = () => {

    const commerce = getCommerce()
    
    const dispatch = useDispatch()
    const router = useRouter()

    const {carts} = useSelector(state => state.cart)

    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({})
    const [order, setOrder] = useState({})
    const [errorMessage, setErrorMessage] = useState('')
    console.log(carts)

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(carts.id, { type:'cart' } );
                console.log(token);
                setCheckoutToken(token);
            } catch (error) {
                // if( checkoutToken ){
                //     toast.error("Please add some product to your cart before checkout", {theme:"coloured"})
                // } else{
                //     toast.error("Pleae do not refresh while checking out", {theme:"coloured"})
                // }
                router.push('/cart')
            }
        }

        generateToken();
    },[carts])

    const next = (data) => {
        setShippingData(data)

    }


// finalizing order
    //resetting Cart, newCart
    const refreshCart= async () => {
        const cart = await commerce.cart.refresh()
        dispatch(getCart(cart))
    }


    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder =  await commerce.checkout.capture(checkoutTokenId, newOrder);
            console.log(incomingOrder)
            setOrder(incomingOrder);
            refreshCart();

        } catch (error) {
            setErrorMessage(error.data.error.message)
            console.log(error);
        }
    }

    const Confirmation = () => {
        <div>Confirm</div>
    }

    return(
        <>
            <Head>
                <title>Checkout Page</title>
            </Head>
            <div>
            {checkoutToken && <AddressForm next={next} checkoutToken={checkoutToken}/> } 
            { Object.keys(shippingData).length === 0 ? "" : <Payment checkoutToken={checkoutToken} shippingData={shippingData} onCaptureCheckout={handleCaptureCheckout} />}
            <h1>{errorMessage}</h1>
            </div>
        </>
    )
   
}

export default checkout
