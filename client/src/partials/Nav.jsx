import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeBtn from '../components/ThemeBtn'
import { UserContext } from '../context/UserConstext'

function Nav() {
  const {setUserInfo, userInfo} = useContext(UserContext)
  useEffect(()=>{
    fetch('http://localhost:4000/profile',{
      credentials: 'include',
    }).then(response=>{
      response.json().then(userInfo=>{
        setUserInfo(userInfo)
      })
    })
  },[])

  function logout(){
    fetch('http://localhost:4000/logout',{
      credentials: 'include',
      method: 'POST',
    })
    setUserInfo(null)
  }

  const username = userInfo?.username
  return (
    <div>
    <main> 
    <header>
      <span className='social'>
      <img src="/images/facebook.png" alt="" />
      <img src="/images/instagram.png" alt="" />
      <img src="/images/youtube.png" alt="" />
      <img src="/images/tiktok.png" alt="" />
      </span>
      <Link to="/" className='logo dark:text-white'>Blogger</Link>
      <nav className='dark:text-white'>
        <ThemeBtn/>
        <Link to="/">HomePage</Link>
        <Link to="">Contact </Link>
        {username &&(
          <>
            <Link to="/create" className='blog_item'>NEW-BLOG</Link>
            <Link onClick={logout}>LogOut</Link>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">LogIn</Link>
            <Link to="/signup">SignUp</Link>
          </>
        )}
      </nav>
      </header>
    </main>
    </div>
  )
}

export default Nav
