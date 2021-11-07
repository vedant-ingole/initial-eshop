import React, { useState } from 'react'
import { useEffect } from 'react'


const image = "https://images.unsplash.com/photo-1615174438196-b3538fe68737?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=465&q=80"

const useScrollPosition = () => {


    const [page, setPage] = useState()
    const [scrollY, setScrollY] = useState()

    
    const onScroll = () => { setScrollY(window.pageYOffset) }

    useEffect(() => {

            window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [])
    // console.log(scrollY);

    return scrollY
}


const text = () => {

    const scrollPos = useScrollPosition()

    return (
        <>
            <div className='h-52 bg-black'/>

            {/* wrapper */}
            <div className='h-[200vh] w-full bg-black '>

                <div className='text-parent z-10 text-white '>
                    <h1 
                        style={{transform: `translate3d(-${scrollPos / 2}px, -${scrollPos * 0.1}px, 0px)`}}>
                        The strength of the team is each individual
                    </h1>
                    <h1
                        className='out2'
                        style={{transform: `translate3d(${scrollPos / 2}px, -${scrollPos * 0.1}px, 0px)`}}>
                        I really get motivated when I have doubter
                    </h1>
                </div>

                <img
                    style={{transform: `translate3d(-50%, calc(-${scrollPos * 0.9}px - 50%), 0)`}}
                    src={image} alt="" 
                    className='absolute h-3/4 object-contain top-1/2 left-1/2 z-20 mt-56'/>

                <div className='text-parent z-30 '>
                    <h1 
                        style={{transform: `translate3d(-${scrollPos / 2}px, -${scrollPos * 0.1}px, 0px)`}}
                        className='outline'>
                            The strength of the team is each individual
                    </h1>
                    <h1 
                        style={{transform: `translate3d(${scrollPos / 2}px, -${scrollPos * 0.1}px, 0px)`}}
                        className='outline out2'>
                            I really get motivated when I have doubters
                    </h1>
                </div>

            </div>
        </>
    )
}

export default text
