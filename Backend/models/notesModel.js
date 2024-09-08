const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.String, 
        ref: 'Group', // Referencing the 'Group' model
        required: true,
      },
    userId:{
        type:mongoose.Schema.Types.String,
        ref:"User",
        required:true
    },
    description:{
        type:String
    },
    dateTime:{
        type:Date,
        required:true
    }
},{timestamps:true});

const Notes = mongoose.model("Notes",notesSchema);

module.exports = Notes;