let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;  //player X, player O

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    resetBtn.classList.remove("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO == "true") {
            box.innerText = "O";
            turnO = "false";
        } else {
            box.innerText = "X";
            turnO = "true";
        }
        box.disabled = "true";

        checkDraw();
        checkWinner();
    })
});

//Function for draw check
function checkDraw() {
    let allBoxDisabled = true;
    for (let box of boxes) {
        if (!box.disabled) {
            allBoxDisabled = false;
            break;
        }
    }
    if (allBoxDisabled) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
        resetBtn.classList.add("hide");
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const showWinner = (Winner) => {
    msg.innerText = `Congratulations, Winner is ${Winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    resetBtn.classList.add("hide");
}

const checkWinner = () => {
    for (pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
            }
        }
    }
}

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);