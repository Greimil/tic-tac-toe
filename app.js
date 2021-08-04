const cellsElements = document.querySelectorAll("[data-cell]")
const Board = document.getElementById("board")
const CICLE_CLASS = "circle"
const X_CLASS = "x"
const restarBtn = document.getElementById("restartButton")
const winningMessageElement = document.getElementById("winningMessage")
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")
const winning_combination = [
    [0,1,2],
    [3,4,6],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,6,8],
    [0,4,9],
    [2,4,6]

]
let circleTurn 


starGame()


function starGame(){
    circleTurn = false
    cellsElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CICLE_CLASS)
        cell.removeAttribute("click",handleClick)
        cell.addEventListener("click", handleClick,{once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove("show")
}

restarBtn.addEventListener("click",starGame)

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CICLE_CLASS: X_CLASS
    placeMark(cell,currentClass)
    if(checkWin(currentClass)){
       endGame(false)
    }  else if(isDraw()){
        endGame(true)
    } else{
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerHTML = "Draw!"
    } else {
        winningMessageTextElement.innerHTML = `${circleTurn ? "O's": "X's"} Wins!`
    }
    winningMessageElement.classList.add("show")
}


function isDraw(){
    return [...cellsElements].every(cell =>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CICLE_CLASS)
    })
}


function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    Board.classList.remove(CICLE_CLASS)
    Board.classList.remove(X_CLASS)
    if(circleTurn){
        Board.classList.add(CICLE_CLASS)
    } else{
        Board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return winning_combination.some(combination => {
      return combination.every(index => {
        return cellsElements[index].classList.contains(currentClass)
      })
    })
  }


  restarBtn.addEventListener("click",starGame)