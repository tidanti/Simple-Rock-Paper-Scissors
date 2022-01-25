// input values

// check values

// show error (msg)

// computer plays - DONE!

// get round result - DONE!

// show result

const ROCK = 'Rock';
const PAPER = 'Paper';
const SCISSORS = 'Scissors';
const DRAW = 'Draw';

function showErrorMessage(msg) {
    console.log(msg);
}

function playerInputIsCorrect(inputValue) {
    let inputIsCorrect = (inputValue) ? true : false;
    return inputIsCorrect;
}

function calcPlayerMove(inputValue) {

}

function computerPlay() {
    let computerMove = Math.floor(Math.random() * 3); // num from 0 to 2
    switch (computerMove) {
        case 0:
            computerMove = ROCK;
            break;
        case 1:
            computerMove = PAPER;
            break;
        case 2:
            computerMove = SCISSORS;
            break;
        default:
            computerMove = null;
            //showErrorMessage('Something has gone wrong in computerPlay!');
    }

    return computerMove;
}

function playRound(playerMove, computerMove) {
    if ((playerMove === ROCK && computerMove === SCISSORS) ||
        playerMove === PAPER && computerMove === ROCK ||
        playerMove === SCISSORS && computerMove === PAPER) {
            return playerMove;
    
    } else if (playerMove === computerMove) {
        return DRAW;
    } else {
        return computerMove;
    }
}

