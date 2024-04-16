import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser, login  } from '../redux/userStore' 
import Dashboard from '../components/Dashboard'
import { auth, facebookProvider, googleProvider } from '../firebase'
import {motion} from 'framer-motion'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'


//Framer Motion Animatioin variants
const transition = {duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96]}
const formvariants = {
    enter: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1, transition},  
    exit: { x: -100, opacity: 0, transition },
  }


export default function Register() {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const router = useRouter()

  console.log(user)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmpassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if(password !== confirmpassword) {
      toast('Passwords do not match')
    }

      setLoading(true)
      await signup(email, password)
      router.push('/')
  }

// Signup function
  const signup = (email, password) => {
      auth.createUserWithEmailAndPassword(email, password)
      .then((data) => alert('Registerd Successfully'))
      .catch((err) => toast(err.code)
      ) 
  }


  return (
    <>
      <motion.div  
        className="pt-28 bg-theme text-center min-h-[90vh]"
        initial="enter"
        animate="animate"
        exit="exit">
      <motion.div variants={formvariants}>
      <h1 className='text-4xl '>Sign up</h1>


      <div className="flex flex-col justify-center  items-center mx-auto mt-10">
                <input 
                    required
                    type="email" 
                    className='auth-input' 
                    placeholder='email' 
                    value={email}
                    onChange={e => setEmail(e.target.value)} />

                <input 
                    required
                    type="password" 
                    className='auth-input' 
                    placeholder='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
                
                <input 
                    required
                    type="password" 
                    className='auth-input' 
                    placeholder='confirm password'
                    value={confirmpassword}
                    onChange={e => setConfirmpassword(e.target.value)} />

                <button onClick={handleSubmit} className={`${loading ? 'disabled' : ""} mt-8 bg-button hover:bg-button transition-colors duration-200 p-5 w-[15%] rounded-sm  tracking-wide text-xl text-white`}>sign up</button>
                <p className='p-5'>Already have an account? 
                    <span className='text-blue-500 border-b-2 border-black ml-3 font-medium tracking-wider'>
                        <Link href="/login">log in</Link> 
                    </span>
                </p>
            </div>
      </motion.div>
      </motion.div>
    </>
    // <>
    // {
    //   user ? <Dashboard/>
    //        :
    //        <>
    //         <div className="container bg-them" >
    //           <h1>Firebase Authentication {signed ? "Login" : "Register" }</h1>
    //             <div className="form">
    //               <input
    //                   className='auth-input outline-none border-b-2' 
    //                   type="email" 
    //                   placeholder='email'  
    //                   value={email}
    //                   onChange={e => setEmail(e.target.value)}
    //                   />
    //               <input 
    //                   className='auth-input outline-none border-b-2' 
    //                   type="password" 
    //                   placeholder='password' 
    //                   value={password}
    //                   onChange={e => setPassword(e.target.value)}
    //                   />

    //               <button onClick={handleSubmit} className='auth-button' >{signed ? "Login" : "Register" }</button>
    //             </div>

    //           {/* Google */}
    //             <button onClick={handleGoogle} className='auth-button'>GOOGLE LOGIN</button>
    //           {/* Facebook   */}
    //             <button onClick={handleFacebook} className='auth-button'>FACEBOOK LOGIN</button>
                
    //           </div>

    //        </>
    //   }
      
    // </>
  )
}
