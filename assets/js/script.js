//question list
var questions = [
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
  },
  {
    question: "What is the longest river in the world?",
    answers: ["Colorado", "Limpopo", "Amazon", "Nile"],
    correct: 3,
  },
  {
    question: "What is the largest ocean in the world?",
    answers: ["Pacific", "Atlantic", "Indian", "Antarctic"],
    correct: 0,
  },
];

var startBtnEl = document.querySelector("#start-btn");
var getQuestionsEl = document.querySelector("#question-area");
var endScreenEl = document.querySelector("#endScreen");
var initialsEL = document.querySelector("#initials");
var highscoresEl = document.querySelector("#highscores");
var goBackEl = document.querySelector("#goBack");
var clearScoresEl = document.querySelector("#clearScores");
var result = [];
var currentQuestion = 0;
//Timer variables
var timerEl = document.querySelector("#timer");
var secondsLeft = 90;
var clearComment;
var scoreArray = [];
var secondsPenalty = 10;
var resultEl = document.querySelector("#result");

//functions for starting game and ending
var startQuiz = function () {
  startBtnEl.style.display = "block";
  getQuestionsEl.style.display = "none";
  endScreenEl.style.display = "none";
  highscoresEl.style.display = "none";
};

var endQuiz = function () {
  startBtnEl.style.display = "none";
  getQuestionsEl.style.display = "none";
  endScreenEl.style.display = "block";
  highscoresEl.style.display = "none";
  clearInterval(timer);
  timerEl.innerHTML = "";
  resultEl.textContent = "Your score is: " + secondsLeft;
};

var quizScreen = function () {
  startBtnEl.style.display = "none";
  getQuestionsEl.style.display = "block";
  endScreenEl.style.display = "none";
  endScreenEl.style.display = "none";
  currentQuestion = 0;
  secondsLeft = 90;
  getQuestionsEl.innerHTML = "";
  printQuestion(currentQuestion);
  startTimer();
};

var highscoresScreen = function () {
  startBtnEl.style.display = "none";
  getQuestionsEl.style.display = "none";
  endScreenEl.style.display = "none";
  highscoresEl.style.display = "block";
};
//function for when an answer button is clicked
var answerClick = function (event) {
  if (event.target.matches("button")) {
    var selectedAnswer = questions[currentQuestion].answers.indexOf(
      event.target.outerText
    );
    var correctAnswer = questions[currentQuestion].correct;
    //console.log("selected answer is: " + selectedAnswer);
    //console.log("correct answer is: " + correctAnswer);
    //comparing wrong with correct
    var commentEl = document.querySelector("#comment");
    if (selectedAnswer != correctAnswer) {
      commentEl.textContent = "Wrong answer";

      if (secondsLeft <= secondsPenalty) {
        commentEl.textContent = "";
        secondsLeft = 0;
        endQuiz();
        return;
      } else {
        secondsLeft -= 10;
      }
      console.log("incorrect");
    } else {
      commentEl.textContent = "Correct answer";
      console.log("correct");
    }

    clearTimeout(clearComment);

    clearComment = setTimeout(function () {
      commentEl.textContent = "";
    }, 500);

    currentQuestion++;
    getQuestionsEl.innerHTML = "";
    if (currentQuestion < questions.length) {
      printQuestion(currentQuestion);
    } else {
      endQuiz();
    }
  }
};

//print question at given index
function printQuestion(questionIndex) {
  //console.log("print question: " + questionIndex);
  var questionItem = questions[questionIndex];
  var questionText = document.createElement("p");
  questionText.textContent = questionItem.question;
  questionText.classList.add("p5");
  getQuestionsEl.appendChild(questionText);

  var answers = questionItem.answers;

  for (const answer in answers) {
    var answerBtn = document.createElement("button");
    answerBtn.textContent = answers[answer];
    answerBtn.addEventListener("click", answerClick);
    getQuestionsEl.appendChild(answerBtn);
  }
}

function init() {
  startQuiz();
}

startBtnEl.addEventListener("click", quizScreen);

var handleSubmit = function (event) {
  event.preventDefault();
  var userInitials = initialsEL.value;
  var storedScores = JSON.parse(localStorage.getItem("highScores")) || [];
  var updatedScores = storedScores.concat({
    initials: userInitials,
    score: secondsLeft,
  });
  localStorage.setItem("highScores", JSON.stringify(updatedScores));

  var scoresRecordEl = document.querySelector("#scoresRecord");
  var scoresList = document.createElement("ol");

  for (var i = 0; i < updatedScores.length; i++) {
    var listItem = document.createElement("li");
    listItem.textContent =
      updatedScores[i].initials + " - " + updatedScores[i].score;
    scoresList.appendChild(listItem);
  }
  scoresRecordEl.innerHTML = "";
  scoresRecordEl.appendChild(scoresList);

  //scoresRecordEl.textContent = "Your high score is: " + secondsLeft;
  highscoresScreen();
};

var submitBtnEl = document.querySelector("#submit");
submitBtnEl.addEventListener("click", handleSubmit);

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
      timerEl.textContent = "All done!";
    }
  }, 1000);
};

goBackEl.addEventListener("click", startQuiz);
clearScoresEl.addEventListener("click", function () {
  var emptyArray = [];
  localStorage.setItem("highScores", JSON.stringify(emptyArray));
  var scoresRecordEl = document.querySelector("#scoresRecord");
  scoresRecordEl.textContent = "";
});

init();
