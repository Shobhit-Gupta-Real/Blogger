import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
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
        <Link to="/login">LogIn</Link>
        <Link to="/signup">SignUp</Link>
      </nav>
      </header>
    </main>
    </div>
  )
}

export default Nav
