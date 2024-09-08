const express = require("express")
const {createGroup, getAllGroups} = require("../controller/groupController")
const {addNewNote,getAllNotesByGroup} = require("../controller/notesController");


const router = express.Router();

router.get("/hello",(req,res)=>{
    res.status(200).json({msg:"Hello World"});
})
router.post("/createGroup",createGroup);
router.get("/getAllGroups/:userId",getAllGroups);

router.post("/addNewNote",addNewNote);
router.get("/getAllNotesByGroup",getAllNotesByGroup);



module.exports = router