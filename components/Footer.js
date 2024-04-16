import React from 'react'
import Link from 'next/link'
import {FaInstagram, FaFacebookF, FaCopyright} from 'react-icons/fa'
import {HiMail} from 'react-icons/hi'
import {BiCopyright} from 'react-icons/bi'


const Footer = () => {
    return (
        <div className='min-h-[35vh] bg-[#383a3d] z-20 '>
        <div className='grid grid-cols-3 grid-rows-4 w-[80%] mx-auto pt-7'>
            
        {/* Shop */}
            <div className="footer col-span-1 row-span-3 text-[#e4e4e4] ">
                <h1 className='text-2xl ml-10 p-5 font-serif' >SHOP</h1>
                <ul className='p-5 ml-10 text-lg font-sans tracking-wider font-thin'>
                <li className='pt-[2px]'>Sarees</li>
                <li className='pt-[2px]'>Kurtis</li>
                <li className='pt-[2px]'>Dresses</li>
                <li className='pt-[2px]'>Accessories</li>
               </ul>
            </div>


        {/* Connect */}
            <div className="footer col-span-1 row-span-3 text-[#e4e4e4]">
                <h1 className='text-2xl ml-10 p-5 font-serif '>CONNECT</h1>
               <ul className='p-5 ml-10 text-lg  tracking-wider font-thin'>
                <li className='pt-[2px]'>@shubhangisarees</li>

                <div className=" w-[30%] flex mt-7 justify-between ">
                <Link href="/" >
                   <a> <HiMail className='cursor-pointer pt-[2px] text-xl hover:text-2xl' /></a>
                </Link>
                <Link href="/">
                   <a> <FaInstagram className='cursor-pointer pt-[2px] text-xl hover:text-2xl'/></a>
                </Link>
                <Link href="/" >
                   <a><FaFacebookF className='cursor-pointer pt-[2px] text-xl hover:text-2xl' /> </a> 
                </Link>
                </div>
              </ul>
            </div>

        {/* Services */}
            <div className="footer col-span-1 row-span-3 text-[#e4e4e4]">
                <h1 className='text-2xl ml-10 p-5 font-serif '>SERVICES</h1>
                <ul  className='p-5 ml-10 text-lg  tracking-wider font-thin'>
                    <li className='pt[2px]'>Contact us</li>
                    <li className='pt[2px]'>Return</li>
                    <li className='pt[2px]'>FAQ</li>
                </ul>
            </div>

            <div className='row-span-1 col-span-4 text-center pt-6 text-[#9e9e9e] '>
            <BiCopyright className="inline" /> 2021 abc Coorporation. All rights reserved
            </div>
        </div>
        </div>
    )
}

export default Footer
