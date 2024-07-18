var numbers = [3, 56, 2, 48, 5];
console.log("original numbers: ", numbers);

function resetNumbers() {
  numbers = [3, 56, 2, 48, 5];
}

//Map -Create a new array by doing something with each item in an array.
function double(x) {
  return x * 2;
}

const newNumbers = numbers.map(double);
// without extra method -> const newNumbers = numbers.map((x) => x*2);
console.log("doubled numbers: ", newNumbers);
resetNumbers();

//Filter - Create a new array by keeping the items that return true.
numbers.filter((num) => num > 10);
console.log("numbers > 10: ", numbers);
resetNumbers();

//Reduce - Accumulate a value by doing something to each item in an array.
var newNumber = numbers.reduce(
  (accumulator, currentNum) => accumulator + currentNum
);
console.log("acummulated numbers: ", newNumber);

//Find - find the first item that matches from an array.
var findAbove10 = numbers.find((num) => num > 10);
console.log("first num > 10: ", findAbove10);

//FindIndex - find the index of the first item that matches.
var findAbove10Index = numbers.findIndex((num) => num > 10);
console.log("first num > 10 index: ", findAbove10Index);
