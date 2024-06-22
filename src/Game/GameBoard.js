import React, { useState, useEffect } from 'react';
import Card from './Card'; // Import Card component
import { checkMetaMask, initializeGame, revealCard } from './web3Integration'; // Import Web3 functions

const GameBoard = () => {
  // Existing game state variables and functions
  const [cardsArray, setCardsArray] = useState([]);
  const [numPairs, setNumPairs] = useState(4);
  const [moves, setMoves] = useState(0);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [won, setWon] = useState(false);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);

  // Function to handle new game button click
  const handleNewGame = async () => {
    const connectedAccount = await checkMetaMask();
    if (!connectedAccount) return;

    // Call initializeGame function (from web3Integration.js)
    await initializeGame(numPairs);

    // Reset game state within React
    setCardsArray([]);
    setMoves(0);
    setFirstCard(null);
    setSecondCard(null);
    setWon(false);
    setTime(0);
    setScore(0); // Reset score
  };

  // Function to handle card selection
  const handleSelectedCards = async (item) => {
    const connectedAccount = await checkMetaMask();
    if (!connectedAccount) return;

    // Update local state variables based on user interaction
    if (firstCard === null) {
      setFirstCard(item);
    } else if (secondCard === null && firstCard.id !== item.id) {
      setSecondCard(item);
      setMoves(moves + 1); // Increment moves after both cards selected
    } else {
      // Reset selection if user clicks the same card twice
      setFirstCard(null);
      setSecondCard(null);
    }



    // Call revealCard function (from web3Integration.js) if both cards are selected
    if (firstCard !== null && secondCard !== null) {
      await revealCard(item.id);
    }
  };
      // Handle user input to change the number of pairs
      const handleNumPairsChange = (event) => {
        const newNumPairs = parseInt(event.target.value);
        if (newNumPairs > 0) { // Add validation for positive values
          setNumPairs(newNumPairs);
        }
      };

  // Timer functionality
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(time + 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [time]);

  // Scorekeeping functionality
  useEffect(() => {
    if (won === 6) {
      setScore(moves);
    }
  }, [won, moves]);

  return (
    <div className="container">
      <div className="header">
        <h1>Memory Game</h1>
        <input type="number" value={numPairs} onChange={handleNumPairsChange} />
      
      <button onClick={checkMetaMask}>Connect Wallet</button>
      </div>
      <div className="board">
        {cardsArray.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleClick={handleSelectedCards}
            firstCard={firstCard}
            secondCard={secondCard}
            stopflip={false} // Assuming cards are always flippable (adjust if needed)
          />
        ))}
      </div>
      <div className="comments">
        Time: {time} seconds :: Moves: {moves} :: Score: {score}
      </div>

      {won === 6 && (
        <div className="comments">
          You Won in {moves} moves! Your score is {score}!
        </div>
      )}

      <button className="button" onClick={handleNewGame}>
        New Game
      </button>

      <button className="connect" onClick={checkMetaMask}>
        Connect your wallet
      </button>
    </div>
  );
};

export default GameBoard;
