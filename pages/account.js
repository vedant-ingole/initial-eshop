import React from 'react'
import Button from '../components/Button/Button'
import {motion} from 'framer-motion'
import { useRouter } from 'next/router'

import { auth } from '../firebase'
import { logout, selectUser  } from '../redux/userStore' 
import { useDispatch, useSelector } from 'react-redux'


//Framer Motion Animatioin variants
const transition = {duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96]}
const formvariants = {
    enter: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1, transition},  
    exit: { x: -100, opacity: 0, transition },
}


const Account = () => {

    const user = useSelector(selectUser)
    const router = useRouter()

    const handleLogout = () => {
        if(window.confirm("Do you want to log out?")){
            auth.signOut()
        }
        router.push('/')
    }


    return (
        <motion.div    
            className='bg-theme pt-28 min-h-[80vh]'
            initial="enter"
            animate="animate"
            exit="exit">
            <motion.div 
                className='w-5/6  mx-auto pt-20'
                variants={formvariants}>
                <h1 className='text-2xl font-mono'>My Account</h1>
                <p>{user && user.name}</p>
                {/* <p>{user.verified}</p> */}

             {/* Orders  */}
                <div className='min-h-[30vh] flex items-center'>
                    <h1 className='text-2xl font-serif'>My Orders</h1>
                </div>

               {/* Logout */}
                <div className=' bg-button p-5 w-[15%] text-center'>
                    <h1 className='text-2xl text-white font-serif tracking-wider cursor-pointer' onClick={handleLogout}>Logout</h1>
                    {/* <Button title="Logout"/> */}
                </div>
            </motion.div>


        </motion.div>
    )
}

export default Account
