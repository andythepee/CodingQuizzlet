var score = 0;
var timerEl = document.getElementById('timer');
var timeLeft = 60;
var highScores = 0;
var quiz = [
  { 
    question: "Commonly used data types do not include:",
    choices: [
      "strings", 
      "booleans", 
      "alerts", 
      "numbers"],
    answer: 2
  },
  {
    question: "The condition in an if/else statement is enclosed within _____ .",
    choices: [
        "quotes", 
        "curly brackets", 
        "parenthesis", 
        "square brackets"],
    answer: 2
  },
  {
    question: "Arrays in JavaScript can be used to store _____",
    choices: [
      "numbers and strings", 
      "other arrays", 
      "booleans", 
      "all of the above"],
    answer: 3
  },
  {
    question: "String values must be enclosed within _____ when being assigned to variables:",
    choices: ["commas", 
    "curly brackets", 
    "quotes", 
    "parenthesis"],
    answer: 2
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", 
    "terminal/bash", 
    "for loops", 
    "console logs"],
    answer: 3
  }
];

var currentQuestion = 0;
var timeInterval;
var strt_screen = document.getElementsByClassName('container');
var startButton = document.getElementById('start-button');
startButton.addEventListener('click', startQuiz);

function startQuiz() {
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('quiz-screen').style.display = 'block';
  
  timeInterval = setInterval(function() {
    if (timeLeft > 0) {
      timerEl.textContent = timeLeft + ' seconds remaining';
      timeLeft--;
    } else {
      clearInterval(timeInterval);
      showScoreScreen();
    }
  }, 1000);
  
  showQuestion(currentQuestion);
}

function showQuestion(index) {
  var questionEl = document.getElementById('question');
  questionEl.textContent = quiz[index].question;
  
  var choicesEl = document.getElementById('choices');
  choicesEl.innerHTML = '';
  quiz[index].choices.forEach(function(choice, i) {
    var choiceEl = document.createElement('button');
    choiceEl.setAttribute('class', 'choice');
    choiceEl.setAttribute('value', i);
    choiceEl.textContent = choice;
    choiceEl.onclick = function() {
      if (parseInt(this.value) === quiz[index].answer) {
        score++;
        alert ("correct");
      } else {
        timeLeft -= 10;
        alert ("wrong");
      }
      currentQuestion++;
      if (currentQuestion < quiz.length) {
        showQuestion(currentQuestion);
      } else {
        showScoreScreen();
      }
    };
    choicesEl.appendChild(choiceEl);
  });
}
  
function showScoreScreen() {
  clearInterval(timeInterval);
  document.getElementById('quiz-screen').style.display = 'none';
  document.getElementById('high-score-screen').style.display = 'block';
  document.getElementById('final-score').textContent = score;
  
}

var highScores = [];

function savehighScores() {
  console.log('savehighScores');
  console.log(score);
  highScores.push(score);
  console.log(highScores);
  localStorage.setItem("highScores", JSON.stringify(highScores));
}
function reset(){
  submitScore.addEventListener('click', startQuiz);
}

 