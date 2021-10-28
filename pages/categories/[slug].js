import React from 'react'
import CategoryPage from '../../components/CategoryPage'
import getCommerce from '../../lib/commerce'
import Head from 'next/head'




export async function getServerSideProps({ params }) {
    const { slug } = params;
    const commerce = getCommerce();

    const category = await commerce.categories.retrieve(slug, {
                type: "slug"
            })

    const { data: products } = await commerce.products.list({
                category_slug: slug
            })

    return {
        props: {
            products,
            category
        },
    };
}



const CategoryPages = ({category, products}) => {
    return (
        <>
            <Head>
                <title>{category.name}</title>
            </Head>
            <div>
            <CategoryPage category={category} products={products}  />
            </div>
        </>
    )
}

export default CategoryPages









// export async function getStaticProps({ params }) {
//     // console.log(params)
//     const { slug } = params

//     const commerce = getCommerce()

//     const category = await commerce.categories.retrieve(slug, {
//         type: "slug"
//     })
//     // console.log(category)

//     const { data: products } = await commerce.products.list({
//         category_slug: slug
//     })

//     return {
//         props:{
//             category,
//             products
//         }
//     }
// }

// export async function getStaticPaths() {
    
//     const commerce = getCommerce()
//     const { data: categories } = await  commerce.categories.list()

//     return {
//         paths: categories.map((category) => ({
//             params: {
//                 slug: category.slug
//             },
//         })),
//         fallback: false
//     }
// }
