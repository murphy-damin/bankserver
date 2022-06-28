//   server creation

//   import express

const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
// import jsowebapp
const jwt = require('jsonwebtoken')

//   import express
const dataService =require('./services/data.service')

// server app create using express
const app = express()

// parse JSON data
app.use(express.json()) 

// application specific middlewear
const appMiddleware = (req,res,next)=>{
      console.log("Application spectfic middleware");
      next()
}
// use middleware in app
app.use(appMiddleware)
//  bank server

const jwtMiddleware =(req,res,next)=>{
    // fetch token
    token = req.body.token
    // verify token
    const data = jwt.verify(token,'supersecretkey12345')
    console.log(data);
}

// register API
app.post('/register',(req,res)=>{
    // register solving - asychronous
     dataService.register(req.body.username,req.body.acno,req.body.password)
     .then(result => {
    res.status(result.statusCode).json(result)

     })
})

// login API
app.post('/login',(req,res)=>{
    // register solving
     dataService.login(req.body.acno,req.body.pswd)
     .then(result => {
        res.status(result.statusCode).json(result)
    
})
})
app.post('/deposit',jwtMiddleware, (req,res)=>{
    // register solving
   const result = dataService.deposit(req.body.acno,req.body.password,req.body.amt)
   res.status(result.statusCode).json(result)

})
app.post('/withdraw',(req,res)=>{
    // register solving
   const result = dataService.withdraw(req.body.acno,req.body.password,req.body.amt)
   res.status(result.statusCode).json(result)

   app.post('/getTransaction',(req,res)=>{
    // register solving
   const result = dataService.getTransaction(req.body.acno)
   res.status(result.statusCode).json(result)
   
})

})
// user request resolving
// GET REQUEST - to fetch data
app.get('/',(req,res)=>{
    res.send("GET Request")
})
//  POST REQUEST -to create data
app.post('/',(req,res)=>{
    res.send("POST Request")
})
//  PUT REQUEST - to modify entire data
app.put('/',(req,res)=>{
    res.send("PUT Request")
})
//  PATCH REQUEST - to modify partially
app.patch('/',(req,res)=>{
    res.send("PATCH Request")
})
//   DELETE REQUEST - to delete data
app.delete('/',(req,res)=>{
    res.send("DELETE Request")
})

// set up port number to the server app
app.listen(3000,()=>{
    console.log("server started at 3000");})
