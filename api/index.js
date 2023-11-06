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
const app = express()

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
            res.cookie('token', token).json('ok')
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

app.listen(4000, ()=>{
    console.log(`server 4000 is ready!`)
})


//mongodb+srv://blog:sajcGJ2GSTke1jhh@cluster0.cnqeahp.mongodb.net/?retryWrites=true&w=majority
//database username: blog
//database password : sajcGJ2GSTke1jhh