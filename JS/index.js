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
const topLeft = document.querySelector('#topleft');
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

function gameTurn() {
    // Player cannot click any button while
    on = false;

    // If the computer's turn is over, we'll clear the interval
    if (flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }

    if (compTurn) {
        clearColor();
        // Will do something once after 
        setTimeout(() => {
            // flash starts from 0. 
            if(order[flash] == 1) one();
            if(order[flash] == 2) two();
            if(order[flash] == 3) three();
            if(order[flash] == 4) four();
            flash++;
        }, 200); 
    }
}

function one() {
    if (noise) {
        let audio = document.getElementById("clip1");
        audio.play();
    }
    noise = true; 
    topLeft.style.backgroundColor = "lightgreen";
}

function two() {
    if (noise) {
        let audio = document.getElementById("clip2");
        audio.play();
    }
    noise = true; 
    topRight.style.backgroundColor = "tomato";
}

function three() {
    if (noise) {
        let audio = document.getElementById("clip3");
        audio.play();
    }
    noise = true; 
    bottomLeft.style.backgroundColor = "yellow";
}

function four() {
    if (noise) {
        let audio = document.getElementById("clip4");
        audio.play();
    }
    noise = true; 
    bottomRight.style.backgroundColor = "lightskyblue";
}

function clearColor() {
    topLeft.style.backgroundColor = "darkgreen";
    topRight.style.backgroundColor = "darkred";
    bottomLeft.style.backgroundColor = "goldenrod";
    bottomRight.style.backgroundColor = "darkblue";
}

function flashColor() {
    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "tomato";
    bottomLeft.style.backgroundColor = "yellow";
    bottomRight.style.backgroundColor = "lightskyblue";
}

// Enabling user to click on sections

topLeft.addEventListener('click', e => {
    if (on) {
        // Sections that user has clicked
        playerOrder.push(1);
        check();
        one();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

topRight.addEventListener('click', e => {
    if (on) {
        // Sections that user has clicked
        playerOrder.push(2);
        check();
        two();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

bottomLeft.addEventListener('click', e => {
    if (on) {
        // Sections that user has clicked
        playerOrder.push(3);
        check();
        three();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

bottomRight.addEventListener('click', e => {
    if (on) {
        // Sections that user has clicked
        playerOrder.push(4);
        check();
        four();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

function check() {
    // playerOrder.length - 1 is the last thing user clicked on
    // 'good = false' means user has answered incorrectly
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) good = false;

    // 'good' instead of writing 'good = true'
    if (playerOrder.length == 20 && good) {
        winGame();
    }

    if (good == false) {
        flashColor();
        turnCounter.innerHTML = "NO!";
        setTimeout(() => {
            turnCounter.innerHTML = turn;
            clearColor();

            if (strict) {
                // Repeat the game
                play(); 
            } else {
                // Repeat the round
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);

        noise = false;
    }

    if (turn == playerOrder.length && good && !win) {
        // Next turn..
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }
}

function winGame() {
    flashColor();
    turnCounter.innerHTML = 'Win!';
    on = false;
    win = true;
}