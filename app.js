const grid = document.querySelector('.grid')
let width = 10
let turdCount = 20
let flags = 0
let squares = []
let isGameOver = false

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
        square.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            addFlag(e.target)
        })
    }

    for(let i = 0; i < squares.length; i++) {
        let total = 0
        const isLeftEdge = (i % width === 0)
        const isRightEdge = (i % width === width - 1)

        if(squares[i].classList.contains('valid')) {
            if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('turd')) total ++
            if (i > 9 && !isRightEdge && squares[i +1 -width].classList.contains('turd')) total ++
            if (i > 10 && squares[i -width].classList.contains('turd')) total ++
            if (i > 11 && !isLeftEdge && squares[i -1 -width].classList.contains('turd')) total ++
            if (i < 98 && !isRightEdge && squares[i +1].classList.contains('turd')) total ++
            if (i < 90 && !isLeftEdge && squares[i -1 +width].classList.contains('turd')) total ++
            if (i < 88 && !isRightEdge && squares[i +1 +width].classList.contains('turd')) total ++
            if (i < 89 && squares[i +width].classList.contains('turd')) total ++
            squares[i].setAttribute('data', total)
        }
    }
}

createBoard()

function addFlag(square) {
    if(isGameOver) return
    if(!square.classList.contains('checked') && flags < turdCount) {
        if(!square.classList.contains('flag')) {
            square.classList.add('flag')
            square.innerHTML = '🚩'
            flags++
            checkForWin()
        } else {
            square.classList.remove('flag')
            square.innerHTML = ''
            flags--
        }
    }
}

function click(square) {
    if(isGameOver) return
    if(square.classList.contains('checked') || square.classList.contains('flag')) return
    if(square.classList.contains('turd')) {
        gameOver(square)
    } else {
        const data = square.getAttribute('data')
        
        if(data > 0) {
            square.classList.add('checked')
            square.innerText = data
            return
        }
        checkSquare(square)
    }
    square.classList.add('checked')
}

function checkSquare(square) {
    const currentId = square.id
    const isLeftEdge = (currentId % width === 0)
    const isRightEdge = (currentId % width === width - 1)

    setTimeout(() => {
        if(currentId > 0 && !isLeftEdge) {
            const newId = squares[parseInt(currentId) - 1].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId < 99 && !isRightEdge) {
            const newId = squares[parseInt(currentId) + 1].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId > 9) {
            const newId = squares[parseInt(currentId) - width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId < 90) {
            const newId = squares[parseInt(currentId) + width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
    }, 10)
}

function gameOver(square) {
    console.log('EW!')
    isGameOver = true

    squares.forEach((square) => {
        if(square.classList.contains('turd')) square.innerText = '💩'
    })
}

function checkForWin() {
    let matches = 0
    for (let i = 0; i < squares.length; i++) {
        if(squares[i].classList.contains('flag') && squares[i].classList.contains('turd')) {
            matches ++
        }
    }

    if(matches === turdCount) {
        alert('you win')
        isGameOver(true)
        location.reload
    }
}