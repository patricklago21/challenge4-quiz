const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timerContainer = document.getElementById('timer')
const timeLeft = document.getElementById('time-left')
var counter = 30
const highscoreContainer = document.getElementById('highscore-container')
const highscoreAmount = document.getElementById('highscore')
const historyContainer = document.getElementById('history-container')
const highscoreButton = document.getElementById('highscore-btn')
//const answeredCorrect = answer.correct

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', () => {
    startGame()
    var countdown = function() {
        timerContainer.classList.remove('hide')
    timeLeft.textContent = counter
    counter --;
    if(counter === 0) {
        clearInterval(startCountdown)
        highscore()
    }
    }
    var startCountdown = setInterval(countdown, 1000)
})



nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

highscoreButton.addEventListener('click', history)

function startGame() {
    console.log('started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }  
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else { 
        //startButton.innerText = 'See Your Score'
        //startButton.classList.remove('hide')
        highscore()
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false},
            { text: '8', correct: false},
            { text: 'e=mc^2', correct: false}
        ]
    },

    {
        question: '10 * 5?',
        answers: [
            { text: '25', correct: false},
            { text: '15', correct: false},
            { text: '50', correct: true },
            { text: '500', correct: false}
        ]
    },

    {
        question: 'What language(s) are used to create this application?',
        answers: [
            { text: 'Coding', correct: false},
            { text: 'HTML, CSS, and Javascript', correct: true },
            { text: 'Spanish', correct: false},
            { text: 'SQL and HTML', correct: false}
        ]
    }
]

function highscore() {
    resetState()
    highscoreContainer.classList.remove('hide')
    timerContainer.classList.add('hide')
    startButton.classList.add('hide')
    questionContainerElement.classList.add('hide')
}

function history() {
    historyContainer.classList.remove('hide')
    timerContainer.classList.add('hide')
    highscoreContainer.classList.add('hide')
}

//console.log(button.dataset.correct)
