// declares global variables
var totaltime = 75;
var timer2;
var timerElement = document.querySelector("#timerContainer");
var questionsElement = document.querySelector(".questionsContainer");
var response = document.querySelector("#responseContainer");
var nextQ;
var questioncount;
var gameover = false;
var gameisover2;
var score = 0;
var scoresArray1 = [];

// defines questions object
var questions = [
  {
    "Question": "What is the name of our planet ?",
    "A": "Mercury",
    "B": "Venus",
    "C": "Earth",
    "D": "Mars",
    "Answer": "C"
  },

  {
    "Question": "How many planets are there ?",
    "A": "9",
    "B": "8",
    "C": "11",
    "D": "13",
    "Answer": "B"
  },

  {
    "Question": "How many Sun does planet Earth have ?",
    "A": "1",
    "B": "2",
    "C": "3",
    "D": "4",
    "Answer": "A"
  },

  {
    "Question": "How many Moon does planet Earth have ?",
    "A": "1",
    "B": "2",
    "C": "3",
    "D": "4",
    "Answer": "A"
  },

  {
    "Question": "How many Hours in a Day ?",
    "A": "1",
    "B": "24",
    "C": "36",
    "D": "48",
    "Answer": "B"
  }

]

//sets default variables and begins game
function begin(){
    timerElement.setAttribute("class", "display-hide");
    questionsElement.innerHTML = 'You have 75 seconds to answer all questions. <br>If you answer a question wrong then 15 seconds will be deducted from your timer for each wrong answer.<br><br><center><button onclick="startQuiz()">Start Quiz</button></center>';
    response.removeAttribute("class", "display-show");
    response.setAttribute("class", "display-hide");
    getScores();
}

// displays high score page
function showHighScores(){
    window.location.href = "showhighscores.html";
}

// starts the quiz
function startQuiz(){
  timerElement.removeAttribute("class", "display-hide");
  timerElement.setAttribute("class", "display-show");
  response.removeAttribute("class", "display-show");
  response.setAttribute("class", "display-hide");
  questioncount = 0;
  displayQuestions(0);
  timer2 = setInterval(setGameTime, 1000);
  timerElement.textContent = 75;
}

// displays questions in page
function displayQuestions(QuestionIndex){
  if(QuestionIndex < questions.length){
      var tmpcnt = 0 ;
      questionsElement.innerHTML = questions[QuestionIndex].Question;
      for (var answers in questions[QuestionIndex]) {
          tmpcnt++;
          if(tmpcnt > 1 && tmpcnt < Object.keys(questions[QuestionIndex]).length){
              const btn = document.createElement("button");
              btn.textContent = answers + ": " + questions[QuestionIndex][answers];
              btn.setAttribute("data-values", answers);
              btn.addEventListener("click", (event)=>{checkAnswer(event, btn.dataset.values, QuestionIndex);});
              questionsElement.appendChild(btn);
          }
      }
  }
}

// checks to see answer is right or wrong
function checkAnswer(event2, answer1, QuestionIndex1){
    event2.stopPropagation();
    event2.preventDefault();
    if(answer1===questions[QuestionIndex1].Answer){
      response.removeAttribute("class", "display-hide");
      response.setAttribute("class", "display-show");
      response.innerHTML = '<font color="green">Correct !</font>';
      score++;
      nextQ = setTimeout(nextQuestion, 500);
    }
    else{
      response.removeAttribute("class", "display-hide");
      response.setAttribute("class", "display-show");
      response.innerHTML = '<font color="red">Wrong !</font>';
      nextQ = setTimeout(nextQuestion, 500);
      totaltime = totaltime - 15;
      if(totaltime < 0){
        totaltime = 0;
      }
    }
    
}

// displays next question when answer is clicked
function nextQuestion(){
  clearTimeout(nextQ);
  if(questioncount < questions.length){
    questioncount++;
    displayQuestions(questioncount);
    response.removeAttribute("class", "display-show");
    response.setAttribute("class", "display-hide");
  }
  if(questioncount >= questions.length && gameover === false){
    gameover = true;
    questionsElement.innerHTML = '<h1>Game is over !</h1><br>(Please, wait !)';
    response.removeAttribute("class", "display-show");
    response.setAttribute("class", "display-hide");
  }
}

// if game is over show the initial dialog
function gameIsOver(){
  clearTimeout(gameisover2);
  if(gameover===true){
    questionsElement.innerHTML = '<center><br><br>Your score is: ' + score + '/5<br><br><label for="initials">Enter your initial:</label><br><input type="text" id="initials" name="initials"><br><br><button onclick="goback()">Go Back</button> || <button onclick="setInitial()">OK</button>';
  }
}

// sets initial and score in local storage
function setInitial(){
    var initial1 = document.getElementById("initials").value;
    var storeScores;
    if(initial1 !== ""){
    
     var scoresObj = {
          "score" : score,
          "initial" : initial1
     };
     
      scoresArray1.push(scoresObj);
      scoresArray1.sort((a, b) => b.score - a.score)
      
      storeScores = JSON.stringify(scoresArray1);
      localStorage.setItem("scores", storeScores);
      
      window.location.href="showhighscores.html";
    }
    else {
      alert('Please, enter your initial !');
    }
}

// gets the initial and score from local storage
function getScores(){
  var scoresAll = localStorage.getItem("scores");
  if(JSON.parse(scoresAll) != null){
    scoresArray1 = JSON.parse(scoresAll);
  }
}

// displays startup page
function goback(){
  window.location.href="index.html";
}

// sets the timer for game
function setGameTime(){
  if(totaltime > 0 && gameover == false){
    totaltime--;
  }
  else {
    gameover = true;
    questionsElement.innerHTML = '<h1>Game is over !</h1><br>(Please, wait !)';
    response.removeAttribute("class", "display-show");
    response.setAttribute("class", "display-hide");
    gameisover2 = setTimeout(gameIsOver, 700);
    clearTimeout(timer2);
    
  }
  if(totaltime > 9){
      timerElement.textContent = totaltime;
  }
  else {
    timerElement.textContent = '0' + totaltime;
  }
}

// start the page
begin();  

