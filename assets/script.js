console.log("quiz time")

var startButtonHtml = document.getElementById("startButton");
var quizContainerHtml = document.getElementById("quizContainer");
var timerContainerHtml = document.getElementById("timerContainer");
var quizQuestionHtml = document.getElementById("quizQuestion");
var quizAnswerHtml = document.getElementById("quizAnswer");
var firstOption = document.getElementById("firstOption");
var secondOption = document.getElementById("secondOption");
var thirdOption = document.getElementById("thirdOption");
var fourthOption = document.getElementById("fourthOption");
var timeCount = document.getElementById("timerCount");
var saveScoreBtn = document.getElementById("saveScore");
var initialsInput = document.getElementById("initials");
var scoreboardList = document.getElementById("scoreboard");
var highscoreSection = document.getElementById("highscore");
var deleteScoreBtn = document.getElementById("deleteHighScores");
var scoreInput = document.getElementById("scoreInput");
var highscoreList =  [];

if(localStorage.getItem("Highscore")){
   var highscoreList = JSON.parse(localStorage.getItem("Highscore"))
}else {
    var highscoreList =  []
}
var timeLeft = 60;

var questionAnswerArray = [questionWWtwo1, questionWWtwo2, questionWWtwo3, questionWWtwo4];
var i = 0

var questionWWtwo1 = {
    question: "The attack on Pearl Harbor occured on this date",
    answerA: "December 7th, 1941",
    answerB: "June 4th, 1942",
    answerC: "June 6th, 1944",
    answerD: "August 9th, 1945"
};

var questionWWtwo2 = {
    question: "Which of these countries was not one of the Axis countries?",
    answerA: "Germany",
    answerB: "Italy",
    answerC: "Japan",
    answerD: "Soviet Union"
};

var questionWWtwo3 = {
    question: "What was the code name for the Allied invasion of Normandy?",
    answerA: "V-E Day",
    answerB: "V-J Day",
    answerC: "Overlord",
    answerD: "French Resistance"
};

var questionWWtwo4 = {
    question: "In which year did World War II end?",
    answerA: "1945",
    answerB: "1939",
    answerC: "1918",
    answerD: "1975"
};
var finalScore = 100;
var timeLeft = 55;

// array of objects with questions/answers
var questionAnswerArray = [
    questionWWtwo1,
    questionWWtwo2,
    questionWWtwo3,
    questionWWtwo4,
];
// correct answers
var correctAnswerArray = [
    questionAnswerArray[0].answerA,
    questionAnswerArray[1].answerD,
    questionAnswerArray[2].answerC,
    questionAnswerArray[3].answerA,
];

function startQuiz() {
    quizContainerHtml.setAttribute("class", "");
    timerContainerHtml.setAttribute("class", "");
    i = 0;
    questionShows()
    timeLeft = 60;
    startTime();
    highscoreSection.classList.add("hidden");
    scoreInput.classList.add("hidden");
}

function endGame() {
    alert("Sorry.. Better luck next time.")
}

function startTime() {
    var timerInterval = setInterval(function () {
        timeLeft--
        timeCount.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame()
            clearInterval(timerInterval)
        }
        if (i >= questionAnswerArray.length) {
            clearInterval(timerInterval)
            alert("You've done it!")
            quizContainerHtml.setAttribute("class", "hidden");
            timerContainerHtml.setAttribute("class", "hidden");
            document.getElementById("scoreInput").setAttribute("class", "")
            scoreInput.style.visibility = "visible"
            saveScoreBtn.style.visibility = "visible"
        }
    }, 1000);
}

function questionShows() {
    console.log(i)
    quizQuestionHtml.textContent = questionAnswerArray[i].question;
    firstOption.textContent = questionAnswerArray[i].answerA;
    secondOption.textContent = questionAnswerArray[i].answerB;
    thirdOption.textContent = questionAnswerArray[i].answerC;
    fourthOption.textContent = questionAnswerArray[i].answerD;
}

function checkAnswer(event) {
    console.log(this.textContent)
    if (correctAnswerArray[i] == this.textContent) {
        console.log("Correct!")
    } else {
        console.log("Wrong!");
        timeLeft = timeLeft - 5;
        return;
    }
    i++;
    if (i < questionAnswerArray.length) {
        questionShows()
    }
}

function saveToLocalStorage() {
    var score = timeLeft + " - " + initialsInput.value
    highscoreList.push(score)
    localStorage.setItem("Highscore", JSON.stringify(highscoreList))

    showUpdatedScores()

}

function showUpdatedScores() {
    console.log(highscoreList.sort(function(a, b) {
        return parseInt(b) - parseInt(a)
    }))

    scoreboard()
}

function scoreboard(){
    highscoreSection.classList.remove("hidden")
    scoreboardList.style.visibility = "visible"

    for(var i=0;i<highscoreList.length;i++){
        var listItem=document.createElement("li");
        listItem.textContent=highscoreList[i];
        scoreboardList.appendChild(listItem)
    }
        saveScoreBtn.style.visibility = "hidden";
        scoreInput.style.visibility = "hidden";
}

function clearHighScores(){
    highscoreList =  [];
    localStorage.setItem("Highscore", JSON.stringify(highscoreList));
    scoreboardList.style.visibility = "hidden";
    scoreboardList.innerHTML = "";
}


startButtonHtml.addEventListener("click", startQuiz)
firstOption.addEventListener("click", checkAnswer)
secondOption.addEventListener("click", checkAnswer)
thirdOption.addEventListener("click", checkAnswer)
fourthOption.addEventListener("click", checkAnswer)

//saveScore stuff
saveScoreBtn.addEventListener("click", saveToLocalStorage)
deleteScoreBtn.addEventListener("click", clearHighScores)

