const player = (name, symbol, isPlaying) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    const getIsPlaying = () => isPlaying;

    return {
        getName,
        getSymbol,
        getIsPlaying
    }
    // Factory function for player: name, symbol, isPlaying, turn

} 
const player1 = player('jim', 'X', true);
const player2 = player('josh', '0', false);



const gameBoard = (() => {
    const boardState = [
        ["0", "1", "2"],
        ["3", "4", "5"],
        ["6", "7", "8"],
    ];
    console.log('B ' + player1.getName());
    console.log('B ' + player1.getSymbol());
    console.log('B ' + player1.getIsPlaying());
    console.log('B ' + player2.getName());
    console.log('B ' + player2.getSymbol());
    console.log('B ' + player2.getIsPlaying());
    const spots = document.querySelectorAll('.spot');
    
    spots.forEach(spot => spot.addEventListener('click', play));
    
    function play(event) {
        console.log(`click: Row ${event.target.dataset.row} - Column: ${event.target.dataset.column}`);
        
    }
    
    const updateBoardState = () => {
        // This function will update the array according to the move of player
    }

    const render = () => {
        // This function will render the boardState
    } 
    
})();

const game = (() => {
    // This module manage start, turn, ending of game
    console.log('G ' + player1.getName());
    console.log('G ' + player1.getSymbol());
    console.log('G ' + player1.getIsPlaying());
    console.log('G ' + player2.getName());
    console.log('G ' + player2.getSymbol());
    console.log('G ' + player2.getIsPlaying());
})();



// Test
console.log(player1.getName());
console.log(player1.getSymbol());
console.log(player1.getIsPlaying());
console.log(player2.getName());
console.log(player2.getSymbol());
console.log(player2.getIsPlaying());




