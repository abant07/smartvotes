async function main() {
  const Voting = await ethers.getContractFactory("Voting");
    const candidatesArray = [
      { name: "Mark", position: "President", grade: 11, voteCount: 0 },
      { name: "Mike", position: "Vice President", grade: 9, voteCount: 0 },
      { name: "Henry", position: "Media Manager", grade: 12, voteCount: 0 },
      { name: "Rock", position: "Treasurer", grade: 12, voteCount: 0}
    ];
    const candidates = await Voting.deploy(candidatesArray, 90);
    await candidates.waitForDeployment();
    console.log("Voting deployed to:", candidates.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
