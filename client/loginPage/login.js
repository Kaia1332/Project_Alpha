document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("inside login form listener" + e);
    console.dir(e);
    const form = new FormData(e.target);
    console.log("FormData raw object:", form); // Not directly readable
    console.log("FormData Entries:", [...form.entries()]); // Converts to array for readability
    console.log("FormData JSON:", JSON.stringify(Object.fromEntries(form.entries())));

    console.log(" form " + form);
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


    // try {
    //     console.log("Sending login request...");
    //     const response = await fetch("http://localhost:3000/user/login", options);

    //     if (!response.ok) {
    //         const errorData = await response.json();
    //         console.error("Login failed:", errorData);
    //         alert(`Error: ${errorData.error}`);
    //         return;
    //     }

    //     const data = await response.json();
    //     console.log("Login successful:", data);
    //     localStorage.setItem("token", data.token);
    //     // window.location.assign("quiz.html"); // Redirect after login

    // } catch (error) {
    //     console.error("Network error:", error);
    //     alert("Network error. Please check your connection.");
    // }


})