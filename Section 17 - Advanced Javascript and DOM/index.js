/*
// FIRST WAY
document.querySelector('button').addEventListener('click', handleClick);

function handleClick() {
  alert('BLAH');
}

// SECOND WAY
document.querySelector('button').addEventListener('click', function () {
  alert('BLAH');
});
*/

var buttons = document.querySelectorAll('button.drum');
//!! THIS IS NOT CORRECT SINCE OF SCOPE ISSUES
// for (var i = 0; i < buttons.length; i++) {
//   var button = buttons[i];
//   button.addEventListener('click', function () {
//     alert('BLAH' + i);
//   });
// }
// ^ https://medium.com/bite-size-programming/add-event-listener-for-loop-problem-in-javascript-ccfae00ccb2a
//!! THIS IS NOT CORRECT SINCE OF SCOPE ISSUES

// WORKS WITH this. THOUGH
// for (var i = 0; i < buttons.length; i++) {
//   var button = buttons[i];
//   button.addEventListener('click', function () {
//     this.style.color = 'white';
//   });
// }

var names = ['crash', 'kick-bass', 'snare', 'tom-1', 'tom-2', 'tom-3', 'tom-4'];
var imagePaths = [];
var audioPaths = [];
var keyboardKeys = [];

for (var i = 0; i <= names.length; i++) {
  imagePaths.push('./images/' + names[i] + '.png');
  audioPaths.push('./sounds/' + names[i] + '.mp3');
}

buttons.forEach(function (button, index) {
  keyboardKeys.push(button.innerHTML.toLowerCase());
  button.style.background = "url('" + imagePaths[index] + "')";
  button.addEventListener('click', function () {
    var audio = new Audio(audioPaths[index]);
    audio.play();
  });
});

// CALLBACK (function(event)) used to get the key pressed
document.addEventListener('keydown', function (event) {
  if (keyboardKeys.includes(event.key)) {
    var btn = document.querySelector('button.' + event.key);
    btn.click();
    btn.classList.add('pressed');
    setTimeout(function () {
      btn.classList.remove('pressed');
    }, 100);
  }
});

/*
// EXAMPLE: PASSING FUNCTIONS AS ARGUMENTS - higher order functions
function add(n1, n2) {
  return n1 + n2;
}

function multiply(n1, n2) {
  return n1 * n2;
}

function calculation(n1, n2, operation) {
  return operation(n1, n2);
}

console.log(calculation(2, 3, multiply));

// SWITCH CASE

const expr = 'Papayas';
switch (expr) {
  case 'Oranges':
    console.log('Oranges are $0.59 a pound.');
    break;
  case 'Mangoes':
  case 'Papayas':
    console.log('Mangoes and papayas are $2.79 a pound.');
    // Expected output: "Mangoes and papayas are $2.79 a pound."
    break;
  default:
    console.log(`Sorry, we are out of ${expr}.`);
}

// OBJECTS

var examplePerson = {
  name: 'Example Name',
  age: 25,
  weight: 250,
  hobbies: ['1', '2', '3'],
};

console.log(examplePerson);

// CONSTRUCTOR FUNCTION
function ExamplePerson(name, age, weight, hobbies) {
  this.name = name;
  this.age = age;
  this.weight = weight;
  this.hobbies = hobbies;
  this.breathing = function () {
    console.log(name + ' is breathing.');
  };
}

var examplePerson2 = new ExamplePerson('Timmy', 4, 25, []);
examplePerson2.breathing();
*/
