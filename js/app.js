
// VARIABLE DECLARATION ================================================================================
const columnArr = [];
const rowArr = [];
const playerChoices = [];
const player1Value = 2;
const player2Value = 5;

let player1;
let player2;
let playerTurn; // = 1; // player turn switches between 1 & 2
let playerValue; // = 2; // player1 = 2, player2 =  5;
let currentTurn; // = 'player1';
let currentTurnGhost; //= 'player1-ghost'; 
let gameover = false;

let player1Points = 0;
let player2Points = 0;
let column1Iterator; // = 0;
let column2Iterator; // = 0;
let column3Iterator; // = 0;
let column4Iterator; // = 0;
let column5Iterator; // = 0;
let column6Iterator; // = 0;
let column7Iterator; // = 0;
let turnTotalIterator; // = 0;

const itemEl = document.querySelector("div");
const columnEl = document.getElementsByClassName("column");
const rowEl = document.getElementsByClassName("row")
const playerVictory = document.querySelector('#player-victory');
const divContainer = document.querySelector('div#container');
const rowDiv = document.querySelectorAll('.row');
const tallyPlayer1 = document.querySelector("#score1");
const tallyPlayer2 = document.querySelector("#score2");

divContainer.addEventListener('click',handleClick);
divContainer.addEventListener('mouseover', mouseHover);
divContainer.addEventListener('mouseout', mouseRemove)

init();

// FUNCTIONS ============================================================================================
// initialize game
function init () {
    // reset array of values
    for (let i = 0; i < columnEl.length; i++) {
        playerChoices[i] = [];
        for (let j = 0; j < columnEl[i].children.length; j++) {
            playerChoices[i][j] = 0;
        }
    }

    // reset playerChoice id
    rowDiv.forEach(element => {
        element.id = '';
    })

    playerTurn = 1;
    playerValue = player1Value;
    column1Iterator = 0;
    column2Iterator = 0;
    column3Iterator = 0;
    column4Iterator = 0;
    column5Iterator = 0;
    column6Iterator = 0;
    column7Iterator = 0;
    turnTotalIterator = 0;
    currentTurn = 'player1';
    currentTurnGhost = 'player1-ghost';
    playerVictory.innerHTML = "";
    gameover = false;
} // END OF INIT

function render() {
    // change players and updates turn & values
    if (playerTurn === 1) {
        currentTurn = 'player2';
        currentTurnGhost = 'player2-ghost'
        playerTurn = 2;
        playerValue = player2Value;
    } else if (playerTurn === 2) {
        currentTurn = 'player1';
        currentTurnGhost = 'player1-ghost'
        playerTurn = 1;
        playerValue = player1Value;
    }
    checkVictory(playerChoices);
} // END OF RENDER

function sumOfEle (a1, a2, a3, a4) {
    return a1 + a2 + a3 + a4;
  } 


// MOUSE FUNCTIONS: ============================================================================================
// On hover, place ghost piece in column on top of current piece
function mouseHover(e) {
    let rowElement;
    let columnClass;
    
    if (e.target.className == 'row') {
        rowElement = e.target.parentNode.children;
    } else if (e.target.className == 'column') {
        rowElement = e.target.children;
    } else {
        return;
    }

    if (e.target.className == 'column') {
        columnClass = e.target;
        divEl = e.target.getElementsByClassName('row');
    } else if (e.target.className == 'row') {
        columnClass = e.target.parentNode;
        divEl = columnClass.getElementsByClassName('row');
    }

    for (let i = returnIterator(columnClass); i < rowElement.length; i++) {
        if (rowElement[i].id != currentTurn) {
            rowElement[i].id = currentTurnGhost;
            break;
        }
    }
}

// Upon moving mouse, change back to normal state
function mouseRemove(e) {
    let rowElement;

    if (e.target.className == 'row') {
        rowElement = e.target.parentNode.children;
    } else if (e.target.className == 'column') {
        rowElement = e.target.children;
    } else {
        return;
    }

    for (let i = 0; i < 6; i++) {
        if (rowElement[i].id == currentTurnGhost) {
            rowElement[i].id = '';
            break;
        }
    }
}

function handleClick(e) {
    let columnClass;
    let divEl;

    if (e.target.className == 'column') {
        columnClass = e.target;
        divEl = e.target.getElementsByClassName('row');
    } else if (e.target.className == 'row') {
        columnClass = e.target.parentNode;
        divEl = columnClass.getElementsByClassName('row');
    }
    
    if ( columnClass.className != 'column') return;

    // set current turn, playervalue, increment iterators, and display pieces
    if (gameover === false) {
        if (columnClass.className == 'column'){
            while (returnIterator(columnClass) < divEl.length) {
                if (divEl[returnIterator(columnClass)].id != 'player1' || divEl[returnIterator(columnClass)].id != 'player2') {
                    divEl[returnIterator(columnClass)].id = currentTurn; 
                    playerChoices[returnIterator2(columnClass)][returnIterator(columnClass)] = playerValue;
                    // returnIterator(e.target) += 1; line not working with operator??? fix on line below
                    incrementIterator(columnClass);
                    // checkIteratorSize(returnIterator(e.target),e.target);
                    turnTotalIterator++;
                    render();
                    // console.log(playerChoices);
                }
                break;
            }
        }
    }
    tally();
} // END OF HANDLECLICK

