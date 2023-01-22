const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:mongoose.SchemaTypes.String,
        required:true,
    },
    email:{
        type:mongoose.SchemaTypes.String,
        required:true,
    },
    password:{
        type:mongoose.SchemaTypes.String,
        required:true,
    },
});

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;