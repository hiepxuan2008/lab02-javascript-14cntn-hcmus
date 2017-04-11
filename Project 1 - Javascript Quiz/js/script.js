/**
 * Created by Mai Thanh Hiep on 4/9/2017.
 */
var score = 0;
var data = {
    "count": 5,
    "results": [{
        "question": "Inside which HTML element do we put the JavaScript?",
        "answers": ["<script>", "<javascript>", "<scripting>", "<js>"],
        "correct": "A"
    }, {
        "question": "Where js the correct place to insert a JavaScript?",
        "answers": ["The <body> section", "The <head> section", "Both the <head> section and the <body> section are correct"],
        "correct": "C"
    }, {
        "question": "What js the correct syntax for referring to an external script called \"xxx.js\"?",
        "answers": ["<script name=\"xxx.js\">", "<script src=\"xxx.js\">", "<script href=\"xxx.js\">"],
        "correct": "B"
    }, {
        "question": "How do you create a function in JavaScript?",
        "answers": ["function = myFunction()", "function:myFunction()", "function myFunction()"],
        "correct": "C"
    }, {
        "question": "How do you round the number 7.25, to the nearest integer?",
        "answers": ["Math.round(7.25)", "Math.rnd(7.25)", "round(7.25)", "rnd(7.25)"],
        "correct": "A"
    }]
};

function _append(parent, child) {
    parent.insertAdjacentHTML('beforeend', child);
}

String.prototype.toHtmlEntities = function() {
    return this.replace(/./gm, function(s) {
        return "&#" + s.charCodeAt(0) + ";";
    });
};


function loadQuiz() {
    var wrapper = document.getElementById('quiz-wrapper');
    _append(wrapper, '<h1>Welcome to Quiz</h1>');
    _append(wrapper, '<h2>Question: ' + data.count + '</h2>');
    _append(wrapper, '<button class="btnNext" onclick="nextQuiz(0)">Start Quiz</button>');
}

function checkAnswer(questIndex, answer) {
    var wrapper = document.getElementById('quiz-wrapper');
    var correct = data.results[questIndex].correct.toUpperCase();
    _append(wrapper, '<h3>Answer: ' + correct +'</h3>');
    if (correct == answer.toUpperCase()) {
        // do correct answer
		score++;
        _append(wrapper, '<button class="btnNext btnSuccess" onclick="nextQuiz(' + (questIndex+1) + ')">Continue</button>');
    } else {
        // do wrong answer
        _append(wrapper, '<button class="btnNext btnWrong" onclick="nextQuiz(' + (questIndex+1) + ')">Continue</button>');
    }
	var chooseButtons = document.getElementsByClassName('btnChoose');
    for (i = 0; i < chooseButtons.length; i++) {
        chooseButtons[i].disabled = true;
    }
}

function nextQuiz(questIndex) {
    var wrapper = document.getElementById('quiz-wrapper');
    if (questIndex === 0) {
        score = 0;
    } else if (questIndex == data.count) {
        showResult();
        return;
    }

    wrapper.innerHTML = '';

    var question = data.results[questIndex];
    var answers = question.answers;
    _append(wrapper, '<h2>Question: #' + (questIndex+1) + '</h2>')
    _append(wrapper, '<h4 class="score">Score: ' + score + '</h4>')
    _append(wrapper, '<p>' + question.question +'</p>')

    var ansLabel = ['A', 'B', 'C', 'D'];
    for (var i = 0; i < answers.length; i++) {
        _append(wrapper, '<h4>' + ansLabel[i] + '. ' + answers[i].toHtmlEntities() + '</h4>');
    }
    for (var i = 0; i < answers.length; i++) {
        _append(wrapper, '<button class="btnChoose" onclick="checkAnswer(' + questIndex + ', \'' + ansLabel[i] + '\')">' + ansLabel[i] + '</button>');
    }
}

function showResult() {
    var wrapper = document.getElementById('quiz-wrapper');
    wrapper.innerHTML = '';
    _append(wrapper, '<h1>Score: ' + score + '/' + data.count + '</h1>');
    _append(wrapper, '<h1>Score: ' + (score/data.count * 100) + '%</h1>');
    _append(wrapper, '<h3><a href="javascript:history.go(0)">Try Again</a></h3>');
}

window.onload = function () { loadQuiz() }