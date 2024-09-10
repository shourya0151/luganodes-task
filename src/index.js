require('dotenv').config();
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));

module.exports = web3;

const { trackDeposits } = require('./tracker');

// Start tracking deposits
trackDeposits();