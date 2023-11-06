import React, { useState } from 'react'


function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] =  useState('')
  async function Logging(ev){
    ev.preventDefault()
    await fetch('http://localhost:4000/login', {
      method:'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
    })
  }
    
  return (
    <div className='login_box'>
      <form action="" className='login' onSubmit={Logging}>
        <h1>LogIn</h1>
        <input type="text" placeholder='username' value={username} 
        onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder='password' value={password} 
        onChange={e=> setPassword(e.target.value)}/>
        <button>LogIn</button>
      </form>
    </div>
  )
}

export default Login
