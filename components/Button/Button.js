import React from 'react'
import styles from './Button.module.css'

const Button = ({title}) => {
    return (
        <>
            <div className={`${styles.h1} bg-white`}>{title}</div>
        </>
    )
}

export default Button
