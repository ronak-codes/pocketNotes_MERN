const notesGroup = require("../models/groupModel");

const createGroup = async(req,res) =>{
    try{
        console.log("group request",req.body);
        const newGroup = new notesGroup(req.body);
        await newGroup.save();
        return res.status(201).json({msg:"Group created !!"});
    }catch(err){
        console.error("Error occured while creating group");
        res.status(500).json({msg:"error while creating group : => "+err});
    }
}

const getAllGroups = async(req,res) =>{
    try{
        let userId = req.params.userId;
        console.log("userId",req.params.userId);
        const groups = await notesGroup.find({userId:userId});
        console.log("groups are",groups);
        res.status(200).json({groups});

    }catch(err){
        console.error("Error occured in get all groups :- "+err);
        res.status(500).json({msg:"error while fetching all group : => "+err});
    }
}

module.exports ={
    createGroup,
    getAllGroups
}