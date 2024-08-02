import React, { useState } from "react";

function App() {
  const [headingText, setHeadingText] = useState("Test");

  function handleClick() {
    console.log("clicked");
    setHeadingText("Tested");
  }

  function updateButtonStyle(event) {
    let element = event.target;
    element.style.backgroundColor == "black"
      ? (element.style.backgroundColor = "white")
      : (element.style.backgroundColor = "black");
  }

  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
      <button
        onClick={handleClick}
        onMouseOver={updateButtonStyle}
        onMouseOut={updateButtonStyle}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
