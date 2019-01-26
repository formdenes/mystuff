'use strict';

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

// DO NOT TOUCH THE CODE ABOVE THIS LINE

//const values
const canvasSize:number = 900;

//Random color generator
function randomColor(){
    const r = function () { return Math.floor(Math.random()*256) };
    return "rgb(" + r() + "," + r() + "," + r() + ")";
}

//Hexagon drawing function (coordinates of the middle point, the size of the sides, the color of the hexagon)
function drawHexagon(xstart:number, ystart:number,size:number, color){

    //the height of one triangle inside of the hexagon
    const m:number = Math.sqrt(3)/2*size;

    //The coordinates of the hexagon relative to the middle point
    let x:number = 0;
    let y:number = 0;
    let a:number = 0;
    let b:number = 0;
    let c:number = 0;
    let d:number = 0;
    let even:number = 0;
    let odd:number = 0;
    
    //Begin drawing the hexagon, setting up, and moving to the fist coordinate
    ctx.strokeStyle = 'black';
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(xstart-size/2, ystart + m);

    //Drawing the remaining 2 sides, then closing path, and stroke it
    for (let i:number = 0; i<6; i++){
        even = 1-i%2;
        odd = i%2;
        a = even*(-1)+odd*1;
        b = Math.floor(i%3/2)*(-1)+1+Math.floor(i%3/2)*(-2);
        c = 1-Math.floor(i/3)-(Math.floor(i/3));
        d = 1-Math.floor(i%3/2);
        x = xstart + a*b*size/2;
        y = ystart + c*d*m;
        console.log(`(${x},${y})`);
        ctx.lineTo(x,y);
    } 
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    if (size>2){
        drawHexagon(xstart-size/4,y-m/2,size/2,color);
        drawHexagon(xstart+size/2,y,size/2,color);
        drawHexagon(xstart-size/4,y+m/2,size/2,color);
    }
}

drawHexagon(canvasSize/2,canvasSize/2,canvasSize/2,randomColor());