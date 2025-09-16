import React from 'react'
import { assets } from '../assets/assets'

const Testimonial = () => {
  return (
    <div className='my-8'>
      <div className="py-12 bg-gradient-to-b  text-center text-gray-100">
        {/* Section Header */}
        <h2 className="text-3xl font-bold text-amber-400 mb-2">User Reviews</h2>
        <p className="text-gray-300 mb-10">What our customers say</p>

        {/* Reviews Container */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-4 flex-wrap">

          {/* Review Card 1 */}
          <div className="bg-gray-800 rounded-xl shadow-md p-6 w-full max-w-sm hover:scale-105 transition-all duration-200 border border-gray-700">
            <img
              src="/profile_1.webp"
              alt="User Avatar"
              className="mx-auto rounded-full mb-4 border-2 border-amber-400"
            />
            <h3 className="text-xl font-semibold text-amber-300">Manish Mehta</h3>
            <p className="text-gray-400 mb-2">Graphic Designer</p>
            <img
              src={assets.credit_star}
              alt="Star Rating"
              className="mx-auto mb-4"
            />
            <p className="text-gray-300">
              Outstanding developer! Built a robust site with perfect functionality. Efficient and detail-oriented.
            </p>
          </div>

          {/* Review Card 2 */}
          <div className="bg-gray-800 rounded-xl shadow-md p-6 w-full max-w-sm hover:scale-105 transition-all duration-200 border border-gray-700">
            <img
              src="/profile_2.webp"
              alt="User Avatar"
              className="mx-auto rounded-full mb-4 border-2 border-amber-400"
            />
            <h3 className="text-xl font-semibold text-amber-300">Anil Nair</h3>
            <p className="text-gray-400 mb-2">TCS</p>
            <img
              src={assets.credit_star}
              alt="Star Rating"
              className="mx-auto mb-4"
            />
            <p className="text-gray-300">
              Professional work! Delivered on time, with a polished design and smooth user experience. Efficient and detail-oriented.
            </p>
          </div>

          {/* Review Card 3 */}
          <div className="bg-gray-800 rounded-xl shadow-md p-6 w-full max-w-sm hover:scale-105 transition-all duration-200 border border-gray-700">
            <img
              src="/profile_3.webp"
              alt="User Avatar"
              className="mx-auto rounded-full mb-4 border-2 border-amber-400"
            />
            <h3 className="text-xl font-semibold text-amber-300">Priya Sharma</h3>
            <p className="text-gray-400 mb-2">Freelancer</p>
            <img
              src={assets.credit_star}
              alt="Star Rating"
              className="mx-auto mb-4"
            />
            <p className="text-gray-300">
              Amazing experience! The AI image generator is intuitive and delivers great results every time.
            </p>
          </div>

          {/* Review Card 4 */}
          <div className="bg-gray-800 rounded-xl shadow-md p-6 w-full max-w-sm hover:scale-105 transition-all duration-200 border border-gray-700">
            <img
              src="/profile_4.webp"
              alt="User Avatar"
              className="mx-auto rounded-full mb-4 border-2 border-amber-400"
            />
            <h3 className="text-xl font-semibold text-amber-300">Rohit Singh</h3>
            <p className="text-gray-400 mb-2">Startup Founder</p>
            <img
              src={assets.credit_star}
              alt="Star Rating"
              className="mx-auto mb-4"
            />
            <p className="text-gray-300">
              Highly recommend! Fast, reliable, and the images are top-notch. Perfect for quick creative projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonial
