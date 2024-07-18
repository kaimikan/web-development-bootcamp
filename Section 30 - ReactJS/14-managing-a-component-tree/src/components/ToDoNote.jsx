import React, { useState } from "react";

function ToDoNote(props) {
  return (
    <div
      onClick={() => {
        props.onChecked(props.id);
        // we do this way of calling since we do not want to
        //activate function on element creation
      }}
    >
      <li>{props.noteText}</li>
    </div>
  );
}

export default ToDoNote;
