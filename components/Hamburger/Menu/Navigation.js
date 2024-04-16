import React from 'react'
import { motion } from 'framer-motion'
import MenuItem from './MenuItem'

import { useSelector } from 'react-redux'
import { selectUser } from '../../../redux/userStore'
import Button from '../../Button/Button'


const variants = {
    open:{
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed:{
       transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
}

const itemIds = ["Computer", "Earbuds", "Cookware","Phones"]

const Navigation = () => {

    //Auth
    const user = useSelector(selectUser)

    return (
        <>
            <motion.ul className='ul' variants={variants}>
                {itemIds.map(i => (
                    <MenuItem key={i} i={i} />
                    ))}
            </motion.ul>

            
        </>
    )
}

export default Navigation