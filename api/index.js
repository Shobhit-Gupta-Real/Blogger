const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json()) //express json parser to convert data from json to object

app.post('/signup', (req,res)=>{
    const {username, password} = req.body //the data will come in the req.body
    res.json({requestData:{username, password}})
})

app.listen(4000, ()=>{
    console.log(`server 4000 is ready!`)
})