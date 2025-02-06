document.addEventListener("DOMContentLoaded", () => {
  // const userId = localStorage.getItem("email") || "Guest";
  // document.querySelector(".user-id").textContent = `Welcome ${userId}`;

  const userEmail = localStorage.getItem("email");
  const usernameDisplay = document.querySelector("#username");
  const authButton = document.querySelector("#auth-btn");

  if (userEmail) {
    usernameDisplay.textContent = userEmail;
    authButton.textContent = "Log Out";

    authButton.removeEventListener("click", logout); 
    authButton.addEventListener("click", logout); 
  } else {
    usernameDisplay.textContent = "Guest";
    authButton.textContent = "Log In";

    authButton.removeEventListener("click", loginRedirect); 
    authButton.addEventListener("click", loginRedirect); 
  }

  const startGameButton = document.querySelector(".start-button");
  const quizLink = document.getElementById("quiz-link");

  startGameButton.addEventListener("click", () => {
    userLoggedIn();
  });

  quizLink.addEventListener("click", () => {
    userLoggedIn();
  });

});

function loginRedirect() {
  window.location.href = "../loginPage/login.html"; // Redirect to login page
}

function userLoggedIn() {
    const token = localStorage.getItem("token"); // Get the authentication token

    if (token) {
      console.log("User is logged in. Starting quiz...");
      window.location.assign("../quizPage/quiz.html"); // Start quiz
    } else {
      console.warn("User is not logged in. Redirecting to login page...");
      alert("You need to log in before starting the quiz.");
      window.location.assign("../loginPage/login.html"); // Redirect to login
    }
}

function logout() {
  console.log("Logging out...");
  localStorage.removeItem("token"); // Clear authentication token
  localStorage.removeItem("email")
  localStorage.removeItem("user_id")
  window.location.href = "home.html"; // Redirect to login page
}