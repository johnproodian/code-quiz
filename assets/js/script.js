// get the time li to be able to add the text of current time to it in the timer function
var timerEl = document.getElementById('timer');
// get the start button to be able to listen to it being clicked below
var startButtonEl = document.getElementById('start-button');
// create an array of all the questions and answers for select from below
var qBank = [
    "This is the first question?", 
    "This is the 1-first answer.", 
    "This is the 1-second answer.",
    "This is the 1-third answer.",
    "-This is the 1-fourth answer.",
    "This is the second question?",
    "-This is the 2-first answer.",
    "This is the 2-second answer.",
    "This is the 2-third answer.",
    "This is the 2-fourth answer.",
    "This is the third question?", 
    "This is the 3-first answer.", 
    "-This is the 3-second answer.",
    "This is the 3-third answer.",
    "This is the 3-fourth answer.",
    "This is the fourth question?", 
    "This is the 4-first answer.", 
    "-This is the 4-second answer.",
    "This is the 4-third answer.",
    "This is the 4-fourth answer."
    // 4, 1, 2, 2
]

// starting score for the user
var  score = 0;

// define the timer function which will start the timer when the start button is clicked
var timer = function() {
    // start the timer at 75s and have it count down until it reads 0
    var timeLeft = 75;
    var timeInterval = setInterval(function() {
        timerEl.textContent = "Time: " + timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            timerEl.textContent = "Time: 0";
        }
        timeLeft = timeLeft - 1;
        
    }, 1000);
 
    // get the various elements that will be dynamically manipulated to go through the quiz
    var quizQuestionEl = document.getElementById('quiz-question');
    var PEl = document.getElementById('blank-p-element');
    var startBtnLiEl = document.getElementById('start-btn-li');
    // Do I need this main element?
    // var mainEl = document.getElementById('main');
    var answerOptionEl = document.getElementById('answer-options');
    
     
    // define function that removes original html and starts quiz (function)
    var startQuiz = function() {
        // function to dynamically remove the p element and original start button once the quiz starts
        var rmvPandBtnEls = function() {
            PEl.parentNode.removeChild(PEl);
            startBtnLiEl.parentNode.removeChild(startBtnLiEl);
        }   
        rmvPandBtnEls();

        var questionIndex = 0;
        var classPicker = 0;

        var quiz = function(a) {
            // dynamically add HTML elements and text that replaces that of the current elements
            // edit h1 to contain the question - 0, 0+5, 0+10, etc., items in the qBank array
            quizQuestionEl.textContent = qBank[a];
        
            // dynamically create and fill the first answer button - 0+1,0+6,0+11, etc.
            var answerLi1El = document.createElement("li");
            answerLi1El.className = 'option';
            var answerBtn1El = document.createElement("button");
            answerBtn1El.textContent = qBank[a + 1];
            answerLi1El.appendChild(answerBtn1El);
            answerOptionEl.appendChild(answerLi1El);

            // create and fill the second answer  - - 0+2,0+7,0+12, etc.
            var answerLi2El = document.createElement("li");
            answerLi2El.className = 'option'
            var answerBtn2El = document.createElement("button")
            answerBtn2El.textContent = qBank[a + 2];
            answerLi2El.appendChild(answerBtn2El);
            answerOptionEl.appendChild(answerLi2El);
        
            // create and fill the third answer button - 0+3,0+9,0+14, etc.
            var answerLi3El = document.createElement("li");
            answerLi3El.className = 'option';
            var answerBtn3El = document.createElement("button");
            answerBtn3El.textContent = qBank[a + 3];
            answerLi3El.appendChild(answerBtn3El);
            answerOptionEl.appendChild(answerLi3El);

            // create and fill the fourth answer button - 0+4,0+10,0+15, etc.
            var answerLi4El = document.createElement('li')
            answerLi4El.className = 'option';
            var answerBtn4El = document.createElement('button');
            answerBtn4El.textContent = qBank[a + 4];
            answerLi4El.appendChild(answerBtn4El);
            answerOptionEl.appendChild(answerLi4El);

            // assign 'correct' and 'wrong' classes to buttons of correct and wrong answers
            var classAssign = [4, 1, 2, 2];
            assignClassPicker = classAssign[classPicker];
            

            var assignClass = function(c) {
                if (c === 1) {
                    answerBtn1El.className = 'correct',
                    answerBtn2El.className = 'wrong',
                    answerBtn3El.className = 'wrong',
                    answerBtn4El.className = 'wrong'
                }
                else if (c === 2) {
                    answerBtn1El.className = 'wrong',
                    answerBtn2El.className = 'correct',
                    answerBtn3El.className = 'wrong',
                    answerBtn4El.className = 'wrong'
                }
                else if (c === 3) {
                    answerBtn1El.className = 'wrong',
                    answerBtn2El.className = 'wrong',
                    answerBtn3El.className = 'correct',
                    answerBtn4El.className = 'wrong'
                }
                else if (c === 4) {
                    answerBtn1El.className = 'wrong',
                    answerBtn2El.className = 'wrong',
                    answerBtn3El.className = 'wrong',
                    answerBtn4El.className = 'correct'
                }
            }

            assignClass(assignClassPicker); 
            
            
            // listen for the different 'clicks', adjust points or time based on right or wrong answers
            var correctBtn = document.querySelector('.correct');
            var incorrectBtns = document.querySelectorAll('.wrong');
            var incorrectBtnsArr = Array.from(incorrectBtns);
            questionIndex = questionIndex + 5;

            var rmvOldQ = function() {
                answerLi1El.parentNode.removeChild(answerLi1El);
                answerLi2El.parentNode.removeChild(answerLi2El);
                answerLi3El.parentNode.removeChild(answerLi3El);
                answerLi4El.parentNode.removeChild(answerLi4El)
            }

            correctBtn.addEventListener('click', function() {
                score = score + 5;
                rmvOldQ();
                classPicker = classPicker + 1;
                quiz(questionIndex);
                console.log("Score: " + score);
            })
            incorrectBtnsArr[0].addEventListener('click', function() {
                timeLeft = timeLeft - 15;
                rmvOldQ();
                classPicker = classPicker + 1;
                quiz(questionIndex);
                console.log("Score: " + score);
            })
            incorrectBtnsArr[1].addEventListener('click', function() {
                timeLeft = timeLeft - 15;
                rmvOldQ();
                classPicker = classPicker +1;
                quiz(questionIndex);
                console.log("Score: " + score);
            })
            incorrectBtnsArr[2].addEventListener('click', function() {
                timeLeft = timeLeft - 15;
                rmvOldQ();
                classPicker = classPicker +1;
                quiz(questionIndex);
                console.log("Score: " + score);
            })
        }
        quiz(questionIndex);
        
      
    }

    startQuiz();
}
    
