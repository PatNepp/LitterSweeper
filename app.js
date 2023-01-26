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

        square.addEventListener('click', (e) => {
            click(e.target)
        })
    }

    for(let i = 0; i < squares.length; i++) {
        let total = 0
        const isLeftEdge = (i % width === 0)
        const isRightEdge = (i % width === width - 1)

        if(squares[i].classList.contains('valid')) {
            if(i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains('turd')) total++
            if(i > 10 && squares[i - width].classList.contains('turd')) total++
            if(i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('turd')) total ++
            if(i < 99 && !isRightEdge && squares[i + 1].classList.contains('turd')) total++
            if(i < 89 && squares[i + 1 + width].classList.contains('turd')) total++
            if(i < 90 && squares[i + width].classList.contains('turd')) total ++
            if(i < 89 && !isLeftEdge && squares[i - 1 + width].classList.contains('turd')) total++
            if(i > 0 && !isLeftEdge && squares[i - 1].classList.contains('turd')) total++
            squares[i].setAttribute('data', total)
        }
    }
}

createBoard()

function click(square) {
    // if (isGameOver) return

    if(square.classList.contains('turd')) {
        square.style.backgroundColor = 'brown'
        alert('You found a turd! NO!')
        location.reload()
    }
    if(square.classList.contains('valid')) {
        const data = square.getAttribute('data')
        
        if(data > 0) {
            square.classList.add('checked')
            square.innerText = data
            return
        }
        square.classList.add('checked')
    }
}