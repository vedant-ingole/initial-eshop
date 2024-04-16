import React from 'react'
import { motion } from 'framer-motion'
// import { variants } from 'tailwindcss/stubs/defaultConfig.stub';

import { useSelector } from 'react-redux'
import { selectUser } from '../../../redux/userStore'
import Button from '../../Button/Button'


const variants = {
    open:{
        y:0,
        opacity: 1,
        transition:{
            y: { stiffness:1000, velocity: -100}
        }
    },
    closed:{
        y:50,
        opacity: 0,
        transition: {
            y:{stiffness: 1000}
        }
    }
}


const MenuItem = ({ i }) => {

        //Auth
        const user = useSelector(selectUser)
    return (
        <>
            <motion.li 
                className='li'
                variants={variants}
                whileHover={{scale:1.1}}
                whileTap={{ scale: 0.95}}>

                    <div className="icon-placeholder"  >
                    </div>
                    <div className="text-placeholder"  >
                        <p className='font-bold text-xl'>{i}</p>
                    </div>
            </motion.li>
            {/* <motion.div className='text-xl w-full '  variants={variants}>
            { user ? <Button title="Logout" />    
                    : <Button title="Login"/>     
                }
            </motion.div> */}
        </>
    )
}

export default MenuItem
