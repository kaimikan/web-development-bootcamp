// var React = require("react");
// var ReactDOM = require("react-dom");
import React from "react";
import ReactDOM from "react-dom";

// // this converts html into plain javascript using babel
// // this is what allows us the freedom to use plain html instead of DOM creation
// ReactDOM.render(
//   /* what to show */ <h1>Hello World!</h1>,
//   /* where to show it */ document.getElementById("root")
// );

// // the above call ^ does the same thing as this one below
// var h1 = document.createElement("h1");
// h1.innerHTML = "Hello world 2";
// document.getElementById("root").appendChild(h1);

// // ! BABEL allows us to write code using the latest innovations with next-gen js (es6) without us needing to worry about it being readable by
// // older browsers since it gets converted to plain javascript after we write it

//It should display an unordered list (bullet points).
//It should contain 3 list elements.

const name = "Name";
// can load expressions (3+4) into the render but not statements (if () else ...)
// ^ https://www.youtube.com/watch?v=WVyCrI1cHi8&list=PL-xu4i_QDSxcoDNeh8rx5-pHCCTOg0XsI
const year = new Date().getFullYear();
const picsumImg = "https://picsum.photos/100";

// this is different from the inline style in plain html
// since the react dom imports it as an object instead of string (eg. styles="color: orange")
// notice that css kebab-casing is also converted to camel-case
const inlineStyle = {
  color: "orange",
  fontSize: "20px",
  border: "1px solid grey",
};
inlineStyle.color = "black";

ReactDOM.render(
  <div>
    {/* we do camel case for all the usual html attributes in here */}
    <h1 className="heading">Hello {name}!</h1>
    <p>A random number is {Math.floor(Math.random() * 10)}</p>
    <ul>
      <li style={inlineStyle}>1</li>
      <li>2</li>
      <li>3</li>
    </ul>

    <img className="picsum-img" alt="random-picsum-img" src={picsumImg} />
    <div>Copyright {year}</div>
  </div>,
  document.getElementById("root")
);
