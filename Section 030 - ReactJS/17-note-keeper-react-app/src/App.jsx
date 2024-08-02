import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Note from './components/Note.jsx';
import CreateArea from './components/CreateArea.jsx';

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(note) {
    console.log(note);
    setNotes((prevNotes) => {
      return [...prevNotes, note];
    });
  }

  function deleteNote(id) {
    console.log('Trying to delete note with ID: ', id);
    setNotes((prevNotes) => {
      return prevNotes.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note, index) => (
        <Note
          onChecked={deleteNote}
          key={index}
          id={index}
          title={note.title}
          content={note.content}
        />
      ))}

      <Footer />
    </div>
  );
}

export default App;
