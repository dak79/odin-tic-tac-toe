
const gameBoard = (function () {
    const board = []

})();

const player = function(name, symbol) {
    
    const getName = () => console.log(`Hi i'm ${name}`);
    const getSymbol = () => console.log(`Hi i will use ${symbol}`);

    return {
        getName,
        getSymbol
    }
}

const jim = player('jim', 'X');
const leo = player('leo', 'O');
jim.getName();
jim.getSymbol();

leo.getName();
leo.getSymbol();

console.log(jim.p);
console.log(leo.p);