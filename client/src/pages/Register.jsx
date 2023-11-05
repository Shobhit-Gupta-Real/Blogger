import React, { useState } from 'react'

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 async function Register(ev){
    ev.preventDefault();
    /*fetching the server and sending the data from the form to the server 
    if the server is not set then you will see in the network of the inspect 
    that promise is mode and since server is not present after few time 
    the promise will fail as no responce will be there.
    There we need to work with both backend and frontend simultanousely*/

    await fetch('http://localhost:4000/signup',{
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
    })
  }
  return (
    <div>
      <form onSubmit={Register} className='register'>
        <h1>SignUp</h1>
        <input type="text"
         placeholder='username'
         value={username}
         onChange={ev => setUsername(ev.target.value)}/>
        <input type="password" 
        placeholder='password' 
        value={password}
        onChange={ev => setPassword(ev.target.value)}/>
        <button>SignUp</button>
      </form>
    </div>
  )
}

export default Register
