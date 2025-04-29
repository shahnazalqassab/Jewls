// THE GLOBAL VARIABLES 
const board = document.getElementById('game-board');
const display = document.getElementById('score');
const gemsText = document.getElementById('Gemstones');

const width = 20;
const height = 20;
let score = parseInt(localStorage.getItem("Score"));
display.textContent = score;

let cells = [];
const levelGems = 7;
let gemsCollected = 0;
let gemIndex = 0;
gemsText.textContent = `Number of Gemstones needed to finish: ${levelGems-gemsCollected}`;

// CREATING THE GRID
for (let i = 0; i < width * height; i++){
    const block = document.createElement('div');
    block.classList.add('cell');
    cells.push(block);
    board.appendChild(block);
}

    // CREATING THE NEEDLE
let needle = [202, 201, 200]; // THIS INDEXES OF THE MIDDLE OF THE GRID (three indexes)
let direction = 1; // MAKING THE NEEDLE MOVE TO THE RIGHT



// CREATING THE THREAD
const drawThread = () => {

        cells.forEach(cell => cell.classList.remove('needle'));
        needle.forEach(index => cells[index].classList.add('needle'));

}





// PLACING THE GEMSTONES RANDOMLY
const placeGems = () => {

        do {
        gemIndex = Math.floor(Math.random() * cells.length);
    } while (needle.includes(gemIndex));
    

    if (gemsCollected === levelGems){
        cells.forEach(cell => cell.classList.remove('gemstone'));
        return;
    }
    else{
        cells.forEach(cell => cell.classList.remove('gemstone'));
        cells[gemIndex].classList.add('gemstone'); // the gemstone class in css. 
    }

}





// THE MOVEMENT OF THE NEEDLE
const move = () => {
    const tip = needle[0];
    const newTip = tip + direction;

// CRASHING WITH THE BORDERS OR ITSELF WHEN THE GEMS ARE NOT FULLY COLLECTED
if (gemsCollected !== levelGems){
    if (
        (direction === 1 && tip % width === width-1) || // RIGHT BORDER
        (direction === -1 && tip % width === 0) || // LEFT BORDER
        (direction === width && tip >= width * (height -1)) || // BOTTOM BORDER
        (direction === -width && tip < width) || // TOP
        needle.includes(newTip) // self 
    ){
        clearInterval(game)
        alert('Game Over! Final score: ' + score);
        return;
    }
}else{
    gemsText.textContent = `You have collected the required gems, \n close the necklace`; 
    if((direction === 1 && tip % width === width-1) || // right wall
    (direction === -1 && tip % width === 0) || // left wall 
    (direction === width && tip >= width * (height -1)) || // bottom 
    (direction === -width && tip < width) ){
        clearInterval(game)
        alert(`Too bad, you almost finished the necklace :'( ` + score);
        return;
    }
    else if (needle.includes(newTip)){ 

        clearInterval(game)
        alert('LEVEL COMPLETED :D');
        return;
    }

}

needle.unshift(newTip); // adding the stone to the beginning of the thread

    if (newTip === gemIndex){
        score += 10;
        display.textContent = score;
        gemsCollected++;
        gemsText.textContent = `Number of Gemstones needed to finish: ${levelGems-gemsCollected}`;
        placeGems();
    } else {
      needle.pop();
      }

    drawThread();

}


// STARTING THE GAME
drawThread();
placeGems();
const game = setInterval(move, 150);


// CAPTURING THE KEYBOARD MOVEMENTS
document.addEventListener('keydown', (press) => {
    if ( press.key === 'ArrowRight' && direction !== -1) 
        direction = 1;
    else if (press.key === 'ArrowLeft' && direction !== 1)
        direction = -1;
    else if (press.key === 'ArrowUp' && direction !== width)
        direction = -width;
    else if (press.key === 'ArrowDown' && direction !== -width)
        direction = width;
});


// LOOSING THE GEMS WHEN RETURNING ON THE SAME DIRECTION YOU CAME FROM
