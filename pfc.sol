pragma solidity ^0.8.7;

contract RockPaperScissors {
    address public player1;
    address public player2;

    uint public score1;
    uint public score2;

    bytes32 public hash1;
    bytes32 public hash2;

    uint public rev1;
    uint public rev2;
    //rock = 1 , paper = 2, scissors = 3

    uint public state;

    constructor() {
        player1 = msg.sender;

    }

    function joinGame() public{
       require(player1 != msg.sender, "le joueur 1 ne peut pas etre le joueur 2");
       require(state==0, "La partie a deja commence");
       player2 = msg.sender;
       state=1;
    }

    function sendHash(bytes32 hash) public{
        if((msg.sender == player1) && (state==1 || state==3)){
            hash1 = hash;
            if(state==1) state=2;
            if(state==3) state=4;
        }else if((msg.sender == player2) && (state==1 || state==2)){
            hash2 = hash;
            if(state==1) state=3;
            if(state==2) state=4;
        } else revert("hash non pris en compte ");
    }

    function reveal(uint played, uint code) public{
        if((msg.sender==player1) && (state==4||state==6)){
            require(hash1 == keccak256(abi.encodePacked(played, code)), "hashage incorrect");
            rev1 = played;
            if(state==4) state=5;
            if(state==6) endTurn();
        } else if((msg.sender==player2) && (state==4||state==5)){
            require(hash2 == keccak256(abi.encodePacked(played, code)), "hashage incorrect");
            rev2 = played;
            if(state==4) state=6;
            if(state==5) endTurn();
        }else revert("hash non revele");
    }


    function endTurn() private{
        if (rev1 == rev2) {
            state == 1;
        } else if ((rev1 == 2 && rev2 == 1) || (rev1 == 3 && rev2 == 2) || (rev1 == 1 && rev2 == 3)) {
            score1 += 1;
            if (score1 == 3) state = 7;
            else state == 1;
        } else {
            score2 += 1;
            if (score2 == 3) state = 7;
        }
}

}