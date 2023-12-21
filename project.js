const prompt = require('prompt-sync')();

const ROWS=3, COLS=3;
const SYMBOLS_COUNT = {
    "A":2,
    "B":4,
    "C":6,
    "D":8
}

const SYMBOL_MULTIPLIER = {
    "A":5,
    "B":4,
    "C":3,
    "D":2
}


const getNumLines = () => {
    while(true){
        const numLines = parseFloat(prompt("Enter the number of lines to bet on (1-3): "));

        if(isNaN(numLines) || numLines<=0 || numLines>3){
            console.log("Invalid number of lines entered, Try again");
        }else{
            return numLines;
        }
    }
}

const deposit = () =>{
    while(true){
        const depAmt = parseFloat(prompt("Enter a deposit amount: "));

        if(isNaN(depAmt) || depAmt<=0){
            console.log("Invalid amount, Try again.");
        }else{
            return depAmt
        }
    }
}

const getBet = (balance, lines) => {
    while(true){
        const betAmt = parseFloat(prompt("Enter the bet per line amount: "));
        if(isNaN(betAmt) || betAmt<=0 || betAmt>balance/lines){
            console.log("Invalid bet amounted entered, Try again.");
        }else{
            return betAmt;
        }
    }
}

const spin = () => {
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0;i<count;i++){
            symbols.push(symbol);
        }
    }

    const reels = [[],[],[]];
    for(let i=0;i<COLS;i++){
        const reelSym = [...symbols];
        for(let j=0;j<ROWS;j++){
            const rI = Math.floor(Math.random()*reelSym.length);
            const selected = reelSym[rI];
            reels[i].push(selected);
            reelSym.splice(rI, 1);
        }
    }
    return reels;

}

const res = spin();

let balance = deposit();
const numberLines = getNumLines();
const bet = getBet(balance, numberLines);
