"use client";
import React, { useRef, useState } from "react";
import { ReactSVG } from 'react-svg';
import { Contract, BrowserProvider } from "ethers";
import PopupSuccess from '@/components/popupsuccess';

const Candidate = ({ closeModal, isOpen }) => {
  const [headerText, setHeaderText] = useState("TBD");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [numberValue, setNumberValue] = useState(9);
  const [showPopupSuccess, setShowPopupSuccess] = useState(false);
	const [popupHeaderSuccess, setPopupHeaderSuccess] = useState("");
	const [showBalloon,setShowBalloon] = useState(false);
	const [balloonText,setBalloonText] = useState("");

  const modalRef = useRef();

  const provider = new BrowserProvider(window.ethereum)
  const contractAddress = '0xeff472Af1DE82928E664238639Bf95C5fB0341a9';
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
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "role",
          "type": "string"
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

  const handleClose = (e) => {
    if (modalRef.current === e.target) {
      closeModal();
    }
  };

  const handleClosePopupSuccess = () => {
    setShowPopupSuccess(false);
};

  const addCandidate = async () => {
    try {
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, abi, signer);  
      const addCandidateTxn = await contract.addCandidate(text1, text2, numberValue);
      await addCandidateTxn.wait();
      setPopupHeaderSuccess('Candidate added!');
      setShowPopupSuccess(true);
      window.location.reload();
    } catch (error) {
      console.error('Error submitting vote:', error);
      // Handle error as needed
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-50  ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleClose}
      ref={modalRef}
    >
      <div className="w-full max-w-md max-h-screen bg-white rounded-lg p-4 transform transition-all duration-300 opacity-100 scale-100">
        {/* Header text */}
        <h1 className="text-h text-gray-700 font-bold flex justify-center">Enter Candidate Details (Name, Position, Grade)</h1>
        <div>
          <ReactSVG src="/assets/images/moreinfo.svg" className="mb-5" />

          {/* Text Input 1 */}
          <input
            type="text"
            placeholder="Name"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
          />

          {/* Text Input 2 */}
          <input
            type="text"
            placeholder="Position"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
          />

          {/* Number Input */}
          <input
            type="number"
            placeholder="Grade Level"
            value={numberValue}
            onChange={(e) => setNumberValue(Math.min(12, Math.max(9, e.target.value)))}
            min="9"
            max="12"
            className="mb-2 p-2 border border-gray-300 rounded"
          />

          {/* Submit Button */}
          <button
            type="button"
            onClick={addCandidate}
            className="mb-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </div>

      {showPopupSuccess && (
          <PopupSuccess header={popupHeaderSuccess} text={""} closeModal={handleClosePopupSuccess} isOpen={showPopupSuccess}/>
      )}
    </div>
  );
};

export default Candidate;
