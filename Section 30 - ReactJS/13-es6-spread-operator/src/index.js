import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./../public/styles.css";

ReactDOM.render(<App />, document.getElementById("root"));

const citrus = ["Lime", "Lemon", "Orange"];
const fruits = ["Apple", ...citrus, "Banana", "Coconut", ...citrus];

console.log(fruits);

const fullName = {
  fName: "James",
  lName: "Bond",
};

const user = {
  ...fullName,
  id: 1,
  username: "007",
};

console.log(user);
