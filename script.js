// constants
const ROCK = 'Rock';
const PAPER = 'Paper';
const SCISSORS = 'Scissors';
const DRAW = 'Draw';

// all elems to manipulate
/*const rockChoice = document.querySelector('#rock');
const paperChoice = document.querySelector('#paper');
const scissorsChoice = document.querySelector('#scissors');*/
const playerCardsList = document.querySelectorAll('.player-card');

const playerMove = document.querySelector('.main-game-content.player-move-img');
const computerMove = document.querySelector('.main-game-content.robot-move-img');
const roundResult = document.querySelector('.main-game-content.round-result');
const computerFace = document.querySelector('#robot-area .robot-img');

const playTimes = document.querySelector('#times-stat');
const playWins = document.querySelector('#wins-stat');
const playDraws = document.querySelector('#draws-stat');
const playDefeats = document.querySelector('#defeats-stat');

const gameResult = document.querySelector('#game-result');
const restartBtn = document.querySelector('#restart-button');

// global scores
let playerScores = 0;
let computerScores = 0;

restartBtn.addEventListener('click', restartGame);
/*rockChoice.addEventListener('click', startRound);
paperChoice.addEventListener('click', startRound);
scissorsChoice.addEventListener('click', startRound);*/

playerCardsList.forEach(playerCard => {
    playerCard.addEventListener('click', startRound);
});

function restartGame() {
    playTimes.textContent = '0';
    playWins.textContent = '0';
    playDraws.textContent = '0';
    playDefeats.textContent = '0';
    
    resetMovesArea(playerMove, computerMove);
    roundResult.textContent = 'Let\'s play 5 rounds!';
    gameResult.textContent = '';

    changeRobotFace();
}

function resetMovesArea(...areasToReset) {
    for (area of areasToReset) {
        area.childNodes.forEach(child => {
            area.removeChild(child);
        });
    }
}

function startRound(e) {
    const playerSelection = calcPlayerMove(e.target);
    const computerSelection = computerPlay();

    resetMovesArea(playerMove, computerMove);
    showMoveAtGameArea(playerSelection);
    showMoveAtGameArea(computerSelection, true);

    const currentRoundResult = playRound(playerSelection, computerSelection);
    calcRoundScores(playerSelection, currentRoundResult);
    showRoundResult(playerSelection, currentRoundResult);

    if (gameFinished()) {
        showAllGameResult();
    }
}

function showMoveAtGameArea(currentMove, computerArea = false) {
    roundResult.textContent = '';

    const imgContainer = (computerArea) ? computerMove : playerMove;
    const currentImg = document.createElement('img');
    currentImg.classList.toggle('hidden');
    
    switch (currentMove) {
        case ROCK:
            currentImg.setAttribute('src', './images/rock.png');
            currentImg.setAttribute('alt', 'Rock');
            break;
        case PAPER:
            currentImg.setAttribute('src', './images/paper.png');
            currentImg.setAttribute('alt', 'paper');
            break;
        default:
            currentImg.setAttribute('src', './images/scissors.png');
            currentImg.setAttribute('alt', 'scissors');
    }

    if (computerArea) {
        currentImg.style.transform = 'scale(-1.5, 1.5)';
    } else {
        currentImg.style.transform = 'scale(1.5)';
    }

    imgContainer.appendChild(currentImg);
    currentImg.classList.toggle('hidden'); // DOESN'T WORK!
}

function changeRobotFace(imgName = '') {
    if (imgName === 'sad') {
        computerFace.setAttribute('src', './images/pc_face_sad.png');
    } else if (imgName === 'glad') {
        computerFace.setAttribute('src', './images/pc_face_glad.png');
    } else {
        computerFace.setAttribute('src', './images/pc_face_start.png');
    }
}

// not required
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
    const currentID = inputValue.getAttribute('id');

    if (currentID === 'rock') {
        return ROCK;
    } else if (currentID === 'paper') {
        return PAPER;
    } else {
        return SCISSORS;
    }
    
    /*if (inputValue === null) {
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
    }*/
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

function gameFinished() {
    return playTimes.textContent == 5;
}

function showAllGameResult() {
    const resMsg = getSummaryOfAllGame();

    gameResult.textContent = resMsg;
}

function showRoundResult(playerSelection, currentRoundResult) {
    const resMsg = getRoundResultMessage(playerSelection, currentRoundResult);
    //console.log(resMsg);

    roundResult.textContent = resMsg;
    switch (resMsg) {
        case 'Win! :)':
            roundResult.style.color = 'green';
            break;
        case 'Loose. :(':
            roundResult.style.color = 'red';
            break;
        default:
            roundResult.style.color = 'black';
    }
}

function getRoundResultMessage(playerSelection, roundResult) {
    let msg;
    if (roundResult === DRAW) {
        //msg = `Draw! +1 score to both sides. Computer: ${computerScores} Player: ${playerScores}`;
        msg = 'Draw!';
    } else if(roundResult === playerSelection) {
        //msg = `Win! Congrulations! +1 score to you! Computer: ${computerScores} Player: ${playerScores}`;
        msg = 'Win! :)';
    } else {
        //msg = `Loose. :( +1 score to computer. Computer: ${computerScores} Player: ${playerScores}`;
        msg = 'Loose. :(';
    }

    return msg;
}

function calcRoundScores(playerSelection, roundResult) {
    let currentScores, currentTimes;
    
    currentTimes = +(playTimes.textContent);
    currentTimes += 1;
    playTimes.textContent = currentTimes;

    if (roundResult === DRAW) {
        /*playerScores++;
        computerScores++;*/

        currentScores = +(playDraws.textContent);
        currentScores += 1;
        playDraws.textContent = currentScores;
        changeRobotFace('draw');

    } else if(roundResult === playerSelection) {
        //playerScores++;
        currentScores = +(playWins.textContent);
        currentScores += 1;
        playWins.textContent = currentScores;
        changeRobotFace('sad');

    } else {
        //computerScores++;
        currentScores = +(playDefeats.textContent);
        currentScores += 1;
        playDefeats.textContent = currentScores;
        changeRobotFace('glad');

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

function getSummaryOfAllGame() {
    /*let msg;
    if (playerScores === computerScores) {
        msg = `DRAW! Computer: ${computerScores} Player: ${playerScores}`;
    } else if (playerScores > computerScores) {
        msg = `You won! Computer: ${computerScores} Player: ${playerScores}`;
    } else {
        msg = `Computer won! Computer: ${computerScores} Player: ${playerScores}`;
    }

    return msg;*/

    let msg;
    const numWins = +(playWins.textContent);
    const numDefeats = +(playDefeats.textContent);

    if (numWins === numDefeats) {
        msg = 'DRAW! Nobody wins.';
    } else if (numWins > numDefeats) {
        msg = 'WIN! You beat the computer!';
    } else {
        msg = 'LOOSER! Mr. Super beats you.'
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
        showMessageToPlayer(getSummaryOfAllGame());
    }
}

//game();
//main();
