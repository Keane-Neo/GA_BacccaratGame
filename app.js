const dialog = document.querySelector("dialog");
const primaryText = document.querySelector("#primary-text");
const secondaryText = document.querySelector("#secondary-text");
const dialogBtn = document.querySelector("#dialog");
const hitBtn = document.querySelector("#hit");
const standBtn = document.querySelector("#stand");
const houseRow = document.querySelector("#house-row");
const houseCardImg1 = document.querySelector("#house-card1");
const houseCardImg2 = document.querySelector("#house-card2");
const playerCardImg1 = document.querySelector("#player-card1");
const playerCardImg2 = document.querySelector("#player-card2");
const playerRow = document.querySelector("#player-row");

let deck_id;
let houseValue = 0;
let playerValue = 0;

let houseCardInfo = [];
let playerCardInfo = [];

const updateDisplayText = (house, player) => {
  return [
    {
      primary: "Welcome to the Baccarat Game!",
      secondary:
        " More details on the rules can be found <a href='https://www.caesars.com/casino-gaming-blog/latest-posts/table-games/baccarat/how-to-play-baccarat'>here</a>",
      btn: "Start Game",
    },
    {
      primary: "Player won",
      secondary: `The house has a score of ${house} and the player has a score of ${player}`,
      btn: "Play Again",
    },
    {
      primary: "Player lost",
      secondary: `The house has a score of ${house} and the player has a score of ${player}`,
      btn: "Play Again",
    },
    {
      primary: "Tie",
      secondary: `The house has a score of ${house} and the player has a score of ${player}`,
      btn: "Play Again",
    },
  ];
};

dialog.showModal();

const createDeckAndDrawCard = async () => {
  const result = await axios.get(
    "https://deckofcardsapi.com/api/deck/new/draw/?count=4"
  );
  deck_id = result.data.deck_id;
  houseCardInfo = [
    ...houseCardInfo,
    result.data.cards[0],
    result.data.cards[1],
  ];
  playerCardInfo = [
    ...playerCardInfo,
    result.data.cards[2],
    result.data.cards[3],
  ];
  houseCardImg1.setAttribute("src", result.data.cards[0].image);
  houseCardImg2.setAttribute("src", result.data.cards[1].image);
  playerCardImg1.setAttribute("src", result.data.cards[2].image);
  playerCardImg2.setAttribute("src", result.data.cards[3].image);

  for (const card of houseCardInfo) {
    if (parseInt(card.value)) {
      houseValue += parseInt(card.value);
    } else if (card.value === "ACE") {
      houseValue += 1;
    }
  }
  houseValue = houseValue % 10;

  for (const card of playerCardInfo) {
    if (parseInt(card.value)) {
      playerValue += parseInt(card.value);
    } else if (card.value === "ACE") {
      playerValue += 1;
    }
  }
  playerValue = playerValue % 10;
};

const createNewCard = (role) => {
  if (role === "player") {
    const card = document.createElement("div");
    card.classList.add("card-container");
    card.classList.add("player-card-container");
    return card;
  } else if (role === "house") {
    const card = document.createElement("div");
    card.classList.add("card-container");
    card.classList.add("house-card-container");
    return card;
  }
};

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

const endOfGame = (result) => {
  if (result === "player") {
    primaryText.textContent = updateDisplayText(
      houseValue,
      playerValue
    )[1].primary;
    secondaryText.textContent = updateDisplayText(
      houseValue,
      playerValue
    )[1].secondary;
    dialogBtn.textContent = updateDisplayText(houseValue, playerValue)[1].btn;
  } else if (result === "house") {
    primaryText.textContent = updateDisplayText(
      houseValue,
      playerValue
    )[2].primary;
    secondaryText.textContent = updateDisplayText(
      houseValue,
      playerValue
    )[2].secondary;
    dialogBtn.textContent = updateDisplayText(houseValue, playerValue)[2].btn;
  } else {
    primaryText.textContent = updateDisplayText(
      houseValue,
      playerValue
    )[3].primary;
    secondaryText.textContent = updateDisplayText(
      houseValue,
      playerValue
    )[3].secondary;
    dialogBtn.textContent = updateDisplayText(houseValue, playerValue)[3].btn;
  }
  dialog.showModal();
};

const checkWinCondition = () => {
  if (houseValue > playerValue) {
    return "house";
  } else if (houseValue < playerValue) {
    return "player";
  } else return "tie";
};

const resetGame = () => {
  houseValue = 0;
  playerValue = 0;
  houseCardInfo = [];
  playerCardInfo = [];
};

dialogBtn.addEventListener("click", () => {
  // On button click, Start game (use modal)
  dialog.close();
  resetGame();
  removeCardStyling();
  // Get deck of cards and deck id
  // Draw and give out cards for dealer and player (hide cards for house)
  createDeckAndDrawCard();
});

// Activate buttons for hit/stand
hitBtn.addEventListener("click", async () => {
  // store new card data in array
  const result = await axios.get(
    `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
  );
  playerCardInfo.push(result.data.cards[0]);

  // update player value
  if (parseInt(result.data.cards[0].value)) {
    playerValue += parseInt(result.data.cards[0].value);
  } else if (result.data.cards[0].value === "ACE") {
    playerValue += 1;
  }
  playerValue = playerValue % 10;
  // create and display new card
  const newPlayerCard = createNewCard("player");
  const newPlayerCardImg = document.createElement("img");
  newPlayerCardImg.setAttribute("src", result.data.cards[0].image);
  newPlayerCard.append(newPlayerCardImg);
  playerRow.append(newPlayerCard);

  updateCardStyling("player");

  // House to draw a card if value less than player value
  if (playerValue > houseValue && houseValue < 5) {
    const input = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
    );
    houseCardInfo.push(input.data.cards[0]);

    // update house value
    if (parseInt(input.data.cards[0].value)) {
      houseValue += parseInt(input.data.cards[0].value);
    } else if (input.data.cards[0].value === "ACE") {
      houseValue += 1;
    }
    houseValue = houseValue % 10;

    // can write updatevalue function to replace 4 instances above

    // create and display new card
    const newhouseCard = createNewCard("house");
    const newhouseCardImg = document.createElement("img");
    newhouseCardImg.setAttribute("src", input.data.cards[0].image);
    newhouseCard.append(newhouseCardImg);
    houseRow.append(newhouseCard);

    updateCardStyling("house");
  }

  // Display winner based on results, keep track of score (use modal)
  const winner = checkWinCondition();
  endOfGame(winner);
});

standBtn.addEventListener("click", async () => {
  // House to draw a card if value less than player value
  if (playerValue > houseValue && houseValue < 5) {
    const input = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
    );
    houseCardInfo.push(input.data.cards[0]);

    // update house value
    if (parseInt(input.data.cards[0].value)) {
      houseValue += parseInt(input.data.cards[0].value);
    } else if (input.data.cards[0].value === "ACE") {
      houseValue += 1;
    }
    houseValue = houseValue % 10;

    // can write updatevalue function to replace 4 instances above

    // create and display new card
    const newhouseCard = createNewCard("house");
    const newhouseCardImg = document.createElement("img");
    newhouseCardImg.setAttribute("src", input.data.cards[0].image);
    newhouseCard.append(newhouseCardImg);
    houseRow.append(newhouseCard);

    updateCardStyling("house");
  }
  // Display winner based on results, keep track of score (use modal)
  const winner = checkWinCondition();
  endOfGame(winner);
});
