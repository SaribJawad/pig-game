"use strict";

let score1 = document.querySelector("#score--0");
let score2 = document.querySelector("#score--1");
let diceImg = document.querySelector(".dice");
let rollBtn = document.querySelector(".btn--roll");
let newGameBtn = document.querySelector(".btn--new");
let holdBtn = document.querySelector(".btn--hold");
let player1Score = document.querySelector("#current--0");
let player2Score = document.querySelector("#current--1");
let player1El = document.querySelector(".player--0");
let player2El = document.querySelector(".player--1");

diceImg.classList.add("hidden");
score1.textContent = 0;
score2.textContent = 0;

let scores, currentScore, activePlayer, gameOver;

function reset() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gameOver = false;

  player1El.classList.remove("player--winner");
  player2El.classList.remove("player--winner");
  player1El.classList.add("player--active");
  player2El.classList.remove("player--active");
  score1.textContent = 0;
  score2.textContent = 0;
  player1Score.textContent = 0;
  player2Score.textContent = 0;
  diceImg.classList.add("hidden");
}
reset();

rollBtn.addEventListener("click", rollDice);

const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player1El.classList.toggle("player--active");
  player2El.classList.toggle("player--active");
};

function rollDice() {
  if (!gameOver) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceImg.classList.remove("hidden");
    diceImg.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
}

holdBtn.addEventListener("click", () => {
  if (!gameOver) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      gameOver = true;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--active");
    } else {
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener("click", reset);
