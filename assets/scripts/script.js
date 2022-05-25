// Setup Selectors
var questionEl = document.querySelector('#question');
var choiceEl = document.querySelector('#choices');
var startEl = document.querySelector('#start');
var timerEl = document.querySelector("#time");
var gameFeedback = document.querySelector("#feedback");
var formEl = document.querySelector("#initials");
var submitEl = document.querySelector("#submit");
var highscoreEl = document.querySelector("#highscore");
var players = [];
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

// Event Listeners
startEl.addEventListener("click", startGame);
choiceEl.addEventListener("click", checkAnswer);
submitEl.addEventListener("click", addScore);

// Game Setup
function gameSetup() {
    questionEl.innerHTML = `<h1>Coding Quiz Challenge<h1>`;
    choiceEl.innerHTML = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds."
    gameFeedback.setAttribute("style", "Display: none");
    formEl.setAttribute("style", "Display: none");
    highscoreEl.setAttribute("style", "Display: none");
    // console.log(questionNumber);  
}

// Check user choice
function checkAnswer(event) {
    
    var correctAnswer = quizContent.results[questionNumber].correct_answer;
    var userChoice = event.target.innerHTML;
    console.log(userChoice);
    if (correctAnswer === userChoice) {
        score++;
        gameFeedback.setAttribute("style", "Display: inline");
        gameFeedback.innerHTML = "Correct!"
    } else {
        gameFeedback.setAttribute("style", "Display: inline");
        gameFeedback.innerHTML = "Wrong!"
    }
    questionNumber++;

    getNextQuestion();
    return;
}

// Start Game
function startGame() {
    // Change display
    startEl.setAttribute('style', "Display: None")

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
function gameOver(event) {   
    questionEl.innerHTML = `<h1>All Done!<h1>`;
    choiceEl.innerHTML = `Your score is: ${score}`;
    formEl.setAttribute("style", "Display: inline");
    gameFeedback.setAttribute("style", "Display: none");
    return;
}

// Grab scores from localstorage
function addScore(event) {
    event.preventDefault();

    // Change heading
    questionEl.innerHTML = `<h1>Highscores</h1>`;
    
    //get and parse highscores
    highscoreStore = JSON.parse(localStorage.getItem("highscores"));

    //check if the highscore value is empty
    if (highscoreStore !== null) {
        players = highscoreStore;
      }
    
    //Get value from input box
    var value = document.getElementById("inputClass").value;

    // push new entry to array
    players.push(value + " - " + score);

    // stringify array and add it to localstorage
    localStorage.setItem("highscores", JSON.stringify(players));
    scoreBoard();
    return;
}

// display highscore elements
function scoreBoard() {
    clearBoard();
    highscoreEl.setAttribute("style", "Display: block");
    
    highscoreEl.innerHTML = `<<ul></ul>`;
    var scoreList = document.querySelector("#highscore ul");
    for (let i = 0; i < players.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = `${players[i]}`
        scoreList.append(li);
    }
}

// Clear screen
function clearBoard() {
    formEl.setAttribute("style", "Display: none");
    gameFeedback.setAttribute("style", "Display: none");
    submitEl.setAttribute("style", "Display: none");
}

gameSetup();