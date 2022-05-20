// Setup Selectors
var questionEl = document.querySelector('#question')
var choiceEl = document.querySelector('#choices')
var startEl = document.querySelector('#start')
var timerEl = document.querySelector("#time");
var questionNumber = 0;
var timer = 60;
var score = 0;
var gameStarted = true;
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
    questionEl.innerHTML = `<h1>Coding Quiz Challenge<h1>`;
    choiceEl.innerHTML = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds."
    console.log(questionNumber);
    
    // Event Listeners
    startEl.addEventListener("click", startGame);
    choiceEl.addEventListener("click", checkAnswer);

    // Check user choice
    function checkAnswer(event) {
        console.log(event);
        var correctAnswer = quizContent.results[questionNumber].correct_answer;        
        var userChoice = event.target.innerHTML;
        console.log(userChoice);
        if(correctAnswer === userChoice) {
            score++;
        }
        questionNumber++;

        getNextQuestion();
    }

    function getNextQuestion(){
     
        // Get question and choices 
        if (questionNumber < quizContent.results.length) {
            var question = quizContent.results[questionNumber].question;
            question = quizContent.results[questionNumber].question;
            answersList = quizContent.results[questionNumber].answers;
            questionEl.innerHTML = question;
            choiceEl.innerHTML = `<ul><li>${answersList[0]}</li><li>${answersList[1]}</li><li>${answersList[2]}</li><li>${answersList[3]}</li></ul>`
        } else {
            timer = 0;
            alert("Game Over");
        }
    }

    function startGame() {
        // Change display
        startEl.setAttribute('style',"Display: None")

        var timerInterval = setInterval(function() {
            timer--;
            timerEl.textContent = "Time: " + timer;
        
            if(timer === 0) {
              // Stops execution of action at set interval
              clearInterval(timerInterval);
              // Calls function to enter score
            //   sendMessage();
                alert("Time is up!")
            }
          }, 1000)

        getNextQuestion();
    }


