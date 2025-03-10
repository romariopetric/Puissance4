document.addEventListener("DOMContentLoaded", () => {
    const restartButton = document.getElementById('restart-button');
    const winnerMessage = document.getElementById('winner-message');
    const winnerText = document.getElementById('winner-text');
    const currentPlayerDisplay = document.getElementById('current-player');
    const gameBoard = document.getElementById('game');
    const historyList = document.getElementById('history-list'); 

    let currentPlayer = 'Rouge';
    let gameActive = true;
    let board = Array(6).fill().map(() => Array(7).fill(null));

    function createBoard() {
        gameBoard.innerHTML = ''; 
        const boardDiv = document.createElement('div');
        boardDiv.classList.add('board');
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row; 
                cell.dataset.col = col; 
                cell.addEventListener('click', () => handleCellClick(row, col));
                boardDiv.appendChild(cell);
            }
        }
        gameBoard.appendChild(boardDiv); 
    }

    function handleCellClick(row, col) {
        if (gameActive && board[row][col] === null) {
            dropToken(row, col);
        }
    }

    function dropToken(row, col) {
        for (let i = 5; i >= 0; i--) {
            if (board[i][col] === null) {
                board[i][col] = currentPlayer;
                const cell = gameBoard.children[0].children[i * 7 + col];
                const token = document.createElement('div');
                token.classList.add('token');
                token.style.backgroundColor = currentPlayer === 'Rouge' ? 'red' : 'yellow';
                cell.appendChild(token);
                checkWinner(i, col);
                togglePlayer();
                break;
            }
        }
    }

    function checkWinner(row, col) {
        if (checkHorizontal(row, col) || checkVertical(row, col) || checkDiagonal(row, col)) {
            gameActive = false;
            winnerText.textContent = `${currentPlayer} a gagné !`;
            winnerMessage.classList.remove('hidden');
            updateHistory(`${currentPlayer} a gagné !`, 'victory');
        } else if (isBoardFull()) {
            gameActive = false;
            winnerText.textContent = "Match nul !";
            winnerMessage.classList.remove('hidden');
            updateHistory("Match nul !", 'draw');
        }
    }

    function checkHorizontal(row, col) {
        let count = 0;
        for (let c = 0; c < 7; c++) {
            if (board[row][c] === currentPlayer) {
                count++;
                if (count === 4) return true;
            } else {
                count = 0;
            }
        }
        return false;
    }

    function checkVertical(row, col) {
        let count = 0;
        for (let r = 0; r < 6; r++) {
            if (board[r][col] === currentPlayer) {
                count++;
                if (count === 4) return true;
            } else {
                count = 0;
            }
        }
        return false;
    }

    function checkDiagonal(row, col) {
        let count = 0;
        for (let i = -3; i <= 3; i++) {
            const r = row + i;
            const c = col + i;
            if (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === currentPlayer) {
                count++;
                if (count === 4) return true;
            }
        }
        count = 0;
        for (let i = -3; i <= 3; i++) {
            const r = row - i;
            const c = col + i;
            if (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === currentPlayer) {
                count++;
                if (count === 4) return true;
            }
        }
        return false;
    }

    function isBoardFull() {
        return board.every(row => row.every(cell => cell !== null));
    }

    function togglePlayer() {
        currentPlayer = currentPlayer === 'Rouge' ? 'Jaune' : 'Rouge';
        currentPlayerDisplay.textContent = `Joueur ${currentPlayer}, à toi de jouer !`;
    }

    function updateHistory(result, type) {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item', type);
        historyItem.textContent = result;

        if (historyList.children.length >= 3) {
            historyList.removeChild(historyList.children[0]);
        }

        historyList.appendChild(historyItem);
    }

    restartButton.addEventListener('click', () => {
        board = Array(6).fill().map(() => Array(7).fill(null)); 
        gameActive = true;
        createBoard(); 
        winnerMessage.classList.add('hidden');
        currentPlayer = 'Rouge';
        currentPlayerDisplay.textContent = `Joueur ${currentPlayer}, à toi de jouer !`;
    });

    createBoard(); 
});






















































