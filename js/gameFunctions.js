const primaryText = document.querySelector("#primary-text");
const secondaryText = document.querySelector("#secondary-text");

const houseCardImg1 = document.querySelector("#house-card1");
const houseCardImg2 = document.querySelector("#house-card2");
const playerCardImg1 = document.querySelector("#player-card1");
const playerCardImg2 = document.querySelector("#player-card2");

export const updateDisplayText = (house, player) => {
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

export const createDeckAndDrawCard = async () => {
  const result = await axios.get(
    "https://deckofcardsapi.com/api/deck/new/draw/?count=4"
  );

  houseCardImg1.setAttribute("src", result.data.cards[0].image);
  houseCardImg2.setAttribute("src", result.data.cards[1].image);
  playerCardImg1.setAttribute("src", result.data.cards[2].image);
  playerCardImg2.setAttribute("src", result.data.cards[3].image);

  return result;
};

export const updateCardInfo = (cardInfo, result) => {
  if (cardInfo === "houseCardInfo") {
    cardInfo = [...cardInfo, result.data.cards[0], result.data.cards[1]];
  } else if (cardInfo === "playerCardInfo") {
    cardInfo = [...cardInfo, result.data.cards[2], result.data.cards[3]];
  }
  return cardInfo;
};

export const updateValue = (cardInfo) => {
  let value = 0;
  for (const card of cardInfo) {
    if (parseInt(card.value)) {
      value += parseInt(card.value);
    } else if (card.value === "ACE") {
      value += 1;
    }
  }
  value = value % 10;

  return value;
};

export const endOfGame = (result) => {
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

export const checkWinCondition = () => {
  if (houseValue > playerValue) {
    endOfGame("house");
  } else if (houseValue < playerValue) {
    endOfGame("player");
  } else return "tie";
};

export const resetGame = () => {
  houseValue = 0;
  playerValue = 0;
  houseCardInfo = [];
  playerCardInfo = [];
};
