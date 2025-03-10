"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var restartButton = document.getElementById('restart-button');
  var winnerMessage = document.getElementById('winner-message');
  var winnerText = document.getElementById('winner-text');
  var currentPlayerDisplay = document.getElementById('current-player');
  var gameBoard = document.getElementById('game');
  var historyList = document.getElementById('history-list');
  var currentPlayer = 'Rouge';
  var gameActive = true;
  var board = Array(6).fill().map(function () {
    return Array(7).fill(null);
  });
  function createBoard() {
    gameBoard.innerHTML = '';
    var boardDiv = document.createElement('div');
    boardDiv.classList.add('board');
    var _loop = function _loop(row) {
      var _loop2 = function _loop2(col) {
        var cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener('click', function () {
          return handleCellClick(row, col);
        });
        boardDiv.appendChild(cell);
      };
      for (var col = 0; col < 7; col++) {
        _loop2(col);
      }
    };
    for (var row = 0; row < 6; row++) {
      _loop(row);
    }
    gameBoard.appendChild(boardDiv);
  }
  function handleCellClick(row, col) {
    if (gameActive && board[row][col] === null) {
      dropToken(row, col);
    }
  }
  function dropToken(row, col) {
    for (var i = 5; i >= 0; i--) {
      if (board[i][col] === null) {
        board[i][col] = currentPlayer;
        var cell = gameBoard.children[0].children[i * 7 + col];
        var token = document.createElement('div');
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
      winnerText.textContent = "".concat(currentPlayer, " a gagn\xE9 !");
      winnerMessage.classList.remove('hidden');
      updateHistory("".concat(currentPlayer, " a gagn\xE9 !"), 'victory');
    } else if (isBoardFull()) {
      gameActive = false;
      winnerText.textContent = "Match nul !";
      winnerMessage.classList.remove('hidden');
      updateHistory("Match nul !", 'draw');
    }
  }
  function checkHorizontal(row, col) {
    var count = 0;
    for (var c = 0; c < 7; c++) {
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
    var count = 0;
    for (var r = 0; r < 6; r++) {
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
    var count = 0;
    for (var i = -3; i <= 3; i++) {
      var r = row + i;
      var c = col + i;
      if (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === currentPlayer) {
        count++;
        if (count === 4) return true;
      }
    }
    count = 0;
    for (var _i = -3; _i <= 3; _i++) {
      var _r = row - _i;
      var _c = col + _i;
      if (_r >= 0 && _r < 6 && _c >= 0 && _c < 7 && board[_r][_c] === currentPlayer) {
        count++;
        if (count === 4) return true;
      }
    }
    return false;
  }
  function isBoardFull() {
    return board.every(function (row) {
      return row.every(function (cell) {
        return cell !== null;
      });
    });
  }
  function togglePlayer() {
    currentPlayer = currentPlayer === 'Rouge' ? 'Jaune' : 'Rouge';
    currentPlayerDisplay.textContent = "Joueur ".concat(currentPlayer, ", \xE0 toi de jouer !");
  }
  function updateHistory(result, type) {
    var historyItem = document.createElement('div');
    historyItem.classList.add('history-item', type);
    historyItem.textContent = result;
    if (historyList.children.length >= 3) {
      historyList.removeChild(historyList.children[0]);
    }
    historyList.appendChild(historyItem);
  }
  restartButton.addEventListener('click', function () {
    board = Array(6).fill().map(function () {
      return Array(7).fill(null);
    });
    gameActive = true;
    createBoard();
    winnerMessage.classList.add('hidden');
    currentPlayer = 'Rouge';
    currentPlayerDisplay.textContent = "Joueur ".concat(currentPlayer, ", \xE0 toi de jouer !");
  });
  createBoard();
});