import React from 'react'
import { motion } from 'framer-motion'
import { assets } from '../assets/assets'


const GenerateBTn = () => {
  return (
    <div>
       <motion.button onClick={GenPic}
              className='flex gap-1 rounded-full py-2 px-5 border-0 my-10 bg-amber-500 text-gray-900 hover:text-lg hover:scale-105 transition-all duration-200'
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Generate Your Image <img src={assets.star_group} alt="" className='w-5 h-5' />
            </motion.button>
      
    </div>
  )
}

export default GenerateBTn
