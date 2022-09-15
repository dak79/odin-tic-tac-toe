// Factory function for player: name, symbol, isPlaying, setIsPlaying
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
    }

} 

const setGame = (()=> {

    const playerOne = player('Player 1', 'X', true);
    const playerTwo = player('Player 2', '0', false);

    const main = document.querySelector('#display');
    const changeNameBtns = document.querySelectorAll('.btn-change');
    
   changeNameBtns.forEach(button => button.addEventListener('click', changePlayerName));
    
    function changePlayerName (event) {
        const background = document.createElement('div');
        const card = document.createElement('div');
        const newNameLabel = document.createElement('label');
        const newName = document.createElement('input');
        const btnSave = document.createElement('button');
        const btnChange = event.target.dataset.btn

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
            const playerName = document.querySelector(`#${btnChange}`);
            playerName.textContent = newName.value;
            btnChange === 'player-one-name' ? playerOne.setName(newName.value) : playerTwo.setName(newName.value);
            btnSave.removeEventListener('click', setPlayerName);
            background.remove();
        }

        main.insertBefore(background, main.firstChild);
        background.appendChild(card);
        card.appendChild(newNameLabel);
        card.appendChild(newName);
        card.appendChild(btnSave);
    }

    return {
        playerOne,
        playerTwo
    }

})();

// This module manage start, turn, ending of game
const gameDisplay = (() => {

    const sectionGameBoard = document.querySelector('#gameBoard');
    
    const start = () => {

        const winningDisplay = document.querySelector('.winning-msg');

        //Disable footer buttons
        
        // Reset display
        if (winningDisplay) {
            winningDisplay.remove();
            
        }

        if (sectionGameBoard.className === 'invisible') {
            sectionGameBoard.classList.add('board');
            sectionGameBoard.classList.remove('invisible');
        }
    }

    const end = (result) => {

        sectionGameBoard.classList.add('invisible');
        sectionGameBoard.classList.remove('board');

        const h1 = document.querySelector('h1')
        const wrapper = document.createElement('div');
        const winningText = document.createElement('p')
        const newGameInfo = document.createElement('p')
        
        wrapper.classList.add('winning-msg')
        
        if (result === 'win') {
            winningText.textContent = `${setGame.playerOne.getWinner() ? setGame.playerOne.getName() : setGame.playerTwo.getName()} wins the match`;
            winningText.classList.add('winning-text');
        } else {
            winningText.textContent = `It's a tie`;
            winningText.classList.add('tie-text')
        }

        newGameInfo.textContent = `Click for play again`;
        newGameInfo.classList.add('restart-msg');

        wrapper.addEventListener('click', restart) 
        
        function restart() {
            start();

            // Enable footers buttons


            wrapper.removeEventListener('click', restart);
        }
        
        h1.after(wrapper);
        wrapper.appendChild(winningText);
        wrapper.appendChild(newGameInfo);
    } 

    return {
        start,
        end
    }
})();

const gameBoard = (() => {
    const boardState = [
        null, null, null,
        null, null, null,
        null, null, null
    ];

    const start = () => {
        gameDisplay.start();
        resetBoardState();
    }

    // Store player moves in arrays
    const playerOneMoves = [];
    const playerTwoMoves = [];
    
    // Array of winning patterns
    const winningPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    
    // Get DOM elements
    const spots = document.querySelectorAll('.spot');
    
    // Attach event listeners
    spots.forEach(spot => spot.addEventListener('click', play));

    function play(event) {
        if (!event.target.textContent) {
            
            // Update board state
            setGame.playerOne.getIsPlaying() ? updateBoardState(event.target.dataset.index, setGame.playerOne.getSymbol()) : updateBoardState(event.target.dataset.index, setGame.playerTwo.getSymbol());
            
            // Render board state
            render();
            
            const nextMove = finalBoard(event);

            // Next move
            nextMove === 'next' ? switchTurn() : gameDisplay.end(nextMove);
        }
    }

    const switchTurn = () => {
        if (setGame.playerOne.getIsPlaying()) {
            setGame.playerOne.setIsPlaying(false);
            setGame.playerTwo.setIsPlaying(true);
        } else {
            setGame.playerOne.setIsPlaying(true);
            setGame.playerTwo.setIsPlaying(false);
        }
    }

    // Update boardState array
    const updateBoardState = (update, symbol) => boardState.splice(update, 1, symbol);
        
    // Render boardState array
    const render = () => spots.forEach(spot => spot.textContent = boardState[spot.dataset.index]);
    
    // Reset state
    const resetBoardState = () => {
        boardState.forEach((spot, index) => boardState[index] = null);
        playerOneMoves.splice(0, playerOneMoves.length);
        playerTwoMoves.splice(0, playerTwoMoves.length);

        // Reset player prop
        setGame.playerOne.setWinner(false);
        setGame.playerTwo.setWinner(false);

        if (!setGame.playerOne.getIsPlaying()) {
            setGame.playerOne.setIsPlaying(true);
            setGame.playerTwo.setIsPlaying(false);
        }
    }

    // Manage final board
    const finalBoard = (event) => {

        const whoPlays = setGame.playerOne.getIsPlaying();

        // Player move
        let index = parseInt(event.target.dataset.index);
        
        whoPlays ? playerOneMoves.push(index) : playerTwoMoves.push(index);
        
        // Search for a winner
        for (let i = 0; i < 8; i++) { 
            const winnerExist = winningPatterns[i].every(winningPattern => whoPlays ? playerOneMoves.includes(winningPattern) : playerTwoMoves.includes(winningPattern))

             if (winnerExist) {
                resetBoardState();
                render();
                whoPlays ? setGame.playerOne.setWinner(true) : setGame.playerTwo.setWinner(true);
                return 'win';
            }
        }

        // Search for a tie
        const availableMoves = boardState.includes(null);

        if (!availableMoves) {
            resetBoardState();
            render();
            return 'tie';
        }

        return 'next';
    }

})();

gameDisplay.start();
