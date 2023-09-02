let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

// Winning Pattern Array
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

// Player 'X' plays first
let xTurn = true;
let count = 0;

// Disable all buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    // Enable popup
    popupRef.classList.remove("hide");
};

// Enable all buttons (for new game and restart)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });

    // Disable popup
    popupRef.classList.add("hide");
};

// This function is executed when a player wins
const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    } else {
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
    }
};

// Function to declare a draw
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

// New Game button click event
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

// Restart button click event
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

// Win Logic
const winChecker = () => {
    // Loop through all win patterns
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        // Check if elements are filled and all are the same
        if (element1 != "" && element2 != "" && element3 != "") {
            if (element1 == element2 && element2 == element3) {
                // If all 3 buttons have the same values, call winFunction
                winFunction(element1);
            }
        }
    }
};

// Display X/O on button click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            // Display X
            element.innerHTML = "X";
            element.disabled = true;
        } else {
            xTurn = true;
            // Display O
            element.innerHTML = "O";
            element.disabled = true;
        }

        // Increment count on each click
        count += 1;
        if (count == 9) {
            drawFunction();
        }

        // Check for win on every click
        winChecker();
    });
});

// Enable Buttons and hide popup on page load
window.onload = enableButtons;
