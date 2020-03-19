var hasFlippedCard = false;
var firstCard, secondCard;
var lockBoard = false;
var level = { imagesSelected: [], unSolved: 0, speed: 0 };
var timeSpent;
var c = 0;

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
  defineLevel(
    level,
    levelOption.options[levelOption.selectedIndex].value,
    images
  );

  let section = document.createElement("section");
  section.setAttribute("id", "board");
  section.classList.add("memory-game");

  level.imagesSelected.forEach(e => {
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

function defineLevel(level, levelOption, images) {
  switch (levelOption) {
    case "easy":
      level.imagesSelected = pickUpImages(images, 8);
      level.unSolved = 8;
      level.speed = 1500;
      break;

    case "medium":
      level.imagesSelected = pickUpImages(images, 8);
      level.unSolved = 8;
      level.speed = 700;
      break;

    case "hard":
      level.imagesSelected = pickUpImages(images, 12);
      level.unSolved = 12;
      level.speed = 700;
      break;

    default:
      break;
  }
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
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  level.unSolved--;

  resetBoard();
}

function unFlipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, level.speed);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];

  if (level.unSolved === 0) {
    timeSpent = (Date.now() - timeSpent) / 1000;
    setTimeout(() => {
      popup();
      // alert(`SOLVED in ${timeSpent} secs`);
      // window.location.reload();
    }, 500);
  }
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

function popup() {
  if (c == 0) {
    document.getElementById("box").style.display = "flex";
    document.getElementById("box").style.flexWrap = "wrap";
    document.getElementById(
      "message"
    ).innerHTML = `Solved in ${timeSpent} secs`;
    c = 1;
  } else {
    document.getElementById("box").style.display = "none";
    c = 1;
    window.location.reload();
  }
}
