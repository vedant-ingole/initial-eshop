import React, { useState, useEffect } from 'react'
import Link  from 'next/link'
import { FcGoogle } from 'react-icons/fc' 
import { FaFacebook, FaFacebookSquare, FaFacebookF } from 'react-icons/fa' 
import { motion } from 'framer-motion'
import Button from '../components/Button/Button'
import { useRouter } from 'next/router'

import { auth, facebookProvider, googleProvider } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser, login  } from '../redux/userStore' 

//Framer Motion Animatioin variants
const transition = {duration: 1, ease: [0.43, 0.13, 0.23, 0.96]}
const formvariants = {
    enter: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1, transition},  
    exit: { x: -100, opacity: 0, transition },
  }

const Login = () => {

    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        handleLogin()
    }
    
    // Email login 
    const handleLogin = () => {
        if(email || password !== ""){
            auth.signInWithEmailAndPassword(email, password).
            then((data) => {
                alert('Logged In')
                router.push('/account')
            }).
            catch((err) => {
                alert(err)
                setEmail('')
                setPassword('')    
            })
        }
     
    }
    
    // Google Signup
    const handleGoogleLogin = () => {
        auth.signInWithPopup(googleProvider).
        then(() => router.push('/account'))
        
    }
    
    // Facebook Signup
    const handleFacebookLogin = () => {
        auth.signInWithPopup(facebookProvider)
        router.push('/aaccount')
    } 
    

    return (
        <motion.div 
            className='bg-theme  text-center min-h-[50vh]'
            initial="enter"
            animate="animate"
            exit="exit"
            >
        <motion.div variants={formvariants}>
            <h1 className='text-4xl pt-28'>Login</h1>
           
           {/* Email Login */}
            <div className="flex flex-col justify-center  items-center mx-auto mt-10">
                <input 
                    type="email" 
                    className='auth-input' 
                    placeholder='email' 
                    value={email}
                    onChange={e => setEmail(e.target.value)} />

                <input 
                    type="password" 
                    className='auth-input' 
                    placeholder='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)} />

                <button onClick={handleSubmit} className='mt-8 bg-button hover:bg-button transition-colors duration-200 p-5 w-[15%] rounded-sm font-semibold text-lg text-white tracking-wider'>log in</button>
                <p className='p-5'>Don't have an account? 
                    <span className='text-blue-500 border-b-2 border-black ml-3 font-medium tracking-wider'>
                        <Link href="/signup">sign up</Link> 
                    </span>
                </p>
            </div>

            {/* OR */}
            <div className='w-1/3 mx-auto'>
                <h2 className='mt-10 w-full text-center text-xl border-b-[1px] leading-[0.1em]  border-black'><span className='p-2 bg-theme'>or</span></h2>

                <h1 className='mt-8'>Login in with</h1>
                <div className="flex justify-around p-5">

                {/* Google */}
                    <div  onClick={handleGoogleLogin} className='login2 space-x-4 flex justify-center items-center'>
                        <FcGoogle  className='text-2xl inline' /> <p className='inline font-semibold '> Google </p>
                    </div>
                {/* Facebook */}
                    <div onClick={handleFacebookLogin}  className='login2 space-x-4 flex justify-center items-center'>
                        <FaFacebook className='text-2xl inline text-[#4267B2]' /> <p className='inline  font-semibold'> Facebook </p>
                    </div>

                </div>
            </div>

         </motion.div>
        </motion.div>
    )
}

export default Login
