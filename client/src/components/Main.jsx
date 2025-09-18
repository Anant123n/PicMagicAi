import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Steps from './Steps'
import Testimonial from './Testimonial'
import Discription from './Discription'

const Header = () => {

  const navigate = useNavigate()

  

  const GenPic = () => {
    if (user) {
      navigate('/result')
    } else {
      setShowLogin(true)
    }
  }

  return (
    <motion.div
      className='flex flex-col justify-center items-center px-2 sm:px-8 lg:px-16 w-full h-auto py-4 
      bg-gradient-to-b from-gray-900 via-gray-800 to-gray-100 text-gray-100'
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className='flex border-2 border-gray-400 rounded-full px-6 py-2 my-10 bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200'
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p>Transform your Idea into Art</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>
      <motion.h1
        className='text-6xl text-center text-amber-400 font-semibold'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Transform Words into <br /> <span className="text-pink-400 font-bold">Art</span> in seconds
      </motion.h1>

      <motion.div
        className='text-center text-lg sm:text-xl lg:text-2xl font-light mt-6 text-gray-300'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        Unleash boundless creativity with AI – Turn your thoughts into stunning visual art <br /> instantly. Just type, and watch the magic unfold.
      </motion.div>

      {/* generate button */}
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

      <div className='my-10'>
        {Array(6).fill().map((item, index) => (
          <img src={index % 2 == 0 ? assets.sample_img_1 : assets.sample_img_2} alt="" key={index} className='inline-block w-20 h-20 mx-1 rounded-md' />
        ))}
        <div className='text-xl text-gray-200 text-center'>Generated images from PicMagicAi</div>
      </div>

      <div className='m-4'>
        <div className="rounded-full border-2 border-amber-400 px-6 py-3 text-lg font-semibold text-amber-400 shadow-md transition-all duration-200 hover:scale-105 cursor-pointer text-center ">
          How AI Magic Works
        </div>
        <div className='text-gray-400'>Transform Texts Into Stunning Images</div>
      </div>

      <Steps />
      <Discription/>
      <Testimonial />

      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-3xl font-semibold text-amber-400 mb-6">See the Magic. Try Now</h2>
        <button onClick={()=>navigate('/buy')} className="bg-pink-500 text-white px-10 py-3 rounded-full font-medium hover:bg-pink-600 transition">
          Subscription <span className="ml-1">✨</span>
        </button>
      </div>

    </motion.div>
  )
}

export default Header
