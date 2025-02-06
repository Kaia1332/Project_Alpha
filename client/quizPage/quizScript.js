const API_URL = "https://project-alpha-89wj.onrender.com/quiz"; // Your API base URL
let currentQuestionId = 1; // Start with the first question
let totalQuestions = 10; // Change this based on total questions available
let questionsanswered = 0;
let score = 0;
let index=0;
const quizContainer = document.querySelector(".quiz-container");
const optionsContainer = document.getElementById("options");
let userID= localStorage.getItem("userId");
let incorrectCategories = [];
const userName = localStorage.getItem("email") || "Guest";

function generateUniqueNumbers(count, max) {
    const numbers = new Set();
    while (numbers.size < count) {
        let num = Math.floor(Math.random() * (max - 1)) + 1; // Ensures 1 to 24
        numbers.add(num);
    }
    return Array.from(numbers);
}

const randomNumbers = generateUniqueNumbers(10, 55); //CHANGE NUMBER OF QUESTIONS HERE
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

        //CLG HIT
        console.log('RESPONSE STATUS HIT: ' + response)
        
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
    document.getElementById("question-difficulty").textContent = `Difficulty: ${questionData.difficulty_level}`;

    optionsContainer.innerHTML = ""; // Clear previous options

    ["A", "B", "C", "D"].forEach((option) => {
        const btn = document.createElement("button");
        btn.textContent = `${option}: ${questionData[`option_${option.toLowerCase()}`]}`; // Add A, B, C, D
        btn.onclick = () => checkAnswer(option, questionData.correct_answer, questionData.category);
        optionsContainer.appendChild(btn);
    });

    document.getElementById("next-btn").style.display = "none"; // Hide "Next" until an answer is selected
}


// // COLOURING DIFFICULTY FUNCTION ----------------
// function updateDifficultyColor() {
//   const difficultyElement = document.getElementById("difficulty");

//   if (difficultyElement) {
//     const difficultyText = difficultyElement.innerText.trim(); // Get text and remove spaces

//     // Remove any previously applied difficulty class
//     difficultyElement.classList.remove("easy", "medium", "hard");

//     // Assign class based on difficulty
//     if (difficultyText === "Easy") {
//       difficultyElement.classList.add("easy");
//     } else if (difficultyText === "Medium") {
//       difficultyElement.classList.add("medium");
//     } else if (difficultyText === "Hard") {
//       difficultyElement.classList.add("hard");
//     }
//   }
// }

// // Ensure color is applied on initial page load
// document.addEventListener("DOMContentLoaded", updateDifficultyColor);

// // Ensure color is updated every time a new question loads
// function loadQuestion(questionData) {
//   document.getElementById("question-text").innerText = questionData.question;
//   document.getElementById("difficulty").innerText = questionData.difficulty;

//   updateDifficultyColor(); // Apply the correct color dynamically
// }

// // END OF COLOURING DIFFICULTY LEVEL -------------------------



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
        document.getElementById("question-container").innerHTML = `<h2>Quiz Complete!</h2>
                                                                 <h2>You Scored ${score} out of 10</h2>`;

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
    // document.querySelector(".user-id").textContent = `Hello, ${userName}`;
    const userEmail = localStorage.getItem("email");
    const usernameDisplay = document.querySelector("#username");
    const authButton = document.querySelector("#auth-btn");
  
    if (userEmail) {
      usernameDisplay.textContent = userEmail;
      authButton.textContent = "Log Out";
  
      authButton.removeEventListener("click", logout); // Ensure no duplicate listeners
      authButton.addEventListener("click", logout); //  Attach logout function
    } else {
      usernameDisplay.textContent = "Guest";
      authButton.textContent = "Log In";
  
      authButton.removeEventListener("click", loginRedirect); //  Ensure no duplicate listeners
      authButton.addEventListener("click", loginRedirect); //  Attach login function
    }

    loadQuestionById(currentQuestionId);
});

function loginRedirect() {
    window.location.href = "../loginPage/login.html"; // Redirect to login page
  }

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

    const response = await fetch("https://project-alpha-89wj.onrender.com/user_response", options);
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
    localStorage.removeItem("email")
    localStorage.removeItem("userId")
    window.location.href = "../loginPage/login.html"; // Redirect to login page
}
