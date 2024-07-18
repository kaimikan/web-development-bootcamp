import React, { useState } from "react";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    /*
    from: https://stackoverflow.com/questions/11508463/javascript-set-object-key-by-variable?noredirect=1&lq=1
    UPDATE 2021:

    Computed property names feature was introduced in ECMAScript 2015 (ES6) that allows you to dynamically compute the names of the object properties in JavaScript object literal notation.

    const yourKeyVariable = "happyCount";
    const someValueArray= [...];

    const obj = {
        [yourKeyVariable]: someValueArray,
    }
    */

    setContact((prevValue) => {
      return {
        [name]: value,
        ...prevValue,
      };
    });
  }

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form>
        <input
          onChange={handleChange}
          name="fName"
          value={contact.fName}
          placeholder="First Name"
        />
        <input
          onChange={handleChange}
          name="lName"
          value={contact.lName}
          placeholder="Last Name"
        />
        <input
          onChange={handleChange}
          name="email"
          value={contact.email}
          placeholder="Email"
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
