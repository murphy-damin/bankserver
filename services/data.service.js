const { status } = require("express/lib/response")
// import jsonwebtoken
const jwt = require('jsonwebtoken')
//  import db.js
const db= require('./db')

// // DATABASE
// db = {
//          1000: { "acno": 1000, "username": "ram", "password": 1000, "balance": 5000,transaction:[] },
//          1001: { "acno": 1001, "username": "anu", "password": 1001, "balance": 5000,transaction:[] },
//          1002: { "acno": 1002, "username": "carlo", "password": 1002, "balance": 3000,transaction:[]},
//   }

// register
const register=(username, acno,password)=> {
  // asychronous

   return db.User.findOne({
     acno
    }) .then(user=>{
      console.log(user);
      if (user) {
        return {
        status:false,
        message:"Already registerd..please Log in ",
        statusCode:401
        }       
}
else {
    // insert in db
    const newUser = new db.User({

        acno,
        username,
        password,
        balance: 0,
        transaction:[]
      }
    )
  
    newUser.save()
    return {
        status:true,
        message:"Registered sucessfully ",
        statusCode:200
}
}
    })

    
}


// login -asychronous
const login=(acno,pswd)=> {

  return db.User.findOne({
    acno,
    password:pswd
}) .then(user => {
   if(user){
     console.log(user);
     currentuser =user.username
     currentAcno = acno
      //  token generation
      token = jwt.sign({
        // store account number inside token
        currentAcno:acno
      },'supersecretkey12345')
      
       return{
        status:true,
        message:"Login scussesfully",
        statusCode:200,
        currentuser,
        currentAcno,
        token

       }
      }    
    
    else{
      return{
        status: false,
        message:"invalid ccredention",
        statusCode:401
      }
      
    }

})

}
// deposite - asychronous
const deposit=(acno,password,amt)=>{
    var amount = parseInt(amt)
    return db.User . findOne({
      acno,password
    }) .then(user=>{
      if (user){
      
        })
      }
    }
    if(acno in db){
      if(password ==db[acno]["password"]){
        db[acno]["balance"]+=amount
        db[acno].transaction.push({
          type:"CREDIT",
          amount:amount
        })
        console.log(db);
        
        return {
          status:true,
          message:amount+"deposite new balance is"+db[acno]["balance"],
          statusCode:200
        }
      }
      else{
        return {
          status:false,
          message:"incorrect password",
          statusCode:401
        }
      }
    }
    else{
      return {
        status:false,
        message:"user does not exist",
        statusCode:401
      }
    }
  }
  const withdraw=(acno,password,amt)=>{
    var amount = parseInt(amt)
    if(acno in db){
      if(password ==db[acno]["password"]){
        if(db[acno]["balance"]>amount)
        {
          db[acno]["balance"]-=amount
        db[acno].transaction.push({
          type:"DEBITE",
          amount:amount
        })
        console.log(db);
        
        return {
          status:true,
          message:amount+"withdraw new balance is"+db[acno]["balance"],
          statusCode:200
        }

        }
        else{
          return {
            status:false,
            message:"insufficeint balance",
            statusCode:401
          }

        }
        
      }
      else{
        return {
          status:false,
          message:"incorrect password",
          statusCode:401
        }
      }
    }
    else{
      return {
        status:false,
        message:"user does not exist",
        statusCode:401
      }
    }
  }
  // transaction
  const getTransaction=(acno)=>{

    if (acno in db){
      return {
        status:true,
        statusCode:200,
        transaction:db[acno].transaction

      }
    }
    else{
      return{
        status:false,
      message:"user does not exist!!!",
      statusCode:401

      }
      
    }
  }
    

// export
module.exports={
   register,
   login,
   deposit,
   withdraw,
   getTransaction
}