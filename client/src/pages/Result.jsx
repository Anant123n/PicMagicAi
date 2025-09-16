import React, { useState } from 'react'
 

const Result = () => {
  const [image, setImage] = useState('bachha.png')
  const [isImgLoaded, setIsImgLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const generateImage = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate backend call for now
    if (input) {
      if (image) {
        setIsImgLoaded(true)
        setImage(image)
      }
    }

    setLoading(false)
  }

  return (
    <form
      onSubmit={generateImage}
      className="flex flex-col min-h-[90vh] justify-center items-center gap-6 px-2 sm:px-8 lg:px-16"
    >
      {/* Image Display */}
      <div className="relative">
        <img src={image} alt="Generated" className="max-w-sm rounded shadow-lg" />
        {/* Progress Bar */}
        <span
          className={`absolute bottom-0 left-0 h-1 bg-pink-600 ${
            loading ? 'w-full transition-all duration-[10s]' : 'w-0'
          }`}
        />
      </div>
      <p className={loading ? 'text-gray-300 mt-2' : 'hidden'}>Generating...</p>

      {/* Input + Button */}
      {!isImgLoaded && (
        <div className="flex w-full max-w-xl bg-gray-800 text-white text-sm p-1 mt-6 rounded-full shadow-md">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe your idea, and our AI will generate it!"
            className="flex-1 bg-transparent outline-none px-4 placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-pink-700 px-8 sm:px-12 py-3 rounded-full font-medium hover:bg-pink-800 transition"
          >
            Generate
          </button>
        </div>
      )}

      {/* After Image Generated */}
      {isImgLoaded && (
        <div className="flex gap-4 flex-wrap justify-center text-sm mt-6">
          <p
            onClick={() => setIsImgLoaded(false)}
            className="cursor-pointer bg-transparent border border-gray-400 text-gray-200 px-8 py-3 rounded-full hover:bg-gray-700 transition"
          >
            Generate Another
          </p>
          <a
            href={image}
            download
            className="bg-amber-500 px-8 py-3 rounded-full text-black font-medium hover:bg-amber-600 transition"
          >
            Download
          </a>
        </div>
      )}
    </form>
  )
}

export default Result
