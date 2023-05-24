const _question = document.getElementById("question");
const _options = document.querySelector(".quiz-options");
const _correctScore = document.getElementById("correct-score");
const _totalQuestion = document.getElementById("total-question");

let correctAnswer = "";
let correctScore = 0;
let askedCount = 0;
let totalQuestion = 10;


document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
})

async function loadQuestion() {
    const response = await fetch("https://the-trivia-api.com/v2/questions");
    const data = await response.json();
    showQuestion(data[0]);
}

function showQuestion(data) {
    let correctAnswer = data.correctAnswer;
    let incorrectAnswer = data.incorrectAnswers;
    let optionsList = incorrectAnswer;
    optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
    
    _question.innerHTML = `${data.question.text}`;
    _options.innerHTML = `
        ${optionsList.map((option) => `
            <li> <span> ${option} </span> </li>
        `).join("")}
    `;

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



