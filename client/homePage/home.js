document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("email") || "Guest";
  console.log(userId);
  document.querySelector(".user-id").textContent = `Welcome ${userId}`;

  const startGameButton = document.querySelector(".start-button");
  const quizLink = document.getElementById("quiz-link");

  startGameButton.addEventListener("click", () => {
    userLoggedIn();
  });

  quizLink.addEventListener("click", () => {
    userLoggedIn();
  });

});

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