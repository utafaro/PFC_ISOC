// app.js

// Configurez une connexion Web3
const web3 = new Web3(Web3.givenProvider);

// Adresse du contrat
const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';

// Abi du contrat
const contractABI = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "hash1",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "hash2",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "joinGame",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "player1",
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
            "inputs": [],
            "name": "player2",
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
            "inputs": [],
            "name": "rev1",
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
            "name": "rev2",
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "played",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "code",
                    "type": "uint256"
                }
            ],
            "name": "reveal",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "score1",
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
            "name": "score2",
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
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "hash",
                    "type": "bytes32"
                }
            ],
            "name": "sendHash",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "state",
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
];

// Chargement du contrat
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Écouteur d'événement pour surveiller les résultats
contract.events.Result((error, event) => {
  if (error) {
    console.error(error);
  } else {
    const winner = event.returnValues.winner;
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `Le gagnant est : ${winner}`;
  }
});

// Fonction pour rejoindre le jeu
async function joinGame() {
  const accounts = await web3.eth.requestAccounts();
  const account = accounts[0];

  contract.methods.joinGame().send({ from: account })
    .on('transactionHash', (hash) => {
      console.log('Transaction hash:', hash);
    })
    .on('confirmation', (confirmationNumber, receipt) => {
      console.log('Confirmation number:', confirmationNumber);
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}

// Fonction pour soumettre le mouvement choisi
async function submitMove(move, code) {
  const accounts = await web3.eth.requestAccounts();
  const account = accounts[0];

  contract.methods.sendHash(web3.utils.keccak256(web3.eth.abi.encodeParameters(['uint256', 'uint256'], [move, code]))).send({ from: account })
    .on('transactionHash', (hash) => {
      console.log('Transaction hash:', hash);
    })
    .on('confirmation', (confirmationNumber, receipt) => {
      console.log('Confirmation number:', confirmationNumber);
    })
    .on('error', (error) => {
      console.error('Error:', error);
    });
}

// Écouteurs d'événements pour les boutons
document.getElementById('join').addEventListener('click', joinGame);
document.getElementById('rock').addEventListener('click', () => submitMove(1, 123));
document.getElementById('paper').addEventListener('click', () => submitMove(2, 456));
document.getElementById('scissors').addEventListener('click', () => submitMove(3, 789));