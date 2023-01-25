const grid = document.querySelector('.grid')
let width = 10
let turdCount = 20
let squares = []


//create board
function createBoard() {
    //turd array
    const turdArray = Array(turdCount).fill('turd')
    //the rest of the squares
    const emptyArray = Array((width * width) - turdCount).fill('valid')
    //combine the arrays
    const gameArray = emptyArray.concat(turdArray)
    //shuffle
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5)

    for(let i = 0; i < (width * width); i++) {
        //creating squares
        const square = document.createElement('div')
        //giving id to keep track
        square.setAttribute('id', i)
        square.classList.add(shuffledArray[i])
        //put in grid
        grid.appendChild(square)
        squares.push(square)
    }
}

createBoard()