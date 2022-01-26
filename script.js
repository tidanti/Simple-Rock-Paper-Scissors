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

function calcPlayerMove(inputValue) {
    let inputIsCorrect = (inputValue) ? true : false;
    if (!inputIsCorrect) {
        return inputIsCorrect;
    } else {
        inputValue = inputValue.toLowerCase();
        inputValue = inputValue.replace(inputValue[0], inputValue[0].toUpperCase());

        inputIsCorrect = (inputValue === ROCK) || (inputValue === PAPER) || (inputValue === SCISSORS);
        return (inputIsCorrect) ? inputValue : inputIsCorrect;
    }
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

function showRoundResult() {
    
}

function mainGame() {
    const userInput = prompt('Enter your selection:');
    console.log(userInput);
    const playerSelection = calcPlayerMove(userInput);
    console.log(playerSelection);

    if (!playerSelection) {
        showErrorMessage('Incorrect input! Try again!');
        return;
    }

    const computerSelection = computerPlay();
    console.log(computerSelection);

    if(!computerSelection) {
        showErrorMessage('Something has gone wrong in computerPlay!')
        return;
    }

    const roundResult = playRound(playerSelection, computerSelection);
    console.log(roundResult);
}

mainGame();