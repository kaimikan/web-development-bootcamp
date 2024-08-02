import React, { useState } from "react";
import ToDoNote from "./ToDoNote";
import ToDoNoteMarking from "./ToDoNoteMarking";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem() {
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });
    setInputText("");
  }

  function deleteNote(id) {
    console.log("called delete for note");
    setItems((prevNotes) => {
      return prevNotes.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={inputText} />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((todoItem, index) => (
            // <ToDoNoteMarking noteText={todoItem} />
            <ToDoNote
              key={index}
              id={index}
              noteText={todoItem}
              onChecked={deleteNote}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
