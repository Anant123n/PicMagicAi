import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'  


const Discription = () => {
  return (
    <div>
      

      <div className="w-full  py-10 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl text-blue-500 md:text-4xl font-bold">Generate AI Images</h2>
        <p className="text-gray-500 text-red-600 text-lg mt-1">Bring Creative Vision to Life</p>
        {/* Dummy Image */}

      </div>


      <div className="flex flex-col md:flex-row gap-4 items-center justify-center px-6 py-12">

        <div className="md:w-1/3 mb-8 md:mb-0 md:mr-8">
          <img
            src='/bachha.png'
            alt="AI Image Generator Example"
            className="rounded-xl shadow-lg"
          />
        </div>


        <div className="md:w-1/3 text-yellow-500">
          <h2 className="text-3xl font-boldmb-4 text-pink-500">
            Introducing the AI Website – Your Ultimate Text to Image Generator
          </h2>
          <p className=" mb-4">
            Effortlessly bring your ideas to life with our free AI image generator. Transform your text into stunning visuals in seconds. Imagine, describe, and see your vision come to life instantly.
          </p>
          <p className="">
            Type a text prompt, and our advanced AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even non-existent concepts come to life effortlessly. Unleash limitless creativity with our AI technology.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Discription
