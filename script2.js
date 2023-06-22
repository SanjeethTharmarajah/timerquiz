// define global variables
var scoresArray1 = [];
var initialsArray1 = [];

// displays quiz page
function goback(){
    window.location.href="index.html";
}

// loads the initial and score from local storage
function getScores(){
    var scoresAll = localStorage.getItem("scores");
    if(JSON.parse(scoresAll) != null){
      scoresArray1 = JSON.parse(scoresAll);
    }
}
  
// displays the high scores in page
function displayScores(){
    var scoresElement = document.querySelector("#scoresList");
    var ScoresArrray2 = [];
    getScores();
    for (var i=0; i<scoresArray1.length; i++) {
        ScoresArrray2[i] = "Initial: " + scoresArray1[i].initial.toUpperCase() + " ,  Score: " + scoresArray1[i].score;
        const scoresLi = document.createElement("li");
        scoresLi.textContent = ScoresArrray2[i];
        scoresElement.appendChild(scoresLi);
    }
    if(scoresArray1.length==0){
        const scoresLi = document.createElement("li");
        scoresLi.textContent = "No scores to show !";
        scoresElement.appendChild(scoresLi);
    }
}

// shows high score on page on page load
displayScores();
