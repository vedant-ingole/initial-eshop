import React from 'react'
import { Elements, CardElement, ElementsConsumer, CardNumberElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from './Review'
import { toast } from 'react-toastify'


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const Payment = ({checkoutToken, shippingData, onCaptureCheckout}) => {

    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault()

        if(!stripe || !elements) return ;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement});

        if(error) {
            console.log(error);
        } else {
            const orderData= {
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
                    // county_state: shippingData.shippingSubdivision,
                    // country: shippingData.shippingCountry,
                    county_state: "IN-MH",
                    country: "IN",
                    postal_zip_code: shippingData.zip,
                },
                fulfillment: {shipping_method: shippingData.shippingOption},
                payment:{
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                }
            }
            onCaptureCheckout(checkoutToken.id, orderData)
            toast.success("Order Confirmed, please check your email",{theme:"coloured"})
    }
    }
    const Confirmation = () => {
        <div>Confirm</div>
    }

    return (
        <div>
            <Review checkoutToken={checkoutToken} />
            <div className='h-96 w-1/2 m-auto'>
                <h1>Payment Method</h1>
                    <Elements stripe={stripePromise}>
                        <ElementsConsumer>
                            {({ elements, stripe}) => (
                                <form onSubmit={(e) => handleSubmit(e, elements, stripe)} >
                                    <CardElement />
                                    <br /> <br />
                                    <div>
                                        <button className='border bg-gray-700 p-4 ml-3'>Back</button>
                                        <button className='border bg-indigo-600 p-4 ml-3' type="submit" disabled={!stripe}>
                                            Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </ElementsConsumer>
                    </Elements>
            </div>
        </div>
    )
}

export default Payment
