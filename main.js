// Factory function for player: name, symbol, isPlaying, setIsPlaying
const player = (name, symbol, isPlaying) => {
    let winner = false;
    const getName = () => name;
    const getSymbol = () => symbol;
    const getIsPlaying = () => isPlaying;
    const setIsPlaying = () => isPlaying = !isPlaying;
    const getWinner = () => winner;
    const setWinner = () => winner = true;


    return {
        getName,
        getSymbol,
        getIsPlaying,
        setIsPlaying,
        getWinner,
        setWinner
    }

} 
const playerOne = player('jim', 'X', true);
const playerTwo = player('josh', '0', false);

// This module manage start, turn, ending of game
const game = (() => {
    const start = () => {

    }

    const switchTurn = () => {
        if (playerOne.getIsPlaying()) {
            playerOne.setIsPlaying();
            playerTwo.setIsPlaying();
        } else {
            playerOne.setIsPlaying();
            playerTwo.setIsPlaying();
        }
    }
    
    const winner = () => {
        console.log('winner');
    } 

    const tie = () => {
        console.log('tie')
    }
    return {
        switchTurn,
        winner,
        tie
    }
})();

const gameBoard = (() => {
    const boardState = [
        null, null, null,
        null, null, null,
        null, null, null
    ];

    // Get DOM elements
    const spots = document.querySelectorAll('.spot');
    
    // Attach event listeners
    spots.forEach(spot => spot.addEventListener('click', play));
    

    function play(event) {
        if (!event.target.textContent) {

            
            // Update board state
            playerOne.getIsPlaying() ? updateBoardState(event.target.dataset.index, playerOne.getSymbol()) : updateBoardState(event.target.dataset.index, playerTwo.getSymbol());
            
            // Render board state
            render();
            
            const nextMove = finalBoard();

            if (nextMove !== 'next') {

            // Detach event listener
            spots.forEach(spot => spot.removeEventListener('click', play));
            }

            if (nextMove === 'win') {
                game.winner()
            } else if (nextMove === 'tie') {
                game.tie()
            } else {
                game.switchTurn();
            }
        }
    }
    
    // Update boardState array
    const updateBoardState = (update, symbol) => boardState.splice(update, 1, symbol);
        
    // Render boardState array
    const render = () => spots.forEach(spot => spot.textContent = boardState[spot.dataset.index]);

    // Manage final board
    const finalBoard = () => {

        // Store player moves in arrays
        const playerOneMoves = [];
        const playerTwoMoves = [];

        const symbol = playerOne.getIsPlaying() ? playerOne.getSymbol() : playerTwo.getSymbol(); 
        
        const whoPlays = playerOne.getIsPlaying();

        // Find and store all occurencies of one symbol
        let index = boardState.indexOf(symbol)
        
        while (index !== -1) {
            whoPlays ? playerOneMoves.push(index) : playerTwoMoves.push(index);index = boardState.indexOf(symbol, index + 1);
        }

        // Find if a player reached a winning pattern
        const winningPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

        for (let i = 0; i < 8; i++) { 
            const winnerExist = winningPatterns[i].every(winningPattern => whoPlays ? playerOneMoves.includes(winningPattern) : playerTwoMoves.includes(winningPattern))

             if (winnerExist) {
                whoPlays ? playerOne.setWinner() : playerTwo.setWinner();

                return 'win';
            }
        }

        // Search for a tie
        const availableMoves = boardState.includes(null);

        if (!availableMoves) {

            return 'tie';
        }

        return 'next';
    }

})();
