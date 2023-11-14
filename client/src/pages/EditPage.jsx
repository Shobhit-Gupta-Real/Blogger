import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import ReactQuill from "react-quill" //code editor api 
import 'react-quill/dist/quill.snow.css'; //for the style of the code editor 

function EditPage() {

    const modules = {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          ['clean'],
        ],
    };
    
    const {id} = useParams()
    const [open,setOpen] = useState(false)//for opening the plus button of the image
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [value, setValue] = useState('')
    const [files, setFiles] = useState('')
    const [redirect, setRedirect] = useState(false)

    useEffect(()=>{
        fetch('http://localhost:4000/post/'+id)
        .then(response =>{
            response.json().then(postInfo =>{
                setTitle(postInfo.title)
                setValue(postInfo.content)
                setSummary(postInfo.summary)
            })
        })
    },[])

    async function updatePost(ev){
        ev.preventDefault()
        const data = new FormData()
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', value);
        data.set('id', id)
        if(files?.[0]){
            data.set('file', files?.[0])
        }
        const response = await fetch('http://localhost:4000/post',{
            method: 'PUT',
            body: data,
            credentials: 'include',
        })
        if(response.ok){
            setRedirect(true)
        }
    }

    if(redirect){
        return <Navigate to={'/post/'+id} />
    }
    return (
        <>
        <input type="text" placeholder='Title' className='title dark:text-white'
        value={title} onChange={(e)=> setTitle(e.target.value)}/>
        <input type="text" placeholder='Summary' className='summary dark:text-white'
        value={summary} onChange={(e)=>setSummary(e.target.value)}/>
        <input type="file"
             onChange={ev => setFiles(ev.target.files)} className='file_input dark:text-white'/>
        <div className='editor'>
            <ReactQuill
            className='textArea dark:text-white'
            theme={'snow'} 
            value={value} 
            onChange={setValue}
            modules={modules}
            placeholder='Tell Your Story...'/>
        </div>
        <button className='publish' onClick={updatePost}>Update🚀</button>
        </>
  )
}

export default EditPage
