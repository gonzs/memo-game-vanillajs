window.addEventListener("load", function() {
  console.log("DOM Loaded");
  const cards = document.querySelectorAll(".memory-card");

  let hasFlippedCard = false;
  let firstCard, secondCard;
  let lockBoard = false;

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
      // First click
      hasFlippedCard = true;
      firstCard = this;
      return;
    }
    // Second click
    secondCard = this;

    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.fruit === secondCard.dataset.fruit;

    isMatch ? disableCards() : unFlipCards();
  }

  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
  }

  function unFlipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  (function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 8);
      card.style.order = randomPos;
    });
  })();

  cards.forEach(card => card.addEventListener("click", flipCard));
});
