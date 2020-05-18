/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
const dice = document.querySelector(".dice");
const diceRoll = document.querySelector(".btn-roll");
const holdBt = document.querySelector(".btn-hold");
const newBt = document.querySelector(".btn-new");
const score0 = document.getElementById("score-0");
const score1 = document.getElementById("score-1");
const current0 = document.getElementById("current-0");
const current1 = document.getElementById("current-1");
const active1 = document.querySelector(".player-0-panel");
const active2 = document.querySelector(".player-1-panel");
const name1 = document.getElementById("name-0");
const name2 = document.getElementById("name-1");

function Player(name, scoreTotal, roundScore, rolls) {
    this.name = name;
    this.scoreTotal = scoreTotal;
    this.roundScore = roundScore;
    this.rolls = rolls;
}

active1.classList.add('active');
const playerOne = new Player("Player 1", 0, 0, true);
const playerTwo = new Player("Player 2", 0, 0, false);

const firstName = prompt("What is first player name?", playerOne.name);
const secondName = prompt("What is second player name?", playerTwo.name)

playerOne.name = firstName;
playerTwo.name = secondName;

name1.innerText = playerOne.name;
name2.innerText = playerTwo.name;

//Total score count
score0.innerHTML = playerOne.scoreTotal
score1.innerHTML = playerTwo.scoreTotal

//Round score count
current0.innerHTML = playerOne.roundScore
current1.innerHTML = playerTwo.roundScore


function rollTheDice() {
    if (playerOne.scoreTotal <= 100 && playerTwo.scoreTotal <= 100) {
        checkWin();
        let result = Math.floor(Math.random() * 6) + 1
        if (result === 0) {
            result = 1;
        }
        dice.setAttribute("src", "dice-" + result + ".png");
        if (playerOne.rolls === true) {
            playerOne.roundScore += result;
            current0.innerHTML = playerOne.roundScore;
            if (result === 1) {
                holdScore(playerOne, playerTwo, score0, current0, active1, active2)
            }
        } else {
            playerTwo.roundScore += result;
            current1.innerHTML = playerTwo.roundScore;
            if (result === 1) {
                holdScore(playerTwo, playerOne, score1, current1, active2, active1)
            }
        }
    }
}

function hold() {
    if (playerOne.scoreTotal <= 100 && playerTwo.scoreTotal <= 100) {
        if (playerOne.rolls === true) {
            holdItem(playerOne, playerTwo, score0, current0, active1, active2);
        } else {
            holdItem(playerTwo, playerOne, score1, current1, active2, active1);
        }
        checkWin();
    }
}

function holdScore(player1, player2, score, current, activeA, activeB) {
    player1.roundScore = 0;
    player1.scoreTotal += player1.roundScore;
    score.innerHTML = player1.scoreTotal;
    current.innerHTML = 0;
    player1.rolls = false;
    activeA.classList.remove('active');
    player2.rolls = true;
    activeB.classList.add('active');
}

function holdItem(player1, player2, score, current, activeA, activeB) {
    player1.scoreTotal += player1.roundScore;
    score.innerHTML = player1.scoreTotal;
    player1.roundScore = 0;
    current.innerHTML = 0;
    player1.rolls = false;
    activeA.classList.remove('active');
    player2.rolls = true;
    activeB.classList.add('active');
};

function newGame() {
    active1.classList.add('active');
    active2.classList.remove('active');
    playerOne.scoreTotal = 0;
    playerOne.roundScore = 0;
    playerOne.rolls = true;
    playerTwo.scoreTotal = 0;
    playerTwo.roundScore = 0;
    playerTwo.rolls = false;
    score0.innerText = 0;
    score1.innerText = 0;
    current0.innerText = 0;
    current1.innerText = 0;
    name1.innerText = playerOne.name;
    name2.innerText = playerTwo.name;
}

function checkWin() {
    if (playerOne.scoreTotal >= 100) {
        name1.innerText = "Winner!";
        name2.innerText = "Lost!";
    } else if (playerTwo.scoreTotal >= 100) {
        name1.innerText = "Lost!";
        name2.innerText = "Winner!";
    }
}


holdBt.addEventListener('click', hold);

newBt.addEventListener('click', newGame);

diceRoll.addEventListener('click', rollTheDice)