import React from 'react'
import Link from 'next/link'

const Product = ({product}) => {
    return (
        <div>
        <div className='w-full h-96 overflow-hidden rounded-md'>
            <Link href={`/products/${product.permalink}`}>
                <img src={product.media.source} alt="" className='w-full h-full object-center object-cover  cursor-pointer' />
            </Link>
        </div>
        <p className='text-xl py-3'>{product.name}</p>
        <p className='font-bold'>{product.price.formatted_with_symbol}</p>
       </div>
    )
}

export default Product



// import Image from "next/image";
// import Link from "next/link";
// // import cc from "classcat";

// function Product({ media, name, permalink, price, className }) {
// //   const imageClass = cc([
// //     "relative rounded-lg hover:rounded-none overflow-hidden w-full transition-all",
// //     className,
// //   ]);

//   return (
//     <Link href={`/products/${permalink}`}>
//       <a className="group relative">
//         {media?.source && (
//           <div >
//             <Image
//               src={media.source}
//               alt={Product.name}
//               layout="fill"
//               sizes="616px, (min-width: 768px): 352px, (min-width: 1024px): 232px, (min-width: 1280px): 288px"
//               className="object-cover"
//               priority={true}
//             />
//           </div>
//         )}
//         <div className="flex justify-between py-2 md:py-3 space-x-1">
//           <span className="text-sm md:text-base lg:text-lg">{name}</span>
//           <span className="text-sm md:text-base lg:text-lg">
//             {price.formatted_with_symbol}
//           </span>
//         </div>
//       </a>
//     </Link>
//   );
// }

// export default Product;

