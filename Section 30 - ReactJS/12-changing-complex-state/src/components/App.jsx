import React, { useState } from "react";

function App() {
  const [fullName, setFullName] = useState({
    firstName: "Anony",
    lastName: "Mous",
  });

  function handleChange(event) {
    // Method 1
    if (event.target.name === "fName") {
      setFullName({
        firstName: event.target.value,
        lastName: fullName.lastName,
      });
    } else {
      setFullName({
        firstName: fullName.firstName,
        lastName: event.target.value,
      });
    }

    // Method 2 - Tutor's Way (recommends to not put event.target inside setState - synthetic events)
    // can destruct the event.target like this:
    const { value, name } = event.target;
    setFullName((prevValue) => {
      if (name === "fName") {
        return {
          firstName: value,
          lastName: prevValue.lastName,
        };
      } else if (name === "lName") {
        return {
          firstName: prevValue.firstName,
          lastName: value,
        };
      }
    });
  }

  return (
    <div className="container">
      <h1>
        Hello, {fullName.firstName} {fullName.lastName}!
      </h1>
      <form>
        <input name="fName" placeholder="First Name" onChange={handleChange} />
        <input name="lName" placeholder="Last Name" onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
