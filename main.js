const box = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const button = document.querySelector(".btn");

let currPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to initialize the game
function initGame() {
    currPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    box.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.className = `box box${index + 1}`;
    });

    button.classList.add("active");
    gameInfo.innerText = `Current Player - ${currPlayer}`;
}
initGame();

function swapTurn() {
    currPlayer = (currPlayer === "X") ? "O" : "X";
    // Update UI 
    gameInfo.innerText = `Current Player - ${currPlayer}`;
}

function checkGameover() {
    let answer = "";

    winningPositions.forEach((position) => {
        if (
            gameGrid[position[0]] !== "" &&
            gameGrid[position[1]] !== "" &&
            gameGrid[position[2]] !== "" &&
            gameGrid[position[0]] === gameGrid[position[1]] &&
            gameGrid[position[0]] === gameGrid[position[2]]
        ) {
            answer = gameGrid[position[0]];
            box[position[0]].classList.add("win");
            box[position[1]].classList.add("win");
            box[position[2]].classList.add("win");
            box.forEach((box) => {
                box.style.pointerEvents = "none";
            });
        }
    });

    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        button.classList.add("active");
        return;
    }

    // Check for tie
    let fillCount = gameGrid.filter(box => box !== "").length;
    if (fillCount === 9) {
        gameInfo.innerText = "Match Tied";
        button.classList.add("active");
    }
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        box[index].innerText = currPlayer;
        gameGrid[index] = currPlayer;
        box[index].style.pointerEvents = "none";
       
        // To swap the turn if the game is not over
            swapTurn();
    
         // To check if the game is over
         checkGameover();
    }
}

box.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

button.addEventListener("click", initGame);
