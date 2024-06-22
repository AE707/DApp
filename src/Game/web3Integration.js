import Web3 from 'web3';

// Replace with your testnet provider URL
const providerURL = 'https://sepolia.infura.io/v3/56d01eae10fb4306bae4509b8693242d';

const checkMetaMask = async () => {
  // Check if MetaMask is installed
  if (!window.ethereum) {
    console.error("Please install MetaMask to play this game.");
    return;
  }
  
  // Request connection to MetaMask
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // Use the first connected account
    const connectedAccount = accounts[0];
    console.log("Connected account:", connectedAccount);
    return connectedAccount;
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
  }
};

const connectToWeb3 = async (connectedAccount) => {
  const provider = new Web3.providers.HttpProvider(providerURL);
  const web3 = new Web3(provider);
  
  // Replace with your deployed contract address and ABI (from compiled contract)
  const deployedContractAddress = '0xYOUR_DEPLOYED_CONTRACT_ADDRESS';
  const contractABI = require('./path/to/MemoryGame.abi.json');
  
  const gameContract = new web3.eth.Contract(contractABI, deployedContractAddress);
  return { web3, gameContract };
};

const initializeGame = async (numPairs) => {
  const { web3, gameContract } = await connectToWeb3();
  const connectedAccount = await checkMetaMask();
  if (!connectedAccount) return;

  try {
    const tx = await gameContract.methods.initializeGame(numPairs).send({
      from: connectedAccount,
    });
    console.log("Transaction hash (initialization):", tx.transactionHash);
  } catch (error) {
    console.error("Error initializing game:", error);
  }
};

const revealCard = async (cardId) => {
  const { web3, gameContract } = await connectToWeb3();
  const connectedAccount = await checkMetaMask();
  if (!connectedAccount) return;

  try {
    const tx = await gameContract.methods.revealCard(cardId).send({
      from: connectedAccount,
    });
    console.log("Transaction hash (reveal card):", tx.transactionHash);
  } catch (error) {
    console.error("Error revealing card:", error);
  }
};

// ... (Optional event listener functions)

export { checkMetaMask, connectToWeb3, initializeGame, revealCard };
