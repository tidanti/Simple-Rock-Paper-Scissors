// constants
const ROCK = 'Rock';
const PAPER = 'Paper';
const SCISSORS = 'Scissors';
const DRAW = 'Draw';

// all elems to manipulate
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

restartBtn.addEventListener('click', restartGame);

toggleEventListenersToChoiceButtons();

function toggleEventListenersToChoiceButtons(remove = false) {
    playerCardsList.forEach(playerCard => {
        if (remove) {
            playerCard.removeEventListener('click', startRound);
        } else {
            playerCard.addEventListener('click', startRound);
        }
    });
}

function toggleLockOfChoiceButtons(lock = false) {
    playerCardsList.forEach(playerCard => {
        if (lock) {
            playerCard.classList.remove('hover-card');
        } else {
            playerCard.classList.add('hover-card');
        }
    });
}

function restartGame() {
    playTimes.textContent = '0';
    playWins.textContent = '0';
    playDraws.textContent = '0';
    playDefeats.textContent = '0';
    
    toggleLockOfChoiceButtons();
    toggleEventListenersToChoiceButtons();
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
        toggleLockOfChoiceButtons(true);
        toggleEventListenersToChoiceButtons(true);
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

function calcPlayerMove(inputValue) {
    const currentID = inputValue.getAttribute('id');

    if (currentID === 'rock') {
        return ROCK;
    } else if (currentID === 'paper') {
        return PAPER;
    } else {
        return SCISSORS;
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

function gameFinished() {
    return playTimes.textContent == 5;
}

function showAllGameResult() {
    const resMsg = getSummaryOfAllGame();

    gameResult.textContent = resMsg;
}

function showRoundResult(playerSelection, currentRoundResult) {
    const resMsg = getRoundResultMessage(playerSelection, currentRoundResult);

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
        msg = 'Draw!';
    } else if(roundResult === playerSelection) {
        msg = 'Win! :)';
    } else {
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
        currentScores = +(playDraws.textContent);
        currentScores += 1;
        playDraws.textContent = currentScores;
        changeRobotFace('draw');

    } else if(roundResult === playerSelection) {
        currentScores = +(playWins.textContent);
        currentScores += 1;
        playWins.textContent = currentScores;
        changeRobotFace('sad');

    } else {
        currentScores = +(playDefeats.textContent);
        currentScores += 1;
        playDefeats.textContent = currentScores;
        changeRobotFace('glad');

    }
}

function getSummaryOfAllGame() {
    let msg;
    const numWins = +(playWins.textContent);
    const numDefeats = +(playDefeats.textContent);

    if (numWins === numDefeats) {
        msg = 'DRAW! Nobody wins. Press "Restart".';
    } else if (numWins > numDefeats) {
        msg = 'WIN! You beat the computer! Press "Restart".';
    } else {
        msg = 'LOOSER! Mr. Super beats you. Press "Restart".'
    }

    return msg;
}
