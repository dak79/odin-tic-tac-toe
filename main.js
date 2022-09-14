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
        console.log('winner');
    } 
    return {
        switchTurn,
        winner
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
            player1.getIsPlaying() ? updateBoardState(event.target.dataset.index, player1.getSymbol()) : updateBoardState(event.target.dataset.index, player2.getSymbol());
            
            // Render board state
            render();
            
            const win = winningBoard();
            
            win ? game.winner() : game.switchTurn();
        }
    }
    
    // update boardState array
    const updateBoardState = (update, symbol) => boardState.splice(update, 1, symbol);
        
    // Render boardState array
    const render = () => spots.forEach(spot => spot.textContent = boardState[spot.dataset.index]);

    const winningBoard = () => {

        // Find all occurencies
        const player1Plays = [];
        const player2Plays = [];

        const symbol = player1.getIsPlaying() ? player1.getSymbol() : player2.getSymbol(); 



        let index = boardState.indexOf(symbol)
        while (index !== -1) {
            player1.getIsPlaying() ? player1Plays.push(index) : player2Plays.push(index);
            index = boardState.indexOf(symbol, index + 1);
        }

        console.log(player1Plays);
        console.log(player2Plays);

        const winningPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

        const whoPlays = player1.getIsPlaying();

        for (let i = 0; i < 8; i++) { 
            const winnerExist = winningPatterns[i].every(winningPattern => whoPlays ? player1Plays.includes(winningPattern) : player2Plays.includes(winningPattern))

             if (winnerExist) {
                whoPlays ? player1.setWinner() : player2.setWinner();
                return true;
             }
        }
    }
})();
