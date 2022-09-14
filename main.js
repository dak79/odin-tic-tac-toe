// Factory function for player: name, symbol, isPlaying, setIsPlaying
const player = (name, symbol, isPlaying) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    const getIsPlaying = () => isPlaying;
    const setIsPlaying = () => isPlaying = !isPlaying;

    return {
        getName,
        getSymbol,
        getIsPlaying,
        setIsPlaying
    }

} 
const player1 = player('jim', 'X', true);
const player2 = player('josh', '0', false);

// This module manage start, turn, ending of game
const game = (() => {
    const start = () => {

    }

    const switchTurn = () => {
        if (player1.getIsPlaying()) {
            player1.setIsPlaying();
            player2.setIsPlaying();
        } else {
            player1.setIsPlaying();
            player2.setIsPlaying();
        }


    }
    
    const winner = () => {
        
    } 
    return {
        switchTurn
    }
})();

const gameBoard = (() => {
    const boardState = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    // Get DOM elements
    const spots = document.querySelectorAll('.spot');
    
    // Attach event listeners
    spots.forEach(spot => spot.addEventListener('click', play));
    
    function play(event) {
        if (!event.target.textContent) {

            // Update board state
            player1.getIsPlaying() ? updateBoardState(event.target.dataset.row, event.target.dataset.column, player1.getSymbol()) : updateBoardState(event.target.dataset.row, event.target.dataset.column, player2.getSymbol());

            // Render board state
            render();

            // Switch turn
            game.switchTurn();
        }
    }
    
    // update boardState array
    const updateBoardState = (row, column, symbol) => boardState[row].splice(column, 1, symbol);
        
    // Render boardState array
    const render = () => spots.forEach(spot => spot.textContent = boardState[spot.dataset.row][spot.dataset.column]);
})();
