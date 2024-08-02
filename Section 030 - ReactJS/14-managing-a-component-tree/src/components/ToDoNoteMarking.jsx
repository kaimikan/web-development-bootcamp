import React, { useState } from "react";

/* <li onClick={toggleItem} ...*/
// function toggleItem(event) {
//   event.target.style.textDecoration == "line-through"
//     ? (event.target.style.textDecoration = "none")
//     : (event.target.style.textDecoration = "line-through");
// }

function ToDoNoteMarking(props) {
  const [isDone, setIsDone] = useState(false);

  function handleClick() {
    setIsDone((prevValue) => {
      return !prevValue;
    });
  }

  return (
    <div onClick={handleClick}>
      <li style={{ textDecoration: isDone ? "line-through" : "none" }}>
        {props.noteText}
      </li>
    </div>
  );
}

export default ToDoNoteMarking;
