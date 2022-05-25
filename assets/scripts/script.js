// Setup Selectors
var questionEl = document.querySelector('#question');
var choiceEl = document.querySelector('#choices');
var navigationEl = document.querySelector("#navigation");
var startEl = document.querySelector('#start');
var timerEl = document.querySelector("#time");
var viewScoresEl = document.querySelector("#view-scores");
viewScoresEl.addEventListener("click", populateScores);
var gameFeedback = document.querySelector("#feedback");
var formEl = document.querySelector("#initials");
var submitEl = document.querySelector("#submit");
var highScoreEl = document.querySelector("#highscore");
var playersScores = [];
var questionNumber = 0;
var timer = 75;
var score = 0;
var highscoreStore = localStorage.getItem("highscores")
var quizContent = {
    "results": [
        {
            "question": "When Gmail first launched, how much storage did it provide for your email?",
            "correct_answer": "1GB",
            "answers": [
                "1GB",
                "512MB",
                "5GB",
                "Unlimited"
            ]
        },
        {
            "question": "The programming language &#039;Swift&#039; was created to replace what other programming language?",
            "correct_answer": "Objective-C",
            "answers": [
                "C#",
                "Ruby",
                "Objective-C",
                "C++"
            ]
        },
        {
            "question": "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
            "correct_answer": "Final",
            "answers": [
                "Static",
                "Private",
                "Public",
                "Final"
            ]
        },
        {
            "question": "If you were to code software in this language you&#039;d only be able to type 0&#039;s and 1&#039;s.",
            "correct_answer": "Binary",
            "answers": [
                "JavaScript",
                "C++",
                "Binary",
                "Python"
            ]
        },
        {
            "question": "The series of the Intel HD graphics generation succeeding that of the 5000 and 6000 series (Broadwell) is called:",
            "correct_answer": "HD Graphics 500",
            "answers": [
                "HD Graphics 700 ",
                "HD Graphics 500",
                "HD Graphics 7000",
                "HD Graphics 600",

            ]
        },
        {
            "question": "What was the name given to Android 4.3?",
            "correct_answer": "Jelly Bean",
            "answers": [
                "Jelly Bean",
                "Lollipop",
                "Nutella",
                "Froyo"
            ]
        },
        {
            "question": "The Windows 7 operating system has six main editions.",
            "correct_answer": "True",
            "answers": [
                "True",
                "False"
            ]
        },
        {
            "question": "What does &quot;LCD&quot; stand for?",
            "correct_answer": "Liquid Crystal Display",
            "answers": [
                "Language Control Design",
                "Liquid Crystal Display",
                "Last Common Difference",
                "Long Continuous Design"
            ]
        },
        {
            "question": "Which of the following is a personal computer made by the Japanese company Fujitsu?",
            "correct_answer": "FM-7",
            "answers": [
                "PC-9801",
                "Xmillennium",
                "MSX",
                "FM-7"
            ]
        },
        {
            "question": "Which data structure does FILO apply to?",
            "correct_answer": "Stack",
            "answers": [
                "Queue",
                "Stack",
                "Heap",
                "Tree"
            ]
        }
    ]
}

// Game Setup
function gameSetup() {
    clearBoard();
    questionEl.setAttribute('style', "Display: block")
    questionEl.innerHTML = `<h1>Coding Quiz Challenge<h1>`;
    choiceEl.setAttribute('style', "Display: block");
    choiceEl.innerHTML = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds."
    startEl.setAttribute("style", "Display: block");
    startEl.addEventListener("click", startGame);
    
}

// Check user choice
function checkAnswer(event) {
    var correctAnswer = quizContent.results[questionNumber].correct_answer;
    var userChoice = event.target.innerHTML;
    console.log(userChoice);
    if (correctAnswer === userChoice) {
        score++;
        gameFeedback.setAttribute("style", "Display: inline");
        gameFeedback.innerHTML = "Correct!";
    } else {
        gameFeedback.setAttribute("style", "Display: inline");
        gameFeedback.innerHTML = "Wrong!";
    }
    questionNumber++;

    getNextQuestion();
    return;
}

