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
var endSCreen = document.querySelector("#endScreen");
var participantInitials = document.querySelector("#participant");
var result = [];
// startBtn.style.backgroundColor;

//functions for starting game and ending
var startQuiz = function () {
  startBtn.style.display = "block";
  getQuestions.style.display = "none";
  endSCreen.style.display = "none";
};

var endQuiz = function () {
  startBtn.style.display = "none";
  getQuestions.style.display = "none";
  endSCreen.style.display = "block";
};

var quizScreen = function () {
  startBtn.style.display = "none";
  getQuestions.style.display = "block";
  endSCreen.style.display = "none";
  //looping through questions
  for (var i = 0; i < questionsEl.length; i++) {
    var answerOption = document.createElement("p");
    answerOption.textContent = questionsEl[i].question;
    answerOption.classList.add("p5");
    getQuestions.appendChild(answerOption);

    //looping through objects answers
    var items = questionsEl[i].answers;
    for (const item in items) {
      var answerBtn = document.createElement("button");
      answerBtn.textContent = items[item];
      getQuestions.appendChild(answerBtn);

      //getQuestions.appendChild(lineBreak);
    }
  }
};

var endScreen = function () {
  startBtn.style.display = "none";
  getQuestions.style.display = "none";
  endSCreen.style.display = "block";
};
function init() {
  startQuiz();
}

startBtn.addEventListener("click", quizScreen);
getQuestions.addEventListener("click", endScreen);
