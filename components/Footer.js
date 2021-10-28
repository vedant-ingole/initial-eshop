import React from 'react'

const Footer = () => {
    return (
        <div className='grid grid-cols-2 grid-rows-4 bg-gray-200' style={{minHeight:'40vh'}}>
            <div className="footer col-span-1 row-span-3 ">
                <h1 className='text-2xl ml-10 p-5' >SHOP</h1>
                <ul className='p-5 ml-10 text-xl'>
                <li>Sarees</li>
                <li>Kurtis</li>
                <li>Dresses</li>
                <li>Accessories</li>
               </ul>
            </div>
            <div className="footer col-span-1 row-span-3">
                <h1>SERVICES</h1>
               <ul className=''>
                <li>Phone</li>
                <li>Instagram</li>
                <li>Email</li>
              </ul>
            </div>

            <div className='row-span-1 col-span-2 text-center pt-6 '>
                Copyright 2021
            </div>
        </div>
    )
}

export default Footer
