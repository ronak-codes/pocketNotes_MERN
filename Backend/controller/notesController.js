const Notes = require("../models/notesModel");

const addNewNote = async (req,res) =>{
    try{
    
        const addNewNote = new Notes(req.body);
        let response = await addNewNote.save();
        console.log("response is",response);
        res.status(200).json({msg:"Note added Successfully"});
    }catch(error){
        console.error("Error occurred during add new note ==>",error);
    }
}



const getAllNotesByGroup = async(req,res)=>{
    try{
        let {userId,groupId}=req.query;
        console.log("userId",userId);
        console.log("groupId",groupId);
        let criteria ={
            userId:userId,
            groupId:groupId
        }
        const result=await Notes.find(criteria);
        console.log("result",result);
        let allNotes = result.map(item =>({
            description:item.description,
            dateTime:item.dateTime
        }))
        console.log("allNotes",allNotes);

        res.status(200).json(allNotes);

    }catch(error){
        console.error("error occurred in getAllNotesByGroup",error);
    }
}

module.exports ={
    addNewNote,
    getAllNotesByGroup
}