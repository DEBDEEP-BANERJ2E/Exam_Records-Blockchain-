const Web3 = require('web3');

const blockchainConfig = () => {
    const web3 = new Web3(process.env.BLOCKCHAIN_NODE_URL); // Replace with your blockchain node URL
    return web3;
};

module.exports = blockchainConfig;
