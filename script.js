const ROCK = 'Rock';
const PAPER = 'Paper';
const SCISSORS = 'Scissors';
const DRAW = 'Draw';

let playerScores = 0;
let computerScores = 0;

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
    if (inputValue === null) {
        return null;
    }

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
        msg = `Draw! +1 score to both sides. Computer: ${computerScores} Player: ${playerScores}`;
    } else if(roundResult === playerSelection) {
        msg = `Win! Congrulations! +1 score to you! Computer: ${computerScores} Player: ${playerScores}`;
    } else {
        msg = `Loose. :( +1 score to computer. Computer: ${computerScores} Player: ${playerScores}`;
    }

    return msg;
}

function calcRoundScores(playerSelection, roundResult) {
    if (roundResult === DRAW) {
        playerScores++;
        computerScores++;
    } else if(roundResult === playerSelection) {
        playerScores++;
    } else {
        computerScores++;
    }
}

function game() {
    let playerSelection;
    do {
        playerSelection = getPlayerSelection();
        if (playerSelection === null) {
            return null;
        } else if (!playerSelection) {
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

    calcRoundScores(playerSelection, roundResult);
    showRoundResult(playerSelection, roundResult);
}

function getWinnerMsgOfAllGame() {
    let msg;
    if (playerScores === computerScores) {
        msg = `DRAW! Computer: ${computerScores} Player: ${playerScores}`;
    } else if (playerScores > computerScores) {
        msg = `You won! Computer: ${computerScores} Player: ${playerScores}`;
    } else {
        msg = `Computer won! Computer: ${computerScores} Player: ${playerScores}`;
    }

    return msg;
}

function main() {
    showMessageToPlayer('Welcome to Rock-Scissors-Paper game in 5 rounds!');
    const roundAmount = 5; // later we can ask for amount

    let gameRes;
    for (let i = 1; i <= 5; i++) {
        console.log(`STARTED ROUND #${i}`);
        gameRes = game(); // gameRes is for errors checks
        if (gameRes === null) {
            showMessageToPlayer('The game was stopped.');
            break;
        }
    }

    if (gameRes !== null) {
        console.log('Finish.');
        showMessageToPlayer(getWinnerMsgOfAllGame());
    }
}

//game();
//main();
