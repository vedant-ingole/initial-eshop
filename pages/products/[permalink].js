import React, { useEffect } from 'react'
import { ProductPage, RelatedProducts } from '../../components/exports'
// import RelatedProducts from '../../components/Productspage/RelatedProducts';
import getCommerce from '../../lib/commerce'
import Head from 'next/head'
import { useDispatch } from 'react-redux';
import { setInventory } from '../../redux/cartRedux'
import ProductSlider from '../../components/Productspage/ProductSlider';

import { useRouter } from 'next/router'
import { getCookie, setCookie, splitter } from '../../utils/utils'


// cookie management 
const cookieManager = (permalink) => {

  let cookie = ''
  
  if(document.cookie.indexOf('productlist') !== 40){
    let productId = ''
    setCookie('productlist', productId, 30)
  } else {
    cookie = getCookie('productlist')
    console.log(cookie)
  }

  let cookieArr = []
  cookieArr = splitter(cookie, ',')
  // console.log(cookieArr)
  
  if(cookieArr[0] === ''){
    cookieArr.shift()
    console.log('empty string')
  }

  if(permalink) {
    cookieArr.push(permalink)
  }
  function removeDuplicates(arr){
    return arr.filter((value, index) => arr.indexOf(value) === index)
  }

  // remove duplicates
  const updatedCookieArr = removeDuplicates(cookieArr)

  let cookieString = updatedCookieArr.toString()
  console.log(cookieString)

  setCookie('productlist', cookieString, 10)
}



export async function getServerSideProps({ params }) {
    const { permalink } = params;
    const commerce = getCommerce();
    const product = await commerce.products.retrieve(permalink, {
      type: 'permalink',
    });
    return {
      props: {
        product,
      },
    };
  }



const ProductPages = ({ product }) => {

  const { related_products : relatedProducts } = product
  // console.log(product.assets)

  const router = useRouter()
  let { permalink }= router.query

  useEffect(() => {
    // console.log(document.cookie.indexOf('productlist'))
    cookieManager(permalink)
  }, [permalink])
  // console.log(permalink)
  
    return (
      <>
        <Head>
          <title>{product.name}</title>
        </Head>
        <div className='flex flex-col m-auto' >
            <ProductPage product={product} />
            <RelatedProducts className='h-screen' products ={relatedProducts} />
            {/* <ProductSlider /> */}
        </div>
      </>
    )
}

export default ProductPages



// export async function getStaticProps({ params }) {

//     const { permalink } = params
    
//     const commerce = getCommerce()

//     const product = await commerce.products.retrieve(permalink, {
//         type: "permalink"
//     }) 

//     return {
//         props:{
//             product
//         }
//     }
// }


// export async function getStaticPaths() {

//     const commerce = getCommerce()
//     const { data: products } = await commerce.products.list()

//     return {
//         paths: products.map(product => ({
//                 params:{
//                     permalink : product.permalink
//                 }
//             })),
//             fallback: false
//     }
// }