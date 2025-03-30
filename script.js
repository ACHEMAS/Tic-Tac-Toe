const gameBoard = document.getElementById('game-board');
let currentPlayer = 'X';
let boardState = Array(9).fill(null);

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    gameBoard.appendChild(cell);
  }
}

function handleCellClick(event) {
  const index = event.target.dataset.index;
  if (!boardState[index]) {
    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWinner()) {
      alert(`${currentPlayer} wins!`);
      resetGame();
    } else if (boardState.every(cell => cell)) {
      alert('It\'s a draw!');
      resetGame();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  return winningCombos.some(combo => 
    combo.every(index => boardState[index] === currentPlayer)
  );
}

function resetGame() {
  boardState.fill(null);
  currentPlayer = 'X';
  gameBoard.innerHTML = '';
  createBoard();
}

createBoard();
