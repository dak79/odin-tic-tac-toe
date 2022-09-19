const ticTacToe = (() => {

    const player = (name, symbol, isPlaying) => {
        let winner = false;
        const getName = () => name;
        const setName = value => name = value;
        const getSymbol = () => symbol;
        const getIsPlaying = () => isPlaying;
        const setIsPlaying = value => isPlaying = value;
        const getWinner = () => winner;
        const setWinner = value => winner = value;
    
        return {
            getName,
            setName,
            getSymbol,
            getIsPlaying,
            setIsPlaying,
            getWinner,
            setWinner
        };
    } 
    
    const getDOMElements = (() => {
        const playFirst = document.querySelectorAll('input[name=radio-play-first]');
        const changeNameBtns = document.querySelectorAll('.btn-change');
        const btnStart = document.querySelector('#btn-start');
        const main = document.querySelector('#display');
        const sectionGameBoard = document.querySelector('#gameBoard');
        const infoText = document.querySelector('#info-text');
        const header = document.querySelector('header');
        const spots = document.querySelectorAll('.spot');
        
        return {
            playFirst,
            changeNameBtns,
            btnStart,
            main,
            sectionGameBoard,
            infoText,
            header,
            spots
        }
        
    })();
    
    const setGame = (()=> {
        
        // Create standard instances
        const playerOne = player('Player 1', 'X', true);
        const playerTwo = player('Player 2', '0', false);
        
        // Listeners
        getDOMElements.changeNameBtns.forEach(button => button.addEventListener('click', changePlayerName));
        getDOMElements.playFirst.forEach(button => button.addEventListener('change', setPlayFirst));
        
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
            if (event.target.value === 'player-one-play-first') {
                playerOne.setIsPlaying(true);
                playerTwo.setIsPlaying(false);
            } else {
                playerOne.setIsPlaying(false);
                playerTwo.setIsPlaying(true);
            }
        }
    
        // Reset player prop
        const resetPlayer = () => {
            playerOne.setWinner(false);
            playerTwo.setWinner(false);
            playerOne.setIsPlaying(true);
            playerTwo.setIsPlaying(false);
        }
    
        // Reset footer buttons
        const resetFooterBtn = () => {
            getDOMElements.playFirst.forEach((button, index) => {
                button.disabled = false
        
                if (!button.checked && index === 0) {
                    button.checked = true;
                }
                if (button.checked && index === 1 ) {
                    button.checked = false;
                }
            });
            
            getDOMElements.changeNameBtns.forEach(button => button.disabled = false);
            getDOMElements.btnStart.disabled = false;
        }
    
        // Disable footer buttons 
        const disableFooterBtn = () => {
            getDOMElements.playFirst.forEach(button => button.disabled = true);
            getDOMElements.changeNameBtns.forEach(button => button.disabled = true);
            getDOMElements.btnStart.disabled = true;
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
    
        const restart = () => {
    
            // Get the winning message
            const winningDisplay = document.querySelector('.winning-msg');
    
            setGame.resetFooterBtn();
    
            // Reset winning display
            if (winningDisplay) {
                winningDisplay.remove(); 
            }
    
            if (getDOMElements.sectionGameBoard.className === 'invisible') {
                getDOMElements.sectionGameBoard.classList.add('board');
                getDOMElements.sectionGameBoard.classList.remove('invisible');
            }
    
            // Display info text
            getDOMElements.infoText.classList.remove('invisible');
        }
    
        const inGame = () => {
            getDOMElements.infoText.classList.add('invisible');
            setGame.disableFooterBtn();
        }
    
        const end = (result) => {
    
            // Create result display
            const wrapper = document.createElement('div');
            const winningText = document.createElement('p');
            const newGameInfo = document.createElement('p');
            
            getDOMElements.sectionGameBoard.classList.add('invisible');
            getDOMElements.sectionGameBoard.classList.remove('board');
            
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
                restart();
            }
    
            // Append result display on DOM
            getDOMElements.header.after(wrapper);
            wrapper.appendChild(winningText);
            wrapper.appendChild(newGameInfo);
        } 
    
        return {
            restart,
            inGame,
            end
        };
    })();
    
    const gameBoard = (() => {
        const boardState = [
            null, null, null,
            null, null, null,
            null, null, null
        ];
    
        // Get DOM elements
            
        function play(event) {
            if (!event.target.textContent) {
                
                // Update board state
                setGame.playerOne.getIsPlaying() ? updateBoardState(event.target.dataset.index, setGame.playerOne.getSymbol()) : updateBoardState(event.target.dataset.index, setGame.playerTwo.getSymbol());
                
                // Render board state
                render();
        
                const nextMove = finalBoard(event);
    
                // Next move
                nextMove === 'next' ? game.switchTurn() : game.end(nextMove);
            }
        }
          
        // Update boardState array
        const updateBoardState = (update, symbol) => boardState.splice(update, 1, symbol);
        
        // Render boardState array
        const render = () => getDOMElements.spots.forEach(spot => spot.textContent = boardState[spot.dataset.index]);
        
        // Store player moves in arrays
        const playerOneMoves = [];
        const playerTwoMoves = [];
        
        // Array of winning patterns
        const winningPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        
        // Manage final board
        const finalBoard = (event) => {
    
            const whoPlays = setGame.playerOne.getIsPlaying();
    
            let index = parseInt(event.target.dataset.index);
            whoPlays ? playerOneMoves.push(index) : playerTwoMoves.push(index);
            
             // Search for a winner
            const searchWinnerOrTie = () => {
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
           
            // Remove Listener
            getDOMElements.spots.forEach(spot => spot.removeEventListener('click', gameBoard.play));
        }
    
        return {
            play,
            render,
            resetBoardState
        };
    })();
    
    const game = (() => {
    
        // Listener
        getDOMElements.btnStart.addEventListener('click', start);
        
        function start() {
            gameDisplay.inGame();
        
            // Attach event listeners for players
            getDOMElements.spots.forEach(spot => spot.addEventListener('click', gameBoard.play));
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
    
        function end (nextState) {
            gameDisplay.end(nextState);
            gameBoard.resetBoardState();
            gameBoard.render();
            setGame.resetPlayer();
        }
    
        return {
            switchTurn,
            end
        };
    })();
})();


