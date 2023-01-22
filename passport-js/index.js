const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const customPassport = require('../passport');

console.log('index js file is executing');

const userModel = require('../model/UserModel');

const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();



const store = new MongoDBStore({
    uri:'mongodb+srv://sachinyadav1469:Sachin%40123@cluster0.my3twen.mongodb.net/cn?retryWrites=true&w=majority',
    collection:'mySessionStore'
})

mongoose.set('strictQuery', false);

mongoose.connect('mongodb+srv://sachinyadav1469:Sachin%40123@cluster0.my3twen.mongodb.net/cn?retryWrites=true&w=majority')
        .then(result=>{
            // console.log(result);
            app.listen(4200);
        })
        .catch(err=>{
            console.log("Unable to connect to db");
        })


const loginRouter = require('../routes/loginRoutes');
const singupRouter = require('../routes/singupRotes');



app.set('view engine','ejs');
app.set('views','views');

app.use(cookieParser());

app.use(express.urlencoded({extended:false}));

app.use(express.static('public'));

app.use(session({
    secret:"thisismysecretkey",
    saveUninitialized:false,
    resave:false,
    store:store
}));

app.use(customPassport.initialize());
app.use(customPassport.session());

app.use(loginRouter.router);

app.use(singupRouter.router);


app.use("/",routeAuthentication,(req,res,next)=>{
    console.log("In Home Page Route");

    console.log("Cookies in request in home page",req.cookies);

    console.log("Session id in home page",req.sessionID);

    console.log("REquese user attached by passport js is",req.user);


    res.render(path.join(require.main.filename,'..','views','home'),{user:req.user});
   
});


function routeAuthentication(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/login');
}

