import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Result = () => {
  const [image, setImage] = useState(null)
  const [isImgLoaded, setIsImgLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const { generateImage, user, hasFreeTrial, setShowLogin, token } = useContext(AppContext)
  const navigate = useNavigate()

  // If guest with no free trial left, redirect to home and show login
  useEffect(() => {
    if (!token && !hasFreeTrial) {
      setShowLogin(true)
      navigate('/')
    }
  }, [token, hasFreeTrial])

  const handleGenerate = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (input) {
      try {
        const result = await generateImage(input)
        if (result) {
          setImage(result)
          setIsImgLoaded(true)
        }
      } catch (err) {
        console.error(err)
      }
    }

    setLoading(false)
  }

  const isGuest = !token

  return (
    <form
      onSubmit={handleGenerate}
      className="flex flex-col min-h-[90vh] justify-center items-center gap-6 px-2 sm:px-8 lg:px-16 pt-16 sm:pt-24 pb-16"
    >

      {/* Guest Free Trial Badge */}
      {isGuest && !isImgLoaded && (
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-pink-500/20 border border-amber-500/40 rounded-full px-6 py-2 text-amber-300 text-sm font-medium backdrop-blur-sm">
          <span className="text-lg">🎁</span>
          <span>Free Trial — Generate 1 image without signing up!</span>
        </div>
      )}

      {/* Image Display */}
      <div className="relative">
        <img
          src={image || 'bachha.png'}
          alt="Generated"
          className="max-w-sm rounded shadow-lg"
        />
        <span
          className={`absolute bottom-0 left-0 h-1 bg-pink-600 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'
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
        <div className="flex flex-col items-center gap-6 mt-6">
          <div className="flex gap-4 flex-wrap justify-center text-sm">
            {/* Only show "Generate Another" for logged-in users */}
            {user ? (
              <p
                onClick={() => {
                  setIsImgLoaded(false)
                  setImage(null)
                  setInput('')
                }}
                className="cursor-pointer bg-transparent border border-gray-400 text-gray-200 px-8 py-3 rounded-full hover:bg-gray-700 transition"
              >
                Generate Another
              </p>
            ) : null}
            <a
              href={image}
              download
              className="bg-amber-500 px-8 py-3 rounded-full text-black font-medium hover:bg-amber-600 transition"
            >
              Download
            </a>
          </div>

          {/* Guest signup prompt after free generation */}
          {isGuest && (
            <div className="flex flex-col items-center gap-3 mt-4 p-6 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700 backdrop-blur-sm max-w-md text-center">
              <span className="text-2xl">✨</span>
              <h3 className="text-lg font-semibold text-white">
                Loved the result?
              </h3>
              <p className="text-gray-400 text-sm">
                Sign up to get <span className="text-amber-400 font-bold">5 free credits</span> and keep generating amazing images!
              </p>
              <button
                type="button"
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:from-pink-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 mt-2"
              >
                Sign Up Free →
              </button>
            </div>
          )}
        </div>
      )}
    </form>
  )
}

export default Result
