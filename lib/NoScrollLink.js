import Link, { LinkProps } from 'next/link'
import React, { ReactNode } from 'react'

const NoScrollLink = () => {

    return(
        <Link href={href} passHref={passHref} scroll={false}>
            {children}
        </Link>
    )
}

export default NoScrollLink