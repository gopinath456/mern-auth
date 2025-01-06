import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login'
import EmailVerification from './pages/EmailVerification'
import ResetPass from './pages/ResetPass'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div>
    <ToastContainer/>
    <Routes>
    <Route path='/' Component={Home}/>
    <Route path='/login' Component={Login}/>
    <Route path='/emailverification' Component={EmailVerification}/>
    <Route path='/resetpass' Component={ResetPass}/>
   </Routes>
    </div>
   
  )
}

export default App

