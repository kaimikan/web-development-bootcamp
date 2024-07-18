import React, { useState } from "react";

function App() {
  const [contact, setContact] = useState({
    fName: "Anony",
    lName: "Mous",
    email: "anonymous@secret.com",
  });

  //CHALLENGE: Make the code in App.jsx work.
  //The final app should have a single contact
  //with fName, lName and email.

  function handleChange(event) {
    const { value, name } = event.target;

    setContact((prevValue) => {
      if (name === "fName") {
        return {
          fName: value,
          lName: prevValue.lName,
          email: prevValue.email,
        };
      } else if (name === "lName") {
        return {
          fName: prevValue.fName,
          lName: value,
          email: prevValue.email,
        };
      } else if (name === "email") {
        return {
          fName: prevValue.fName,
          lName: prevValue.lName,
          email: value,
        };
      }
    });
  }

  //HINT: You'll need to apply the following things you learnt:
  //1. Using JS Objects with state.
  //2. Making use of previous state when changing state.
  //3. Working with forms in React.
  //4. Handing events

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form>
        <input
          name="fName"
          placeholder="First Name"
          onChange={handleChange}
          value={contact.fName}
        />
        <input
          name="lName"
          placeholder="Last Name"
          onChange={handleChange}
          value={contact.lName}
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={contact.email}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
