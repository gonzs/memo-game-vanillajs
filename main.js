"use strict";
// Load Event
window.addEventListener("load", () => {
  console.log("DOM loaded");

  main();
});

function main() {
  const initButton = document.getElementById("init-button");
  const closeButton = document.getElementById("close");

  initButton.addEventListener("click", () => {
    playGame();
  });

  closeButton.addEventListener("click", () => {
    restart();
  });
}

function playGame() {
  const init = document.getElementById("init");

  // Create Board
  let board = new Board();

  //Define game level
  board.setLevel();

  //Create cards
  board.createCards();

  // Remove Init
  document.body.removeChild(init);

  // Append Board
  board.section.setAttribute("id", "board");
  board.section.classList.add("memory-game");
  document.body.appendChild(board.section);

  // Add event for click a card
  board.cards = document.querySelectorAll(".memory-card");
  board.cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (board.lockBoard) return;

      if (card === board.firstCard) return;

      card.classList.add("flip");

      if (!board.hasFlippedCard) {
        // First click
        board.hasFlippedCard = true;
        board.firstCard = card;

        return;
      }
      // Second click
      board.secondCard = card;

      board.checkForMatch();
    });
  });

  // Timer initialization
  board.timeSpent = Date.now();
}

function restart() {
  document.getElementById("box").style.display = "none";
  window.location.reload();
}
