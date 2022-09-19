const ticTacToe = (() => {

    const player = (name, symbol, isPlaying) => {
        let winner = false;
        let controller = 'human';
        
        const getName = () => name;
        const getSymbol = () => symbol;
        const getIsPlaying = () => isPlaying;
        const getController = () => controller;
        const getWinner = () => winner;
        
        const setName = value => name = value;
        const setIsPlaying = value => isPlaying = value;
        const setController = value => controller = value;
        const setWinner = value => winner = value;
    
        return {
            getName,
            getSymbol,
            getIsPlaying,
            getController,
            getWinner,
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
        
        // Listeners
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
            
            function setPlayerName () {
                
                // Get the button which fire the event
                const playerName = document.querySelector(`#${btnChange}`);
                
                playerName.textContent = newName.value;
                btnChange === 'player-one-name' ? playerOne.setName(newName.value) : playerTwo.setName(newName.value);
                
                // Remove card
                btnSave.removeEventListener('click', setPlayerName);
                background.remove();
            }
            
            // Append card on DOM
            getDOMElements.main.insertBefore(background, getDOMElements.main.firstChild);
            background.appendChild(card);
            card.appendChild(newNameLabel);
            card.appendChild(newName);
            card.appendChild(btnSave);
        }
        
        function setPlayFirst(event) {

            const startPlaying = event.target.value;

            if (startPlaying === 'player-one-play-first') {
                playerOne.setIsPlaying(true);
                playerTwo.setIsPlaying(false);
            } else {
                playerOne.setIsPlaying(false);
                playerTwo.setIsPlaying(true);
            }
        }

        function setControllers(event) {
            
            const controller = event.target.value;
            
            controller === 'controller-player-one-human' ? playerOne.setController('human') : controller === 'controller-player-one-bot' ? playerOne.setController('bot') : controller === 'controller-player-two-human' ? playerTwo.setController('human') : playerTwo.setController('bot');
        }
    
        // Reset player prop
        const resetPlayer = () => {
            playerOne.setWinner(false);
            playerTwo.setWinner(false);
            playerOne.setIsPlaying(true);
            playerTwo.setIsPlaying(false);
            playerOne.setController('human');
            playerTwo.setController('human');
        }
    
        // Reset footer buttons
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
    
        // Disable footer buttons 
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
    
        const restartGame = () => {
    
            // Get the winning message
            const winningDisplay = document.querySelector('.winning-msg');
    
            setGame.resetFooterBtn();
    
            // Reset winning display
            if (winningDisplay) {
                winningDisplay.remove(); 
            }
            
            toggleInfoText();
        }

        const inGame = () => {
            toggleInfoText();
            setGame.disableFooterBtn();
        }

        const winningMessage = (result) => {

            // Create result display
            const wrapper = document.createElement('div');
            const winningText = document.createElement('p');
            const newGameInfo = document.createElement('p');

            wrapper.classList.add('winning-msg');
            if (result === 'win') {
                winningText.textContent = `${setGame.playerOne.getWinner() ? setGame.playerOne.getName() : setGame.playerTwo.getName()} wins the match`;
                winningText.classList.add('winning-text');
            } else {
                winningText.textContent = `It's a tie`;
                winningText.classList.add('tie-text');
            }
    
            newGameInfo.textContent = `Click for play again`;
            newGameInfo.classList.add('restart-msg');
    
            wrapper.addEventListener('click', playAgain); 
            
            function playAgain() {
                wrapper.removeEventListener('click', playAgain);
                restartGame();
            }

            // Append result display on DOM
            getDOMElements.title.after(wrapper);
            wrapper.appendChild(winningText);
            wrapper.appendChild(newGameInfo);
        }
    
        const endGame = (result) => {
            toggleBoard();
            winningMessage(result);
        } 
    
        return {
            toggleBoard,
            inGame,
            endGame
        };
    })();
    
    const gameBoard = (() => {
        const boardState = [
            null, null, null,
            null, null, null,
            null, null, null
        ];
    
        function playHuman(event) {
            if (!event.target.textContent) {
                
                // Update board state
                setGame.playerOne.getIsPlaying() ? updateBoardState(event.target.dataset.index, setGame.playerOne.getSymbol()) : updateBoardState(event.target.dataset.index, setGame.playerTwo.getSymbol());
                
                // Render board state
                renderBoardState();

                // Check for next step
                game.checkNextStep();
            }
        }

        const playBot = () => {
            let index;
            
            // Check for a free spot to play
            do {
                index = Math.round(Math.random() * 9)
            } while (boardState[index] !== null)

            // Update boardState with bot plays
            setGame.playerOne.getIsPlaying() ? updateBoardState(index, setGame.playerOne.getSymbol()) : updateBoardState(index, setGame.playerTwo.getSymbol());
            
            // Render new board state
            renderBoardState();
            
            // Check for next step
            game.checkNextStep();  
        }
          
        // Update boardState array
        const updateBoardState = (update, symbol) => boardState.splice(update, 1, symbol);
        
        // Render boardState array
        const renderBoardState = () => getDOMElements.spots.forEach(spot => spot.textContent = boardState[spot.dataset.index]);

        // Array of winning patterns
        const winningPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        
        // Store player moves in arrays
        let playerOneMoves = [];
        let playerTwoMoves = [];
        
        const finalBoard = () => {
        
        // Reset player moves
        playerOneMoves = [];
        playerTwoMoves = [];
    
            const whoPlays = setGame.playerOne.getIsPlaying();
            const symbol = setGame.playerOne.getIsPlaying() ? setGame.playerOne.getSymbol() : setGame.playerTwo.getSymbol();
            
            // Fill player moves array
            let index = boardState.indexOf(symbol);
            while (index !== -1) {
                whoPlays ? playerOneMoves.push(index) : playerTwoMoves.push(index);
                index = boardState.indexOf(symbol, index + 1);
            }
            
             // Search for an end board
            const searchWinnerOrTie = () => {

                // Search for a winner
                for (let i = 0; i < 8; i++) { 
                    const winnerExist = winningPatterns[i].every(winningPattern => whoPlays ? playerOneMoves.includes(winningPattern) : playerTwoMoves.includes(winningPattern));
                    
                    if (winnerExist) {
                        whoPlays ? setGame.playerOne.setWinner(true) : setGame.playerTwo.setWinner(true);
                        return 'win';
                    }
                }
    
                //Search for a tie
                const availableMoves = boardState.includes(null);
                
                if (!availableMoves) {
                    return 'tie';
                }
            }

            const winOrTie = searchWinnerOrTie();
    
            return winOrTie ? winOrTie : 'next';
        }
    
        // Reset state
        const resetBoardState = () => {
            boardState.forEach((spot, index) => boardState[index] = null);
            playerOneMoves.splice(0, playerOneMoves.length);
            playerTwoMoves.splice(0, playerTwoMoves.length);

            renderBoardState();
           
            // Remove Listener
            getDOMElements.spots.forEach(spot => spot.removeEventListener('click', gameBoard.playHuman));
        }
    
        return {
            playHuman,
            playBot,
            finalBoard,
            resetBoardState
        };
    })();
    
    const game = (() => {
    
        // Listener
        getDOMElements.btnStart.addEventListener('click', start);
        
        function start() {
            gameDisplay.toggleBoard();
            gameDisplay.inGame();
        
            // Player or Bot first play
            if (setGame.playerOne.getController() === 'human' && setGame.playerOne.getIsPlaying() || setGame.playerTwo.getController() === 'human' && setGame.playerTwo.getIsPlaying()) {
                getDOMElements.spots.forEach(spot => spot.addEventListener('click', gameBoard.playHuman));
            } else {
                gameBoard.playBot();
            }
        }
    
        function switchTurn () {
            if (setGame.playerOne.getIsPlaying()) {
                setGame.playerOne.setIsPlaying(false);
                setGame.playerTwo.setIsPlaying(true);
            } else {
                setGame.playerOne.setIsPlaying(true);
                setGame.playerTwo.setIsPlaying(false);
            }
        }

        function inPlay() {
            if (setGame.playerOne.getIsPlaying()) {
                
                if (setGame.playerOne.getController() === 'human') {
                    
                    // Player One Human
                    getDOMElements.spots.forEach(spot => spot.addEventListener('click', gameBoard.playHuman));
                } else {
                    
                    // Player One Bot
                    getDOMElements.spots.forEach(spot => spot.removeEventListener('click', gameBoard.playHuman));
                    gameBoard.playBot();
                }
            } else {

                if (setGame.playerTwo.getController() === 'human') {
                    
                    // Player Two Human
                    getDOMElements.spots.forEach(spot => spot.addEventListener('click', gameBoard.playHuman));
                } else {

                    // Player Two Bot
                    getDOMElements.spots.forEach(spot => spot.removeEventListener('click', gameBoard.playHuman));
                    gameBoard.playBot();
                }
            }
        }

        const checkNextStep = () => {    
            const final = gameBoard.finalBoard();
            nextMove(final);
        }

        function nextMove(nextMove) {
            if (nextMove === 'next') {
                switchTurn();
                setTimeout(inPlay, 1000);
            
            } else {
                end(nextMove);
            }
        }
    
        function end (nextState) {
            gameDisplay.endGame(nextState);
            gameBoard.resetBoardState();
            setGame.resetPlayer();
        }
    
        return {
            checkNextStep
        };
    })();
})();
