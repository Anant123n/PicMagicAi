import React from 'react'
import { assets, plans } from '../assets/assets'

const BuyCredit = () => {
  return (
    <div className="flex flex-col items-center pt-15 py-35 px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-gray-900 via-gray-500 to-gray-200 text-gray-600">
      {/* Section Header */}
      <button className="bg-pink-600 text-white px-6 py-2 rounded-full font-medium hover:bg-pink-700 transition mb-4">
        Our Subscription
      </button>
      <h1 className="text-3xl font-bold text-amber-400 mb-10 text-center">
        Choose the Subscription
      </h1>

      {/* Plans Container */}
      <div className="flex flex-wrap gap-6 justify-center w-full">
        {plans.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-1/4 shadow-md hover:scale-105 transition-transform duration-300"
          >
            <img
              src={assets.logo_icon}
              className="h-14 w-14 mx-auto mb-4"
              alt="logo"
            />
            <div className="text-xl font-semibold text-pink-400 text-center mb-2">
              {item.id}
            </div>
            <div className="text-gray-300 text-center mb-3">{item.desc}</div>
            <div className="text-center font-semibold mb-6">
              <span className="text-3xl text-amber-400">₹{item.price}</span>
              <span className="text-gray-300 text-base"> / {item.credits} credits</span>
            </div>

            <button className="w-full bg-amber-500 text-black font-medium px-6 py-3 rounded-full hover:bg-amber-600 transition">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>




  )
}

export default BuyCredit
