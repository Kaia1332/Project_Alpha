document.addEventListener("DOMContentLoaded", () => {
    
    const startGameButton = document.querySelector(".start-button");

    startGameButton.addEventListener("click", () => {
        
        window.location.assign("../quizPage/quiz.html");
    });
});

