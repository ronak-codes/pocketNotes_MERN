import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Avatar } from '@mui/material';
import { getInitials } from '../utils/commonFunctions';

const NoteGroup = ({ groups, onGroupSelect }) => {

  console.log("Notegroups",groups)
  
  return (
    <div className="note-group">
      <List className="note-group-list">
        {groups.map((group, index) => (
          <ListItem ButtonBase key={index} onClick={() => onGroupSelect(group)}>
            <ListItemIcon>
              <Avatar style={{ backgroundColor: group.color }}>
                {getInitials(group.title)}
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={group.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default NoteGroup;
