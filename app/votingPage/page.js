"use client";
import { useState, useEffect } from 'react';
import PopupSuccess from '@/components/popupsuccess';
import PopupInfo from '@/components/popupinfo';
import Candidate from '@/components/addcandidate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Contract, BrowserProvider } from "ethers";

const Home = () => {
	const [showPopupSuccess, setShowPopupSuccess] = useState(false);
	const [popupHeaderSuccess, setPopupHeaderSuccess] = useState("");
	const [showBalloon,setShowBalloon] = useState(false);
	const [balloonText,setBalloonText] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [president, setPresident] = useState([]);
  const [vice, setVice] = useState([]);
  const [media, setMedia] = useState([]);
  const [treasurer, setTreasurer] = useState([]);
  const [selectedVotes, setSelectedVotes] = useState({});
  const [hour, setHour] = useState(0);
  const [minutes, setMinute] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const provider = new BrowserProvider(window.ethereum)
  const contractAddress = '0x21c9Fa231F4Aed0a2702BE2B3ae976FB90C58E8F';
  const abi = [
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "position",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "grade",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "voteCount",
              "type": "uint256"
            }
          ],
          "internalType": "struct Voting.Candidate[]",
          "name": "_candidates",
          "type": "tuple[]"
        },
        {
          "internalType": "uint256",
          "name": "_durationInMinutes",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_position",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_grade",
          "type": "uint256"
        }
      ],
      "name": "addCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidates",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "position",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "grade",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllVotesOfCandidates",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "position",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "grade",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "voteCount",
              "type": "uint256"
            }
          ],
          "internalType": "struct Voting.Candidate[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getRemainingTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getVotingStatus",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "names",
          "type": "string[]"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingEnd",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingStart",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  const handleClosePopupSuccess = () => {
      setShowPopupSuccess(false);
  };

  const handleVoteChange = (name, position) => {
    setSelectedVotes(prevVotes => ({
      ...prevVotes,
      [position]: { name, position }
    }));
  };

  const renderDynamicRadioButtons = (candidates, position) => {
    return candidates.map((candidate, index) => (
      <label key={index} className='mb-8'>
        <span className='mr-2'>{Number(candidate.voteCount)} Votes</span>
        <input
          type='radio'
          name={`category-${position}`}
          value={candidate.name}
          onChange={() => handleVoteChange(candidate.name, position)}
        />
        <span className='ml-2'><strong>{candidate.name} {Number(candidate.grade)}th</strong></span>
      </label>
    ));
  };
  

  useEffect(() => {
    const getCandidates = async () => { 
      const readcontract = new Contract(contractAddress, abi, provider);
      const allCandidates = await readcontract.getAllVotesOfCandidates();
      var presidentCandidates = [];
      var viceCandidates = [];
      var mediaCandidates = [];
      var treasurerCandidates = [];

      for (let i = 0; i < allCandidates.length; i++) {
        const candidate = allCandidates[i];
        
  
        // Check the position and push the candidate data to the corresponding array
        if (candidate[1] === 'President') {
          presidentCandidates.push(candidate);
        } else if (candidate[1] === 'Vice President') {
          viceCandidates.push(candidate);
        } else if (candidate[1] === 'Media Manager') {
          mediaCandidates.push(candidate);
        } else if (candidate[1] === 'Treasurer') {
          treasurerCandidates.push(candidate);
        }
      }
      setPresident(presidentCandidates);
      setVice(viceCandidates);
      setMedia(mediaCandidates);
      setTreasurer(treasurerCandidates);

      const timeLeft = await readcontract.getRemainingTime();
      var minutes = Math.round(Number(timeLeft) / 60)
      var hours = Math.round(Number(minutes) / 60)
      var seconds = Math.round(Number(minutes) % 60)
      setHour(hours)
      setMinute(minutes)
      setSeconds(seconds)
    }
    getCandidates()
      .catch(console.error)
		
	}, []);

  const handleClickBalloon = () => {
    setBalloonText('Add new candidates to any position. (Cannot be reversed)');
    setShowBalloon(true);
  }

  const handleClickAdd = () => {
    setShowAdd(true);
  }

  const getRemaining = async() => {
    const readcontract = new Contract(contractAddress, abi, provider);
    const timeLeft = await readcontract.getRemainingTime();
    var minutes = Math.round(Number(timeLeft) / 60)
    var hours = Math.round(Number(minutes) / 60)
    var seconds = Math.round(Number(minutes) % 60)
    setHour(hours)
    setMinute(minutes)
    setSeconds(seconds)
  }
  setInterval(getRemaining, 1000)

  const submitVote = async () => {
    try {
      var votes = []
      for (const position in selectedVotes) {
        const { name, position: selectedPosition } = selectedVotes[position];
        if (name && selectedPosition) {
          votes.push(name)
          votes.push(selectedPosition)
        }
      }
      if (votes.length == 8) {
        const signer = await provider.getSigner();
        const contract = new Contract(contractAddress, abi, signer);
        const voteTxn = await contract.vote(votes);
        await voteTxn.wait();
        setPopupHeaderSuccess('Voting Complete!');
        setShowPopupSuccess(true);
        window.location.reload();
      }
      else {
        setPopupHeaderSuccess(`Please select a candidate for each position before voting.`);
        setShowPopupSuccess(true);
      }
    } 
    catch (error) {
      console.error('Error submitting vote:', error);
      setBalloonText(error);
      setShowBalloon(true);
    }
  };
  

  const handleCloseBalloon = () => {
    setShowBalloon(false);
  };

  const handleCloseAdd = () => {
    setShowAdd(false);
  };

    return (
      <section className='w-full flex-center flex-col margin'>
        <h1>Time Remaining: {hour}hrs {minutes}min {seconds}sec</h1>
        <h1 className='head_text darkgreen_gradient text-center'>
          ASB Elections
          <br className='max-md:hidden' />
        </h1>
        <h1 className='medium_text yellow_gradient text-center'>
          <span className='text-center'> Who would you like to represent your student body?</span>
        </h1>

        <div className='sm:flex hidden btn-below margin items-center justify-center'>
          <div className='flex flex-row space-x-32'>
            {/* Render dynamic radio buttons for President */}
            <div className='flex flex-col items-center'>
              <div className='text-center small_text mb-4'>President</div>
              <div className='flex flex-col items-center'>
                {renderDynamicRadioButtons(president, 'President')}
              </div>
            </div>

            {/* Render dynamic radio buttons for Vice President */}
            <div className='flex flex-col items-center'>
              <div className='text-center small_text mb-4'>Vice President</div>
              <div className='flex flex-col items-center'>
                {renderDynamicRadioButtons(vice, 'Vice President')}
              </div>
            </div>

            {/* Render dynamic radio buttons for Media Manager */}
            <div className='flex flex-col items-center'>
              <div className='text-center small_text mb-4'>Media Manager</div>
              <div className='flex flex-col items-center'>
                {renderDynamicRadioButtons(media, 'Media Manager')}
              </div>
            </div>

            {/* Render dynamic radio buttons for Treasurer */}
            <div className='flex flex-col items-center'>
              <div className='text-center small_text mb-4'>Treasurer</div>
              <div className='flex flex-col items-center'>
                {renderDynamicRadioButtons(treasurer, 'Treasurer')}
              </div>
            </div>
          </div>
        </div>

        <div className='sm:flex hidden btn-below margin items-center justify-center'>
          <button
            type='button'
            className='green_btn contract'
            onClick={submitVote}
          >
            Vote
          </button>

          <div className="mx-2"></div>

          <button
            type='button'
            className='black_btn about'
            onClick={handleClickAdd}
            >
            Edit
          </button>
          <FontAwesomeIcon
            onClick={handleClickBalloon}
            icon={faCircleInfo}
            style={{ color: "black", fontSize: '18px', cursor: 'pointer' }}
            className='m-2 py-0'
          />

        </div>

        {showPopupSuccess && (
          <PopupSuccess header={popupHeaderSuccess} text={""} closeModal={handleClosePopupSuccess} isOpen={showPopupSuccess}/>
        )}
        {showBalloon && (
          <PopupInfo text={balloonText} closeModal={handleCloseBalloon} isOpen={showBalloon}/>
        )}
        {showAdd && (
          <Candidate closeModal={handleCloseAdd} isOpen={showAdd}/>
        )}
    </section>
    );    
  };
  
  export default Home;