const API_URL = "http://localhost:3000/quiz"; // Your API base URL
let currentQuestionId = 1; // Start with the first question
let totalQuestions = 10; // Change this based on total questions available

// Fetch a question by ID
async function loadQuestionById(questionId) {
    try {
        console.log(`Fetching question ID: ${questionId}`);
        const response = await fetch(`${API_URL}/${questionId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received question:", data);

        if (data.question_id) {
            displayQuestion(data.question_id);
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
    document.getElementById("question-difficulty").textContent = `Difficulty: ${questionData.difficulty_level}`;
    document.getElementById("question-count").textContent = `Question ${currentQuestionId} of ${totalQuestions}`;

    const optionsContainer = document.getElementById("options");
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

    if (selected === correct) {
        resultMessage.textContent = "Correct!";
        resultMessage.style.color = "green";
    } else {
        resultMessage.textContent = `Incorrect! The correct answer was ${correct}`;
        resultMessage.style.color = "red";
    }

    // Disable buttons after answer is selected
    document.querySelectorAll("#options button").forEach(btn => btn.disabled = true);

    document.getElementById("next-btn").style.display = "block"; // Show "Next" button
}

// Move to the next question
function nextQuestion() {
    currentQuestionId++;
    if (currentQuestionId > totalQuestions) {
        document.getElementById("question-container").innerHTML = "<h2>Quiz Complete!</h2>";
        document.getElementById("next-btn").style.display = "none";
    } else {
        document.getElementById("result-message").textContent = ""; // Clear feedback message
        loadQuestionById(currentQuestionId);
    }
}

// Load the first question on page load
document.addEventListener("DOMContentLoaded", () => {
    loadQuestionById(currentQuestionId);
});