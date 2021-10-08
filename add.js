const start = document.querySelector('#start')
const screen = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
let time = 0
const board = document.querySelector('#board')
let score = 0
const COLORS = ['#1771F1', '#48CFAF', '#41B619', '#8EAF0C', '#FFD600']

start.addEventListener('click', (event) => {
    event.preventDefault()
    screen[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if(event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'))
        screen[1].classList.add('up')
        startGame()
    }/*event.target Элемент по которому тыкнули */
})

board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame(){
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime(){
    if(time === 0){
        finishGame()
    }else{
        let current = --time
        if(current < 10){
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value){
    timeEl.innerHTML = `00:${value}`
}

function finishGame(){
    board.innerHTML = `<h1>Ваш счет: <span class="primary"> 
    ${score}</span></h1>`
    timeEl.parentNode.classList.add('hide')

}

function createRandomCircle(){
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = getRandomColor()
    circle.classList.add('circle')

    board.append(circle)
}

function getRandomNumber(min, max){
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor(){
    const index = Math.floor(Math.random() * COLORS.length)
    return COLORS[index]
}

