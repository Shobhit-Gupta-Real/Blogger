import React from 'react'
import Post from '../seed/Post'

function Home() {
  return (
    <>
        <div className="heading">
            <p><b>Hey, Blogger here!</b> Discover my stories and creative ideas.</p>
          </div>
          <div className="inspire">
            <img src="/images/p1.jpeg" alt=""/>
            <div className="inspire_text">
            <b>Simple Ways to Inspire Your Inner Innovator</b>
            Whether you're an aspiring artist, a curious thinker, or simply looking to add a touch of
            creativity of your routine, our journey together will remind you that creativity knows no
            bounds. Get ready to unlock a world of innovation and self-expression!
            <button>Read More</button>
            </div>
          </div>
          <h1>Recent Posts</h1>
          <Post/>
    </>
  )
}

export default Home
