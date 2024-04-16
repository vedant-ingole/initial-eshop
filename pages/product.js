import React, { useEffect, useState } from 'react'
import Product from '../components/Productspage/Product';
import getCommerce from '../lib/commerce'
import { getCookie, splitter } from '../utils/utils'

const product = () => {

    const commerce = getCommerce();

    // commerce.products.retrieve('').then((product) => console.log(product.name));
    const [cookie, setCookie] = useState()
    const [carr, setCarr] = useState()
    const [products, setProducts] = useState()  // All products
    const [userProd, setUserProd] = useState()  // Cookies set products

    const getProduct = async () => {
        const data = await commerce.products.list()
        setProducts(data.data)
    }

    const productFetcher = () => {
        const parr =   products && carr.map((permalink) => products.find((product) => product.permalink === permalink ))
        setUserProd(parr)
    }

    useEffect(() => {

        const cookie = getCookie('productlist')
        console.log(cookie);
        setCookie(cookie)
        if (document.cookie.indexOf('productlist') === 40) {
            const arr = splitter(cookie, ",")
            // console.log(arr);
            setCarr(arr)
        }

        // carr && carr.map((e) => {
        //     const product =  commerce.products.retrieve(e, {
        //         type: 'permalink',
        //         }).then((product) => console.log(product.name))
        // })

        getProduct()
    }, [])

    useEffect(() => {
        productFetcher()
    }, [products])

    console.log(userProd)




    // products && products.filter(product => 
    //     product.permalink.find((permalink) => permalink === "vjWrjT" )
    // )



    // products && products.filter((p) => (
    //     // console.log(product.permalink === )
    //     console.log(p.permalink === "vjWrjT")

    // ))


    return (
        <>
            <div className='h-[70vh] mt-80'>
                {
                    userProd && userProd.map((product) => (
                        <div key={product.id}>
                            <h1>{product.name}</h1>
                            <img src={product.media.source} alt="" />
                            {/* <h1>{product.price.formatted_with_symbol}</h1> */}
                        </div>
                        // console.log(product)
                    ))
                }
            </div>
        </>
    )
}

export default product
