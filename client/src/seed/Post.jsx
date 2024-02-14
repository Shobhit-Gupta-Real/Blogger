import React, { useEffect } from 'react'
import {formatISO9075} from 'date-fns'
import { Link } from 'react-router-dom'

function Post({title, summary, cover, content, createdAt, author, _id}) {
  return (
    <div>
      <div className="post dark:text-white"> 
      <img src={cover.url} alt="" />
      <div className="post_content">
      <h2 className='dark:text-slate-400'>{title}</h2>
      <div className="info">
        <a href="" className='author dark:text-slate-200'>{author.username}</a>
        <time>{formatISO9075(new Date(createdAt))}</time> 
        {/* date-fn for formating the date */}
      </div>
      <p>{summary}</p>
      <Link to={`/post/${_id}`}>
      <button className='dark:text-black dark:border-black'>Read More</button>
      </Link>
    </div>
    </div>
    </div>
  )
}

export default Post
