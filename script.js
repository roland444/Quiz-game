const _question = document.getElementById("question");
const _options = document.querySelector(".quiz-options");
const _correctScore = document.getElementById("correct-score");
const _totalQuestion = document.getElementById("total-questions");
const _checkBtn = document.getElementById("check-answer");
const _playAgainBtn = document.getElementById("play-again");
const _result = document.getElementById("result");

let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 10;

function eventListeners() {
    _checkBtn.addEventListener("click", checkAnswer);
    _playAgainBtn.addEventListener("click", restartQuiz);
}

document.addEventListener("DOMContentLoaded", function() {
    loadQuestion();
    eventListeners();
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
})

async function loadQuestion() {
    const response = await fetch("https://the-trivia-api.com/v2/questions");
    const data = await response.json();
    _result.innerHTML = "";
    showQuestion(data[0]);
}

function showQuestion(data) {
    _checkBtn.disabled = false;
    correctAnswer = data.correctAnswer;
    let incorrectAnswer = data.incorrectAnswers;
    let optionsList = incorrectAnswer;
    optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
    
    _question.innerHTML = `${data.question.text}`;
    _options.innerHTML = `
        ${optionsList.map((option) => `
            <li> <span> ${option} </span> </li>
        `).join("")}
    `;
    console.log(correctAnswer)
    selectOption();
    
}

function selectOption() {
    _options.querySelectorAll("li").forEach((option) => {
        option.addEventListener("click", () => {
            if (_options.querySelector(".selected")) {
                const activeOption = _options.querySelector(".selected");
                activeOption.classList.remove("selected");
            }
            option.classList.add("selected")
        })
    })
}

function checkAnswer() {
    _checkBtn.disabled = true;
    if (_options.querySelector(".selected")) {
        let selectedAnswer = _options.querySelector(".selected span").textContent;
        
        if (selectedAnswer.trim() == HTMLDecode(correctAnswer)) {
            correctScore++;
            _result.innerHTML = `<p><i class = "fas fa-check"></i>Correct answer!</p>`;
        } else {
            _result.innerHTML = `<p><i class = "fas fa-times"></i>Incorrect Answer :(</p> <small><b>Correct Answer: </b><span id= "correct-answer">${correctAnswer}</span></small>`;
        }
        checkCount();
    } else {
        _result.innerHTML = `<p><i class = "fas fa-question></i>Please select an option</p>`;
        _checkBtn.disabled = false;
    }
}

function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}

function checkCount() {
    askedCount++;
    setCount();
    if (correctScore == totalQuestion) {
        _result.innerHTML = `<p> Your score is ${correctScore}. </p>`;
        _playAgainBtn.style.display = "block";
        _checkBtn.style.display = "none";
    } else {
        setTimeout(() => {
            loadQuestion();
        }, 1500);
    }
}
function setCount() {
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
}

function restartQuiz() {
    correctScore = askedCount = 0;
    _playAgainBtn.style.display = "none";
    _checkBtn.style.display = "block";
    _checkBtn.disabled = false;
    setCount();
    loadQuestion();
}





