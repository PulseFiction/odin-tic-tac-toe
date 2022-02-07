const playGame = (() => {
  const cells = document.querySelectorAll("[data-cell]");
  const playButton = document.querySelector(".playButton");
  const board = document.querySelector(".board");
  const winScreen = document.querySelector(".winScreen");
  const winMessage = document.querySelector(".winningMessage");
  const restartButton = document.querySelector(".restart");
  const userName = document.querySelector(".name");
  const label = document.querySelector(".nameLabel");
  const welcomeMessage = document.querySelector(".welcomeMessage");
  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let turn = true;

  const startGame = () => {
    if (userName.value === "") {
      console.log("Please enter a name");
    } else {
      welcomeMessage.textContent = `Welcome ${userName.value} and good luck!`;
      welcomeMessage.style.display = "block";
      label.style.display = "none";
      userName.style.display = "none";
      playButton.style.display = "none";
      board.style.display = "grid";
    }
  };

  const swapTurns = () => {
    turn = !turn;
  };

  const gameWin = (noughts, crosses) => {
    return WINNING_COMBINATIONS.some((combination) => {
      return combination.every((index) => {
        return (
          cells[index].textContent === noughts ||
          cells[index].textContent === crosses
        );
      });
    });
  };

  const gameDraw = () => {
    const isFilled = (cell) => cell.textContent != "";
    return [...cells].every(isFilled);
  };

  const restartGame = () => {
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.style.cursor = "pointer";
    });
    label.style.display = "";
    userName.style.display = "";
    winMessage.textContent = "";
    playButton.style.display = "";
    winScreen.style.display = "none";
    welcomeMessage.style.display = "none";
    board.style.display = "none";
  };

  const placePiece = (e) => {
    const noughts = "O";
    const crosses = "X";
    if (turn === true && e.target.textContent === "") {
      e.target.textContent = "X";
      e.target.style.cursor = "not-allowed";
    } else if (turn === false && e.target.textContent === "") {
      e.target.textContent = "O";
      e.target.style.cursor = "not-allowed";
    }

    if (gameWin(noughts)) {
      winScreen.style.display = "flex";
      winMessage.textContent = "Noughts win!";
    } else if (gameWin(crosses)) {
      winScreen.style.display = "flex";
      winMessage.textContent = "Crosses win!";
    } else if (gameDraw()) {
      winScreen.style.display = "flex";
      winMessage.textContent = `It's a draw!`;
    }

    swapTurns();
  };

  cells.forEach((cell) => {
    cell.addEventListener("click", placePiece);
  });

  playButton.addEventListener("click", startGame);

  restartButton.addEventListener("click", restartGame);
})();
