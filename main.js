"use strict";
// Load Event
window.addEventListener("load", () => {
  console.log("DOM loaded");

  const initButton = document.getElementById("init-button");
  initButton.addEventListener("click", () => {
    // Create Board
    let board = new Board();
    //Define game level
    board.setLevel();

    // Cards creation
    board.level.imagesSelected.forEach((e) => {
      for (let index = 0; index < 2; index++) {
        // Create Card
        let card = new Card(e, board.flipCard);
        // Add card to the board
        board.addCard(card.card);
      }
    });

    // Remove Init
    board.removeInit();
    // Append Board
    board.addBoard();

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

    const closeButton = document.getElementById("close");
    closeButton.addEventListener("click", () => {
      document.getElementById("box").style.display = "none";
      window.location.reload();
    });
  });
});
