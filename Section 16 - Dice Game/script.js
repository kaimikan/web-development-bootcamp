function giveDiceRoll() {
  return Math.floor(Math.random() * 6) + 1;
}
var img1 = document.querySelectorAll('img')[0];
var img2 = document.querySelectorAll('img')[1];
var player1 = document.querySelectorAll('p')[0];
var player2 = document.querySelectorAll('p')[1];
var button = document.querySelector('button');

function rollDice() {
  var roll1 = giveDiceRoll();
  var roll2 = giveDiceRoll();

  img1.setAttribute('src', './images/dice' + roll1 + '.png');
  img2.setAttribute('src', './images/dice' + roll2 + '.png');

  //without styling through js
  // player1.className = '';
  // player2.className = '';
  if (roll1 > roll2) {
    //player1.classList.add('winner');
    player1.className = 'winner';
    player2.className = 'loser';
  } else if (roll1 < roll2) {
    player2.className = 'winner';
    player1.className = 'loser';
  } else {
    player1.className = 'even';
    player2.className = 'even';
  }

  // with styling through js
  // if (roll1 > roll2) {
  //   player1.style.color = 'green';
  //   player2.style.color = 'red';
  // } else if (roll1 < roll2) {
  //   player1.style.color = 'red';
  //   player2.style.color = 'green';
  // } else {
  //   player1.style.color = 'blue';
  //   player2.style.color = 'blue';
  // }
}

rollDice();
button.addEventListener('click', rollDice);
