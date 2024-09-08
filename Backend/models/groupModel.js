const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');


const groupSchema = new mongoose.Schema({
    groupId: {
        type: String,
        unique: true,
        required: true,
        default: uuidv4,
    },
    userId:{
        type:mongoose.Schema.Types.String,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    color:{
        type:String,
        required:true
    }
},{timestamps:true});

const notesGroup = mongoose.model("notesGroup",groupSchema);

module.exports = notesGroup