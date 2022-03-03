var questionsEl = [
  {
    question: "How old is planet Earth? ",
    answers: [
      "4.5 billion years old",
      "3 million years old",
      "2022 years years old",
      "800.000 million years old",
    ],
    correct: 0,
  },
  {
    question: "How many continents are there in the world?",
    answers: ["3", "5", "7", "10"],
    correct: 2,
  } /*,
  {
    question: "What is the longest river in the world?",
    answers: {
      a: "Colorado",
      b: "Limpopo",
      c: "Amazon",
      d: "Nile",
    },
    correct: "d",
  },
  {
    question: "What is the largest ocean in the world?",
    answers: {
      a: "Pacific",
      b: "Atlantic",
      c: "Indian",
      d: "Antarctic",
    },
    correct: "a",
  },*/,
];

// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score
var startBtn = document.querySelector("#start-btn");
var getQuestions = document.querySelector("#question-area");
var endScreenEl = document.querySelector("#endScreen");
var participantInitials = document.querySelector("#participant");
var result = [];
var currentQuestion = 0;
//Timer
var timerEl = document.querySelector("#timer");
var secondsLeft = 10;
var timer;
// startBtn.style.backgroundColor;

//functions for starting game and ending
var startQuiz = function () {
  startBtn.style.display = "block";
  getQuestions.style.display = "none";
  endScreenEl.style.display = "none";
};

var endQuiz = function () {
  startBtn.style.display = "none";
  getQuestions.style.display = "none";
  endScreenEl.style.display = "block";
  clearInterval(timer);
  timerEl.innerHTML = "";
};

var quizScreen = function () {
  startBtn.style.display = "none";
  getQuestions.style.display = "block";
  endScreenEl.style.display = "none";
  printQuestion(currentQuestion);
  startTimer();
};

var answerClick = function (event) {
  if (event.target.matches("button")) {
    //console.log(event.target);
    //console.log(event.target.outerText);
    var selectedAnswer = questionsEl[currentQuestion].answers.indexOf(
      event.target.outerText
    );
    var correctAnswer = questionsEl[currentQuestion].correct;
    console.log("selected answer is: " + selectedAnswer);
    // grade
    // print correct or not and substract time if incorrect

    console.log("correct answer is: " + correctAnswer);
    var commentEl = document.querySelector("#comment");

    if (selectedAnswer != correctAnswer) {
      secondsLeft - 10;
      commentEl.append(" Wrong answer");

      // maybe substract any seconds ?
      // maybe print incorrect in the html element ?

      console.log("incorrect");
    } else {
      commentEl.append("Correct answer");
      // any html element I need to update ?
      console.log("correct");
    }

    currentQuestion++;
    getQuestions.innerHTML = "";

    if (currentQuestion < questionsEl.length) {
      printQuestion(currentQuestion);
    } else {
      endQuiz();
    }
  } /*else {
    endScreen();
  }*/
};

function printQuestion(questionIndex) {
  console.log("print question: " + questionIndex);
  var questionItem = questionsEl[questionIndex];
  var questionText = document.createElement("p");
  questionText.textContent = questionItem.question;
  questionText.classList.add("p5");
  getQuestions.appendChild(questionText);

  var answers = questionItem.answers;

  for (const answer in answers) {
    var answerBtn = document.createElement("button");
    answerBtn.textContent = answers[answer];
    answerBtn.addEventListener("click", answerClick);
    getQuestions.appendChild(answerBtn);
  }
}

/*var endScreen = function () {
  startBtn.style.display = "none";
  getQuestions.style.display = "none";
  endScreenEl.style.display = "block";
  clearInterval(timer);
};*/

function init() {
  startQuiz();
}

startBtn.addEventListener("click", quizScreen);
//getQuestions.addEventListener("click", endScreen);

/*var handleSubmit = function (event) {
  event.preventDefault();

  var storedValue = JSON.parse(localStorage.getItem("highScores")) || [];
  var updatedScores = storedValue.concat({
    score: score,
    initials: initialsInput.value,
  });
  localStorage.setItem("highScores", JSON.stringify(updatedScores));
};*/

var printTime = function () {
  timerEl.textContent = "Timer: " + secondsLeft;
};

var startTimer = function () {
  printTime();
  timer = setInterval(function () {
    secondsLeft--;
    printTime();
    if (secondsLeft === 0) {
      clearInterval(timer);
      timerEl.textContent = "Finitto";
    }
  }, 1000);
};

/*var setTimer = function () {
  printedSeconds();
  var countdown = function () {
    secondsLeft--;

    printedSeconds();

    if (secondsLeft === 0) {
      clearInterval(countdown);
      quizResult();
    }
  };
};*/

// var count = localStorage.getItem("count");
// counter.textContent = count;

// function quizResult() {
//   console.log("count");
// }

//endScreen.addEventListener("submit", handleSubmit);
init();
