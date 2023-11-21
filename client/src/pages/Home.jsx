import React, { useEffect, useState } from 'react'
import Post from '../seed/Post'



function Home() {
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    fetch('http://localhost:4000/post').then(response =>{
      response.json().then(posts =>{
        setPosts(posts)
      })
    })
  }, [])
  return (
    <>
        <div className="heading dark:text-slate-300">
            <p><b>Hey, Blogger here!</b> Discover my stories and creative ideas.</p>
          </div>
          <div className="inspire">
            <img src="/images/p1.jpeg" alt=""/>
            <div className="inspire_text dark:text-white">
            <b className='dark:text-slate-400'>Simple Ways to Inspire Your Inner Innovator</b>
            Whether you're an aspiring artist, a curious thinker, or simply looking to add a touch of
            creativity of your routine, our journey together will remind you that creativity knows no
            bounds. Get ready to unlock a world of innovation and self-expression!
            <button className='dark:text-black dark:border-black'>Read More</button>
            </div>
          </div>
          {posts.length>0?<h1>Recent Post</h1>:""}
         {posts.length > 0 && posts.map(post =>(
            <Post {...post}/>
         ))} 
    </>
  )
}

export default Home
