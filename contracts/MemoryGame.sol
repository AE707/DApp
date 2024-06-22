// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MemoryGame {
    // Structure to represent a card with its ID and state (hidden/revealed/matched)
    struct Card {
        uint256 id;
        bool hidden;
        bool matched;
    }

    // Game state variables
    Card[] public cards; // Array of all cards in the game
    uint256 public numPairs; // Number of picture pairs
    uint256 public revealedCount; // Number of cards currently revealed
    address public winner; // Address of the winner (if any)

    // Event to signal a match is found
    event MatchFound(uint256 card1Id, uint256 card2Id);

    // Event to signal a winner
    event WinnerDeclared(address winnerAddress, uint256 moves);

    // Constructor to initialize the game state
    constructor(uint256 _numPairs) {
        numPairs = _numPairs;
        revealedCount = 0;
        winner = address(0); // Address 0 represents no winner yet
        
        // Generate random card IDs and set them as hidden
        for (uint256 i = 0; i < numPairs * 2; i++) {
            cards.push(Card({id: i, hidden: true, matched: false}));
        }
    }

    // Function to reveal a card by its ID
    function revealCard(uint256 cardId) public {
        require(cardId < cards.length, "Invalid card ID");
        require(!cards[cardId].hidden, "Card already revealed");
        require(revealedCount < 2, "Only 2 cards can be revealed at a time");

        cards[cardId].hidden = false;
        revealedCount++;

        // Check for match if another card is already revealed
        if (revealedCount == 2) {
            uint256 otherCardId = findMatchingCard(cardId);
            if (otherCardId != 0) {
                cards[cardId].matched = true;
                cards[otherCardId].matched = true;
                emit MatchFound(cardId, otherCardId);
                checkWinner();
            }
            revealedCount = 0; // Reset revealed count after checking match
        }
    }

    // Function to find the matching card for a given card ID
    function findMatchingCard(uint256 cardId) private view returns (uint256) {
        for (uint256 i = 0; i < cards.length; i++) {
            if (cards[i].id != cardId && cards[i].hidden == false && cards[i].matched == false && cards[i].id != cardId) {
                return i;
            }
        }
        return 0; // No matching card found
    }

    // Function to check if all cards are matched and declare a winner
    function checkWinner() private {
        bool allMatched = true;
        for (uint256 i = 0; i < cards.length; i++) {
            if (!cards[i].matched) {
                allMatched = false;
                break;
            }
        }

        if (allMatched) {
            winner = msg.sender; // Set the winner as the address that called this function
            emit WinnerDeclared(winner, revealedCount); // Emit event with winner and moves
        }
    }
}
