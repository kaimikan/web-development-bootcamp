import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
// fab = floating action button
import { Fab } from '@mui/material';
import { Zoom } from '@mui/material';

function CreateArea(props) {
  const [note, setNote] = useState({ title: '', content: '' });
  const [isZoomed, setZoomed] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    console.log(name, value);
    setNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
        id: props.id,
      };
    });
    console.log(note);
  }

  function addNote(event) {
    event.preventDefault();
    props.onAdd(note);
    setNote({ title: '', content: '' });
  }

  function zoomIn() {
    setZoomed(true);
  }

  return (
    <div>
      <form className="create-note" onClick={zoomIn} onSubmit={addNote}>
        <input
          style={{ display: isZoomed ? '' : 'none' }}
          name="title"
          placeholder="Title"
          value={note.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows={isZoomed ? '3' : '1'}
          value={note.content}
          onChange={handleChange}
        />
        <Zoom in={isZoomed} style={{ display: isZoomed ? '' : 'none' }}>
          <Fab type="submit">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
