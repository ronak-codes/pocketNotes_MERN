const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true,
        default:uuidv4,
    },
    firstName:{
        type:String,
        required:false,
    },
    lastName:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

const User = mongoose.model('Users',userSchema);

module.exports = User