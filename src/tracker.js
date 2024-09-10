const web3 = require('./config');
const { logInfo, logError } = require('./logger');

const trackDeposits = async () => {
  try {
    const depositContractAddress = process.env.CONTRACT_ADDRESS;

    // Subscribe to new block headers
    web3.eth.subscribe('newBlockHeaders', async (error, blockHeader) => {
      if (error) {
        logError('Error subscribing to newBlockHeaders', error);
        return;
      }

      logInfo(`New block received. Block # ${blockHeader.number}`);

      // Fetch block details
      const block = await web3.eth.getBlock(blockHeader.hash, true);

      // Process transactions in the block
      block.transactions.forEach((tx) => {
        if (tx.to && tx.to.toLowerCase() === depositContractAddress.toLowerCase()) {
          logInfo('ETH deposit detected!', tx);
          // Record deposit details (you can store in a database or file)
        }
      });
    });
  } catch (err) {
    logError('Error in trackDeposits function', err);
  }
};

module.exports = { trackDeposits };
