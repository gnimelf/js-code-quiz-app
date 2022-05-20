// Setup Selectors
var questionText = document.querySelector('#question')
var choiceText = document.querySelector('#choices')
var timer = document.querySelector("#time");
var questionNumber = 0;
var timer = 60;
var gameStarted = false;
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
var question = quizContent.results[questionNumber].question;
var choices = quizContent.results[questionNumber].answers;
questionText.innerHTML = question;
choiceText.innerHTML = `<ul><li>${choices[0]}</li><li>${choices[1]}</li><li>${choices[2]}</li><li>${choices[3]}</li></ul>`
console.log(questionNumber);

choiceText.addEventListener("click", quizGame);

function quizGame(event) {
   
    // Store user choice

    questionNumber++;
    // Get next question and choices 
    if (questionNumber < quizContent.results.length) {

        question = quizContent.results[questionNumber].question;
        answers = quizContent.results[questionNumber].answers;
        questionText.innerHTML = question;
        choiceText.innerHTML = `<ul><li>${answers[0]}</li><li>${answers[1]}</li><li>${answers[2]}</li><li>${answers[3]}</li></ul>`
        console.log(event);
        questionNumber++;
    }

}
