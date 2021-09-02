let circleTurn
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningText = document.querySelector('[data-winning-message-text]')
const winningMsg = document.getElementById('winningMessage')
const btn = document.getElementById('restart-button')
btn.addEventListener('click', () => {
    window.location.reload()
})
// console.log(board)
// console.log(cellElements)
const clickHandler = e => {
    console.log("clicked")
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        // console.log("winner winner chicken dinner")
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {

        swapTurns()
        setBoardHover()
    }
}
startGame()

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
function swapTurns() {
    circleTurn = !circleTurn
}
function endGame(draw) {
    if (draw) {
        winningText.innerText = 'Draw'
    } else {
        winningText.innerText = `${circleTurn ? "O's" : "X's"} wins!`
    }
    winningMsg.classList.add('show')
}
function setBoardHover() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}
function isDraw() {
    return Array.from(cellElements).every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })

}
function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.addEventListener('click', clickHandler, { once: true })
    })
    setBoardHover()
}
function checkWin(currentClass) {
    return winningCombination.some(combo => {
        return combo.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}