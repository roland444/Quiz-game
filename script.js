const _question = document.getElementById("question");
const _option = document.querySelectorAll("quiz-options");
const _correctScore = document.getElementById("correct-score");
const _totalQuestion = document.getElementById("total-question");

//let correctAnswer = "";
let correctScore = 0;
let askedCount = 0;
let totalQuestion = 10;

window.onload = function () {
    loadQuestion();
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
}

async function loadQuestion() {
    const APIUrl = "https://the-trivia-api.com/v2/questions";
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();
    showQuestion(data[0]);
}

function showQuestion(data) {
    let correctAnswer = data.correctAnswer;
    let incorrectAnswers = data.incorrectAnswers;
    let optionsList = incorrectAnswers;
    optionsList.splice(Math.floor(Math.random() * (incorrectAnswers.length + 1)), 0, correctAnswer);
    
    _question.innerHTML = `${data.question.text}`;
    _option.innerHTML = `
        ${optionsList.map((_option) => `
            <li><span>${_option}</span></li>
        `).join("")}
    `;
}

