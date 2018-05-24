
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
  if (num < 1 || num > 100 || typeof num !== 'number') {
    throw 'That is an invalid guess.';
  }
  this.playersGuess = num;
  return this.checkGuess();
};

Game.prototype.checkGuess = function() {
  if (this.playersGuess === this.winningNumber) {
    return 'You Win!';
  } else {
    if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
      return 'You have already guessed that number.';
    } else {
      this.pastGuesses.push(this.playersGuess);
      if (this.pastGuesses.length === 5) {
        return 'You Lose.';
      } else {
        const diff = this.difference();
        if (diff < 10) {
          return "You're burning up!";
        } else if (diff < 25) {
          return "You're lukewarm.";
        } else if (diff < 50) {
          return "You're a bit chilly.";
        } else {
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
  var hintArr = [this.winningNumber, generateWinningNumber(),generateWinningNumber()];
  
  return shuffle(hintArr);
};

 function newGame () {
    return new Game()
}
