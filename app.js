// On button click, Start game (use modal)

// Get deck of cards and deck id

// Draw and give out cards for dealer and player (hide cards for both)

// Check for dealer / player win condition (8, 9 points)

// Else activate buttons for hit/stand

// Deactivate buttons after click (there is only drawing of one card in baccarat)
// if draw display new card and recenter row

// Implement simple house logic about whether to draw

// Display winner based on results, keep track of score (use modal)

const getDeck = async () => {
  const result = await axios.get(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  console.log(result);
};
