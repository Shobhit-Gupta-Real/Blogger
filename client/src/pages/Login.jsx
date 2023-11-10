import React, { useContext, useState } from 'react'
import {Navigate} from 'react-router-dom'
import { UserContext } from '../context/UserConstext'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] =  useState('')
  const [redirect, setRedirect] = useState(false)//for redirecting to homepage after login
  const {userInfo, setUserInfo} = useContext(UserContext)
  async function Logging(ev){
    ev.preventDefault()
    const response = await fetch('http://localhost:4000/login', {
      method:'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include' //this will include the cookie on our request and our cookie contains the jwt token for authorization
    })
    if(response.ok){
      response.json().then(userInfo=>{
        setUserInfo(userInfo)
        setRedirect(true)
      })
      
    }else{
      alert('Wrong credentials')
    }
  }
  
  if(redirect){
    return <Navigate to={'/'} />
  }
  return (
    <div className='login_box'>
      <form action="" className='login' onSubmit={Logging}>
        <h1 className='dark:text-slate-300' style={{alignSelf:'center', marginBottom:'15px'}}>LogIn</h1>
        <input type="text" placeholder='username' value={username} 
        onChange={e => setUsername(e.target.value)}/>
        <input type="password" placeholder='password' value={password} 
        onChange={e=> setPassword(e.target.value)}/>
        <button>LogIn</button>
      </form>
    </div>
  )
}

export default Login
