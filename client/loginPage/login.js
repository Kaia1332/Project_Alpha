document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: form.get("email"),
            password: form.get("password")
        })
    }

    try {

    const response = await fetch("http://localhost:3000/user/login", options);
    const data = await response.json();
    console.log(data);

    if (response.status == 200) {
        console.log(response);
        // store data in browser
        localStorage.setItem("token", data.token);
        // send user to quiz page
        window.location.assign("../quizPage/quiz.html");
      } else {
        alert(data.error);
      }

    } catch (error) {
        console.error("Network error:", error);
        alert("Network error. Please check your connection.");
    }

})

