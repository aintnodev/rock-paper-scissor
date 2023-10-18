let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

const rock = "&#9994;";
const paper = "&#9995;";
const scissor = "&#9996;";

updateScore();

let isAutoPlaying = false;
let intervalId;
let computerMove;

function autoPlay() {
  if (!isAutoPlaying) {
    const elementId = document.querySelector(".autoplay-button");
    elementId.innerHTML = "Stop Autoplaying";
    const playerMove = pickComputerMove();
    playGame(playerMove);
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    const elementId = document.querySelector(".autoplay-button");
    elementId.innerHTML = "Autoplay";
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  if (playerMove === rock) {
    if (computerMove === rock) {
      result = "&#128533; It's a TIE!";
    } else if (computerMove === paper) {
      result = "&#128531; You LOSE!";
    } else if (computerMove === scissor) {
      result = "&#128526; You WIN!";
    }
  } else if (playerMove === paper) {
    if (computerMove === rock) {
      result = "&#128526; You WIN!";
    } else if (computerMove === paper) {
      result = "&#128533; It's a TIE!";
    } else if (computerMove === scissor) {
      result = "&#128531; You LOSE!";
    }
  } else if (playerMove === scissor) {
    if (computerMove === rock) {
      result = "&#128531; You LOSE!";
    } else if (computerMove === paper) {
      result = "&#128526; You WIN!";
    } else if (computerMove === scissor) {
      result = "&#128533; It's a TIE!";
    }
  }

  if (result === "&#128526; You WIN!") {
    score.wins += 1;
  } else if (result === "&#128531; You LOSE!") {
    score.losses += 1;
  } else if (result === "&#128533; It's a TIE!") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <span class="move-span">${playerMove}</span> - <span class="move-span">${computerMove}</span> CPU`;
  document.querySelector(".js-result").innerHTML = result;
  updateScore();
}

function updateScore() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins} | Loses: ${score.losses} | Ties: ${score.ties}`;
}

function removeScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  updateScore();
  localStorage.removeItem("score");
}

function pickComputerMove() {
  const randomNumber = Math.random();
  const rock = "&#9994;";
  const paper = "&#9995;";
  const scissor = "&#9996;";

  if (0 <= randomNumber && randomNumber < 1 / 3) {
    computerMove = rock;
  } else if (1 / 3 <= randomNumber && randomNumber < 2 / 3) {
    computerMove = paper;
  } else if (2 / 3 <= randomNumber && randomNumber < 1) {
    computerMove = scissor;
  }
  return computerMove;
}

function showResetConfirmation() {
  document.querySelector(
    ".js-reset-confirmation"
  ).innerHTML = `<p>Are you sure you want to reset the score?</p>
  <button class="js-reset-confirm-yes reset-confirm-button">Yes</button>
  <button class="js-reset-confirm-no reset-confirm-button">No</button>`;

  document
    .getElementById("js-reset-confirmation")
    .classList.add("css-reset-confirmation");

  const yesButton = document.querySelector(".js-reset-confirm-yes");
  const noButton = document.querySelector(".js-reset-confirm-no");

  yesButton.addEventListener("click", () => {
    removeScore();
    hideDimBackground();
    hideResetConfirmation();
  });

  noButton.addEventListener("click", () => {
    hideDimBackground();
    hideResetConfirmation();
  });

  document.body.addEventListener("keydown", (event) => {
    if (event.key === "y") {
      removeScore();
      hideDimBackground();
      hideResetConfirmation();
    }
  });

  document.body.addEventListener("keydown", (event) => {
    if (event.key === "n") {
      hideDimBackground();
      hideResetConfirmation();
    }
  });
}

function hideResetConfirmation() {
  document.querySelector(".js-reset-confirmation").innerHTML = "";
  document
    .getElementById("js-reset-confirmation")
    .classList.remove("css-reset-confirmation");
}

function showDimBackground() {
  document.querySelector("body").classList.add("dim-background");
}

function hideDimBackground() {
  document.querySelector("body").classList.remove("dim-background");
}
