const playerRow = document.querySelector("#player-row");
const houseRow = document.querySelector("#house-row");

const updateCardStyling = (role) => {
  // change styling to fit 3 cards in a row
  if (role === "player") {
    playerRow.classList.add("updated-row-style");
    const playerCards = document.querySelectorAll(".player-card-container");
    for (const card of playerCards) {
      card.classList.add("updated-card-style");
    }
  } else if (role === "house") {
    houseRow.classList.add("updated-row-style");
    const houseCards = document.querySelectorAll(".house-card-container");
    for (const card of houseCards) {
      card.classList.add("updated-card-style");
    }
  }
};

const removeCardStyling = () => {
  // Change back styling to original
  playerRow.classList.remove("updated-row-style");
  houseRow.classList.remove("updated-row-style");
  const houseCards = document.querySelectorAll(".house-card-container");
  for (const card of houseCards) {
    card.classList.remove("updated-card-style");
  }
  const playerCards = document.querySelectorAll(".player-card-container");
  for (const card of playerCards) {
    card.classList.remove("updated-card-style");
  }

  // Remove any extra card containers
  if (playerRow.childElementCount > 2) {
    playerRow.removeChild(playerRow.lastChild);
  }

  if (houseRow.childElementCount > 2) {
    houseRow.removeChild(houseRow.lastChild);
  }

  // Remove all images
  const images = document.querySelectorAll("img");
  for (const image of images) {
    image.removeAttribute("src");
  }
};

const createAndDisplayCard = (role, result) => {
  const card = document.createElement("div");
  card.classList.add("card-container");
  const cardImg = document.createElement("img");
  cardImg.setAttribute("src", result.data.cards[0].image);
  card.append(cardImg);

  if (role === "player") {
    card.classList.add("player-card-container");
    playerRow.append(card);
    updateCardStyling("player");
  } else if (role === "house") {
    card.classList.add("house-card-container");
    houseRow.append(card);
    updateCardStyling("house");
  }
};
