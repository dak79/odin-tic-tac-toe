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

        const whoIsPlayng = () => setGame.playerOne.isPlaying ? setGame.playerOne.symbol : setGame.playerTwo.symbol;

        const isHuman = player => player === 'X' && playerOne.controller === 'human' || player === '0' && playerTwo.controller === 'human' ? true : false;

        
    
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
    
        return {
            playerOne,
            playerTwo,
            whoIsPlayng,
            isHuman,
            resetPlayer,
            resetFooterBtn
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

        const disableFooterBtn = () => {
            getDOMElements.playFirst.forEach(button => button.disabled = true);
            getDOMElements.changeNameBtns.forEach(button => button.disabled = true);
            getDOMElements.btnStart.disabled = true;
            getDOMElements.playerController.forEach(button => button.disabled = true);
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
            disableFooterBtn();
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

            const player = setGame.whoIsPlayng();
            const isHuman = setGame.isHuman(player);

            if (isHuman) {
                if (!event.target.textContent) {
                    
                    updateBoardState(event.target.dataset.row, event.target.dataset.column, player)
                } else {
                    return 0;
                }
            } else {
                console.log('he is a bot')
                // if (emptyBoard) {
                //     // Do the random first move;
                // }
                
                randomPlay();

                ///// SIAMO QUA /////
            }

            renderBoardState();

            game.nextMove(player, isHuman);            
        }

        const randomPlay = () => {
            let row;
            let col;

            do {
                row = Math.round(Math.random() * 2);
                col = Math.round(Math.random() * 2);
            } while (boardState[row][col] !== null)

            const symbol = setGame.whoIsPlayng();
            
            updateBoardState(row, col, symbol);
            
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
        }

        const itsAtie = () => {
            const availableMoves = isMoveLeft();
            
            if (!availableMoves) {
                return true;
            }
        }

        const isMoveLeft = () => boardState.map(row => row.some(value => value === null)).some(value => value === true);

        const resetBoardState = () => {
            boardState.map(row => row.splice(0, 3, null, null, null));
            
            getDOMElements.spots.forEach(spot => spot.textContent = '');
           
            // Remove Listener
            getDOMElements.spots.forEach(spot => spot.removeEventListener('click', gameBoard.play));
        }
    
        return {
            play,
            evalutateBoard,
            itsAtie,
            resetBoardState
        };
    })();
    
    const game = (() => {

        // Add Listener Start Button
        getDOMElements.btnStart.addEventListener('click', start);

        function start() {
            gameDisplay.toggleBoard();
            gameDisplay.inGame();
            
            const isHuman = setGame.isHuman(setGame.whoIsPlayng());
           
            isHuman ? getDOMElements.spots.forEach(spot => spot.addEventListener('click', gameBoard.play)) : setTimeout(gameBoard.play, 1000);  
        }
    
        const switchTurn = player => player === 'X' ? setGame.playerOne.isPlaying = setGame.playerOne.setIsPlaying(false) : setGame.playerOne.isPlaying = setGame.playerOne.setIsPlaying(true);
        
        function inPlay() {
            
            const isHuman = setGame.isHuman(setGame.whoIsPlayng());
            
            if (isHuman) {    
                getDOMElements.spots.forEach(spot => spot.addEventListener('click', gameBoard.play));
            } else {
                getDOMElements.spots.forEach(spot => spot.removeEventListener('click', gameBoard.play));
                gameBoard.play()
            }
        }

        function nextMove(player) {

            const playerWins = gameBoard.evalutateBoard(player);
            const isAtie = gameBoard.itsAtie();

            if (playerWins) {
                end(playerWins);
            } else if (isAtie) {
                end('tie');
            } else {
                switchTurn(player);
                gameDisplay.renderPlayerTurn();
                setTimeout(inPlay, 1000);
            }
        }
    
        function end (symbol) {
            let gameOver;

            if (symbol === 'X') {
                setGame.playerOne.winner = setGame.playerOne.setWinner(true);
                gameOver = 'win'
            } else if (symbol === '0') {
                setGame.playerTwo.winner = setGame.playerTwo.setWinner(true);gameOver = 'win';
            } else {
                gameOver = 'tie'
            }

            gameDisplay.endGame(gameOver);
            gameBoard.resetBoardState();
            setGame.resetPlayer();
        }
    
        return {
            switchTurn,
            nextMove
        };
    })();
})();
