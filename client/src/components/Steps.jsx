import React from 'react'
import { assets } from '../assets/assets'

const Steps = () => {
  return (
    <div>
      <div className='w-auto h-auto my-10 flex flex-col gap-5 items-center justify-center p-4'>

  {/* Step 1 */}
  <div className='flex border-2 p-5 gap-4 rounded-lg w-full max-w-3xl bg-yellow-200 hover:scale-105 transition-all duration-200'>
  <img src='/image.png' alt="" className='h-10 w-10' />
  <div className='flex flex-col justify-center'>
    <div className='font-semibold text-lg text-fuchsia-600'>Describe Your Vision</div>
    <div className='text-orange-500'>
      Type a phrase, sentence, or paragraph that describes the image you want to create.
    </div>
  </div>
</div>

{/* Step 2 */}
<div className='flex border-2 p-5 gap-4 rounded-lg w-full bg-yellow-200 max-w-3xl hover:scale-105 transition-all duration-200'>
  <img src='/image1.png' alt="" className='h-10 w-10' />
  <div className='flex flex-col justify-center'>
    <div className='font-semibold text-lg  text-fuchsia-600'>Watch the Magic</div>
    <div className='text-orange-500'>
      Our AI engine swiftly transforms your text into a high-quality, unique image within seconds.
    </div>
  </div>
</div>

{/* Step 3 */}
<div className='flex border-2 px-5 py-5 gap-4 rounded-lg w-full bg-yellow-200 max-w-3xl hover:scale-105 transition-all duration-200'>
  <img src='/image2.png' alt="" className='h-10 w-10' />
  <div className='flex flex-col justify-center'>
    <div className='font-semibold text-lg  text-fuchsia-600'>Download & Share</div>
    <div className='text-orange-500'>
      Download your creation or share it directly from our platform. 
      Let your imagination flow wild.
    </div>
  </div>
</div>
</div>
    </div>
  )
}

export default Steps
