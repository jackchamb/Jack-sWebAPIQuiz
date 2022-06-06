let score = document.querySelector('#score');
let time = document.querySelector('p.time');
let secondsRemaining = 75;

const intro = document.querySelector('#intro');
const questions = document.querySelector('#questions');
let question = document.querySelector('#question');
let questionAmount = 0;
const YesNoSelector = document.querySelector('#YesNoSelector');
const lastSelector = document.querySelector('#lastSelector');
let userIinitals = document.querySelector('#userIinitals');
const highScores = document.querySelector('#highScores');
let scoreBoard = document.querySelector('#scoreBoard');
let scoreNumbr = [];
const BtnStart = document.querySelector('#BtnStart');
const BtnAnswer = document.querySelectorAll('#BtnAnswer');
const BtnAnswer1 = document.querySelector('#BtnAnswer1');
const BtnAnswer2 = document.querySelector('#BtnAnswer2');
const BtnAnswer3 = document.querySelector('#BtnAnswer3');
const BtnAnswer4 = document.querySelector('#BtnAnswer4');
const BtnSubmit = document.querySelector('#BtnSubmit');
const BtnReset = document.querySelector('#BtnReset');
const BtnDeleteScores = document.querySelector('#BtnDeleteScores');
const BtnHighScores = document.querySelector('#BtnHighScores');

const questionsArray = [
    {
        question: "Commonly used data types do NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "2"
    },
    {
        // question 1
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer: "1"
    },
    {
        // question 2
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "3"
    },
    {
        // question 3
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: "2"
    },
    {
        // question 4
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "3"
    }
];

function setTime() {
    let timerInterval = setInterval(function () {
        secondsRemaining--;
        time.textContent = secondsRemaining + " seconds remaining";

        if (secondsRemaining === 0 || questionAmount === questionsArray.length) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}
function startGame() {
    intro.style.display = "none";
    questions.style.display = "block";
    questionAmount = 0
    setTime();
    setQuestion(questionAmount);
}
function setQuestion(questionAmount) {
    if (questionAmount < questionsArray.length) {
        question.textContent = questionsArray[questionAmount].question;
        BtnAnswer1.textContent = questionsArray[questionAmount].answers[0];
        BtnAnswer2.textContent = questionsArray[questionAmount].answers[1];
        BtnAnswer3.textContent = questionsArray[questionAmount].answers[2];
        BtnAnswer4.textContent = questionsArray[questionAmount].answers[3];
    }
}
function bestGuess(event) {
    event.preventDefault();
    YesNoSelector.style.display = "block";
    let p = document.createElement('p');
    YesNoSelector.appendChild(p);

    timeDeduct(function () {
        p.style.display = "none";
    }, 1000);
    if (questionsArray[questionAmount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else if (questionsArray[questionAmount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
        }
        if (questionAmount < questionsArray.length) {
            questionAmount++;
            }
            setQuestion(questionAmount);
}    
function addScore(event) {
    event.preventDefault();
    lastSelector.style.display = "none";
    highScores.style.display = "block";
    let intitials = userIinitals.value.toUpperCase();
    scoreNumbr.push({ initals: intitials, score: secondsRemaining });
    scoreNumbr = scoreNumbr.sort(function (a, b) {
        if (a.score < b.score) {
            return 1;
        } else {
            return -1;
        }
    });
    scoreBoard.innerHTML = "";
    for (let i = 0; i < scoreNumbr.length; i++) {
        let li = document.createElement('li');
        li.textContent = scoreNumbr[i].initals + " - " + scoreNumbr[i].score;
        scoreBoard.appendChild(li);
    }

    storeScores();
    showScores();
}
function storeScores() {
    localStorage.setItem('scores', JSON.stringify(scoreNumbr));
}
function showScores() {
    let storedScores = JSON.parse(localStorage.getItem('scores'));
    if (storedScores !== null) {
        scoreNumbr = storedScores;
    }
}

    