// Start Game
function startGame() {
    clearBoard();
    highScoreEl.addEventListener("click", scoreBoard);
    questionEl.setAttribute('style', "Display: block")
    questionEl.innerHTML = `<h1>Coding Quiz Challenge<h1>`;
    choiceEl.setAttribute('style', "Display: block");
    choiceEl.addEventListener("click", checkAnswer);
    var timerInterval = setInterval(function () {
        timer--;
        timerEl.textContent = "Time: " + timer;
        gameFeedback.setAttribute("style", "Display: none");

        if (timer === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
    
            gameOver();

        } else if (questionNumber === quizContent.results.length) {
            clearInterval(timerInterval);

            gameOver();
        }
    }, 1000);

    getNextQuestion();
    return;
}

// Display next question
function getNextQuestion() {
    
    // Get question and choices 
    if (questionNumber < quizContent.results.length) {
        var question = quizContent.results[questionNumber].question;
        var question = quizContent.results[questionNumber].question;
        var answersList = quizContent.results[questionNumber].answers;
        questionEl.innerHTML = `<h4>${question}</h4>`;
        choiceEl.innerHTML = `<ul><li>${answersList[0]}</li><li>${answersList[1]}</li><li>${answersList[2]}</li><li>${answersList[3]}</li></ul>`
    } else {
        gameOver();
    }
    return;
}

// Display game over
function gameOver() {

    // Hide elements
    clearBoard();

    // Display elements
    formEl.setAttribute("style", "Display: inline");
    submitEl.setAttribute("style", "Display: inline");  
    questionEl.setAttribute("style", "Display: block");
    choiceEl.setAttribute("style", "Display: Block");

    // Button
    submitEl.addEventListener("click", addScore);

    // Populate content
    questionEl.innerHTML = `<h1>All Done!<h1>`;
    choiceEl.innerHTML = `Your score is: ${score}`;
    return;
}

// Grab scores from local storage
function addScore(event) {
  
    event.preventDefault();

    populateScores();

    return;

}

function populateScores(){
        //check if the localstorage is empty
        if (highscoreStore !== "") {
            highscoreStore = JSON.parse(localStorage.getItem("highscores"));
            playersScores = highscoreStore;
        } 
        
        //Get value from input box
        var value = document.getElementById("inputClass").value;
        if (value !== ""){
                // push new entry to array
        playersScores.push(value + " - " + score);
        console.log(playersScores);
        // stringify array and add it to localstorage
        localStorage.setItem("highscores", JSON.stringify(playersScores));
        
        }
        scoreBoard();
        return;
}

// display highscore elements
function scoreBoard() {

    // Clear Screen
    clearBoard();
    
    // Show Elements
    questionEl.setAttribute("style", "Display: block");
    navigationEl.setAttribute("style", "Display: none");
    highScoreEl.setAttribute("style", "Display: block");
    navigationEl.setAttribute("style", "Display: block");
    
    // Populate text content
    questionEl.innerHTML = `<h1>High Scores</h1>`;
    navigationEl.innerHTML = `<button id="go-back" type="submit" onclick="window.location.reload()"> Go Back </button> <button id="clear-score"> Clear Scores </button>`;

    // Vars
    var clearScore = document.querySelector("#clear-score");


    // Events
    clearScore.addEventListener("click", clearLocalStore);

    // Create score list
    highScoreEl.innerHTML = `<ul></ul>`;
    var scoreList = document.querySelector("#highscore ul");
    for (let i = playersScores.length - 1; i >= 0; i--) {
        var li = document.createElement('li');
        li.id ="score-item";
        li.innerHTML = `${playersScores[i]}`;
        scoreList.append(li);
    }
    return;
}

// Clear screen
function clearBoard() {
    questionEl.setAttribute("style", "Display:none");
    choiceEl.setAttribute("style", "Display: none");
    formEl.setAttribute("style", "Display: none");
    gameFeedback.setAttribute("style", "Display: none");
    submitEl.setAttribute("style", "Display: none");
    gameFeedback.setAttribute("style", "Display: none");
    formEl.setAttribute("style", "Display: none");
    highScoreEl.setAttribute("style", "Display: none");
    startEl.setAttribute("style", "Display: none");
    navigationEl.setAttribute("style", "Display: none");

}

// Clear Local Storage
function clearLocalStore() {
    localStorage.setItem("highscores", "");
    playersScores = [];
    scoreBoard();
    return;
}

gameSetup();