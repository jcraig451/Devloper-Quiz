// Initializing all elements in the DOM

var startScreen = document.getElementById("start-quiz-container");
var startBtn = document.getElementById("startbtn");
var quizScreen = document.getElementById("running-quiz-container");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var answerCheck = document.getElementById("popup-answer-key");
var resultScreen = document.getElementById("result-quiz-container");
var scoreDiv = document.getElementById("score");
var time = document.getElementById("timer");
var initialBtn = document.getElementById("intialbtn");
var leaderBtn = document.getElementById("leaderbtn");
var leaderList = document.getElementById("leaderboardList");
var nameEl = document.getElementById("initials");
var refreshBtn = document.getElementById("refreshbtn");

// initializing variables for the start
var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var timeCount = 75;
var penalty = 10;
var score = 0
var percentScore;

// function that cycles the questions, answers & choices
function cycleQuestion(){

    var q = questions[runningQuestion];
    question.innerHTML = "<h6>" + q.question + "</h6>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerText = q.choiceB;
    choiceC.innerText = q.choiceC;
    choiceD.innerText = q.choiceD;
}

// start quiz function;
startBtn.addEventListener('click', startQuiz)

function startQuiz(){
    startScreen.style.display = "none";
    runningQuestion = 0;
    cycleQuestion();   
    quizScreen.style.display = "block";
    gameTime();
    timeOFgame = setInterval(gameTime, 1000);
    $(".answer-btn").removeAttr("disabled");
    
}

// Set a quiz time counter

 function gameTime(){
     if(timeCount >= 0 ){
        time.innerHTML = "Time Remaining: " + timeCount;
        timeCount--;
     }else{
         timeCount = 0;
         resultsPage();
         clearInterval(timeOFgame);
     }
 }
// Check for correct answer
 function checkAnswer(answer){
     $(".answer-btn").prop("disabled", "disabled");
     //making correct answer prompts
     if( answer == questions[runningQuestion].correct){
         score++;
         answerCheck.innerText = "Correct";
     }else{
     // making incorrect answer prompts
        answerCheck.innerText = "Incorrect";
        if(answer !== questions[runningQuestion].correct){
            timeCount = timeCount-10;
        }  
     }
     // This function calls for a delay before prompting user next question
     setTimeout(function delayQuestion(){
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            cycleQuestion();
            $(".answer-btn").removeAttr("disabled");
            answerCheck.innerText = "";
        }else{
            (runningQuestion == lastQuestion)
            answerCheck.innerText = "";
            timeCount = 0;
            resultsPage();
        }
     }, 1000)};
     
// function that prompts the results page after time runs out or all questions are answered
function resultsPage(){
    resultScreen.style.display = "block";
    quizScreen.style.display = "none";
    percentScore = Math.round(100 * (score  / questions.length));
    scoreDiv.innerText = percentScore; 
}

// adds the players initials to the leaderbord list
var player = [""];

    initialBtn.addEventListener('click', leaderboard)
    function leaderboard(){
        var name = nameEl.value;
        var li = document.createElement("li");
        li.id = "user";
        var rank = player.length;
        li.className = "dropdown-item";
        li.innerHTML = "(" + rank + ")  " + "Name: " + name + ": " + "score  "+ percentScore + "%" ;
        player.push(name);
        leaderList.append(li);
// saving variables to local storage
        localStorage.setItem(name , percentScore);
    }
// refreshing to go back to start screen
    refreshBtn.addEventListener('click', refreshPage)
    function refreshPage(){
        timeCount = 75;
        resultScreen.style.display = "none";
        quizScreen.style.display = "none";
        startScreen.style.display = "block";
        
    }