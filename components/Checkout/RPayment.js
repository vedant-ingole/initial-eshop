import React from 'react'
import Review from './Review'
import { toast } from 'react-toastify'
import router from 'next/router'
// import Commerce from '@chec/commerce.js'
import getCommerce from '../../lib/commerce'

function loadScript(src) {

    
    return new Promise(resolve => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
          resolve(true)
        } 
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

const Payment = ({checkoutToken, shippingData, onCaptureCheckout}) => {
    
    const commerce = getCommerce()

    const displayRazorpay = async () => {

    // Adding script tag with src for intergration
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        if(!res) {
            alert('Razorpay SDK failed to load')
            return
          }

    // Magking options object to intialize/open Razorpay window.      
          const options = {
            key: "rzp_test_4c9MGEar3M2k1j",
            amount: 1000,
            currency: 'INR',
            name: "Sarees Collection", 
            description: "Thankyou for buying, have a great day",
            image: "http://localhost:1337/logo.svg",
            prefill: {     
                name: "Vedant",               
                email: "ivedant.11@gmail.com",
                contact: "9999999999"
            },
            modal: {
                onDissmiss(){ router.push("/cart")}
            },
            handler: function (response){
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature);
            
                commerce.checkout.capture(checkoutToken.id, {
                    line_items: checkoutToken.live.line_items,
                    customer: {
                        firstname: shippingData.firstName,
                        lastname: shippingData.lastName,
                        email: shippingData.email
                    },
                    shipping: {
                        name: 'Primary',
                        street: shippingData.address1,
                        town_city: shippingData.city, 
                        county_state: shippingData.shippingSubdivision,
                        country: shippingData.shippingCountry,
                        postal_zip_code: shippingData.zip,
                    },
                    fulfillment: {shipping_method: shippingData.shippingOption},
                    payment: {
                        gateway: 'razorpay',
                        razorpay: {
                            payment_id: response.razorpay_payment_id   // may cause problem
                        }
                    }
                })
                .then((order) => console.log(order))
                .catch((response) => {
                    console.log(response.message)
                    alert(response.message)
                })    
            },// end of handler function

          }
        
     // Initializing payment/ razorpay instance.       
    const paymentObject = new window.Razorpay(options)

     // To check for any errors if payment fails.       
            paymentObject.on('payment.failed', (response) => {
                console.log(response)
                alert(response.error.reason)
            })

     // If every thing is right then open payment modal.       
            paymentObject.open()
    }


    return (
        <div>
            <Review checkoutToken={checkoutToken} />
            <div className='h-96 w-1/2 m-auto'>
                <h1>Payment Method</h1>
                <button onClick={displayRazorpay}>
                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </button>
            </div>
        </div>
    )
}

export default Payment





            //Commerce js specific data
            // const orderData= {
            //     line_items: checkoutToken.live.line_items,
            //     customer: {
            //         firstname: shippingData.firstName,
            //         lastname: shippingData.lastName,
            //         email: shippingData.email
            //     },
            //     shipping: {
            //         name: 'Primary',
            //         street: shippingData.address1,
            //         town_city: shippingData.city, 
            //         county_state: shippingData.shippingSubdivision,
            //         country: shippingData.shippingCountry,
            //         postal_zip_code: shippingData.zip,
            //     },
            //     fulfillment: {shipping_method: shippingData.shippingOption},
            //     payment:{
            //         gateway: 'razorpay',
            //         razorpay: {
            //             // payment_id: response.razorpay_payment_id
            //         }
            //     }
            // }
            // onCaptureCheckout(checkoutToken.id, orderData)