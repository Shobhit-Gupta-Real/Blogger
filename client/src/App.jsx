import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './partials/Nav'
import Post from './seed/Post'
import {Routes, Route} from "react-router-dom"
import Layout from './Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Register/>}/>
      </Route>
    </Routes>
    
  )
}

export default App
