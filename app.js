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

const houseCardInfo = [
  {
    // house card 1
  },
  {
    // house card 2
  },
];

const playerCardInfo = [
  {
    // player card 1
  },
  {
    // player card 2
  },
];

const displayText = [
  {
    primary: "Welcome to the Baccarat Game!",
    secondary:
      " More details on the rules can be found <a href='https://www.caesars.com/casino-gaming-blog/latest-posts/table-games/baccarat/how-to-play-baccarat'>here</a>",
    btn: "Start Game",
  },
  {
    primary: "Player won",
    secondary: `The house has a score of ${houseValue} and the player has a score of ${playerValue}`,
    btn: "Play Again",
  },
  {
    primary: "Player lost",
    secondary: `The house has a score of ${houseValue} and the player has a score of ${playerValue}`,
    btn: "Play Again",
  },
  {
    primary: "Tie",
    secondary: `The house has a score of ${houseValue} and the player has a score of ${playerValue}`,
    btn: "Play Again",
  },
];

let deck_id;
let houseValue;
let playerValue;
dialog.showModal();

const createDeckAndDrawCard = async () => {
  const result = await axios.get(
    "https://deckofcardsapi.com/api/deck/new/draw/?count=4"
  );
  deck_id = result.data.deck_id;
  cardInfo[0] = result.data.cards[0];
  cardInfo[1] = result.data.cards[1];
  cardInfo[2] = result.data.cards[2];
  cardInfo[3] = result.data.cards[3];
  houseCardImg1.setAttribute("src", result.data.cards[0].image);
  houseCardImg2.setAttribute("src", result.data.cards[1].image);
  playerCardImg1.setAttribute("src", result.data.cards[2].image);
  playerCardImg2.setAttribute("src", result.data.cards[3].image);
};

const activateEndOfGame = (result) => {
  if (result === "player") {
    primaryText.textContent = displayText[1].primary;
    secondaryText.textContent = displayText[1].secondary;
    dialogBtn.textContent = displayText[1].btn;
  } else if (result === "house") {
    primaryText.textContent = displayText[2].primary;
    secondaryText.textContent = displayText[2].secondary;
    dialogBtn.textContent = displayText[2].btn;
  } else {
    primaryText.textContent = displayText[3].primary;
    secondaryText.textContent = displayText[3].secondary;
    dialogBtn.textContent = displayText[3].btn;
  }
};

/* const resetGame = () => {
    primaryText.textContent = displayText[3].primary;
    secondaryText.textContent = displayText[3].secondary;
    dialogBtn.textContent = displayText[3].btn;
} */

const checkWinCondition = () => {
  for (const card of houseCardInfo) {
    houseValue += card.value;
  }
  for (const card of playerCardInfo) {
    playerValue += card.value;
  }

  if (houseValue > playerValue) {
    return "house";
  } else if (houseValue < playerValue) {
    return "player";
  } else return "tie";
};
dialogBtn.addEventListener("click", () => {
  // On button click, Start game (use modal)
  dialog.close();

  // Get deck of cards and deck id
  // Draw and give out cards for dealer and player (hide cards for house)
  createDeckAndDrawCard();
});

// Check for dealer / player win condition (8, 9 points)

// Else activate buttons for hit/stand

// Deactivate buttons after click (there is only drawing of one card in baccarat)
// if draw display new card and recenter row

// Implement simple house logic about whether to draw

// Display winner based on results, keep track of score (use modal)
