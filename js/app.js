import {
  checkWinCondition,
  createDeckAndDrawCard,
  resetGame,
  updateCardInfo,
  updateValue,
} from "./gameFunctions";
import { removeCardStyling } from "./userInterface";

const dialogBtn = document.querySelector("#dialog");
const hitBtn = document.querySelector("#hit");
const standBtn = document.querySelector("#stand");
const dialog = document.querySelector("dialog");

let deck_id;
let houseValue = 0;
let playerValue = 0;

let houseCardInfo = [];
let playerCardInfo = [];

dialog.showModal();

dialogBtn.addEventListener("click", () => {
  // On button click, Start game (use modal)
  dialog.close();
  resetGame();
  removeCardStyling();
  // Get deck of cards and deck id

  const result = createDeckAndDrawCard();
  deck_id = result.data.deck_id;

  houseCardInfo = updateCardInfo(houseCardInfo, result);
  playerCardInfo = updateCardInfo(playerCardInfo, result);

  houseValue = updateValue(houseCardInfo);
  playerValue = updateValue(playerCardInfo);
});

// Activate buttons for hit/stand
hitBtn.addEventListener("click", async () => {
  // store new card data in array
  const result = await axios.get(
    `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
  );
  playerCardInfo.push(result.data.cards[0]);

  // update player value
  playerValue = updateValue(playerCardInfo);

  // create and display new card
  createAndDisplayCard("player", result);

  // House to draw a card if value less than player value
  if (playerValue > houseValue && houseValue < 5) {
    const input = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
    );
    houseCardInfo.push(input.data.cards[0]);

    // update house value
    houseValue = updateValue(houseCardInfo);

    // create and display new card
    createAndDisplayCard("house", result);
  }

  // Display winner based on results, keep track of score (use modal)
  checkWinCondition();
});

standBtn.addEventListener("click", async () => {
  // House to draw a card if value less than player value
  if (playerValue > houseValue && houseValue < 5) {
    const input = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
    );
    houseCardInfo.push(input.data.cards[0]);

    // update house value
    houseValue = updateValue(houseCardInfo);

    // create and display new card
    createAndDisplayCard("house", result);
  }
  // Display winner based on results, keep track of score (use modal)
  checkWinCondition();
});
