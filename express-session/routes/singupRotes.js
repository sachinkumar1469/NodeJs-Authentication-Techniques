const express = require('express');
const path = require('path');
const userModel = require('../model/UserModel');

const router = express.Router();

router.get('/signup',(req,res,next)=>{
    console.log("In Get SignUp Route");
    // console.log(req.cookies);
    return res.render(path.join(__dirname,'..','views','signup'));
})

router.post('/signup',(req,res,next)=>{
    const {name,email,password,confirmPassword}= req.body;
    userModel.create({name,email,password})
        .then(result=>{
            // console.log(result);
            // res.cookie("userId",result._id.toString());
            // res.render(path.join(__dirname,'..','views','home'),{user:result});
            return res.redirect('/login');
        })
        .catch(err=>{

            console.log("Unable to save user in db");
            console.log(err);
        })
})

module.exports.router = router;