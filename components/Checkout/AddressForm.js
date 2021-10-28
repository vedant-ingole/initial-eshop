import React, { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import getCommerce from '../../lib/commerce'
import Link from 'next/link'

const AddressForm = ({checkoutToken, next }) => {
    const { register, handleSubmit } = useForm()
    const commerce = getCommerce()

    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')
// console.log(shippingOptions);

    const countries =   Object.entries(shippingCountries).map(([code, name]) => ({ id:code, label:name }))
    const subdivisions =   Object.entries(shippingSubdivisions).map(([code, name]) => ({ id:code, label:name }))
    const options = shippingOptions.map((sO) => ({ id:sO.id, label: `${sO.description} - (${ sO && sO.price.formatted_with_symbol})` }) )


    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchSubdivisions = async (checkoutTokenId, countryCode) => {
        const {subdivisions} = await commerce.services.localeListShippingSubdivisions(checkoutTokenId, countryCode)
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])
        // console.log(subdivisions)
    } 
    
    const fetchShippingOptions = async(checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region})
        setShippingOptions(options)
        setShippingOption(options[0].id)
    }



    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    },[])
    
    useEffect(() => {
       if(shippingCountry) fetchSubdivisions(checkoutToken.id, shippingCountry)
    },[shippingCountry])

    useEffect(() => {
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
    },[shippingSubdivision])


    return (
        <div className='flex justify-center items-center min-h-screen min-h-screen bg-red-100'>
            <div className='w-1/2 h-[30rem] bg-white rounded'> 
                <h1 className='text-center text-2xl font-semibold'> Shipping Address</h1>
                    <form onSubmit={handleSubmit((data) => next({ ...data,  shippingCountry, shippingSubdivision, shippingOption}))}>
                <div className="grid grid-cols-2 grid-rows-3  w-full  gap-6 mt-7 p-3">
                        <input type="text" placeholder='fname' {...register('firstName', {required: true})} className='forminputs' />
                        <input type="text" placeholder='lname' {...register('lastName', {required: true})} className='forminputs' />
                        <input type="text" placeholder='address' {...register('address1', {required: true})} className='forminputs' />
                        <input type="text" placeholder='email' {...register('email', {required: true})} className='forminputs' />
                        <input type="text" placeholder='city' {...register('city', {required: true})} className='forminputs' />
                        <input type="text" placeholder='zip' {...register('zip', {required: true})} className='forminputs' />

                        <select value={shippingCountry} onChange={(e) => setShippingCountry(e.target.value)}> 
                            {
                                countries.map((country) => (
                                 <option value={country.id} key={country.id}>
                                     {country.label}
                                 </option> 
                                ))
                            }
                        </select>
                        <select value={shippingSubdivision} onChange={(e) => setShippingSubdivision(e.target.value)} > 
                            {
                                subdivisions.map((subdivision) => (
                                 <option value={subdivision.id} key={subdivision.id}>
                                     {subdivision.label}
                                 </option> 
                                ))
                            }
                        </select>
                        <select value={shippingOption} onChange={(e) => setShippingOption(e.target.value)} > 
                            {
                                options.map((option) => (
                                 <option value={option.id} key={option.id}>
                                     {option.label}
                                 </option> 
                                ))
                            }
                        </select>
                        <br />
                        <Link href="/cart">
                            <button className=' col-span-1 mt-7 bg-gray-700 text-center text-white p-3 w-1/2 rounded border-2'> Back </button>
                        </Link>
                        <button className='justify-self-end col-span-1 mt-7 text-center text-white p-3 w-1/2 rounded  bg-indigo-600' type="submit"> Next </button>
                </div>
                    </form>
            </div>
        </div>
    )
}

export default AddressForm
