
//declaration and initialization of global variables, quiz array and q object.
var timer = 90;
var clearInterval;
var questionIndex = 0;//variable to hold the current array index for  the questions been displayed.
var activeCorrectAnswer = "";//Variable that will hold the current correct answer for the questions been displayed.
var currentScore = 0;
var quiz = []; //quiz array is initialized.
var q1 = {}; //q object is initialized. It will have three attributes; question, multiple asnwers and right answer.
var q2 = {}; 
var q3 = {}; 
var q4 = {}; 
var q5 = {}; 

q1.question = 'What is Javascript?';
q1.answers = [
'1. Scripting language that enables you to create dynamically updating content.',
'2. First HTML, second CSS, Javascript is the third layer of standard web techologies.',
'3. Consist of some programming features that allow you to running code in response of certain events occurring on a web page.',
'4. All of the above.'];
q1.correctAnswer = '4. All of the above.';
quiz.push(q1);

q2.question = 'APIs are?';
q2.answers = [
'1. Application Programming Interfaces (APIs) provide only CSS with extra super powers to use.',
'2. APIs are ready-made sets of code built on top of client-side Javascript language.',
'3. APIs have nothing to do with a web page.',
'4. None of the above'];
q2.correctAnswer = '2. APIs are ready-made sets of code built on top of client-side Javascript language.';
quiz.push(q2);

q3.question = 'Primitive Data Types are?';
q3.answers = [
'1. There are 3 primitive data types: Function, arrays, objects.',
'2. There are 7 primitive data types: string, number, biginit, boolean, undefined, symbol, null.',
'3. Primitive Datatypes are immutable; that is, they cannot be altered.',
'4. 2 and 3.'];
q3.correctAnswer = '4. 2 and 3.';
quiz.push(q3);

q4.question = 'What is the Event interface in the DOM?';
q4.answers = [
'1. The change in the state of an object is known as an event.',
'2. Mouse events performed are click, mouseout, mousedown, mouseup, mousemove.',
'3. The event handler of the mouse event click is onclick.',
'4. All of the Above.'];
q4.correctAnswer = '4. All of the Above.';
quiz.push(q4);

q5.question = 'Variables in Javascript are?';
q5.answers = [
'1. Containers for storing data values.',
'2. Javascript is not case sensitive when declaring variables.',
'3. A variable can hold a Boolean that is an structure that allows you to store multiple values in a single reference.',
'4. Declaring variables in Javascript requires the data type.'];
q5.correctAnswer = '1. Containers for storing data values.';
quiz.push(q5);


//for loop in charge of adding event listener click button to each button of the multiple answers.
var answers = document.getElementsByClassName("answer");
for(var x = 0; x< answers.length; x++){
    answers[x].addEventListener("click",function(){evaluateAnswer(this);});
}

//Register click event to call persistScore function. 
document.querySelector("#btnSubmit").addEventListener("click", function(){persistScore()});
//.addEventListener("click", function(){alert("Hola");});


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
        console.log("this is the last timer: ", timer);
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
    console.log("THis is the caller: ", caller);
    var answer = caller.textContent;
    console.log(answer);
    if(activeCorrectAnswer == answer){
       
        currentScore+=10;
    }else{     

          timer=timer-10;         
          
        }
    printNextQuestion();
}

//restart Quiz.
function reStartQuiz(){
    hideAll();
    document.querySelector("#spanTimer").textContent = 90;
    var welcomSection = document.querySelector("#divWelcome");
    welcomSection.classList.remove("hidden");
    clearInterval()
    questionIndex = 0;
    activeCorrectAnswer = "";
    currentScore = 0;
    document.querySelector("#txtInitials").value = "";
    document.querySelector("#spanScore").textContent = "";
}

//register the user, clear the timer and initialize it in 90.
function userRegister(){
    hideAll();
    var divResults = document.querySelector("#divRegister");
    divResults.classList.remove("hidden");

    var score = document.querySelector("#spanScore");
    score.textContent = currentScore;

    clearInterval(refreshInterval);
    document.querySelector("#spanTimer").textContent = timer;
    timer = 90;
}

//in this function the users array and user object are created. The user attributes; user initials, and user score
//by JSON.stringify are stored in the local storage. If user did not enter the initials alert him/her to enter them. 
function persistScore(){
    var initials = document.querySelector("#txtInitials").value;
    if(initials != '')
    {
        var users = [];
        var user = {};
        var existingUsers = JSON.parse(localStorage.getItem("usersScores"));
        console.log(existingUsers);
        if(existingUsers != null){
            users = existingUsers;
        }
        var score = document.querySelector("#spanScore").textContent;
        user.initials = initials;
        user.score = score;
        users.push(user);
        localStorage.setItem("usersScores",JSON.stringify(users));
        printScores();
    }else{
        alert("Please enter your initials!"); //alert the user to enter the initials if the user missed to enter them.
    }
}

//show scores organized from higher to lower by calling the organizeArray function.
function printScores(){
    clearInterval(refreshInterval);
    timer = 90;
    document.querySelector("#spanTimer").textContent = timer;

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

    if(existingUsers != null)
    {
        newArray = existingUsers.sort((p1,p2)=>(p1.score < p2.score)? 1 :(p1.score > p2.score) ? -1:0);
    }
    document.querySelector("#ulScores").textContent = "";
    console.log("existingUsersArray: ", existingUsers);
    console.log("newArray: ", newArray);
    for(var x = 0; x<newArray.length;x++){
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
// function not used, to test only
// function showAll(){
//     document.querySelector("#divRegister").classList.remove("hidden");
//     document.querySelector("#divResults").classList.remove("hidden");
//     document.querySelector("#divWelcome").classList.remove("hidden");
//     document.querySelector("#divQuestions").classList.remove("hidden");
// }