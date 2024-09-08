import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import moment from 'moment'; // Import moment

const Note = ({ note, groupColor }) => {
  // Format the date using moment
  console.log("Note is",note);
  const formattedDate = moment(note.dateTime).format('D MMM YYYY [·] h:mm A');

  return (
    <Card className="note-card" style={{ borderLeft: `5px solid ${groupColor}`, position: 'relative' }}>
      <CardContent>
        <Typography variant="body2" component="p">
          {note.description}
        </Typography>
        <Typography variant="caption" color="textSecondary" style={{ position: 'absolute', bottom: 10, right: 10 }}>
          {formattedDate}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Note;
