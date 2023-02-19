
//declaration of global variables, quiz array, q object. These are are going to enter different functions of the program.
var timer = 90;
var clearInterval;
var questionIndex = 0;
var activeCorrectAnswer = "";
var currentScore = 0;
var quiz = [];
var q1 = {};
var q2 = {};
var q3 = {};
var q4 = {};
var q5 = {};
var q6 = {};
var q7 = {};
var q8 = {};
q1.question = 'Q1';
q1.answers = ['A1','A2','A3','A4'];
q1.correctAnswer = 'A3';
quiz.push(q1);

q2.question = 'Q2';
q2.answers = ['AA1','AA2','AA3','AA4'];
q2.correctAnswer = 'AA4';
quiz.push(q2);

q3.question = 'Q3';
q3.answers = ['AAA1','AAA2','AAA3','AAA4'];
q3.correctAnswer = 'AAA1';
quiz.push(q3);

// var parentAnswers = document.getElementsByClassName("answers")[0];
// var children = parentAnswers.children;
// for(var x = 0; x< children.length; x++){
//     children[x].addEventListener("click",function(){evaluateAnswer(this);});
// }

//for loop in charge of adding event listener click button to each button of the multiple answers.
var answers = document.getElementsByClassName("answer");
for(var x = 0; x< answers.length; x++){
    answers[x].addEventListener("click",function(){evaluateAnswer(this);});
}

//Register click event to call persistScore function. 
document.querySelector("#btnSubmit").addEventListener("click", function(){persistScore()});
//.addEventListener("click", function(){alert("Hola");});

// q4.question = 'P4';
// q4.answers = ['','','','',''];
// q4.correctAnswer = '';
// quiz.push(q4);

// q5.question = '';
// q5.answers = ['','','','',''];
// q5.correctAnswer = '';
// quiz.push(q5);

// q6.question = '';
// q6.answers = ['','','','',''];
// q6.correctAnswer = '';
// quiz.push(q6);

// q7.question = '';
// q7.answers = ['','','','',''];
// q7.correctAnswer = '';
// quiz.push(q7);

// q8.question = '';
// q8.answers = ['','','','',''];
// q8.correctAnswer = '';
// quiz.push(q8);


//Quiz starts after reacting to the click of buttom by event listener click.
function startQuiz(){
    hideAll();
    var questionSection = document.querySelector("#divQuestions");
    questionSection.classList.remove("hidden");
    printNextQuestion();
    modifyTimer();
}
//printNextQuestion is in charge of invoking, filling and putting into play the q object and its three attributes; question, multiple asnwers and right answer.
function printNextQuestion(){
    if(questionIndex==quiz.length){
        //alert("GAME OVER");
        userRegister();
        //reStartQuiz();
    }else{
        //gets element on the array based on index parameter.
        var nextQuestion = quiz[questionIndex];
        questionIndex++;
        //get the question element and assign textContent with question attribute of the returned element of the array.
        var mySpan = document.querySelector("#spanQuestion");
        mySpan.textContent = nextQuestion.question;

        //get answers division to loop and assing answer to children.
        var answersArray = document.getElementsByClassName("answers");
        var answersElement = answersArray[0];
        var answers = answersElement.children;
        //loop to assign answers
        for(var x = 0; x<answers.length; x++){
            answers[x].textContent = nextQuestion.answers[x];
        }
        activeCorrectAnswer = nextQuestion.correctAnswer;
    }
}

//evaluate the multiple option answers against the right answer. Penalize the Quiz' user reducing by 10 seconds the timer if the answer is wrong.
function evaluateAnswer(caller){
    console.log(caller);
    var answer = caller.textContent;
    console.log(answer);
    if(activeCorrectAnswer == answer){
        // console.log("You rock");
        currentScore+=10;
    }else{
        // console.log("you suck");
        timer=timer-10;
    }
    printNextQuestion();
}

//restart Quiz.
function reStartQuiz(){
    hideAll();
    document.querySelector("#spanTimer").textContent = 00;
    var welcomSection = document.querySelector("#divWelcome");
    welcomSection.classList.remove("hidden");
    clearInterval()
    questionIndex = 0;
    activeCorrectAnswer = "";
    currentScore = 0;
    document.querySelector("#txtInitials").value = "";
    document.querySelector("#spanScore").textContent = "";
    var ul = document.querySelector("#ulScores");
    ul.textContent = "";
}

//register the user, clear the timer and initialize it in 90.
function userRegister(){
    hideAll();
    var divResults = document.querySelector("#divRegister");
    divResults.classList.remove("hidden");

    var score = document.querySelector("#spanScore");
    score.textContent = currentScore;

    clearInterval(refreshInterval);
    timer = 90;
}

//store the scores in the local store
function persistScore(){
    var users = [];
    var user = {};
    
    var existingUsers = JSON.parse(localStorage.getItem("usersScores"));
    console.log(existingUsers);
    if(existingUsers != null){
        users = existingUsers;
    }
    var initials = document.querySelector("#txtInitials").value;
    var score = document.querySelector("#spanScore").textContent;
    user.initials = initials;
    user.score = score;
    users.push(user);
    localStorage.setItem("usersScores",JSON.stringify(users));
    printScores();
}

//show scores organized from higher to lower by calling the organizeArray function.
function printScores(){
    hideAll();
    document.querySelector("#divResults").classList.remove("hidden");
    organizeArray();
}

//this function compares the objects of an array using the sort javascript method by organizing in descendent order the scores. 
//"the sort method allow us to sort arrays of objects by strings, integers, dates or any other custom property".
//when passes the parse JSON array of [userinitials, score], .score sets the element of the array to sort, in this case the score.
function organizeArray(){
    var newArray = [];
    var existingUsers = JSON.parse(localStorage.getItem("usersScores"));
    
    newArray = existingUsers.sort((p1,p2)=>(p1.score < p2.score)? 1 :(p1.score > p2.score) ? -1:0);

    for(var x = 0; x<existingUsers.length;x++){
        displayElement(newArray[x]);
    }
}

//append the users' initials and scores in a created on-the-fly html ul and li elements by javascript.
function displayElement(user){
    var ul = document.querySelector("#ulScores");
    var li = document.createElement("li");
    var mySpan = document.createElement("span");
    mySpan.textContent = user.initials + " - " + user.score;
    li.append(mySpan);
    ul.append(li);
}

//clear the users' initials and scores.
function clearLocalStorage(){
    localStorage.removeItem("usersScores");
    reStartQuiz();
}


//setup timer, and refresh it.
function modifyTimer(){
    refreshInterval = setInterval(function(){
        if(timer<1){
            printScores();
            clearInterval(refreshInterval);
        }
        timer--;
        document.querySelector("#spanTimer").textContent = timer;
    }, 1000);
}

//hidenAll function ensures that the only visible screen will be the one we are on. 
function hideAll(){
    document.querySelector("#divRegister").classList.add("hidden");
    document.querySelector("#divResults").classList.add("hidden");
    document.querySelector("#divWelcome").classList.add("hidden");
    document.querySelector("#divQuestions").classList.add("hidden");
}