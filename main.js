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
    // Factory function for player: name, symbol, isPlaying, turn

} 
const player1 = player('jim', 'X', true);
const player2 = player('josh', '0', false);


const game = (() => {
    // This module manage start, turn, ending of game
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
    // console.log('G ' + player1.getName());
    // console.log('G ' + player1.getSymbol());
    // console.log('G ' + player1.getIsPlaying());
    // console.log('G ' + player2.getName());
    // console.log('G ' + player2.getSymbol());
    // console.log('G ' + player2.getIsPlaying());
    
    return {
        switchTurn
    }
})();

const gameBoard = (() => {
    const boardState = [
        ["0", "1", "2"],
        ["3", "4", "5"],
        ["6", "7", "8"],
    ];
    // console.log('B ' + player1.getName());
    // console.log('B ' + player1.getSymbol());
    // console.log('B ' + player1.getIsPlaying());
    // console.log('B ' + player2.getName());
    // console.log('B ' + player2.getSymbol());
    // console.log('B ' + player2.getIsPlaying());
    const spots = document.querySelectorAll('.spot');
    
    spots.forEach(spot => spot.addEventListener('click', play));
    
    function play(event) {
        // Update board state

        // render board state

        // Switch turn
        console.log(`Before switch is playing: ${player1.getIsPlaying() ? 'Player 1' : 'Player 2'}`);
        game.switchTurn();
        console.log(`After switch is playing: ${player1.getIsPlaying() ? 'Player 1' : 'Player 2'}`);
        
        console.log(`click: Row ${event.target.dataset.row} - Column: ${event.target.dataset.column}`);

        
    }
    
    const updateBoardState = () => {
        console.log('UPDATE')
        // This function will update the array according to the move of player
    }

    const render = () => {
        // This function will render the boardState
    } 
    
})();




// Test
// console.log(player1.getName());
// console.log(player1.getSymbol());
// console.log(player1.getIsPlaying());
// console.log(player2.getName());
// console.log(player2.getSymbol());
// console.log(player2.getIsPlaying());




