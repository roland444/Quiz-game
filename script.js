const question = document.getElementById("question");
const option = document.querySelectorAll("quiz-options");

//let correctAnswer = "";
let correctScore = 0;
let askedCount = 0;
let totalQuestion = 10;



async function loadQuestion() {
    const APIUrl = "https://the-trivia-api.com/v2/questions";
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();
    console.log(data)
    showQuestion(data[0]);
}

function showQuestion(data) {
    let correctAnswer = data.correctAnswer;
    let incorrectAnswers = data.incorrectAnswers;
    let optionsList = incorrectAnswers;
    optionsList.splice(Math.floor(Math.random() * (incorrectAnswers.length + 1)), 0, correctAnswer);
    
    question.innerHTML = `${data.question.text}`;
    option.innerHTML = `
        ${optionsList.map((option) => `
            <li><span>${option}</span></li>
        `).join("")}
    `;
}

loadQuestion()