const express = require('express')
const cors = require('cors') //for transfer of data between platform of different origin
const bcrypt = require('bcryptjs') //for authentication
const salt = bcrypt.genSaltSync(10) //some random string to randominze the hashing process
//here 10 in bcrypt is that 10 rounds of hashing will take place by default it is 10
const jwt = require('jsonwebtoken')
const secret = 'asdfjkjlj3453' //secret code for jsonwebtoken
const cookieParser = require('cookie-parser')//for parsing the cookie data to know that the user is loged in or not
const { default: mongoose } = require('mongoose')
const Usermodel = require('./models/User')
const PostModel = require('./models/Post')
const app = express()
const multer = require('multer')
const uploadMiddleware = multer({dest: 'uploads/'})
const fs = require('fs')
const { isAbsolute } = require('path')

app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(cors({credentials:true, origin:'http://localhost:5173'})) //for allowing the credentials originated from the react localhost
app.use(express.json()) //express json parser to convert data from json to object
app.use(cookieParser())

//database connection
mongoose.connect('mongodb+srv://blog:sajcGJ2GSTke1jhh@cluster0.cnqeahp.mongodb.net/?retryWrites=true&w=majority')

app.post('/signup', async(req,res)=>{
    const {username, password} = req.body //the data will come in the req.body
    try{
        const userDoc = await Usermodel.create({
            username,
            password:bcrypt.hashSync(password, salt),
        })
        res.json(userDoc)
    }catch(e){
        res.status(400).json(e)
    }
    
})
app.post('/login', async(req,res)=>{
    const {username, password} = req.body
    const userDoc = await Usermodel.findOne({username})
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if(passOk){
        jwt.sign({username, id:userDoc._id}, secret, {}, (err, token)=>{
            if(err) throw err;
            res.cookie('token', token).json({
                id:userDoc._id,
                username,
            })
        })
    }else{
        res.status(400).json('Wrong credentials')
    }
})

app.get('/profile', (req,res)=>{
    const {token} = req.cookies
    jwt.verify(token, secret, {}, (err, info)=>{ //it will verfy our token
        if(err) throw err
        res.json(info)
    })
    res.json(req.cookies)
})

app.post('/logout', (req,res)=>{
    res.cookie('token', '').json('ok')
})

app.get('/post', async(req,res)=>{
    const Posts = await PostModel.find()
    .populate('author', ['username'])
    .sort({createdAt: -1}) //for sorting the post as the latest created post is listed at the top
    .limit(20) //first 20 post loaded on the page
    // here we have given username in the array becauser we want only username from the userinfo and not anything else
    res.json(Posts)
})
app.put('/post', uploadMiddleware.single('file'), async(req,res)=>{
    let newPath = null
    if(req.file){
    const {originalname, path} = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length -1]
    newPath = path+'.'+ext
    fs.renameSync(path, newPath)
    }
    const {token} = req.cookies
    jwt.verify(token, secret, {}, async(err, info)=>{ //it will verfy our token
        if(err) throw err
    const {id, title, summary, content} = req.body
    const postDoc = await PostModel.findById(id)
    const iSAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)
    if(!iSAuthor){
       return res.status(400).json('You are not the author')
    }
    await postDoc.updateOne({title, summary, content,
    cover:newPath?newPath:postDoc.cover})

    res.json(postDoc)
    })
})
app.post('/post', uploadMiddleware.single('file') ,async (req,res)=>{
    const {originalname, path} = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length -1]
    fs.renameSync(path, path+'.'+ext)

    const {token} = req.cookies
    jwt.verify(token, secret, {}, async(err, info)=>{ //it will verfy our token
        if(err) throw err
        const {title, summary, content} = req.body
    const postDoc = await PostModel.create({
    title,
    summary,
    content,
    cover: path+'.'+ext,
    author:info.id,
   })
   res.json({postDoc})
    })
   
})
app.get('/post/:id', async(req,res)=>{
    const {id} = req.params
    const postDoc = await PostModel.findById(id).populate('author', ['username'])
    res.json(postDoc)
})

app.listen(4000, ()=>{
    console.log(`server 4000 is ready!`)
})


//mongodb+srv://blog:sajcGJ2GSTke1jhh@cluster0.cnqeahp.mongodb.net/?retryWrites=true&w=majority
//database username: blog
//database password : sajcGJ2GSTke1jhh