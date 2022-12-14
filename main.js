const ticTacToe = (() => {
  const player = (name, symbol, isPlaying) => {
    let controller = "human";
    let botLevel = "easy";
    const setName = (value) => (name = value);
    const setIsPlaying = (value) => (isPlaying = value);
    const setController = (value) => (controller = value);
    const setBotLevel = (value) => (botLevel = value);

    return {
      name,
      symbol,
      isPlaying,
      controller,
      botLevel,
      setName,
      setIsPlaying,
      setController,
      setBotLevel,
    };
  };

  const playerAi = (() => {
    const randomPlay = (board) => {
      let row;
      let col;

      do {
        row = Math.round(Math.random() * 2);
        col = Math.round(Math.random() * 2);
      } while (board[row][col] !== null);

      return { row, col };
    };

    const aiValutation = (playerWins, player, opponent, depth) =>
      playerWins === player
        ? 10 - depth
        : playerWins === opponent
        ? -10 + depth
        : 0;

    const findBestMove = (board, player, opponent) => {
      let bestMove = {
        row: null,
        col: null,
      };

      let bestMoveValue = -Infinity;

      //for each move in board
      board.map((row, rowIndex) => {
        row.map((col, colIndex) => {
          if (col === null) {
            // Make a move
            board[rowIndex][colIndex] = player;

            // Take minimax valutation
            let currentMoveValue = minimax(board, player, opponent, 0, false);

            // Undo the move
            board[rowIndex][colIndex] = null;

            // Take the best move
            if (currentMoveValue > bestMoveValue) {
              bestMove.row = rowIndex;
              bestMove.col = colIndex;
              bestMoveValue = currentMoveValue;
            }
          }
        });
      });

      return bestMove;
    };

    const minimax = (board, player, opponent, depth, isMax) => {
      let result = gameBoard.evalutateBoard(board, player, opponent);

      let score = aiValutation(result, player, opponent, depth);

      // Base case: minmax find a value of the board state or no move left
      if (score > 0) {
        return score;
      }

      if (score < 0) {
        return score;
      }

      if (gameBoard.isMoveLeft(board) === false) {
        return 0;
      }

      // Recursive case
      if (isMax) {
        let bestVal = -Infinity;

        // Traverse the board
        board.map((row, rowIndex) => {
          row.map((col, colIndex) => {
            // Find available move
            if (col === null) {
              // Play
              board[rowIndex][colIndex] = player;

              // Find best value
              bestVal = Math.max(
                bestVal,
                minimax(board, player, opponent, depth + 1, false)
              );

              // Undo the play
              board[rowIndex][colIndex] = null;
            }
          });
        });
        return bestVal;
      } else {
        let bestVal = Infinity;

        //Traverse the board
        board.map((row, rowIndex) => {
          row.map((col, colIndex) => {
            // Find available move
            if (col === null) {
              // Play
              board[rowIndex][colIndex] = opponent;

              // Find best value
              bestVal = Math.min(
                bestVal,
                minimax(board, player, opponent, depth + 1, true)
              );

              // Undo the move
              board[rowIndex][colIndex] = null;
            }
          });
        });
        return bestVal;
      }
    };

    return {
      findBestMove,
      randomPlay,
    };
  })();

  const getDOMElements = (() => {
    const main = document.querySelector("#display");
    const sectionGameBoard = document.querySelector("#gameBoard");
    const infoText = document.querySelector("#info-text");
    const title = document.querySelector("#title");
    const spots = document.querySelectorAll(".spot");
    const playerOneName = document.querySelector("#player-one-name");
    const playerTwoName = document.querySelector("#player-two-name");

    const playFirst = document.querySelectorAll("input[name=radio-play-first]");
    const changeNameBtns = document.querySelectorAll(".btn-change");
    const playerController = document.querySelectorAll(".radio-controller");
    const levels = document.querySelectorAll(".bot-level");
    const btnStart = document.querySelector("#btn-start");

    return {
      main,
      sectionGameBoard,
      infoText,
      title,
      spots,
      playerOneName,
      playerTwoName,
      playFirst,
      changeNameBtns,
      playerController,
      levels,
      btnStart,
    };
  })();

  const setGame = (() => {
    // Create standard instances
    const playerOne = player("Player 1", "X", true);
    const playerTwo = player("Player 2", "O", false);

    // Event Listeners Footer
    getDOMElements.playFirst.forEach((button) =>
      button.addEventListener("change", setPlayFirst)
    );
    getDOMElements.changeNameBtns.forEach((button) =>
      button.addEventListener("click", changePlayerName)
    );
    getDOMElements.playerController.forEach((button) =>
      button.addEventListener("change", setControllers)
    );

    const create = (element) => document.createElement(element);

    function changePlayerName(event) {
      // Create card for entering new name
      const background = create("div");
      const card = create("div");
      const newNameLabel = create("label");
      const newName = create("input");
      const btnSave = create("button");
      const btnChange = event.target.dataset.btn;
      const btnChangeName = String(event.target.dataset.name);

      background.classList.add("layer");

      card.classList.add("card");

      newNameLabel.setAttribute("for", "newName");
      newNameLabel.textContent = "New Name";
      newNameLabel.classList.add("card-label");

      newName.setAttribute("type", "text");
      newName.setAttribute("id", "newName");
      newName.setAttribute("name", "newName");
      newName.classList.add("card-input");

      btnSave.setAttribute("type", "button");
      btnSave.textContent = "Save";
      btnSave.classList.add("btn", "btn-card");
      btnSave.addEventListener("click", setPlayerName);

      // Append card on DOM
      getDOMElements.main.insertBefore(
        background,
        getDOMElements.main.firstChild
      );
      background.appendChild(card);
      card.appendChild(newNameLabel);
      card.appendChild(newName);
      card.appendChild(btnSave);

      function setPlayerName() {
        // Get the button which fire the event
        const playerName = document.querySelector(`#${btnChange}`);

        if (!newName.value) {
          playerName.textContent = btnChangeName;
        } else {
          if (btnChange === "player-one-name") {
            playerName.textContent = newName.value;
            playerOne.name = playerOne.setName(newName.value);
          } else {
            playerName.textContent = newName.value;
            playerTwo.name = playerTwo.setName(newName.value);
          }
        }

        // Remove card
        btnSave.removeEventListener("click", setPlayerName);
        background.remove();
      }
    }

    function setPlayFirst(event) {
      const startPlaying = event.target.value;

      if (startPlaying === "player-one-play-first") {
        playerOne.isPlaying = playerOne.setIsPlaying(true);
        playerTwo.isPlaying = playerTwo.setIsPlaying(false);
      } else {
        playerOne.isPlaying = playerOne.setIsPlaying(false);
        playerTwo.isPlaying = playerTwo.setIsPlaying(true);
      }
    }

    function setControllers(event) {
      const controller = event.target.value;

      if (controller === "controller-player-one-human") {
        playerOne.controller = playerOne.setController("human");
        playerOne.botLevel = playerOne.setBotLevel("easy");
        gameDisplay.resetBotLevel(event);
      } else if (controller === "controller-player-one-bot") {
        playerOne.controller = playerOne.setController("bot");
        setLevel();
        gameDisplay.botLevel(event);
      } else if (controller === "controller-player-two-human") {
        playerTwo.controller = playerTwo.setController("human");
        playerTwo.botLevel = playerTwo.setBotLevel("easy");
        gameDisplay.resetBotLevel(event);
      } else {
        playerTwo.controller = playerTwo.setController("bot");
        setLevel();
        gameDisplay.botLevel(event);
      }
    }

    const setLevel = () => {
      getDOMElements.levels.forEach((menu) =>
        menu.addEventListener("change", newValue)
      );

      function newValue(event) {
        if (event.target.parentNode.dataset.level === "player-one") {
          playerOne.botLevel = playerOne.setBotLevel(event.target.value);

          getDOMElements.levels.forEach((menu) =>
            menu.removeEventListener("change", newValue)
          );
        }

        if (event.target.parentNode.dataset.level === "player-two") {
          playerTwo.botLevel = playerTwo.setBotLevel(event.target.value);
        }
      }
    };

    const whoIsPlayng = () =>
      playerOne.isPlaying ? playerOne.symbol : playerTwo.symbol;

    const isHuman = (player) =>
      (player === "X" && playerOne.controller === "human") ||
      (player === "O" && playerTwo.controller === "human")
        ? true
        : false;

    const whichLevel = (player) =>
      player === "X" ? playerOne.botLevel : playerTwo.botLevel;

    const resetPlayer = () => {
      playerOne.isPlaying = playerOne.setIsPlaying(true);
      playerOne.controller = playerOne.setController("human");
      playerOne.botLevel = playerOne.setBotLevel("easy");

      playerTwo.isPlaying = playerTwo.setIsPlaying(false);
      playerTwo.controller = playerTwo.setController("human");
      playerTwo.botLevel = playerTwo.setBotLevel("easy");
    };

    return {
      playerOne,
      playerTwo,
      whoIsPlayng,
      isHuman,
      whichLevel,
      resetPlayer,
    };
  })();

  const gameDisplay = (() => {
    const toggleBoard = () => {
      getDOMElements.sectionGameBoard.classList.toggle("board");
      getDOMElements.sectionGameBoard.classList.toggle("invisible");
    };

    const toggleInfoText = () => {
      getDOMElements.infoText.classList.toggle("invisible");
    };

    const playerTurn = () => {
      if (setGame.playerOne.isPlaying) {
        getDOMElements.playerOneName.classList.add("in-play");
        getDOMElements.playerTwoName.classList.remove("in-play");
      } else {
        getDOMElements.playerOneName.classList.remove("in-play");
        getDOMElements.playerTwoName.classList.add("in-play");
      }
    };

    const botLevel = (event) => {
      const div = document.querySelector(
        `#bot-level-${event.target.dataset.level}`
      );
      const selectLabel = document.createElement("label");
      const select = document.createElement("select");
      const optionEasy = document.createElement("option");
      const optionMedium = document.createElement("option");
      const optionUnbeatable = document.createElement("option");

      selectLabel.textContent = "Difficulty:";
      selectLabel.setAttribute("for", "levels");
      selectLabel.classList.add("invisible");

      select.setAttribute("name", "levels");
      select.setAttribute("id", "levels");
      select.classList.add("menu-style");

      optionEasy.textContent = "Easy";
      optionEasy.setAttribute("value", "easy");

      optionMedium.textContent = "Medium";
      optionMedium.setAttribute("value", "medium");

      optionUnbeatable.textContent = "Unbeatable";
      optionUnbeatable.setAttribute("value", "unbeatable");

      div.appendChild(selectLabel);
      div.appendChild(select);
      select.appendChild(optionEasy);
      select.appendChild(optionMedium);
      select.appendChild(optionUnbeatable);
    };

    const resetBotLevel = (event) => {
      const div = document.querySelector(
        `#bot-level-${event.target.dataset.level}`
      );

      div.replaceChildren();
    };

    const resetPlayerTurn = () => {
      getDOMElements.playerOneName.classList.remove("in-play");
      getDOMElements.playerTwoName.classList.remove("in-play");
    };

    const disableFooterBtn = () => {
      getDOMElements.playFirst.forEach((button) => (button.disabled = true));
      getDOMElements.changeNameBtns.forEach(
        (button) => (button.disabled = true)
      );
      getDOMElements.btnStart.disabled = true;
      getDOMElements.playerController.forEach((button, index) => {
        button.disabled = true;

        if (
          (button.checked && index === 1) ||
          (button.checked && index === 3)
        ) {
          const disableSelect = document.querySelectorAll(".menu-style");
          disableSelect.forEach((menu) => menu.setAttribute("disabled", true));
        }
      });
    };

    const resetFooterBtn = () => {
      getDOMElements.playFirst.forEach((button, index) => {
        button.disabled = false;

        if (!button.checked && index === 0) button.checked = true;

        if (button.checked && index === 1) button.checked = false;
      });

      getDOMElements.playerController.forEach((button, index) => {
        button.disabled = false;

        if (
          (!button.checked && index === 0) ||
          (!button.checked && index === 2)
        ) {
          button.checked = true;
          const removeSelect = document.querySelectorAll(".menu-style");

          const removeSelectLabel =
            document.querySelectorAll("label[for=levels]");
          removeSelect.forEach((menu) => menu.remove());
          removeSelectLabel.forEach((label) => label.remove());
        }
      });

      getDOMElements.changeNameBtns.forEach(
        (button) => (button.disabled = false)
      );
      getDOMElements.btnStart.disabled = false;
    };

    const winningMessage = (result) => {
      // Create result display
      const wrapper = document.createElement("div");
      const winningText = document.createElement("p");
      const newGameInfo = document.createElement("p");

      wrapper.classList.add("winning-msg");
      if (result === "Win X" || result === "Win O") {
        winningText.textContent = `${
          result === "Win X" ? setGame.playerOne.name : setGame.playerTwo.name
        } wins the match`;
        winningText.classList.add("winning-text");
      } else {
        winningText.textContent = `It's a tie`;
        winningText.classList.add("tie-text");
      }

      newGameInfo.textContent = `Click for play again`;
      newGameInfo.classList.add("restart-msg");

      wrapper.addEventListener("click", playAgain);

      // Append result display on DOM
      getDOMElements.title.after(wrapper);
      wrapper.appendChild(winningText);
      wrapper.appendChild(newGameInfo);

      function playAgain() {
        wrapper.removeEventListener("click", playAgain);
        restartGame();
      }
    };

    const startGame = () => {
      toggleBoard();
      toggleInfoText();
      playerTurn();
      disableFooterBtn();
    };

    const endGame = (result) => {
      resetPlayerTurn();
      toggleBoard();
      winningMessage(result);
    };

    const restartGame = () => {
      // Get the winning message
      const winningDisplay = document.querySelector(".winning-msg");

      resetFooterBtn();

      if (winningDisplay) {
        winningDisplay.remove();
      }

      toggleInfoText();
    };

    return {
      playerTurn,
      botLevel,
      resetBotLevel,
      startGame,
      endGame,
    };
  })();

  const gameBoard = (() => {
    const boardState = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];

    function play(event) {
      const player = setGame.whoIsPlayng();
      const isHuman = setGame.isHuman(player);
      const level = setGame.whichLevel(player);
      const opponent = player === "X" ? "O" : "X";

      if (isHuman) {
        if (!event.target.textContent) {
          updateBoardState(
            boardState,
            event.target.dataset.row,
            event.target.dataset.column,
            player
          );

          getDOMElements.spots.forEach((spot) =>
            spot.removeEventListener("click", play)
          );
        } else {
          return 0;
        }
      } else {
        const aiOrandom = Math.round(Math.random() * 10);

        const move =
          level === "easy"
            ? aiOrandom < 3
              ? playerAi.findBestMove(boardState, player, opponent)
              : playerAi.randomPlay(boardState)
            : level === "medium"
            ? aiOrandom < 6
              ? playerAi.findBestMove(boardState, player, opponent)
              : playerAi.randomPlay(boardState)
            : playerAi.findBestMove(boardState, player, opponent);

        updateBoardState(boardState, move.row, move.col, player);
      }

      renderBoardState(boardState);

      game.nextMove(boardState, player, opponent);
    }

    // Update boardState array
    const updateBoardState = (board, row, col, symbol) =>
      board[row].splice(col, 1, symbol);

    // Render boardState array
    const renderBoardState = (board) =>
      getDOMElements.spots.forEach(
        (spot) =>
          (spot.textContent = board[spot.dataset.row][spot.dataset.column])
      );

    // Evalutate boardState
    const evalutateBoard = (board, player, opponent) => {
      // Horizontal wins
      let horizontalWins = board
        .map((row) => row.every((value) => value === player))
        .includes(true)
        ? player
        : board
            .map((row) => row.every((value) => value === opponent))
            .includes(true)
        ? opponent
        : 0;
      if (horizontalWins) {
        return horizontalWins;
      }

      // Diagonal win
      let diagonalWins = board
        .map((row, index) => row[index] === player)
        .every((value) => value === true)
        ? player
        : board
            .map((row, index) => row[index] === opponent)
            .every((value) => value === true)
        ? opponent
        : 0;
      if (diagonalWins) {
        return diagonalWins;
      }

      let diagonalWins2 = board
        .map((row, index) => row[2 - index] === player)
        .every((value) => value === true)
        ? player
        : board
            .map((row, index) => row[2 - index] === opponent)
            .every((value) => value === true)
        ? opponent
        : 0;
      if (diagonalWins2) {
        return diagonalWins2;
      }

      // Vertical Wins
      let verticalWins = board
        .map((col, colIndex) =>
          board[0][colIndex] === player &&
          board[1][colIndex] === player &&
          board[2][colIndex] === player
            ? true
            : false
        )
        .includes(true)
        ? player
        : board
            .map((col, colIndex) =>
              board[0][colIndex] === opponent &&
              board[1][colIndex] === opponent &&
              board[2][colIndex] === opponent
                ? true
                : false
            )
            .includes(true)
        ? opponent
        : 0;
      if (verticalWins) {
        return verticalWins;
      }

      return 0;
    };

    const isMoveLeft = (board) =>
      board
        .map((row) => row.some((value) => value === null))
        .some((value) => value === true);

    const resetBoardState = (board) => {
      board.map((row) => row.splice(0, 3, null, null, null));

      getDOMElements.spots.forEach((spot) => {
        spot.textContent = "";
        spot.removeEventListener("click", gameBoard.play);
      });
    };

    return {
      play,
      evalutateBoard,
      updateBoardState,
      isMoveLeft,
      resetBoardState,
    };
  })();

  const game = (() => {
    // Add Listener Start Button
    getDOMElements.btnStart.addEventListener("click", start);

    function start() {
      gameDisplay.startGame();

      setGame.isHuman(setGame.whoIsPlayng())
        ? getDOMElements.spots.forEach((spot) =>
            spot.addEventListener("click", gameBoard.play)
          )
        : setTimeout(gameBoard.play, 1000);
    }

    const switchTurn = (player) =>
      player === "X"
        ? (setGame.playerOne.isPlaying = setGame.playerOne.setIsPlaying(false))
        : (setGame.playerOne.isPlaying = setGame.playerOne.setIsPlaying(true));

    const inPlay = () =>
      setGame.isHuman(setGame.whoIsPlayng())
        ? getDOMElements.spots.forEach((spot) =>
            spot.addEventListener("click", gameBoard.play)
          )
        : setTimeout(gameBoard.play, 1000);

    const nextMove = (board, player, opponent) => {
      if (gameBoard.evalutateBoard(board, player, opponent)) {
        end(gameBoard.evalutateBoard(board, player, opponent), board);
      } else if (gameBoard.isMoveLeft(board) === false) {
        end("tie", board);
      } else {
        switchTurn(player);
        gameDisplay.playerTurn();
        inPlay();
      }
    };

    const end = (symbol, board) => {
      let gameOver =
        symbol === "X" ? "Win X" : symbol === "O" ? "Win O" : "tie";
      gameDisplay.endGame(gameOver);
      gameBoard.resetBoardState(board);
      setGame.resetPlayer();
    };

    return {
      nextMove,
    };
  })();
})();
