const express = require('express');
const path = require('path');

const userModel = require('../model/UserModel');

const router = express.Router();

router.get('/login',(req,res,next)=>{
    console.log("In Login Get Route");
    return res.render(path.join(__dirname,'..','views','login'));
});

router.post('/login',(req,res,next)=>{
    console.log("In Login Post Route");

    const {email,password} = req.body;

    userModel.findOne({email,password})
        .then(result=>{
            // console.log(result);
            if(result){
                // res.cookie('userId',result._id);
                req.session.userId = result._id;
                console.log("Session id of an user at singin",req.sessionID);
                return res.redirect('/');
            } else {
                return res.redirect('back');
            }
        })
        .catch(err=>{
            console.log("Unbale to find user in login route");
        })
})


module.exports.router = router;

