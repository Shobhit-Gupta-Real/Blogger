const express = require('express')
require('dotenv').config()
const cors = require('cors') //for transfer of data between platform of different origin
const bcrypt = require('bcryptjs') //for authentication
const salt = bcrypt.genSaltSync(10) //some random string to randominze the hashing process
//here 10 in bcrypt is that 10 rounds of hashing will take place by default it is 10
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET //secret code for jsonwebtoken
const cookieParser = require('cookie-parser')//for parsing the cookie data to know that the user is loged in or not
const { default: mongoose } = require('mongoose')
const Usermodel = require('./models/User')
const PostModel = require('./models/Post')
const app = express()
const cloudinary = require('cloudinary').v2
const multer = require('multer') //it is a middleware for handling file uploads.
const {blogImg} = require('./cloudinary/post')
const blogUpload = multer({storage: blogImg})

app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(cors({credentials:true, origin:['https://deploy-mern-1whq.vercel.app'], methods: ["POST", "GET"]})) //for allowing the credentials originated from the react localhost
app.use(express.json()) //express json parser to convert data from json to object
app.use(cookieParser())

//database connection
mongoose.connect(process.env.MONGOOSE_CONNECT)

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
        jwt.sign({username, id:userDoc._id}, //payload
            secret,//secret key
            {},//here you can set the properties like expiration time of the token and algorithm etc.
            (err, token)=>{ //call back function after the token is generated
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
app.put('/post', blogUpload.single('file'), async(req,res)=>{
    let image = null
    if(req.file){
    const uploading = req.file
    console.log(uploading)
    image = {url: uploading.path, filename: uploading.filename}
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
    if(image){
        const imgId = postDoc.cover.filename
        await cloudinary.uploader.destroy(imgId)
    }
    await postDoc.updateOne({title, summary, content,
    cover:image?image:postDoc.cover})
    res.json(postDoc)
    })
})
app.post('/post', blogUpload.single('file'), async (req,res)=>{
    const uploading = req.file
    console.log(uploading)
    const image = {url: uploading.path, filename: uploading.filename}
    const {token} = req.cookies
    jwt.verify(token, secret, {}, async(err, info)=>{ //it will verfy our token
        if(err) throw err
    const {title, summary, content} = req.body
    const postDoc = await PostModel.create({
    title,
    summary,
    content,
    cover: image,
    author:info.id,
   })
   res.json({postDoc})
    })
   
})
app.post('/delete/:id', async(req,res)=>{
    const {id} = req.params
    const postDoc = await PostModel.findById(id)
    const imgId = postDoc.cover.filename
    await cloudinary.uploader.destroy(imgId)
    const post = await PostModel.findByIdAndDelete(id)
    res.json(post)
})

app.get('/post/:id', async(req,res)=>{
    const {id} = req.params
    const postDoc = await PostModel.findById(id).populate('author', ['username'])
    res.json(postDoc)
})

app.listen(4000, ()=>{
    console.log(`server 4000 is ready!`)
})