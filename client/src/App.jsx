import { useState } from 'react'
import {Routes,Route} from  'react-router-dom'
import Home from './pages/Home.jsx'
import BuyCredit from './pages/BuyCredit.jsx'
import Result from './pages/Result.jsx' 
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import Login from './components/Login.jsx'
import { useContext } from 'react'
import { AppContext } from './context/AppContext.jsx' 



function App() {

  const {showLogin}=useContext(AppContext)

  return (
   <div className='  min-h-screen bg-gradient-to-b from-gray-500 to-violet-900'>
    {showLogin && <Login/>}

    <Navbar/>

    <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/buy' element={<BuyCredit/>}/>
      <Route path='/result' element={<Result/>}/>
      <Route path='/login' element={<Login/>}/>
      


    </Routes>

    <Footer/>
    

   </div>
  )
}

export default App
