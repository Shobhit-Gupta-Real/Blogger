import React, { useState } from 'react'
import "./CreatePost.css"
import ReactQuill from "react-quill" //code editor api 
import "react-quill/dist/quill.bubble.css" //for the style of the code editor 

function CreatePost() {
    const [open,setOpen] = useState(false)
    const [value, setValue] = useState("")
    
  return (
    <div className='container'>
        <input type="text" placeholder='Title' className='title dark:text-white'/>
        <div className='editor'>
            <button className='button dark:border-white'
            onClick={()=>setOpen(!open)}>
                <img src="./images/plus.png" alt="" width={16} height={16}/>
            </button>
            {open && (
                <div className='add'>
                    <button className='addButton dark:border-white'>
                        <img src="./images/image.png" alt="" width={16} height={16}/>
                    </button>
                    <button className='addButton dark:border-white'>
                        <img src="./images/external.png" alt="" width={16} height={16}/>
                    </button>
                    <button className='addButton dark:border-white'>
                        <img src="./images/video.png" alt="" width={16} height={16}/>
                    </button>
                </div>
            )}
            <ReactQuill
            className='textArea dark:text-white'
            theme='bubble' 
            value={value} 
            onChange={setValue} 
            placeholder='Tell Your Story...'/>
        </div>
        <button className='publish'>Post🚀</button>
    </div>
  )
}

export default CreatePost
