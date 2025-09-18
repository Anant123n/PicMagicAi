// Copyright 2025 PREM
// Licensed under the Apache License, Version 2.0

import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext)
  const navigate = useNavigate()

  return (
    <div className="flex justify-between items-center px-2 sm:px-8 lg:px-16 bg-[#111827] text-white w-full h-auto py-4">
      {/* Logo */}
      <Link to="/">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-28 sm:w-32 lg:w-40"
        />
      </Link>

      {/* Right side */}
      <div>
        {user ? (
          <div className="flex items-center gap-4 sm:gap-6 text-sm sm:text-md lg:text-lg font-medium">
            {/* Credits Button */}
            <button
              onClick={() => navigate('/buy')}
              className="flex items-center gap-2 bg-blue-100 text-gray-800 px-4 py-2 rounded-full hover:scale-105 transition-all duration-500"
            >
              <img src={assets.credit_star} alt="" className="w-5" />
              <p>Credits Left : {credit}</p>
            </button>

            {/* Greeting */}
            <p className="hidden sm:block">Hi, {user.name}</p>

            {/* Profile Dropdown */}
            <div className="relative group">
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="w-10 h-10 drop-shadow-2xl cursor-pointer"
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-20 text-black pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                  <li
                    onClick={logout}
                    className="py-1 px-3 cursor-pointer hover:bg-gray-100"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 sm:gap-6">
            <p
              onClick={() => navigate('/buy')}
              className="cursor-pointer bg-pink-50 px-3 py-2 text-blue-600 rounded-full hover:bg-pink-100"
            >
              Subscription
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-10 py-2 text-sm rounded-full transition-all duration-300"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
