const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');
const newGameBtn = document.getElementById('newGameBtn');

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

cells.forEach(cell => cell.addEventListener('click', handleClick));
newGameBtn.addEventListener('click', startNewGame);

function handleClick(e) {
    const index = e.target.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer);

    checkWinner();
}

function checkWinner() {
    let roundWon = false;

    for (let condition of winningConditions) {
        const [a, b, c] = condition;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showResult(`🎉 Player ${currentPlayer} Wins!`);
        return;
    }

    if (!board.includes("")) {
        showResult("🤝 It's a Draw!");
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function showResult(message) {
    gameActive = false;
    resultMessage.textContent = message;
    resultScreen.style.display = "flex";
}

function startNewGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = `Player X's Turn`;
    resultScreen.style.display = "none";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
    });
}