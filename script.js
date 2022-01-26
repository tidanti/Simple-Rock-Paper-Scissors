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

function showMessageToPlayer(msg) {
    alert(msg);
}

function showErrorMessage(msg) {
    console.log(msg);
}

function getPlayerSelection() {
    let userInput = prompt('Enter your selection:');
    console.log(userInput);
    let playerSelection = calcPlayerMove(userInput);
    console.log(playerSelection);

    return playerSelection;
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

function showRoundResult(playerSelection, roundResult) {
    const resMsg = getRoundResultMessage(playerSelection, roundResult);
    console.log(resMsg);
}

function getRoundResultMessage(playerSelection, roundResult) {
    let msg;
    if (roundResult === DRAW) {
        msg = 'Draw! +1 score to both sides.';
    } else if(roundResult === playerSelection) {
        msg = 'Win! Congrulations! +1 score to you!';
    } else {
        msg = 'Loose. :( +1 score to computer';
    }

    return msg;
}

function game() {
    let playerSelection;
    do {
        playerSelection = getPlayerSelection();
        if (!playerSelection) {
            showErrorMessage('Incorrect input! Try again!');
        }
    } while (!playerSelection);

    const computerSelection = computerPlay();
    console.log(computerSelection);

    if(!computerSelection) {
        showErrorMessage('Something has gone wrong in computerPlay!')
        return null;
    }

    let roundResult = playRound(playerSelection, computerSelection);
    console.log(roundResult);

    showRoundResult(playerSelection, roundResult);
}

function main() {
    showMessageToPlayer('Welcome to Rock-Scissors-Paper game in 5 rounds!');
    const roundAmount = 5; // later we can ask for amount

    for (let i = 1; i <= 5; i++) {
        let gameRes = game(); // gameRes is for errors checks
        if (gameRes === null) {
            showErrorMessage('Smth has gone wrong! The game was stopped.');
            break;
        }
    }

    console.log('Finish.')
}

//game();
main();