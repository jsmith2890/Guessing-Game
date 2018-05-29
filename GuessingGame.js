var Game = function() {
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
};

var generateWinningNumber = function() {
  return Math.floor(Math.random() * 100 + 1);
};

Game.prototype.difference = function() {
  return Math.abs(this.playersGuess - this.winningNumber);
};

Game.prototype.isLower = function() {
  return this.playersGuess < this.winningNumber;
};
Game.prototype.playersGuessSubmission = function(num) {
  if (typeof num !== 'number'|| num < 1 || num > 100) {
    throw 'That is an invalid guess.';
  }
  this.playersGuess = num;
  return this.checkGuess();
};

Game.prototype.checkGuess = function() {
  if (this.playersGuess === this.winningNumber) {
    $('#hint #submit').prop('disabled', true);
    $('#subtitle').text('Press the Reset button to play again!');
    return 'You Win!';
  } else {
    if (this.pastGuesses.includes(this.playersGuess)) {
      return 'You have already guessed that number.';
    } else {
      this.pastGuesses.push(this.playersGuess);
      $('#guess-list li:nth-child(' + this.pastGuesses.length + ')').text(
        this.playersGuess,
      );
      if (this.pastGuesses.length === 5) {
        $('#hint #submit').prop('disabled', true);
        $('#subtitle').text('Press the Reset button to play again!');
        return 'You Lose. Winning Number is ' + this.winningNumber;
      } else {
        const diff = this.difference();

        if (this.isLower()) {
          $('#subtitle').text('Guess Higher!');
        } else {
          $('#subtitle').text('Guess Lower!');
        }

        if (diff < 10) return "You're burning up!";
        if (diff < 25) return "You're lukewarm.";
        if (diff < 50) return "You're a bit chilly.";
        else {
          return "You're ice cold!";
        }
      }
    }
  }
};

function shuffle(a) {
  var m = a.length,
    t,
    i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = a[m];
    a[m] = a[i];
    a[i] = t;
  }
  return a;
}

Game.prototype.provideHint = function() {
  var hintArr = [
    this.winningNumber,
    generateWinningNumber(),
    generateWinningNumber(),
  ];

  return shuffle(hintArr);
};

function newGame() {
  return new Game();
}

//JQuery
function guess(game) {
  var value = $('#players-input').val();
  $('#players-input').val('');
  var output = game.playersGuessSubmission(parseInt(value,10));
  $('#title').text(output);
}

$(document).ready(function() {
  var game = new Game();

  $('#submit').click(function() {
    guess(game);
  });

  $('#players-input').keypress(function(event) {
    if (event.which === 13) {
      guess(game);
    }


    $('#hint').click(function() {
      var hints = game.provideHint();
      $('#title').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2]);
  });
  
  $('#reset').click(function() {
      game = newGame();
      $('#title').text('Play the Guessing Game!');
      $('#subtitle').text('Guess a number between 1-100!')
      $('.guess').text('-');
      $('#hint, #submit').prop("disabled",false);
  })
  });
});
