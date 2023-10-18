document.querySelector(".rock-button").addEventListener("click", () => {
  playGame(rock);
});

document.querySelector(".paper-button").addEventListener("click", () => {
  playGame(paper);
});

document.querySelector(".scissor-button").addEventListener("click", () => {
  playGame(scissor);
});

document.querySelector(".reset-button").addEventListener("click", () => {
  showResetConfirmation();
  showDimBackground();
});

document.querySelector(".autoplay-button").addEventListener("click", () => {
  autoPlay();
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame(rock);
  } else if (event.key === "p") {
    playGame(paper);
  } else if (event.key === "s") {
    playGame(scissor);
  } else if (event.key === "Backspace") {
    showDimBackground();
    showResetConfirmation();
  } else if (event.key === "a") {
    autoPlay();
  }
});
