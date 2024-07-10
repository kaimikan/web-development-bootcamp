$(document).ready(function () {
  var buttonColors = ['red', 'blue', 'green', 'yellow'];
  var randomChosenColor;
  var gamePattern = [];
  var userPattern = [];
  var hasGameStarted = false;
  var level = 0;

  function nextSequence() {
    updateLevel('Level ' + level);
    var randomNumber = Math.round(Math.random() * 3);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    userPattern = [];
    pressButton(randomChosenColor);
  }

  function updateLevel(text) {
    $('h1').text(text);
  }

  function checkAnswer(currentLevel) {
    if (
      userPattern[currentLevel] == gamePattern[currentLevel] &&
      gamePattern.length == userPattern.length
    ) {
      console.log('success');
      level++;

      setTimeout(function () {
        nextSequence();
      }, 1000);
    } else if (
      userPattern[currentLevel] == gamePattern[currentLevel] &&
      gamePattern.length != userPattern.length
    ) {
      console.log('correct, keep going');
    } else {
      gameOver();
      console.log('wrong');
    }
  }

  function pressButton(color) {
    animatePress(color);
    playSound(color);
  }

  function gameOver() {
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');

      updateLevel('Reached Level ' + level + '. Press any key to try again.');
      restartGame();
    }, 250);
  }

  function restartGame() {
    level = 0;
    hasGameStarted = false;
    gamePattern = [];
  }

  function animatePress(color) {
    var button = $('#' + color);
    // button.fadeOut(150).fadeIn(150);

    button.addClass('pressed');
    setTimeout(function () {
      button.removeClass('pressed');
    }, 250);
  }

  function playSound(sound) {
    var audio = new Audio('./sounds/' + sound + '.mp3');
    audio.play();
  }

  $('div.btn').on('click', function () {
    if (hasGameStarted) {
      var color = $(this).attr('id');
      userPattern.push(color);

      checkAnswer(userPattern.length - 1);

      pressButton(color);

      console.log(userPattern);
    }
  });

  $('body').on('keydown', function () {
    if (!hasGameStarted) {
      nextSequence();
      hasGameStarted = true;
    }
  });
});
