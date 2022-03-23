// to do: 
// assign arr to div elements


const columnArr = [];
const rowArr = [];
const playerChoices = [];

let player1;
let player2;

// STATE OF GAME
let playerTurn = 1; // player turn switches between 1 & 2
let playerValue = 2; // player value of '2' is assigned to player 1, value of '5' is assigned to player 2 
                     // used in array of playerChoices by totalling up value to determine victor
let column1Iterator = 0;
let column2Iterator = 0;
let column3Iterator = 0;
let column4Iterator = 0;
let column5Iterator = 0;
let column6Iterator = 0;
let column7Iterator = 0;
let turnTotalIterator = 0;

const itemEl = document.querySelector("div");

// values to set child id to
let currentTurn = 'player1';

// on click assign item = 'player1' or 'player2'
document.querySelector('div').addEventListener('click',handleClick);

const columnEl = document.getElementsByClassName("column");
const rowEl = document.getElementsByClassName("row")

// instantiate empty array to store choices
for (let i = 0; i < columnEl.length; i++) {
    playerChoices[i] = [];
    for (let j = 0; j < columnEl[i].children.length; j++) {
        playerChoices[i][j] = 0;
    }
}

// functions =======================================================================================
function render() {
    // change players and updates turn & values
    if (playerTurn === 1) {
        currentTurn = 'player2';
        playerTurn = 2;
        playerValue = 5;
    } else if (playerTurn === 2) {
        currentTurn = 'player1';
        playerTurn = 1;
        playerValue = 2;
    }
    checkVictory(playerChoices);
}

function resetGame () {
    // reset array of values
    for (let i = 0; i < columnEl.length; i++) {
        playerChoices[i] = [];
        for (let j = 0; j < columnEl[i].children.length; j++) {
            playerChoices[i][j] = 0;
        }
    }

    // reset playerChoice id
    let divEl = document.querySelectorAll('.row');
    divEl.forEach(element => {
        element.id = '';
    })

    playerTurn = 1; // player turn switches between 1 & 2
    playerValue = 2; // player value of '2' is assigned to player 1, value of '5' is assigned to player 2 
                        // used in array of playerChoices by totalling up value to determine victor
    column1Iterator = 0;
    column2Iterator = 0;
    column3Iterator = 0;
    column4Iterator = 0;
    column5Iterator = 0;
    column6Iterator = 0;
    column7Iterator = 0;
    turnTotalIterator = 0;
    currentTurn = 'player1';
    console.log(divEl);
}

function handleClick(e) {
    console.log(e.target.children);
    // console.log(e.target.children.getElementsByClassName('row').id);

    let divEl = e.target.getElementsByClassName('row');

    console.log(`${returnIterator(e.target)},${returnIterator2(e.target)}`);
    // return if column is not clicked
    if ( e.target.className != 'column') return;


    // find out which column child have id
    // if not, add ID, if yes, move to next
    if (e.target.className == 'column'){
        while (returnIterator(e.target) < divEl.length) {
            if (divEl[returnIterator(e.target)].id != 'player1' || divEl[returnIterator(e.target)].id != 'player2') {
                divEl[returnIterator(e.target)].id = currentTurn; 
                playerChoices[returnIterator2(e.target)][returnIterator(e.target)] = playerValue;
                // returnIterator(e.target) += 1; line not working with operator??? fix on line below
                incrementIterator(e.target);
                // checkIteratorSize(returnIterator(e.target),e.target);
                turnTotalIterator++;
                render();
                // console.log(playerChoices);
            }
            break;
        }
    }
} // END OF HANDLECLICK

// NOTE TEST RETURN ITERATORS
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

// check for victory conditions: 

