# 🎮 Memory Match DApp - Decentralized Game on Blockchain

![License](https://img.shields.io/badge/License-MIT-green.svg)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-^0.8.0-363636?logo=solidity)
![Web3](https://img.shields.io/badge/Web3.js-Blockchain-orange)
![Truffle](https://img.shields.io/badge/Truffle-Smart%20Contracts-brown)
![Game Logic](https://img.shields.io/badge/Game-Logic-blueviolet)
![State Management](https://img.shields.io/badge/State-Driven-informational)


A full-stack **Decentralized Application (DApp)** built with **React**, **Web3.js**, and **Solidity**. Players match memory cards in a browser-based game, with game state and winner records stored permanently on the **Ethereum blockchain** via smart contracts.

---

## 🧩 TL;DR

- **Interactive memory matching game** - Classic card-flip mechanics with deterministic win conditions
- **Clean architecture** - Separation of concerns: UI (React) → Game Logic → State (Smart Contract)
- **Full-stack design** - Frontend + authoritative state management layer
- **Blockchain-agnostic logic** - Core gameplay logic can be adapted to REST APIs, game servers, or cloud services without changes

**Why blockchain here?** Demonstrates permanent, verifiable game records and winner tracking on Ethereum.

---

> **📄 Architecture Note:** While this project uses blockchain for state persistence, the primary focus is on **game logic design, state management, and modular architecture**. The same structure can be adapted to traditional backend systems (REST APIs, game servers, cloud services) without changing core gameplay logic.

---

## 🌟 Features

### 🎯 Core Gameplay
- **Memory Card Matching Game** - Flip cards to find matching pairs
- **Interactive UI** - Built with React for smooth, responsive gameplay
- **Game Board** - Dynamic card layout with reveal animations
- **Win Detection** - Automatic winner declaration and blockchain recording

### ⛓️ Blockchain Features
- **Smart Contract Integration** - Game state managed on Ethereum blockchain
- **MetaMask Wallet Support** - Seamless wallet connection via MetaMask
- **Web3.js Integration** - Direct blockchain interaction from React frontend
- **Permanent Records** - Winners stored on-chain with move counts
- **Event Logging** - `MatchFound` and `WinnerDeclared` events emitted

### 🔧 Development Features
- **Truffle Framework** - Compile, deploy, and test smart contracts
- **Ganache CLI** - Local Ethereum test network
- **React Testing Library** - Unit and integration testing
- **Modern Build Tools** - Webpack + Babel with Create React App

---

## 📋 Project Structure

```
DApp/
├── contracts/
│   ├── .gitkeep
│   └── MemoryGame.sol          # 🔑 Main smart contract
├── migrations/                  # Truffle migrations for contract deployment
├── src/
│   ├── Game/
│   │   ├── Card.js              # Individual card component
│   │   ├── GameBoard.js         # Main game board logic
│   │   ├── data.js              # Game configuration
│   │   └── web3Integration.js   # 🌐 Blockchain interaction
│   ├── App.js                   # Root React component
│   ├── App.css                  # Main styles
│   ├── index.js                 # React entry point
│   └── index.css
├── public/                       # Static assets
├── test/                         # Test files
├── package.json                  # Dependencies & npm scripts
├── truffle-config.js             # Truffle configuration
├── .gitignore
└── README.md                     # This file
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **MetaMask** browser extension (for testnet interaction)
- **Ganache CLI** (optional, for local testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/AE707/DApp.git
cd DApp

# Install dependencies
npm install
```

### Running the Application

```bash
# Start the development server
npm start
```

The app will open at `http://localhost:3000` in your browser.

### Building for Production

```bash
# Create optimized production build
npm run build
```

The build folder will contain the production-ready assets.

---

## 🧠 Smart Contract Details

### MemoryGame.sol

**Solidity Version**: ^0.8.0  
**License**: MIT  

#### Key Components:

**Data Structure:**
```solidity
struct Card {
    uint256 id;        // Unique card identifier
    bool hidden;       // Whether card is currently hidden
    bool matched;      // Whether card is matched with another
}
```

**State Variables:**
- `Card[] public cards` - Array of all game cards
- `uint256 public numPairs` - Number of card pairs in the game
- `uint256 public revealedCount` - Currently revealed card count
- `address public winner` - Address of the game winner

**Events:**
- `MatchFound(uint256 cardId1, uint256 cardId2)` - Emitted when two cards match
- `WinnerDeclared(address winner, uint256 moves)` - Emitted when game is won

#### Core Functions:

**Constructor:**
```solidity
constructor(uint256 _numPairs)
```
Initializes game with specified number of card pairs (total cards = _numPairs * 2)

**Game Methods:**
- `revealCard(uint256 cardId)` - Reveals a card by ID and checks for matches
- `findMatchingCard(uint256 cardId)` - Internal function to find matching card
- `checkWinner()` - Validates if all cards are matched and declares winner

---

## 🌐 Web3 Integration

The `web3Integration.js` module handles all blockchain interactions:

### Key Functions:

**Connect to MetaMask:**
```javascript
const checkMetaMask = async () => {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    return accounts[0];
  }
}
```

**Features:**
- MetaMask wallet detection and connection
- Account management
- Smart contract method calls
- Network management
- Error handling and logging

**RPC Provider:**
- Default: Infura Sepolia Testnet (https://sepolia.infura.io/v3/...)
- Configurable for different networks (mainnet, testnet, local Ganache)

---

## 🎮 How to Play

1. **Connect Wallet** - Click "Connect" and approve MetaMask connection
2. **Reveal Cards** - Click on cards to reveal them
3. **Find Matches** - Match pairs of identical cards
4. **Win the Game** - Match all pairs to win
5. **Winner Recorded** - Your address is recorded on blockchain

---

## 📦 Dependencies

### Production Dependencies
- **react** (^18.3.1) - UI framework
- **react-dom** (^18.3.1) - React rendering
- **web3** (^4.9.0) - Blockchain interaction
- **react-scripts** (^5.0.1) - Create React App build tools
- **webpack** (^5.74.0) - Module bundler

### Development Dependencies
- **@testing-library/react** (^13.4.0) - React testing utilities
- **@testing-library/jest-dom** (^5.17.0) - Jest DOM matchers
- **ganache-cli** (^6.12.2) - Local Ethereum blockchain

### Blockchain Tools
- **Truffle** - Smart contract framework
- **Solidity** - Smart contract language

---

## 📜 Available Scripts

### Development
```bash
npm start          # Run development server on localhost:3000
npm test           # Launch test runner in watch mode
```

### Building
```bash
npm run build      # Create production build in 'build' folder
npm run eject      # Expose Create React App configuration (irreversible)
```

### Smart Contracts
```bash
npx truffle compile   # Compile Solidity contracts
npx truffle migrate   # Deploy contracts to network
npx truffle test      # Run contract tests
```

---

## ⛓️ Blockchain Configuration

### Networks Supported
- **Ethereum Sepolia Testnet** (default) - https://sepolia.infura.io/
- **Local Ganache** - localhost:8545
- **Ethereum Mainnet** (when ready for production)

### Connecting to Different Networks

Edit `web3Integration.js` or set environment variables:

```javascript
const providerURL = process.env.REACT_APP_PROVIDER_URL 
  || 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY';
```

### Deploying Smart Contract

```bash
# Using Truffle
npx truffle migrate --network sepolia

# Using local Ganache
ganache-cli
npx truffle migrate
```

---

## 🧪 Testing

### React Component Tests
```bash
npm test
```
Runs tests for React components using Jest and React Testing Library.

### Smart Contract Tests
```bash
npx truffle test
```
Runs Solidity contract tests.

---

## 🔐 Security Considerations

⚠️ **Important Notes:**

1. **Private Keys** - Never commit private keys or sensitive information
2. **Test Network Only** - Use testnet for development and testing
3. **Contract Audit** - For production, audit the smart contract
4. **Input Validation** - Contract includes validation for card IDs
5. **Gas Limits** - Be mindful of gas costs for on-chain operations

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add NewFeature'`)
4. Push to branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

---

## 📝 License

MIT License - See LICENSE file for details

---

## 🙌 Author

**Alaa Elghoul** - Embedded & Blockchain Developer  
GitHub: [@AE707](https://github.com/AE707)

---

## 🔗 Useful Resources

### Documentation
- [React Documentation](https://react.dev)
- [Web3.js Documentation](https://docs.web3js.org/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Truffle Documentation](https://trufflesuite.com/docs/)
- [MetaMask Developer Docs](https://docs.metamask.io/)

### Tools & Services
- [MetaMask Browser Extension](https://metamask.io/)
- [Infura RPC Service](https://www.infura.io/)
- [Etherscan Block Explorer](https://etherscan.io/)
- [Sepolia Testnet Faucet](https://sepoliafaucet.com/)

### Learning
- [Ethereum Development Guide](https://ethereum.org/en/developers/)
- [Create React App Documentation](https://create-react-app.dev/)

---

## 🐛 Troubleshooting

### MetaMask Connection Issues
- Ensure MetaMask is installed and unlocked
- Check that you're connected to Sepolia Testnet
- Clear browser cache and try again

### Contract Deployment Issues
- Verify you have testnet ETH for gas fees
- Check Infura API key is valid
- Ensure contract compiles without errors

### Port Already in Use
```bash
# If port 3000 is already in use
PORT=3001 npm start
```

---

**Last Updated:** January 2026  
**Status:** Active Development 🚀
