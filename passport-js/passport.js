const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserModel = require('./model/UserModel');


console.log("Passport js file is executing");

passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:"password"
},(username,password,done)=>{
    console.log("In local strategy constructor");
    console.log("Username:",username);
    console.log("Password:",password);

    UserModel.find({email:username,password:password},(err,user)=>{
        if(err){
            return done(err);
        }

        if(!user){
            return done(null,false);
        }

        return done(null,user[0]);
    })

}));

passport.serializeUser((user,done)=>{
    console.log("\n\n Serializer Called \n\n");
    console.log(user);
    done(null,user._id);
});

passport.deserializeUser((userId,done)=>{
    console.log("\n\n Descerliazer called \n\n");
    UserModel.findById(userId,(err,user)=>{
        if(err){
            return done(err);
        }

        return done(null,user);
    })
});



module.exports = passport;