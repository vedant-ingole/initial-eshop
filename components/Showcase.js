import React from 'react'
import { motion } from 'framer-motion' 

const FadeInView = ({children}) => {
    return (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          transition={{ duration: 0.3 }}
          variants={{
            visible: { opacity: 1, scale: 1 },
            hidden: { opacity: 0, scale: 0 }
          }}
        >
          {children}
        </motion.div>
      );
}

const Showcase = () => {
    return (
            <motion.div 
                initial={{opacity:0, scale:0}}
                animate={{opacity:1, scale:1}}
                whileInView={{opacity:1, scale:1}}
                // viewport={{once:false}}
                transition={{duration: 0.5}}
                className='flex justify-center items-center bg-gray-100' style={{height:'80vh'}} >
                <p className='text-center text-5xl text-red-300 font-bold tracking-wider leading-loose'>
                    Perfect clothes for all ocassions 
                    <br />
                    From ethnic to dailywear  'cause every day is special
                </p>
            </motion.div>
    )
}

export default Showcase
