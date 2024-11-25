require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// Define a custom task to list accounts
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/271ab634fc744bcfac5a81386365457c`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
