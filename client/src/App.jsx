import { useEffect, useState } from 'react'
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
import { ThemeProvider } from './context/theme'

function App() {
  const [themeMode, setThemeMode] = useState("light")
  const lightTheme=()=>{
    setThemeMode("light")
  }
  const darkTheme=()=>{
    setThemeMode("dark")
  }

  useEffect(()=>{
    document.querySelector('html').classList.remove("light","dark")
    document.querySelector('html').classList.add(themeMode)
  },[themeMode])
  return (
    <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Register/>}/>
      </Route>
    </Routes>
    </ThemeProvider>
  )
}

export default App
