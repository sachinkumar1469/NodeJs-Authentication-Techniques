const express = require('express');
const path = require('path');

const userModel = require('../model/UserModel');

const passport = require('passport');

const router = express.Router();

router.get('/login',(req,res,next)=>{
    console.log("In Login Get Route");
    return res.render(path.join(__dirname,'..','views','login'));
});

router.post('/login',passport.authenticate('local',{failureRedirect:"/login"}),(req,res,next)=>{
    console.log("In Login Post Route");

    return res.redirect('/')
});

router.get('/logout',(req,res,next)=>{
    console.log("In logout route");
    // req.logout((err)=>{
    //     if(err){
    //         console.log("Error in logging user out");
    //     } else {
    //         res.redirect('/');
    //     }
    // });

    req.session.destroy((err)=>{
        if(err) {
            console.log("Error in logout");
        } else {
            res.redirect('/');
        }
    })
})


module.exports.router = router;

