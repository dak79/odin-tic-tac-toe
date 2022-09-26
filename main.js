const ticTacToe = (() => {

    const player = (name, symbol, isPlaying) => {
        let winner = false;
        let controller = 'human'; 
        const setName = value => name = value;
        const setIsPlaying = value => isPlaying = value;
        const setController = value => controller = value;
        const setWinner = value => winner = value;
    
        return {
            name,
            symbol,
            isPlaying,
            controller,
            winner,
            setName,
            setIsPlaying,
            setController,
            setWinner
        };
    } 
    
    const getDOMElements = (() => {

        const main = document.querySelector('#display');
        const sectionGameBoard = document.querySelector('#gameBoard');
        const infoText = document.querySelector('#info-text');
        const title = document.querySelector('#title');
        const spots = document.querySelectorAll('.spot');
        const playerOneName = document.querySelector('#player-one-name');
        const playerTwoName = document.querySelector('#player-two-name');
        
        const playFirst = document.querySelectorAll('input[name=radio-play-first]');
        const changeNameBtns = document.querySelectorAll('.btn-change');
        const playerController = document.querySelectorAll('.radio-controller');
        const btnStart = document.querySelector('#btn-start');
        
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
            btnStart
        }
        
    })();
    
    const setGame = (()=> {
        
        // Create standard instances
        const playerOne = player('Player 1', 'X', true);
        const playerTwo = player('Player 2', '0', false);
        
        // Event Listeners Footer
        getDOMElements.playFirst.forEach(button => button.addEventListener('change', setPlayFirst));
        getDOMElements.changeNameBtns.forEach(button => button.addEventListener('click', changePlayerName));
        getDOMElements.playerController.forEach(button => button.addEventListener('change', setControllers));

        function changePlayerName (event) {
            
            // Create card for entering new name
            const background = document.createElement('div');
            const card = document.createElement('div');
            const newNameLabel = document.createElement('label');
            const newName = document.createElement('input');
            const btnSave = document.createElement('button');
            const btnChange = event.target.dataset.btn;
            const btnChangeName = String(event.target.dataset.name);
            
            background.classList.add('layer');
            
            card.classList.add('card');
            
            newNameLabel.setAttribute('for', 'newName');
            newNameLabel.textContent = 'New Name';
            newNameLabel.classList.add('card-label');
            
            newName.setAttribute('type', 'text');
            newName.setAttribute('id', 'newName');
            newName.setAttribute('name', 'newName');
            newName.classList.add('card-input');
            
            btnSave.setAttribute('type', 'button');
            btnSave.textContent = 'Save';
            btnSave.classList.add('btn', 'btn-card');
            btnSave.addEventListener('click', setPlayerName);
            
            // Append card on DOM
            getDOMElements.main.insertBefore(background, getDOMElements.main.firstChild);
            background.appendChild(card);
            card.appendChild(newNameLabel);
            card.appendChild(newName);
            card.appendChild(btnSave);
            
            function setPlayerName () {
                
                // Get the button which fire the event
                const playerName = document.querySelector(`#${btnChange}`);
                
                if (!newName.value) {
                    playerName.textContent = btnChangeName;
                } else {
                    if (btnChange === 'player-one-name') {
                        playerName.textContent = newName.value;
                        playerOne.name = playerOne.setName(newName.value);
                    } else {
                        playerName.textContent = newName.value;
                        playerTwo.name = playerTwo.setName(newName.value);
                    }
                }

                // Remove card
                btnSave.removeEventListener('click', setPlayerName);
                background.remove();
            }
        }
        
        function setPlayFirst(event) {
            const startPlaying = event.target.value;

            if (startPlaying === 'player-one-play-first') {
                playerOne.isPlaying = playerOne.setIsPlaying(true);
                playerTwo.isPlaying = playerTwo.setIsPlaying(false);
            } else {
                playerOne.isPlaying = playerOne.setIsPlaying(false);
                playerTwo.isPlaying = playerTwo.setIsPlaying(true);
            }
        }

        function setControllers(event) {
            const controller = event.target.value;

            if (controller === 'controller-player-one-human') {
                playerOne.controller = playerOne.setController('human');
            } else if (controller === 'controller-player-one-bot') {
                playerOne.controller = playerOne.setController('bot');
            } else if (controller === 'controller-player-two-human') {
                playerTwo.controller = playerTwo.setController('human');
            } else {
                playerTwo.controller = playerTwo.setController('bot');
            }
        }
    
        const resetPlayer = () => {
            playerOne.isPlaying = playerOne.setIsPlaying(true);
            playerOne.controller = playerOne.setController('human');
            playerOne.winner = playerOne.setWinner(false);

            playerTwo.isPlaying = playerTwo.setIsPlaying(false);
            playerTwo.controller = playerTwo.setController('human');
            playerTwo.winner = playerTwo.setWinner(false);
        }
    
        const resetFooterBtn = () => {
            getDOMElements.playFirst.forEach((button, index) => {
                button.disabled = false
        
                if (!button.checked && index === 0) button.checked = true;

                if (button.checked && index === 1) button.checked = false;
            });

            getDOMElements.playerController.forEach((button, index) => {
                button.disabled = false;

                if (!button.checked && index === 0 || !button.checked && index === 2) button.checked = true;

                if (button.checked && index === 1 || button.checked && index === 3) button.checked = false;

            });
            
            getDOMElements.changeNameBtns.forEach(button => button.disabled = false);
            getDOMElements.btnStart.disabled = false;

        }
    
        const disableFooterBtn = () => {
            getDOMElements.playFirst.forEach(button => button.disabled = true);
            getDOMElements.changeNameBtns.forEach(button => button.disabled = true);
            getDOMElements.btnStart.disabled = true;
            getDOMElements.playerController.forEach(button => button.disabled = true);
        }
    
        return {
            playerOne,
            playerTwo,
            resetPlayer,
            resetFooterBtn,
            disableFooterBtn
        };
    })();
    
    const gameDisplay = (() => {

        const toggleBoard = () => {
            getDOMElements.sectionGameBoard.classList.toggle('board');
            getDOMElements.sectionGameBoard.classList.toggle('invisible');
        }

        const toggleInfoText = () => {
            getDOMElements.infoText.classList.toggle('invisible');
        }

        const renderPlayerTurn = () => {
            if (setGame.playerOne.isPlaying) {
                getDOMElements.playerOneName.classList.add('in-play');
                getDOMElements.playerTwoName.classList.remove('in-play');
            } else {
                getDOMElements.playerOneName.classList.remove('in-play');
                getDOMElements.playerTwoName.classList.add('in-play');
            }
        }

        const resetRenderPlayerTurn = () => {
            getDOMElements.playerOneName.classList.remove('in-play');
            getDOMElements.playerTwoName.classList.remove('in-play');
        }
    
        const restartGame = () => {
    
            // Get the winning message
            const winningDisplay = document.querySelector('.winning-msg');
    
            setGame.resetFooterBtn();
    
            if (winningDisplay) {
                winningDisplay.remove(); 
            }
            
            toggleInfoText();
        }

        const inGame = () => {
            toggleInfoText();
            renderPlayerTurn();
            setGame.disableFooterBtn();
        }

        const winningMessage = (result) => {

            // Create result display
            const wrapper = document.createElement('div');
            const winningText = document.createElement('p');
            const newGameInfo = document.createElement('p');

            wrapper.classList.add('winning-msg');
            if (result === 'win') {
                winningText.textContent = `${setGame.playerOne.winner ? setGame.playerOne.name : setGame.playerTwo.name} wins the match`;
                winningText.classList.add('winning-text');
            } else {
                winningText.textContent = `It's a tie`;
                winningText.classList.add('tie-text');
            }
    
            newGameInfo.textContent = `Click for play again`;
            newGameInfo.classList.add('restart-msg');
    
            wrapper.addEventListener('click', playAgain); 
            
            // Append result display on DOM
            getDOMElements.title.after(wrapper);
            wrapper.appendChild(winningText);
            wrapper.appendChild(newGameInfo);
            
            function playAgain() {
                wrapper.removeEventListener('click', playAgain);
                restartGame();
            }
        }
    
        const endGame = (result) => {
            resetRenderPlayerTurn();
            toggleBoard();
            winningMessage(result);
        } 
    
        return {
            renderPlayerTurn,
            toggleBoard,
            inGame,
            endGame
        };
    })();
    
    const gameBoard = (() => {
        const boardState = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    
        function play(event) {
            
            // let emptyBoard = boardState.every(row => row.forEach(spot => spot === null));
            
            if (setGame.playerOne.controller === 'human' && setGame.playerOne.isPlaying || setGame.playerTwo.controller === 'human' && setGame.playerTwo.isPlaying) {
                if (!event.target.textContent) {
                    
                    // Update boardState human
                    setGame.playerOne.isPlaying ? updateBoardState(event.target.dataset.row, event.target.dataset.column, setGame.playerOne.symbol) : updateBoardState(event.target.dataset.row, event.target.dataset.column, setGame.playerTwo.symbol);
                }
            
            } else {
                // if (emptyBoard) {
                //     // Do the random first move;
                // }
                
                randomPlay();
            }


            //console.log(boardState);
                
            renderBoardState();

           


            game.nextMove();            
        


        }

        const randomPlay = () => {
            let row;
            let col;
            
                // Check for a free spot to play
                do {
                    row = Math.round(Math.random() * 2);
                    col = Math.round(Math.random() * 2);
                    console.log('searching legal move');
                } while (boardState[row][col] !== null)

                // Update boardState bot
                setGame.playerOne.isPlaying ? updateBoardState(row, col, setGame.playerOne.symbol) : updateBoardState(row, col, setGame.playerTwo.symbol);
            }

        // Update boardState array
        const updateBoardState = (row, col, symbol) => boardState[row].splice(col, 1, symbol);
        
        // Render boardState array
        const renderBoardState = () => getDOMElements.spots.forEach(spot => spot.textContent = boardState[spot.dataset.row][spot.dataset.column]);

        // Evalutate boardState: winning or tie 
        const evalutateBoard = (symbol) => {

            // Horizontal win
            let horizontalWins = boardState.map(row => row.every(value => value === symbol));

            // Diagonal win
            let diagonalWins = boardState.map((row, index) => row[index] === symbol || row[2 - index] === symbol).every(value => value === true);
            
            // Vertical win 
            let verticalWins

            for (let col = 0; col < 3; col++) {
                if (boardState[0][col] === boardState[1][col] && boardState[1][col] === boardState[2][col] && boardState[0][col]) {
                    verticalWins = true;
                }
            }  

            if (verticalWins || horizontalWins.includes(true) || diagonalWins) {
                return symbol;
            }
            
            const availableMoves = isMoveLeft();
            
            if (!availableMoves) {
                return 'tie';
            }
        }

        const isMoveLeft = () => boardState.map(row => row.some(value => value === null)).some(value => value === true);

        const resetBoardState = () => {
            boardState.forEach((spot, index) => {
                spot = null;
                boardState[index] = spot;
            });
            
            console.log(boardState);

            getDOMElements.spots.forEach(spot => spot.textContent = '');
           
            // Remove Listener
            getDOMElements.spots.forEach(spot => spot.removeEventListener('click', gameBoard.play));
        }
    
        return {
            boardState,
            play,
            evalutateBoard,
            resetBoardState
        };
    })();
    
    const game = (() => {

        // Add Listener Start Button
        getDOMElements.btnStart.addEventListener('click', start);
        
        function start() {
            gameDisplay.toggleBoard();
            gameDisplay.inGame();

            // Player or Bot first play
            if (setGame.playerOne.controller === 'human' && setGame.playerOne.isPlaying || setGame.playerTwo.controller === 'human' && setGame.playerTwo.isPlaying) {
                getDOMElements.spots.forEach(spot => spot.addEventListener('click', gameBoard.play));
            } else {
                setTimeout(gameBoard.play, 1000);   
            }
        }
    
        function switchTurn () {
            if (setGame.playerOne.isPlaying) {
                setGame.playerOne.isPlaying = setGame.playerOne.setIsPlaying(false);
                setGame.playerTwo.isPlaying = setGame.playerTwo.setIsPlaying(true);
            } else {
                setGame.playerOne.isPlaying = setGame.playerOne.setIsPlaying(true);
                setGame.playerTwo.isPlaying = setGame.playerTwo.setIsPlaying(false);
            }            
            gameDisplay.renderPlayerTurn();
        }

        function inPlay() {

            if (setGame.playerOne.controller === 'human' && setGame.playerOne.isPlaying || setGame.playerTwo.controller === 'human' && setGame.playerTwo.isPlaying) {
                getDOMElements.spots.forEach(spot => spot.addEventListener('click', gameBoard.play));
            } else {
                getDOMElements.spots.forEach(spot => spot.removeEventListener('click', gameBoard.play));
                gameBoard.play();
            }
        }

        function nextMove() {
            let whoIsPlayng = setGame.playerOne.isPlaying ? setGame.playerOne.symbol : setGame.playerTwo.symbol;
            let finalTurnStatus = gameBoard.evalutateBoard(whoIsPlayng);

            if (!finalTurnStatus) {
                switchTurn();
                setTimeout(inPlay, 1000);
            
            } else {
                if (finalTurnStatus === 'X') {
                    setGame.playerOne.winner = setGame.playerOne.setWinner(true);
                    finalTurnStatus = 'win'
                }
                
                if (finalTurnStatus === '0') {
                    setGame.playerTwo.winner = setGame.playerTwo.setWinner(true);

                    finalTurnStatus = 'win';

                }
                    
                    
                end(finalTurnStatus);
            }
        }
    
        function end (nextState) {
            gameDisplay.endGame(nextState);
            gameBoard.resetBoardState();
            setGame.resetPlayer();
        }
    
        return {
            switchTurn,
            nextMove
        };
    })();
})();
