import React, { useEffect } from 'react'
import { ProductPage, RelatedProducts } from '../../components/exports'
// import RelatedProducts from '../../components/Productspage/RelatedProducts';
import getCommerce from '../../lib/commerce'
import Head from 'next/head'
import { useDispatch } from 'react-redux';
import { setInventory } from '../../redux/cartRedux'

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
  
  
    return (
      <>
        <Head>
          <title>{product.name}</title>
        </Head>
        <div className='flex flex-col m-auto'>
            <ProductPage product={product} />
            <RelatedProducts className='h-screen' products ={relatedProducts} />
        </div>
      </>
    )
}

export default ProductPages