// RETURN ITERATORS: ============================================================================================
// returns row iterator - Note: Value of row iterator will continually move up
function returnIterator (elements){
    if (elements.id == '1') {
        return column1Iterator;
    } else if (elements.id == '2') {
        return column2Iterator;
    } else if (elements.id == '3') {
        return column3Iterator;
    } else if (elements.id == '4') {
        return column4Iterator;
    } else if (elements.id == '5') {
        return column5Iterator;
    } else if (elements.id == '6') {
        return column6Iterator;
    } else if (elements.id == '7') {
        return column7Iterator;
    } else {
        return;
    }
}

// returns column index - Note: This value never changes
function returnIterator2 (elements) {
    if (elements.id == '1') {
        return 0;
    } else if (elements.id == '2') {
        return 1;
    } else if (elements.id == '3') {
        return 2;
    } else if (elements.id == '4') {
        return 3;
    } else if (elements.id == '5') {
        return 4;
    } else if (elements.id == '6') {
        return 5;
    } else if (elements.id == '7') {
        return 6;
    } else {
        return;
    }
}

function incrementIterator (elements){
    if (elements.id == '1') {
         column1Iterator++;
    } else if (elements.id == '2') {
         column2Iterator++;
    } else if (elements.id == '3') {
         column3Iterator++;
    } else if (elements.id == '4') {
        column4Iterator++;
    } else if (elements.id == '5') {
        column5Iterator++;
    } else if (elements.id == '6') {
        column6Iterator++;
    } else if (elements.id == '7') {
        column7Iterator++;
    } else {
        return;
    }
}

function checkIteratorSize (it, e) {
    if (it == 6) {
      e.id = 'column-filled'
    }
}

// END OF ITERATOR FUNCTIONS

// VICTORY FUNCTIONS ===========================================================================
// check for victory conditions: 
function checkVictory (arr) {
    // vertical
    for(let i = 0; i < 7; i++) {
      for(let j = 0; j < arr[0].length; j++) {
        if (sumOfEle(arr[i][j], arr[i][j+1],arr[i][j+2],arr[i][j+3]) == 8) {
            gameover = true;
            player1Points++;
            return victoryScreech(1);
        } else if (sumOfEle(arr[i][j], arr[i][j+1],arr[i][j+2],arr[i][j+3]) == 20) {
            gameover = true;
            player2Points++;
            return victoryScreech(2);
        } 
      }
    }
  
    // horizontal
    for(let i = 0; i < 4; i++) {
      for(let j = 0; j < 6; j++) {
        if (sumOfEle(arr[i][j], arr[i+1][j],arr[i+2][j],arr[i+3][j]) == 8) {
            gameover = true;
            player1Points++;
            return victoryScreech(1);
        } else if (sumOfEle(arr[i][j], arr[i+1][j],arr[i+2][j],arr[i+3][j]) == 20) {
            gameover = true;
            player2Points++;
            return victoryScreech(2);
        } 
      }
    }
    // diagonal - arrayview: bottom-left, top-right
      for(let i = 0; i < 4; i++) {
        for(let j = 3; j < 6; j++) {
          if (sumOfEle(arr[i][j], arr[i+1][j-1],arr[i+2][j-2],arr[i+3][j-3]) == 8) {
            gameover = true;
            player1Points++;
            return victoryScreech(1);
          } else if (sumOfEle(arr[i][j], arr[i+1][j-1],arr[i+2][j-2],arr[i+3][j-3]) == 20) {
            gameover = true;
            player2Points++;
            return victoryScreech(2);
          } 
        }
      }
    
    // diagonal - arrayview: top-left, bottom-right
      for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 3; j++) {
          if (sumOfEle(arr[i][j], arr[i+1][j+1],arr[i+2][j+2],arr[i+3][j+3]) == 8) {
            gameover = true;
            player1Points++;
            return victoryScreech(1);
          } else if (sumOfEle(arr[i][j], arr[i+1][j+1],arr[i+2][j+2],arr[i+3][j+3]) == 20) {
            gameover = true;
            player2Points++;
            return victoryScreech(2);
          } 
        }
      }
      draw();
} // END OF CHECKVICTORY

function victoryScreech (player) {
    if (player == 1) {
        return playerVictory.innerHTML = 'PLAYER 1 WINS!';
    } else if (player == 2) {
        return playerVictory.innerHTML = 'PLAYER 2 WINS!';
    }
  } // END OF VICTORYSCREECH
  
function tally () {
    tallyPlayer1.innerHTML = player1Points;
    tallyPlayer2.innerHTML = player2Points;
}

function draw (){
    if (turnTotalIterator == 42) {
        playerVictory.innerHTML = "IT'S A DRAW!";
        gameover = true;
    }
}