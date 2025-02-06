document.addEventListener("DOMContentLoaded", () => {
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


  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const form = new FormData(e.target);
  
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    };
  
    try {
      const response = await fetch("https://project-alpha-89wj.onrender.com/user/login", options);
      const data = await response.json();
      console.log(data);
  
      if (response.status == 200) {
        console.log(response);
        // store data in browser
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        localStorage.setItem("userId", data.user_id);
        // send user to quiz page
        window.location.assign("../quizPage/quiz.html");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please check your connection.");
    }
  });
});

function loginRedirect() {
  window.location.href = "../loginPage/login.html"; // Redirect to login page
}

function logout() {
  console.log("Logging out...");
  localStorage.removeItem("token"); // Clear authentication token
  localStorage.removeItem("email");
  localStorage.removeItem("userId");
  window.location.href = "home.html"; // Redirect to login page
}
