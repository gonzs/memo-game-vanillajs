class Board {
  constructor() {
    this.hasFlippedCard = false;
    this.firstCard = null;
    this.secondCard = null;
    this.lockBoard = false;
    this.level = { imagesSelected: [], unSolved: 0, speed: 0 };
    this.timeSpent;
    this.images = [
      "apple",
      "banana",
      "blackberry",
      "blueberry",
      "grapes",
      "kiwi",
      "muskmelon",
      "orange",
      "pineapple",
      "raspberry",
      "strawberry",
      "watermelon",
    ];
    this.levelOption = document.getElementById("level");
    this.section = document.createElement("section");
    this.cards;
  }

  setLevel() {
    switch (this.levelOption.options[this.levelOption.selectedIndex].value) {
      case "easy":
        this.level.imagesSelected = this.pickUpImages(8);
        this.level.unSolved = 8;
        this.level.speed = 1500;
        break;

      case "medium":
        this.level.imagesSelected = this.pickUpImages(8);
        this.level.unSolved = 8;
        this.level.speed = 700;
        break;

      case "hard":
        this.level.imagesSelected = this.pickUpImages(12);
        this.level.unSolved = 12;
        this.level.speed = 700;
        break;

      default:
        break;
    }
  }

  pickUpImages(number) {
    let auxImages = [];
    let i = 0;

    while (i < number) {
      auxImages.push(this.images[i]);
      i++;
    }

    return auxImages;
  }

  createCards() {
    this.level.imagesSelected.forEach((e) => {
      for (let index = 0; index < 2; index++) {
        // Create Card
        let card = new Card(e);
        // Add card to the board
        this.section.appendChild(card.card);
      }
    });
  }

  checkForMatch() {
    let isMatch =
      this.firstCard.dataset.fruit === this.secondCard.dataset.fruit;

    isMatch ? this.disableCards() : this.unFlipCards();
  }

  disableCards() {
    let clone;
    let board = document.getElementById("board");
    //Remove event listener from first card
    clone = this.firstCard.cloneNode(true);
    board.replaceChild(clone, this.firstCard);

    //Remove event listener from second card
    clone = this.secondCard.cloneNode(true);
    board.replaceChild(clone, this.secondCard);

    this.level.unSolved--;
    this.resetBoard();
  }

  unFlipCards() {
    this.lockBoard = true;
    setTimeout(() => {
      this.firstCard.classList.remove("flip");
      this.secondCard.classList.remove("flip");
      this.resetBoard();
    }, this.level.speed);
  }

  resetBoard() {
    [this.hasFlippedCard, this.lockBoard] = [false, false];
    [this.firstCard, this.secondCard] = [null, null];

    if (this.level.unSolved === 0) {
      this.timeSpent = (Date.now() - this.timeSpent) / 1000;
      setTimeout(() => {
        this.showPopup();
      }, 500);
    }
  }

  showPopup() {
    document.getElementById("box").style.display = "flex";
    document.getElementById("box").style.flexWrap = "wrap";
    document.getElementById(
      "message"
    ).innerHTML = `Solved in ${this.timeSpent} secs`;
  }
}
