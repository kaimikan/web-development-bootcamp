import React, { useState } from "react";

function App() {
  const [notes, setNotes] = useState(["asdasd"]);
  const [newNote, setNewNote] = useState("");

  function showNote(note) {
    return <li>{note}</li>;
  }

  function addNote() {
    setNotes((prevValue) => {
      return [...prevValue, newNote];
    });
    setNewNote("");
  }

  function changeNote(event) {
    setNewNote(event.target.value);
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" onChange={changeNote} value={newNote} />
        <button onClick={addNote}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>{notes.map(showNote)}</ul>
      </div>
    </div>
  );
}

export default App;