function checkVictory (arr) {
    // horizontal - WORKS
    for(let i = 0; i < 7; i++) {
      for(let j = 0; j < arr[0].length; j++) {
        if (sumOfEle(arr[i][j], arr[i][j+1],arr[i][j+2],arr[i][j+3]) == 8) {
          return victoryScreech();
        } else if (sumOfEle(arr[i][j], arr[i][j+1],arr[i][j+2],arr[i][j+3]) == 20) {
          return victoryScreech2();
        } 
      }
    }
  
    // vertical - WORKS
    for(let i = 0; i < 4; i++) {
      for(let j = 0; j < 6; j++) {
        if (sumOfEle(arr[i][j], arr[i+1][j],arr[i+2][j],arr[i+3][j]) == 8) {
          return victoryScreech();
        } else if (sumOfEle(arr[i][j], arr[i+1][j],arr[i+2][j],arr[i+3][j]) == 20) {
          return victoryScreech2();
        } 
      }
    }
    // // diagonal - arrayview: bottom-left, top-right - WORKS
      for(let i = 0; i < 4; i++) {
        for(let j = 3; j < 6; j++) {
          if (sumOfEle(arr[i][j], arr[i+1][j-1],arr[i+2][j-2],arr[i+3][j-3]) == 8) {
            return victoryScreech();
          } else if (sumOfEle(arr[i][j], arr[i+1][j-1],arr[i+2][j-2],arr[i+3][j-3]) == 20) {
            return victoryScreech2();
          } 
        }
      }
    
    // diagonal - arrayview: top-left, bottom-right
      for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 3; j++) {
          if (sumOfEle(arr[i][j], arr[i+1][j+1],arr[i+2][j+2],arr[i+3][j+3]) == 8) {
            return victoryScreech();
          } else if (sumOfEle(arr[i][j], arr[i+1][j+1],arr[i+2][j+2],arr[i+3][j+3]) == 20) {
            return victoryScreech2();
          } 
        }
      }
  }
  
  function sumOfEle (a1, a2, a3, a4) {
    return a1 + a2 + a3 + a4;
  }
  
  function victoryScreech () {
    console.log(`player 1 wins`)
  }
  
  function victoryScreech2 () {
    console.log(`player 2 wins!`)
  }

  function checkIteratorSize (it, e) {
      if (it == 6) {
        e.id = 'column-filled'
      }
  }

  // backup just in case failure occurs

  // if (e.target.id == '1' && column1Iterator != 6) {
    // // set id to player turn
    //     while (column1Iterator < 6) {
    //         if (divEl[column1Iterator].id != 'player1' || divEl[column1Iterator].id != 'player2') {
    //             divEl[column1Iterator].id = currentTurn; 
    //             playerChoices[0][column1Iterator] = playerValue;
    //             column1Iterator++;
    //             checkIteratorSize(column1Iterator,e.target);
    //             console.log(playerChoices);
    //             render();
    //         }
    //         break;
    //     }
    // }
    
    // if (e.target.id == '2') {
    //     // set id to player turn
    //     while (column2Iterator < divEl.length) {
    //         if (divEl[column2Iterator].id != 'player1' || divEl[column2Iterator].id != 'player2') {
    //             divEl[column2Iterator].id = currentTurn; 
    //             playerChoices[1][column2Iterator] = playerValue;
    //             column2Iterator++;
    //             checkIteratorSize(column2Iterator,e.target);
    //             render();
    //         }
    //         break;
    //     }
    // }

    // if (e.target.id == '3') {
    //     // set id to player turn
    //     while (column3Iterator < divEl.length) {
    //         if (divEl[column3Iterator].id != 'player1' || divEl[column3Iterator].id != 'player2') {
    //             divEl[column3Iterator].id = currentTurn; 
    //             playerChoices[2][column3Iterator] = playerValue;
    //             column3Iterator++;
    //             checkIteratorSize(column3Iterator,e.target);
    //             render();
    //         }
    //         break;
    //     }
    // }

    // if (e.target.id == '4') {
    //     // set id to player turn
    //     while (column4Iterator < divEl.length) {
    //         if (divEl[column4Iterator].id != 'player1' || divEl[column4Iterator].id != 'player2') {
    //             divEl[column4Iterator].id = currentTurn; 
    //             playerChoices[3][column4Iterator] = playerValue;
    //             column4Iterator++;
    //             checkIteratorSize(column4Iterator,e.target);
    //             render();
    //         }
    //         break;
    //     }
    // }

    // if (e.target.id == '5') {
    //     // set id to player turn
    //     while (column5Iterator < divEl.length) {
    //         if (divEl[column5Iterator].id != 'player1' || divEl[column5Iterator].id != 'player2') {
    //             divEl[column5Iterator].id = currentTurn; 
    //             playerChoices[4][column5Iterator] = playerValue;
    //             column5Iterator++;
    //             checkIteratorSize(column5Iterator,e.target);
    //             render();
    //         }
    //         break;
    //     }
    // }
    // if (e.target.id == '6') {
    //     // set id to player turn
    //     while (column6Iterator < divEl.length) {
    //         if (divEl[column6Iterator].id != 'player1' || divEl[column6Iterator].id != 'player2') {
    //             divEl[column6Iterator].id = currentTurn; 
    //             playerChoices[5][column6Iterator] = playerValue;
    //             column6Iterator++;
    //             checkIteratorSize(column6Iterator,e.target);
    //             render();
    //         }
    //         break;
    //     }
    // }
    // if (e.target.id == '7') {
    //     // set id to player turn
    //     while (column7Iterator < divEl.length) {
    //         if (divEl[column7Iterator].id != 'player1' || divEl[column7Iterator].id != 'player2') {
    //             divEl[column7Iterator].id = currentTurn; 
    //             playerChoices[6][column7Iterator] = playerValue;
    //             column7Iterator++;
    //             checkIteratorSize(column7Iterator,e.target);
    //             render();
    //         }
    //         break;
    //     }
    // }