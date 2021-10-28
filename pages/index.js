import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Navbar, Header, Showcase, Categories, ProductList, Footer } from '../components/exports'
import getCommerce from '../lib/commerce'

import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../redux/cartRedux';


export async function getStaticProps({commercePublicKey}) {

    const commerce = getCommerce(commercePublicKey)
  
    const { data: categories } = await commerce.categories.list()
    const { data: products } = await commerce.products.list({limit: 6})
    
    return {
      props: {
        categories,
        products,
    },
    // revalidate: 60,
  }
}



export default function Home({ merchant, categories, products, commercePublicKey, stripePublicKey }) {
  
  const commerce = getCommerce(commercePublicKey)

  console.log(stripePublicKey);
  

  // const addToCart = async (productId, quantity) => {
  //     const {cart} = await commerce.cart.add(productId, quantity)
  //     setCart(cart)
  // }

  return (
    <>
      <Header  />
      <Showcase />
      <Categories categories={categories} />
      <ProductList products={products} />
    </>
    )
  }
  
  
  
  
  // const merchant = await commerce.merchants.about()
  {/* <pre>{JSON.stringify(merchant, null, 2)}</pre> */}
  {/* <pre>{JSON.stringify(categories, null, 2)}</pre> */}
  {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
  {/* <pre>{JSON.stringify(cart, null, 2)}</pre>  */}