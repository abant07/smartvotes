const { expect } = require("chai");

describe("Voting", function () {
  it("Should return the original candidates", async function () {
    const Voting = await ethers.getContractFactory("Voting");
    const candidatesArray = [
      { name: "Mark", position: "President", grade: 11, voteCount: 0 },
      { name: "Mike", position: "Vice President", grade: 9, voteCount: 0 },
      { name: "Henry", position: "Media Manager", grade: 12, voteCount: 0 },
      { name: "Rock", position: "Treasurer", grade: 12, voteCount: 0}
    ];
    const candidates = await Voting.deploy(candidatesArray, 90);
    await candidates.waitForDeployment();

    var allCandidates = await candidates.getAllVotesOfCandidates();

    var candidate = []

    for (var i = 0; i < allCandidates.length; i++) {
      var info = []
      info[0] = allCandidates[i].name
      info[1] = allCandidates[i].position
      info[2] = Number(allCandidates[i].grade)
      info[3] = Number(allCandidates[i].voteCount)
      candidate[i] = info
    }

    const deployedCandidates = [
      ["Mark", "President", 11, 0 ],
      ["Mike", "Vice President", 9, 0 ],
      ["Henry", "Media Manager", 12, 0 ],
      ["Rock", "Treasurer", 12, 0 ]
    ];

    expect(candidate).to.deep.equal(deployedCandidates);

  });

  it("Should return the new candidates", async function () {
    const Voting = await ethers.getContractFactory("Voting");
    const candidatesArray = [
      { name: "Mark", position: "President", grade: 11, voteCount: 0 },
      { name: "Mike", position: "Vice President", grade: 9, voteCount: 0 },
      { name: "Henry", position: "Media Manager", grade: 12, voteCount: 0 },
      { name: "Rock", position: "Treasurer", grade: 12, voteCount: 0}
    ];
    const candidates = await Voting.deploy(candidatesArray, 90);
    await candidates.waitForDeployment();

    const addCandidateTxn = await candidates.addCandidate("Jesus", "Secretary", 10);

    await addCandidateTxn.wait();

    var allCandidates = await candidates.getAllVotesOfCandidates();
    var candidate = []

    for (var i = 0; i < allCandidates.length; i++) {
      var info = []
      info[0] = allCandidates[i].name
      info[1] = allCandidates[i].position
      info[2] = Number(allCandidates[i].grade)
      info[3] = Number(allCandidates[i].voteCount)
      candidate[i] = info
    }

    const expectedCandidates = [
      ["Mark", "President", 11, 0],
      ["Mike", "Vice President", 9, 0],
      ["Henry", "Media Manager", 12, 0],
      ["Rock", "Treasurer", 12, 0],
      ["Jesus", "Secretary", 10, 0]
    ];

    expect(candidate).to.deep.equal(expectedCandidates);
  })

  it("Should allow the user to vote", async function () {
    const Voting = await ethers.getContractFactory("Voting");
    const candidatesArray = [
      { name: "Mark", position: "President", grade: 11, voteCount: 0 },
      { name: "Mike", position: "Vice President", grade: 9, voteCount: 0 },
      { name: "Henry", position: "Media Manager", grade: 12, voteCount: 0 },
      { name: "Rock", position: "Treasurer", grade: 12, voteCount: 0}
    ];
    const candidates = await Voting.deploy(candidatesArray, 90);
    await candidates.waitForDeployment();

    const voteTxn = await candidates.vote(["Mark", "President", "Mike", "Vice President"]);

    await voteTxn.wait();

    var allCandidates = await candidates.getAllVotesOfCandidates();

    var candidate = []

    for (var i = 0; i < allCandidates.length; i++) {
      var info = []
      info[0] = allCandidates[i].name
      info[1] = allCandidates[i].position
      info[2] = Number(allCandidates[i].grade)
      info[3] = Number(allCandidates[i].voteCount)
      candidate[i] = info
    }

    console.log(candidate)

    const expectedCandidates = [
      ["Mark", "President", 11, 1],
      ["Mike", "Vice President", 9, 1],
      ["Henry", "Media Manager", 12, 0],
      ["Rock", "Treasurer", 12, 0]
    ];


    expect(candidate).to.deep.equal(expectedCandidates);
  })
});

