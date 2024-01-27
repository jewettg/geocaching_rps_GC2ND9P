//
//  Javascript:  Rock, Paper, Scissors Game
//  
//  Original Code from:
//   https://codepen.io/bradtraversy/pen/wLgPzr
//  
//  Code adopted for standalone by:
//    Greg Jewett, http://geocaching.ejewett.com/
// 
//  This script allows a user to interact with three symbols (rock, paper, scissors)
//  displayed on the screen as their choice in the standard Rock, Paper, Scissors 
//  Game (RPS) battle.
// 
//  ---------------------------------------------------------------------------------------
//  CHANGE LOG
//  2024-01-26 (GSJ) Initial version
//                   Adapted original code to display final coordinates on 10 wins.
//  2024-01-26 (GSJ) Added a "losing" scenario, where if the computer reaches 10 wins,
//                   the game is over, and the match must restart.
//  ---------------------------------------------------------------------------------------
// 
//  =======================================================================================
//  BEGIN Script
//  =======================================================================================

const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const finalcoord = document.getElementById('finalcoord');
const scoreboard = {
  player: 0,
  computer: 0
};
window.sessionStorage.clear();
window.sessionStorage.setItem("cheatCheck", false)

// Play game
function play(e) {
  restart.style.display = 'inline-block';
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  showWinner(winner, computerChoice);
}

// Get computers choice
function getComputerChoice() {
  const rand = Math.random();
  if (rand < 0.34) {
    return 'rock';
  } else if (rand <= 0.67) {
    return 'paper';
  } else {
    return 'scissors';
  }
}

// Get game winner
function getWinner(p, c) {
  if (p === c) {
    return 'draw';
  } else if (p === 'rock') {
    if (c === 'paper') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (p === 'paper') {
    if (c === 'scissors') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (p === 'scissors') {
    if (c === 'rock') {
      return 'computer';
    } else {
      return 'player';
    }
  }
}

function showWinner(winner, computerChoice) {
  if (winner === 'player') {
    // Inc player score
    scoreboard.player++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-win">You Win</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
    `;
  } else if (winner === 'computer') {
    // Inc computer score
    scoreboard.computer++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-lose">You Lose</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
    `;
  } else {
    result.innerHTML = `
      <h1>It's A Draw</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
    `;
  }
  // Show score
  score.innerHTML = `
    <p>Player: ${scoreboard.player}</p>
    <p>Computer: ${scoreboard.computer}</p>
    `;

  if (scoreboard.player > 9) {
    window.sessionStorage.setItem("cheatCheck", true)
    window.location.replace("win.html");
  }

  if (scoreboard.computer > 9) {
    window.location.replace("lose.html");
  }
  
  modal.style.display = 'block';
}

// Restart game
function restartGame() {
  scoreboard.player = 0;
  scoreboard.computer = 0;
  score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
  `;
  finalcoord.style.display = "none";
}

// Clear modal
function clearModal(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

// Event listeners
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);
//  =======================================================================================
//  END Script
//  =======================================================================================
