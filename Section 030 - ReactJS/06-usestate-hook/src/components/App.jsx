import React, { useState } from "react";

function App() {
  // const state = useState(0);

  //! DESTRUCTURING
  // const rgb = [9, 132, 227];
  const [red, green, blue] = [9, 132, 227];
  console.log(green);

  const [count, setCount] = useState(0);

  function increase() {
    setCount(count + 1);
  }

  function decrease() {
    setCount(count - 1);
  }

  return (
    <div className="container">
      <h1>{count}</h1>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}

export default App;
