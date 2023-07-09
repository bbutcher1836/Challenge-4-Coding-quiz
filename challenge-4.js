
const quizQuestions = [
  {
    question: "What does the DOM stand for in web development?",
    choices: [
      "Document Object Model",
      "Data Object Model",
      "Dynamic Ordinal Method",
      "Document Oriented Middleware"
    ],
    answer: 0
  },
  {
    question: "Which keyword is used to declare variables in JavaScript?",
    choices: ["let", "variable", "var", "const"],
    answer: 2
  },
  {
    question: "What is the result of the expression '3' + 2 in JavaScript?",
    choices: ["5", "32", "NaN", "7"],
    answer: 1
  },
  {
    question: "What does the 'this' keyword refer to in JavaScript?",
    choices: ["The current function", "The global object", "The previous object", "The current object"],
    answer: 3
  },
  {
    question: "Which array method is used to add elements to the end of an array?",
    choices: ["push()", "pop()", "shift()", "unshift()"],
    answer: 0
  },
  {
    question: "Which operator is used to compare the value and type of two variables in JavaScript?",
    choices: ["==", "===", "=", "!="],
    answer: 1
  },
  {
    question: "What is the purpose of the 'setTimeout()' function in JavaScript?",
    choices: [
      "To execute a function after a specified delay",
      "To set the interval between function executions",
      "To stop the execution of a function",
      "To execute a function immediately"
    ],
    answer: 0
  },
  {
    question: "Which method is used to remove the last element from an array in JavaScript?",
    choices: ["pop()", "push()", "shift()", "unshift()"],
    answer: 0
  },
  {
    question: "What is the output of the following code?\nconsole.log(typeof []);",
    choices: ["object", "array", "undefined", "string"],
    answer: 0
  },
  {
    question: "Which built-in method is used to return the length of a string in JavaScript?",
    choices: ["length()", "count()", "size()", "stringLength()"],
    answer: 0
  }
];

let currentQuestionIndex = 0;
let timeLeft = 60; 
let score = 0;
let timerInterval;

function startQuiz() {
  document.getElementById("start-button").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";


  timerInterval = setInterval(updateTimer, 1000);

  showQuestion();
}

function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];

  document.getElementById("question").textContent = currentQuestion.question;

  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = "";

  for (let i = 0; i < currentQuestion.choices.length; i++) {
    const choice = document.createElement("button");
    choice.textContent = currentQuestion.choices[i];
    choice.setAttribute("data-index", i);
    choice.addEventListener("click", handleAnswer);
    choicesContainer.appendChild(choice);
  }
}

function handleAnswer(event) {
  const selectedChoice = event.target;
  const selectedAnswerIndex = parseInt(selectedChoice.getAttribute("data-index"));
  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (selectedAnswerIndex === currentQuestion.answer) {
    score++;
  } else {
    timeLeft -= 10; 
  }

  currentQuestionIndex++;


  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function updateTimer() {
  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = timeLeft;

  if (timeLeft <= 0) {
    endQuiz();
  } else {
    timeLeft--;
  }
}

function endQuiz() {
  clearInterval(timerInterval);

  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";

  document.getElementById("final-score").textContent = score;

}
function displayHighScores() {

  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  highScores.sort((a, b) => b.score - a.score);
ß
  const highScoresContainer = document.getElementById("high-scores");
  highScoresContainer.innerHTML = "";

  for (const score of highScores) {
    const scoreItem = document.createElement("li");
    scoreItem.textContent = `${score.initials}: ${score.score}`;
    highScoresContainer.appendChild(scoreItem);
  }
}

document.getElementById("start-button").addEventListener("click", startQuiz);
