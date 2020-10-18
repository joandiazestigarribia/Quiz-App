const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex, countRightAnswers;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    countRightAnswers = 0; // resetea el contador despues de que reinicia el juego
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Reiniciar';
        startButton.classList.remove('hide');
    }
    if (selectedButton.dataset = correct) {
        countRightAnswers++;
     // +1
     }
     document.getElementById('right-answers').innerHTML = "Respuestas correctas: " + countRightAnswers; // span muestra el contador de rtas corretctas
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: '¿Cuanto es 2 + 2?',
        answers: [
            {text: '4', correct: true},
            {text: '6', correct: false}
        ]
    },
    {
        question: '¿Cual es la capital de Argentina?',
        answers: [
            {text: 'Chaco', correct: false},
            {text: 'Tucumán', correct: false},
            {text: 'Buenos Aires', correct: true},
            {text: 'Córdoba', correct: false}
        ]
    },
    {
        question: '¿Cuales son los colores de la bandera de Japón?',
        answers: [
            {text: 'Azul y rojo', correct: false},
            {text: 'Blanco y rojo', correct: true},
            {text: 'Celeste y blanco', correct: false},
            {text: 'Verde y amarillo', correct: false}
        ]
    },
    {
        question: '¿Cuanto es 4 * 2?',
        answers: [
            {text: '2', correct: false},
            {text: '10', correct: false},
            {text: '12', correct: false},
            {text: '8', correct: true}
        ]
    }
]