let order = [];
// Order that the player is pressing the lights
let playerOrder = [];   
// # of flashes of lights
let flash;  
let turn;
// Boolean - Wether player has picked the right lights or not
let good;      

// Whose turn is it? Computer's or User's?
let compTurn;  

// 'Strick" button status
let strict = false; 
let noise = true;

// Power button
let on = false; 

 // Boolean - If user has won or not
let win;   

const turnCounter = document.querySelector('#turn');
const topLef = document.querySelector('#topleft');
const  topRight = document.querySelector('#topright');
const  bottomLeft = document.querySelector('#bottomleft');
const  bottomRight = document.querySelector('#bottomright');
const  strictButton = document.querySelector('#strict');
const  onButton = document.querySelector('#on');
const  startButton = document.querySelector('#start');

// 'click' or 'change'
strictButton.addEventListener('change', e => {
    if (strictButton.checked == true) {
        strict = true;
    } else {
        strict = false;
    }
});

onButton.addEventListener('click', e => {
    if (onButton.checked == true) {
        on = true;
        turnCounter.innerHTML = "-";
    } else {
        on = false;
        turnCounter.innerHTML = "";
        clearColor();
        clearInterval(intervalId);
    }
});

startButton.addEventListener('click', e => {
    if (on || win) {
        play();
    }
});

function play() {
    // Ensure variables are reset
    win = false;
    order = []; 
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;

     // 1st round of the game
    turnCounter.innerHTML = 1; 

     // Player hasn't chosen anything incorrect yet 
    good = true;   
    for (var i = 0; i < 20; i++) {
        // 20 rounds before you win
        // Random # between 1-4
        order.push(Math.floor(Math.random() * 4) + 1)
    }
    // console.log(order);
    compTurn = true;    // It's first PC's turn
    intervalId = setInterval(gameTurn, 800); // 800 ms
}   // End of play() f(x)

