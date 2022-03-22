// to do: 
// assign arr to div elements


const columnArr = [];
const rowArr = [];
const playerChoices = [];

let player1;
let player2;

// state of game
let playerTurn = 1;
let playerValue = 2;
let column1Iterator = 0;
let column2Iterator = 0;
let column3Iterator = 0;
let column4Iterator = 0;
let column5Iterator = 0;

// assign div to array or is it the other way?
// if clicked, change class/id to 'player1' or 'player2'

const itemEl = document.querySelector("div");

// on click assign item = 'player1' or 'player2'
// itemEl.addEventListener('click', event => {
//     console.log("clicked");
// })

// values to set child id to
let currentTurn = 'player1';

document.querySelector('div').addEventListener('click',handleClick);

// assign div to array or is it the other way?
// if clicked, change class/id to 'player1' or 'player2'

const columnEl = document.getElementsByClassName("column");
const rowEl = document.getElementsByClassName("row")

// for (let i = 0; i < columnEl.length; i++) {
//    columnArr[i] = columnEl[i];
//     for (let j = 0; j < columnEl[i].children.length; j++) 
//     columnArr[i][j] = columnEl[i].children[j];
// }

// instantiate empty array to store choices
for (let i = 0; i < columnEl.length; i++) {
    playerChoices[i] = [];
    for (let j = 0; j < columnEl[i].children.length; j++) {
        playerChoices[i][j] = 0;
    }
}

console.log(playerChoices);


// functions =======================================================================================
function render() {
    // change players and updates turn
    if (playerTurn === 1) {
        currentTurn = 'player2';
        playerTurn = 2;
        playerValue = 5;
    } else if (playerTurn === 2) {
        currentTurn = 'player1';
        playerTurn = 1;
        playerValue = 2;
    }
}

function handleClick(e) {
    console.log(e.target.children);
    // console.log(e.target.children.getElementsByClassName('row').id);

    let divEl = e.target.getElementsByClassName('row');

 
    // return if column is not clicked
    if ( e.target.className != 'column') return;


    // find out which column child have id
    // if not, add ID, if yes, move to next
    if (e.target.id == '1') {
    // set id to player turn
        while (column1Iterator < divEl.length) {
            if (divEl[column1Iterator].id != 'player1' || divEl[column1Iterator].id != 'player2') {
                divEl[column1Iterator].id = currentTurn; 
                playerChoices[0][column1Iterator] = playerValue;
                column1Iterator++;
                console.log(playerChoices);
            }
            break;
        }
    }
    
    if (e.target.id == '2') {
        // set id to player turn
        while (column1Iterator < divEl.length) {
            if (divEl[column2Iterator].id != 'player1' || divEl[column2Iterator].id != 'player2') {
                divEl[column2Iterator].id = currentTurn; 
                playerChoices[1][column2Iterator] = playerValue;
                column2Iterator++;
            }
            break;
        }
    }

    if (e.target.id == '3') {
        // set id to player turn
        while (column1Iterator < divEl.length) {
            if (divEl[column3Iterator].id != 'player1' || divEl[column3Iterator].id != 'player2') {
                divEl[column3Iterator].id = currentTurn; 
                playerChoices[2][column3Iterator] = playerValue;
                column3Iterator++;
            }
            break;
        }
    }

    if (e.target.id == '4') {
        // set id to player turn
        while (column1Iterator < divEl.length) {
            if (divEl[column4Iterator].id != 'player1' || divEl[column4Iterator].id != 'player2') {
                divEl[column4Iterator].id = currentTurn; 
                playerChoices[3][column4Iterator] = playerValue;
                column4Iterator++;
            }
            break;
        }
    }

    if (e.target.id == '5') {
        // set id to player turn
        while (column1Iterator < divEl.length) {
            if (divEl[column5Iterator].id != 'player1' || divEl[column5Iterator].id != 'player2') {
                divEl[column5Iterator].id = currentTurn; 
                playerChoices[4][column5Iterator] = playerValue;
                column5Iterator++;
            }
            break;
        }
    }

    // let str1 = 'column';
    // let str2 = 'Iterator';
    // let iterator = str1.concat(e.target.id,str2);
    // console.log(iterator);


    render();
}

function checkForVictory () {
 // vertical victory

}

// set up function to return iterator