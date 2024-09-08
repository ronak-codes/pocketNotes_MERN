import React, { useState, useEffect } from 'react';
import '../styles.css';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import NoteGroup from './NoteGroup';
import Note from './Note';
import NoteEditor from './NoteEditor';
import { getInitials } from '../utils/commonFunctions';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config/config';
import axios from 'axios';
import InitialPage from './InitialPage';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {

  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null); // Initially set to null
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [callGetAllGroups,setCallGetAllGroups] = useState(false);
  const [newGroup, setNewGroup] = useState({ groupId:"",title: "", color: '#007bff'});
  const navigate = useNavigate();

  let userId = localStorage.getItem("userId");

  useEffect(()=>{
    const getAllGroups = async () =>{
      try{
          const response = await axios.get(config.BASE_URL+`/api/notes/getAllGroups/${userId}`);
          console.log("groups are",response.data.groups);
          const allgroups=response?.data?.groups;
          setGroups(allgroups)

      }catch(err){
        console.error("Error while fetching groups:- "+err);
      }
    }
    getAllGroups();

  },[callGetAllGroups])

  const handleGroupSelect = async (group) => {

    setNotes([]);
    setSelectedGroup(group);

    const result = await axios.get(config.BASE_URL+`/api/notes/getAllNotesByGroup?groupId=${group?.groupId}&userId=${userId}`);
    const data = result.data;
    console.log("all notes for selected group",data);

    setNotes([...data]);
  };

  const handleAddGroup = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewGroup({ title: '', color: '#007bff', groupId:""});
  };

  const handleCreateGroup = async () => {
    if (newGroup.title.trim() === '') {
      toast.error('Group name cannot be empty');
      return;
    }
    
    const groupID = uuidv4(); 
    console.log("group id is",groupID);
    setNewGroup({...newGroup,groupID});
    
    setOpen(false);

    let reqBody={
      title:newGroup.title,
      color:newGroup.color,
      groupId:groupID,
      userId
    }
    console.log("request Body",reqBody);
    const result = await axios.post(config.BASE_URL+"/api/notes/createGroup",reqBody);
    if(result.status==201){
      setCallGetAllGroups(!callGetAllGroups)
    }

    console.log("result is",result);
  };

  const handleSaveNote = async (content) => {

    console.log("add this",content);
    console.log("selected Group",selectedGroup);


    let reqBody={
      userId:userId,
      groupId:selectedGroup.groupId,
      description:content,
      dateTime:new Date(),
    }

    await axios.post(config.BASE_URL+"/api/notes/addNewNote",reqBody);
    const result = await axios.get(config.BASE_URL+`/api/notes/getAllNotesByGroup?groupId=${selectedGroup.groupId}&userId=${userId}`);
    const data = result.data;
    console.log("check it",data);

    setNotes([...data]);

  };

  const handleColorSelect = (color) => {
    setNewGroup({ ...newGroup, color });
  };

  const handleSignOut = () =>{

    navigate("/signin");

  }

  return (
    <div className="app">
         <div className="sidebar">
           <div className="note-group-header">Pocket Notes</div>
           <NoteGroup groups={groups} onGroupSelect={handleGroupSelect} />
           <div>
            <button className="signout-button" onClick={handleSignOut}>SignOut</button>
            <button className="add-button" onClick={handleAddGroup}>+</button>
           </div>
         </div>
         <div className={`main ${!selectedGroup ? 'no-group-padding':'group-padding'}`}>
          {selectedGroup ? (
          <>
            <div className="notes-header" style={{ backgroundColor: selectedGroup.color }}>
              <div className="header-icon" style={{ backgroundColor: selectedGroup.color }}>
                {getInitials(selectedGroup.title)}
              </div>
              <h2>{selectedGroup.title}</h2>
            </div>
            <div className="notes-list">
              {notes?.map((note, index) => (
                <Note key={index} note={note} groupColor={selectedGroup.color} />
              ))}
            </div>
            <div className="note-editor-container">
              <NoteEditor onSave={handleSaveNote} />
            </div>
          </>
        ) : (
          <InitialPage/>
        )}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Group</DialogTitle>
        <DialogContent>
          <div className="dialog-content">
            <div className='dialog-row'>
              <div className="dialog-label">Group Name</div>
              <TextField
                autoFocus
                margin="dense"
                label="Group Name"
                type="text"
                fullWidth
                value={newGroup.title}
                onChange={(e) => setNewGroup({ ...newGroup, title: e.target.value })}
              />
            </div>
            <div className="dialog-label">Choose Color</div>
            <div className="color-picker">
              {['#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#00bcd4', '#009688'].map((color) => (
                <div
                  key={color}
                  className={`color-circle ${newGroup.color === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                />
              ))}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateGroup} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
        
    )
}

export default HomePage

