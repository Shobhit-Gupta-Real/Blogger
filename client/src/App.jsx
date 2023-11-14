import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './partials/Nav'
import Post from './seed/Post'
import {Routes, Route, redirect} from "react-router-dom"
import Layout from './Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { ThemeProvider } from './context/theme'
import { UserContextProvider } from './context/UserConstext'
import CreatePost from './pages/CreatePost'
import PostPage from './pages/PostPage'
import EditPage from './pages/EditPage'

function App() {
  const bgcolor = "white"
  const [themeMode, setThemeMode] = useState("light")
  const lightTheme=()=>{
    setThemeMode("light"),
    document.querySelector('body').style.backgroundColor = "white"
    document.querySelector('html').style.backgroundColor = "white"
  }
  const darkTheme=()=>{
    setThemeMode("dark"),
    document.querySelector('body').style.backgroundColor = "#222"
    document.querySelector('html').style.backgroundColor = "#222"
  }

  useEffect(()=>{
    document.querySelector('html').classList.remove("light","dark")
    document.querySelector('html').classList.add(themeMode)
  },[themeMode])
  return (
    <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
      <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Register/>}/>
      <Route path='/create' element={<CreatePost/>}/>
      <Route path='/post/:id' element={<PostPage/>}/>
      <Route path='/edit/:id' element={<EditPage/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
    </ThemeProvider>
  )
}

export default App
