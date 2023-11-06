import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  const [username, setUsername] = useState(null)
  useEffect(()=>{
    fetch('http://localhost:4000/profile',{
      credentials: 'include',
    }).then(response=>{
      response.json().then(userInfo=>{
        setUsername(userInfo.username)
      })
    })
  },[])

  function logout(){
    fetch('http://localhost:4000/logout',{
      credentials: 'include',
      method: 'POST',
    })
    setUsername(null)
  }

  return (
    <div>
    <main> 
    <header>
      <span className='social'>
      <img src="/images/facebook.png" alt="" />
      <img src="/images/instagram.png" alt="" />
      <img src="/images/tiktok.png" alt="" />
      <img src="/images/youtube.png" alt="" />
      </span>
      <a href="" className='logo'>Blogger</a>
      <nav>
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
