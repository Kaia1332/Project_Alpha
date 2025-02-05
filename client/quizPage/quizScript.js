const API_URL = "http://localhost:3012/quiz"; // Your API base URL
let currentQuestionId = 1; // Start with the first question
let totalQuestions = 10; // Change this based on total questions available
let questionsanswered = 0;
let score = 0;
let index=0;
const quizContainer = document.querySelector(".quiz-container");
const optionsContainer = document.getElementById("options");
let userID= localStorage.getItem("userId");
let incorrectCategories = [];

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

        const options = {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          };

        const response = await fetch(`${API_URL}/${randomNumbers[index]}`, options);

        if (response.status == 200) {
            const data = await response.json();
            console.log("Received question:", data);
            console.log(response);
            if (data.question_id) {
                displayQuestion(data);
            } else {
                document.getElementById("question-container").innerHTML = "<h2>Quiz Complete!</h2>";
                document.getElementById("next-btn").style.display = "none";
            }
        } else {
            window.location.assign("../loginPage/login.html");
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
        btn.onclick = () => checkAnswer(option, questionData.correct_answer, questionData.category);
        optionsContainer.appendChild(btn);
    });

    document.getElementById("next-btn").style.display = "none"; // Hide "Next" until an answer is selected
}

// Check if the selected answer is correct
function checkAnswer(selected, correct,category) {
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
        incorrectCategories.push(category);
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

        const uniqueIncorrectCategories = [...new Set(incorrectCategories)];
        if(uniqueIncorrectCategories.length>0){
            document.getElementById("question-container").innerHTML += `
                <div class="catsStruggled">
                    <h2>Categories you struggled with:</h2>
                    <ul>${uniqueIncorrectCategories.map(category => `<li>${category}</li>`).join('')}</ul>
                </div>`;
        }

        resultMessage.textContent = ''
        document.getElementById("question-count").textContent = '';
        document.querySelector("#next-btn").textContent = "Submit";
        document.querySelector("#next-btn").addEventListener("click",postScore);

    } else {
        document.getElementById("result-message").textContent = ""; 
        loadQuestionById(currentQuestionId);
    }
}

// Load the first question on page load
document.addEventListener("DOMContentLoaded", () => {
    loadQuestionById(currentQuestionId);
});


async function postScore() {
    let newArr=[...new Set(incorrectCategories)]
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userID,
            score: score,
            incorrect_categories: newArr
        })
    }

    const response = await fetch("http://localhost:3012/user_response", options);
    const data = await response.json();

    if (response.status == 201) {
        window.location.assign("../homePage/home.html");
    } else {
        alert(data.error);
    }
}

function logout() {
    console.log("Logging out...");
    localStorage.removeItem("token"); // Clear authentication token
    window.location.href = "../loginPage/login.html"; // Redirect to login page
}