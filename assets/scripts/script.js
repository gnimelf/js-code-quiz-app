// Setup Selectors
var questionEl = document.querySelector('#question');
var choiceEl = document.querySelector('#choices');
var navigationEl = document.querySelector("#navigation");
var startEl = document.querySelector('#start');
var timerEl = document.querySelector("#time");
var viewScoresEl = document.querySelector("#view-scores");
var gameFeedback = document.querySelector("#feedback");
var formEl = document.querySelector("#initials");
var submitEl = document.querySelector("#submit");
var highScoreEl = document.querySelector("#highscore");
var playersScores = new Array;
var questionNumber = 0;
var timer = 75;
var score = 0;
var highscoreStore = localStorage.getItem("highscores");

//Event listeners
viewScoresEl.addEventListener("click", scoreBoard);

// Question base
var quizContent = {
    "results": [
        {
            "question": "Commonly used data types DO NOT include:",
            "correct_answer": "alerts",
            "answers": [
                "string",
                "booleans",
                "alerts",
                "numbers"
            ]
        },
        {
            "question": "The condition in an if / else statement is enclosed with ____",
            "correct_answer": "Final",
            "answers": [
                "quotes",
                "curly brackets",
                "parentheses",
                "square brackets"
            ]
        },
        {
            "question": "Arrays in JavaScript can be used to store ____.",
            "correct_answer": "all of the above",
            "answers": [
                "numbers and strings",
                "other arrays",
                "booleans",
                "all of the above",

            ]
        },
        {
            "question": "String values must be enclosed within ___ when being assigned to variables.",
            "correct_answer": "quotes",
            "answers": [
                "commas",
                "curly brackets",
                "quotes",
                "parentheses"
            ]
        },
        {
            "question": "A very useful tool used during development and debugging for printing content to the debugger is: ",
            "correct_answer": "console.log",
            "answers": [
                "JavaScript",
                "terminal/bash",
                "for loops",
                "console.log"
            ]
        }
    ]
};


// Game Setup
function gameSetup() {
    // clear elements
    clearBoard();

    // Setup Elements
    questionEl.setAttribute('style', "Display: block")
    questionEl.innerHTML = `<h1>Coding Quiz Challenge<h1>`;
    choiceEl.setAttribute('style', "Display: block");
    choiceEl.innerHTML = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds."
    startEl.setAttribute("style", "Display: block");
    startEl.addEventListener("click", startGame);
}


// Check user selection
function checkAnswer(event) {
    var correctAnswer = quizContent.results[questionNumber].correct_answer;
    var userChoice = event.target.innerHTML;
    if (correctAnswer === userChoice) {
        // score++;
        gameFeedback.setAttribute("style", "Display: inline");
        gameFeedback.innerHTML = "Correct!";
    } else {
        gameFeedback.setAttribute("style", "Display: inline");
        gameFeedback.innerHTML = "Wrong!";
        timer -= 10;
    }
    questionNumber++;
    
    getNextQuestion();
    return;
}


// Start Game
function startGame() {
    // Reset elements
    clearBoard();

    // Setup elements 
    highScoreEl.addEventListener("click", scoreBoard);
    questionEl.setAttribute('style', "Display: block")
    questionEl.innerHTML = `<h1>Coding Quiz Challenge<h1>`;
    choiceEl.setAttribute('style', "Display: block");

    // Event listener for user selection
    choiceEl.addEventListener("click", checkAnswer);
    
    var timerInterval = setInterval(function () {
        timer--;
        timerEl.textContent = "Time: " + timer;
        gameFeedback.setAttribute("style", "Display: none");

        if (timer <= 0) {
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
        var answersList = quizContent.results[questionNumber].answers;
        questionEl.innerHTML = `<h4>${question}</h4>`;
        choiceEl.innerHTML = `
        <ul>
            <li>${answersList[0]}</li>
            <li>${answersList[1]}</li>
            <li>${answersList[2]}</li>
            <li>${answersList[3]}</li>
        </ul>`
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
    submitEl.addEventListener("submit", addScore);

    // Populate content
    questionEl.innerHTML = `<h1>All Done!<h1>`;
    choiceEl.innerHTML = `Your score is: ${timer}`;
    return;
}


// Grab scores from local storage
function addScore(event) {

    event.preventDefault();

    var value = event.target[0].value;
    
    //check if the localstorage is empty
    if (highscoreStore && value ) {
        playersScores = JSON.parse(localStorage.getItem("highscores"));
        // push new entry to array
        playersScores.push(timer + " - " + value);  
    } else if (!highscoreStore){
        playersScores.push(timer + " - " + value );
    } 

    localStorage.setItem("highscores", JSON.stringify(playersScores));
    event.target[0].value = '';

    scoreBoard();

    return;

}


// display highscore elements
function scoreBoard() {

    // Clear Screen
    clearBoard();
    
    // Show Elements
    viewScoresEl.setAttribute("style", "Display: none");
    timerEl.setAttribute("style", "Display: none");
    questionEl.setAttribute("style", "Display: block");
    navigationEl.setAttribute("style", "Display: none");
    highScoreEl.setAttribute("style", "Display: block");
    navigationEl.setAttribute("style", "Display: block");
    
    // Populate text content
    questionEl.innerHTML = `<h1>High Scores</h1>`;
    navigationEl.innerHTML = `
        <button id="go-back" type="submit" onclick="window.location.reload()">
            Go Back 
        </button> 
        <button id="clear-score">
            Clear Scores 
        </button>`;

    // Selector
    var clearScore = document.querySelector("#clear-score");

    // Events
    clearScore.addEventListener("click", clearLocalStore);

    if (localStorage.getItem("highscores") !== null) {
        // Create score list
        highScoreEl.innerHTML = `<ul></ul>`;
        var scoreList = document.querySelector("#highscore ul");
        playersScores = JSON.parse(localStorage.getItem("highscores"));
        // Put highest score at the top
        playersScores.sort(function(a,b){
            return a.split(" - ")[0] - b.split(' - ')[0];
        });
        for (let i = playersScores.length - 1; i >= 0; i--) {
            var li = document.createElement('li');
            li.id ="score-item";
            if (i%2===0){
                li.className="even-line";
            } else {
                li.className="odd-line";
            }
                
            li.innerHTML = `${playersScores[i]}`;
            scoreList.append(li);
        }
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
    playersScores = new Array;
    scoreBoard();
    return;
}


// Run game
gameSetup();