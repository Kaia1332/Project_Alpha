document.addEventListener("DOMContentLoaded", () => {
    
    const userId = localStorage.getItem("email");
    console.log(userId);
    document.querySelector(".user-id").textContent = `Welcome ${userId}`;
    
    const startGameButton = document.querySelector(".start-button");

    startGameButton.addEventListener("click", () => {
        
        window.location.assign("../quizPage/quiz.html");
        window.location.assign("../quizPage/quiz.html");
    });
});

