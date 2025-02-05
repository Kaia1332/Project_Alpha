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

    const response = await fetch("http://localhost:3011/user/login", options);
    const data = await response.json();
    console.log(data);


    if (response.status == 200) {
        console.log(response);
        // store data in browser
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("email",data.email)
        localStorage.setItem("userId", data.user_id);
        // send user to quiz page
        window.location.assign("../homePage/home.html");
      } else {
        alert(data.error);
      }

    } catch (error) {
        console.error("Network error:", error);
        alert("Network error. Please check your connection.");
    }

})

