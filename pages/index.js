import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Navbar, Header, Showcase, Categories, ProductList, Footer } from '../components/exports'
import getCommerce from '../lib/commerce'

import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../redux/cartRedux';

import Latest from '../components/Latest/Latest'
import ParallaxText from '../components/ParallaxText'
import {motion} from 'framer-motion'

// import useSWR from 'swr'


export async function getStaticProps() {

    const commerce = getCommerce()
  
    const { data: categories } = await commerce.categories.list()
    console.log(categories);
    const { data: products } = await commerce.products.list({limit: 8})
    
    return {
      props: {
        categories,
        products,
    },
    // revalidate: 60,
  }
}



export default function Home({products, categories}) {
  
  // const commerce = getCommerce(commercePublicKey)

  // console.log(stripePublicKey);
  

  // const addToCart = async (productId, quantity) => {
  //     const {cart} = await commerce.cart.add(productId, quantity)
  //     setCart(cart)
  // }

  return (  
    <>
      <Header  />
      <Showcase />
      <Categories categories={categories}/>
      <Latest categories={categories} products={products} />
      <ProductList products={products} />
    </>    
    )
  }
  
  {/* <ParallaxText /> */}
  // className="layout" data-scroll data-scroll-section data-scroll-class="f-layout"
  
  
  
  
  // const merchant = await commerce.merchants.about()
  {/* <pre>{JSON.stringify(merchant, null, 2)}</pre> */}
  {/* <pre>{JSON.stringify(categories, null, 2)}</pre> */}
  {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
  {/* <pre>{JSON.stringify(cart, null, 2)}</pre>  */}