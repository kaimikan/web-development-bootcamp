import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [heading, setHeading] = useState("Anon");

  function handleChange(event) {
    console.log("changed ", event.target.value);
    setName(event.target.value);
  }

  function addName(event) {
    setHeading(name);
    // setName(document.getElementById("name").value);

    // when called from the <form onSubmit
    // it prevents the default behaviour of page refresh
    event.preventDefault();
  }

  return (
    <div className="container">
      <h1>Hello, {heading}!</h1>
      <form onSubmit={addName}>
        <input
          type="text"
          id="name"
          placeholder="What's your name?"
          onChange={handleChange}
        />
        <button>Submit</button>
        {/* <button onClick={addName}>Submit</button> */}
      </form>
    </div>
  );
}

export default App;
