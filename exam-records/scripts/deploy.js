async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Get the ExamRecords contract factory
    const ExamRecords = await ethers.getContractFactory("ExamRecords");

    // Deploy the contract
    console.log("Deploying ExamRecords contract...");
    const examRecords = await ExamRecords.deploy();

    console.log("ExamRecords contract deployed to:", examRecords.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