startButtonEl.addEventListener("click", timer);

//==========

// So far, so good. 
// Classes change. Wooooo!

// Next:
    // Figure out local storage and adding a form that collects high scores and initials to store there.
    // Figure out end-game things: what happens when time runs out, when questions are done (how about a bonus for finishing early?)
    // Add the JS questions--maybe 10?
    




//===========

// ---

// var question;
// var ans1;
// var ans2;
// var ans3;
// var ans4;

// var qBank = [ 
//     {
//         question = "This is the first question?",
//         ans1 = "This is the first answer.",
//         ans2 ="This is the second answer.",
//         ans3 = "This is the third answer.",
//         ans4 = "This is the fourth question."
//     },
//     {
//         question: "This is the second question?",
//         ans1: "This is the first answer.",
//         ans2: "This is the second answer.",
//         ans3: "This is the third answer.",
//         ans4: "This is the fourth question."
//     },
//     {
//         question: "This is the third question?",
//         ans1: "This is the first answer.",
//         ans2: "This is the second answer.",
//         ans3: "This is the third answer.",
//         ans4: "This is the fourth question."
//     },
//     {
//         question: "This is the fourth question?",
//         ans1: "This is the first answer.",
//         ans2: "This is the second answer.",
//         ans3: "This is the third answer.",
//         ans4: "This is the fourth question."
//     }
    
// ]