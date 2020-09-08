class Card {
  constructor(image, flipCard) {
    this.card = document.createElement("div");
    this.card.classList.add("memory-card");
    this.card.dataset.fruit = image;

    this.card.appendChild(this.createCardElement(image));
    this.card.appendChild(this.createCardElement("back"));

    this.assignPosition();
  }

  createCardElement(image) {
    let img = document.createElement("img");
    img.src = `./images/${image}.jpg`;
    img.alt = image;
    if (image === "back") img.className = "back";
    else img.className = "front";

    return img;
  }

  assignPosition() {
    let randomPos = Math.floor(Math.random() * 8);
    this.card.style.order = randomPos;
  }
}
