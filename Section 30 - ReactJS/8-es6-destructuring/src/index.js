// // DESTRUCTURING PRACTICE
// import animals, { useAnimals } from "./data";

// console.log(animals);

// // when destructuring an array, names don't matter since they just represent index 0, 1 ...
// let [cat, dog] = animals;
// console.log(cat, dog);

// // when destructuring an object, the field names have to match
// // const { name: catName, sound: catSound } = cat;
// // console.log(catSound);
// // they can be renamed though ^
// // can give default values if fields are not defined like this -> const { name = "Fluffy", sound = "Purr" } = cat;

// const {
//   name,
//   sound,
//   feedingRequirements: { food, water },
// } = cat;
// console.log(food);

// const [animal, makeSound] = useAnimals(cat);
// console.log(animal);
// makeSound();

// CHALLENGE: uncomment the code below and see the car stats rendered
import React from "react";
import ReactDOM from "react-dom";
import cars, { useCars } from "./practice";

const [honda, tesla] = cars;
// Method 1
// const [hondaTopSpeed, hondaTopColour] = useCars(honda);
// const [teslaTopSpeed, teslaTopColour] = useCars(tesla);
// Method 2
const {
  speedStats: { topSpeed: hondaTopSpeed },
} = honda;
const {
  coloursByPopularity: [hondaTopColour],
} = honda;

const {
  speedStats: { topSpeed: teslaTopSpeed },
} = tesla;
const {
  coloursByPopularity: [teslaTopColour],
} = tesla;

ReactDOM.render(
  <table>
    <tr>
      <th>Brand</th>
      <th>Top Speed</th>
    </tr>
    <tr>
      <td>{tesla.model}</td>
      <td>{teslaTopSpeed}</td>
      <td>{teslaTopColour}</td>
    </tr>
    <tr>
      <td>{honda.model}</td>
      <td>{hondaTopSpeed}</td>
      <td>{hondaTopColour}</td>
    </tr>
  </table>,
  document.getElementById("root")
);
