const API_URL = "http://localhost:3010/quiz"; // Your API base URL
let currentQuestionId = 1; // Start with the first question
let totalQuestions = 10; // Change this based on total questions available
let questionsanswered = 0;
let score = 0;
let index=0;
const quizContainer = document.querySelector(".quiz-container");
const optionsContainer = document.getElementById("options");
let userID=0;

function generateUniqueNumbers(count, max) {
    const numbers = new Set();
    while (numbers.size < count) {
        let num = Math.floor(Math.random() * (max - 1)) + 1; // Ensures 1 to 24
        numbers.add(num);
    }
    return Array.from(numbers);
}

const randomNumbers = generateUniqueNumbers(10, 25);
console.log(randomNumbers);



// Fetch a question by ID
async function loadQuestionById(questionId) {
    try {
        console.log(`Fetching question ID: ${randomNumbers[index]}`);
        const response = await fetch(`${API_URL}/${randomNumbers[index]}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received question:", data);

        if (data.question_id) {
            displayQuestion(data);
        } else {
            document.getElementById("question-container").innerHTML = "<h2>Quiz Complete!</h2>";
            document.getElementById("next-btn").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching quiz data:", error);
    }
}

// Display question
function displayQuestion(questionData) {
    document.getElementById("question-text").textContent = questionData.question;
    document.getElementById("question-count").textContent = `Question ${index+1} of ${totalQuestions}`;


    optionsContainer.innerHTML = ""; // Clear previous options

    ["A", "B", "C", "D"].forEach((option) => {
        const btn = document.createElement("button");
        btn.textContent = `${option}: ${questionData[`option_${option.toLowerCase()}`]}`; // Add A, B, C, D
        btn.onclick = () => checkAnswer(option, questionData.correct_answer);
        optionsContainer.appendChild(btn);
    });

    document.getElementById("next-btn").style.display = "none"; // Hide "Next" until an answer is selected
}

// Check if the selected answer is correct
function checkAnswer(selected, correct) {
    const resultMessage = document.getElementById("result-message");
    questionsanswered++;

    if (selected === correct) {
        score++
        resultMessage.textContent = "Correct!";
        resultMessage.style.color = "green";
        console.log(score);
    } else {
        console.log(score);
        resultMessage.textContent = `Incorrect! The correct answer was ${correct}`;
        resultMessage.style.color = "red";
    }

    // Disable buttons after answer is selected
    document.querySelectorAll("#options button").forEach(btn => btn.disabled = true);

    document.getElementById("next-btn").style.display = "block"; // Show "Next" button
}

// Move to the next question
function nextQuestion() {
    randomNumbers[index++];
    if (questionsanswered === totalQuestions) {
        const resultMessage = document.getElementById("result-message");
        document.getElementById("question-container").innerHTML = "<h2>Quiz Complete!</h2>";
        document.getElementById("question-container").innerHTML = `<h2>You Scored ${score} out of 10</h2>`;
        resultMessage.textContent = ''
        document.getElementById("question-count").textContent = '';
        document.querySelector("#next-btn").textContent = "Submit";
        // Add event listener to the button
        document.querySelector("#next-btn").addEventListener("click",postScore);

    } else {
        document.getElementById("result-message").textContent = ""; // Clear feedback message
        loadQuestionById(currentQuestionId);
    }
}

// Load the first question on page load
document.addEventListener("DOMContentLoaded", () => {
    loadQuestionById(currentQuestionId);
});


async function postScore(score) {
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userID,
            score: score
        })
    }

    const response = await fetch("http://localhost:3000/users/register", options);
    const data = await response.json();

    if (response.status == 201) {
        window.location.assign("login.html");
    } else {
        alert(data.error);
    }
}