const player = function(name, symbol) {

    const getName = () => name;
    const getSymbol = () => symbol;

    
    // Get DOM elements
    const spots = document.querySelectorAll('.spot');
    
    // Event Listeners
    spots.forEach(spot => {
        spot.addEventListener('click', play);
    })
    
    // Choosen play
    function play(event) {
        if(!event.target.textContent) {
            const index = event.target.dataset.index;
            gameBoard.gameState(index, getSymbol());
            gameBoard.render(spots);           
        }
    }
            
    return {
        getName,
        getSymbol,
        play
    }
}

const gameBoard = (function () {
    const board = [null, null, null, null, null, null, null, null, null];
    
        const gameState = (update, symbol) => {
            board.splice(update, 1, symbol);
        }
        
        const render = (spots) => {
            spots.forEach(spot => {
                spot.textContent = board[spot.dataset.index];
            })    
        }
        
        return {
            render,
            gameState
        }    
})();

const game = (function(){
    const player1 = player('jim', 'X');     
})();
