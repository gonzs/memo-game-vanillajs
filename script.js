var hasFlippedCard = false;
var firstCard, secondCard;
var lockBoard = false;
var level;
var unSolved;
var timeSpent;

function buildBoard() {
  const images = [
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
    "watermelon"
  ];

  let levelOption = document.getElementById("level");
  level = levelOption.options[levelOption.selectedIndex].value;
  let imagesSelected = [];

  switch (level) {
    case "easy":
      imagesSelected = pickUpImages(images, 8);
      unSolved = 8;
      break;

    case "medium":
      imagesSelected = pickUpImages(images, 8);
      unSolved = 8;
      break;

    case "hard":
      imagesSelected = pickUpImages(images, 12);
      unSolved = 12;
      break;

    default:
      break;
  }

  let section = document.createElement("section");
  section.setAttribute("id", "board");
  section.classList.add("memory-game");

  imagesSelected.forEach(e => {
    for (let index = 0; index < 2; index++) {
      let div = document.createElement("div");
      div.classList.add("memory-card");
      div.dataset.fruit = e;

      let img = document.createElement("img");
      img.src = `./images/${e}.jpg`;
      img.alt = e;
      img.className = "front";

      let imgBack = document.createElement("img");
      imgBack.src = "./images/back.jpg";
      imgBack.alt = "back";
      imgBack.className = "back";

      div.appendChild(img);
      div.appendChild(imgBack);
      section.appendChild(div);
    }
  });

  const init = document.getElementById("init");
  document.body.removeChild(init);
  document.body.appendChild(section);

  const cards = document.querySelectorAll(".memory-card");

  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 8);
    card.style.order = randomPos;
  });

  cards.forEach(card => {
    card.addEventListener("click", flipCard);
  });
  timeSpent = Date.now();
}

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

  if (unSolved === 0) {
    timeSpent = (Date.now() - timeSpent) / 1000;
    alert("SOLVED in " + timeSpent + " secs");
    window.location.reload();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  unSolved--;

  resetBoard();
}

function unFlipCards() {
  let wait;
  switch (level) {
    case "easy":
      wait = 1500;
      break;
    case "medium":
      wait = 700;
      break;
    case "hard":
      wait = 700;
      break;

    default:
      break;
  }

  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, wait);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function pickUpImages(images = [], number) {
  let auxImages = [];
  let i = 0;

  while (i < number) {
    auxImages.push(images[i]);
    i++;
  }

  return auxImages;
}
