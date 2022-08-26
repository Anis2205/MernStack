const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const{JWT_SECRET} = require('../key')
const requireLogin = require('../middleware/requireLogin')

router.get('/protected',requireLogin,(req,res)=>{
    res.send("hello user")
    //get this resource only when user is logged in..
    //for verifying will create middleware.
})

router.post('/signup',(req,res)=>{
    const {name,email,password} = req.body
    console.log(name,email,password)
    if(!email || !password || !name){
        return res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
                return res.status(422).json({error:"user already exists with that mail"})
            }
            bcrypt.hash(password,12)
            .then(hashedpassword=>{
                const user = new User({
                    email,
                    password : hashedpassword,
                    name
                })
                user.save()
                .then(user=>{
                    res.json({message:"successfully saved"})
    
                })
                .catch(err=>{
                    console.log(err)
                })


            })
            
        })
        .catch(err=>{console.log(err)

 })
    
})


router.post('/signin',(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email or password"})

        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                //res.json({message:"successfully signed in"})
                //generating token on basis of user id
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const{_id,name,email}=savedUser
                res.json({token,user:{_id,name,email}})
                //sending token as response
            }
            else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })


})

module.exports = router
