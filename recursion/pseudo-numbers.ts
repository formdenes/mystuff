'use strict'

const seed:number = 435;

function pseudoRandom(x:number){
    let square:number = Number(Math.pow(x,2).toString().slice(1,-1));
    if (square.toString().length>10){
        return square;
    }
    else {return pseudoRandom(square);}
}

console.log(pseudoRandom(seed));