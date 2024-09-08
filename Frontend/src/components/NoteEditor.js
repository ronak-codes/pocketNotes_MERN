import React from 'react';
import { TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const NoteEditor = ({ onSave }) => {
  const [content, setContent] = React.useState('');

  const handleSave = () => {
    if (content.trim()) {
      onSave(content);
      setContent('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default action of the Enter key
      handleSave();
    }
  };

  return (
    <div className="note-editor">
      <TextField
        label="Enter your text here..."
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown} // Add this line
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={handleSave}
              disabled={!content.trim()}
              color="primary"
              style={{ position: 'absolute', right: 10, bottom: 10 }}
            >
              <SendIcon />
            </IconButton>
          ),
          style: { paddingRight: '48px' }, // Padding to make space for the icon
        }}
      />
    </div>
  );
};

export default NoteEditor;
