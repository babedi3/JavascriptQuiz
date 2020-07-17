//DOM elements
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timer = 10;

let questions = [
    {
        question: "What is the correct sequence of HTML tags for starting a webpage?",
        choice1: "Head, Title, HTML",
        choice2: "Title, Head, HTML",
        choice3: "HTML, Head, Title",
        choice4: "CSS, HTML, Title",
        answer: 3
    },
    {
        question: "What does HTML stand for?",
        choice1: "Home Tool Markup Language",
        choice2: "Hyperlinks and text Markup Language",
        choice3: "Hyper Text Markup Language",
        choice4: "Home Text Markup Language",
        answer: 3
    },
    {
        question: "Three of the common CSS selectors select:",
        choice1: "by element type, id attribute, and class attribute",
        choice2: "by element, header, and footer",
        choice3: "div, h1, and p elements",
        choice4: "h1, ul, and li elements",
        answer: 1
    },
    {
        question: "Which HTML element do we use to enter JavaScript?",
        choice1: "<js>",
        choice2: "<script>",
        choice3: "<enterjs>",
        choice4: "<javascript",
        answer: 2
    },
];


// Score adder and max questions
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    timer = 10;
    availableQuestions = [ ... questions];
    getNewQuestion();
    timerCountdown();
};

function timerCountdown(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var tenMinutes = 60 * 10,
        display = document.querySelector('#timer');
    timerCountdown(tenMinutes, display);
};


getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //This below automatically saves the score at the end of the game
        localStorage.setItem("newScore", score);
        
        return window.location.assign("endpage.html");
    } 
    //Pulls questions into html
    questionCounter++;
    questionCounterText.innerText = questionCounter +"/"+ MAX_QUESTIONS;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    //Pulls answer choices into html
    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    //Prevents repeat questions
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
             selectedChoice.parentElement.classList.remove(classToApply);
             getNewQuestion();
        },  1000);    
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();