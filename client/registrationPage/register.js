// document.getElementById("register-form").addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const form = new FormData(e.target);

//     const options = {
//         method: "POST",
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             username: form.get("username"),
//             password: form.get("password"),
//             user_type: form.get("user_type")
//         })
//     }

//     const response = await fetch("http://localhost:3000/user/register", options);
//     const data = await response.json();

//     if (response.status == 201) {
//         window.location.assign("login.html");
//     } else {
//         alert(data.error);
//     }
// })

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");

    if (!registerForm) {
        console.error("Register form not found");
        return;
    }

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(registerForm);
        const userDetails = {
            email: formData.get("email"),
            password: formData.get("password"),
            user_type: formData.get("user_type")
        };

        // ✅ Store data in LocalStorage
        localStorage.setItem("registeredUser", JSON.stringify(userDetails));

        alert("User registered locally!");
        console.log("User stored in LocalStorage:", userDetails);
        
        // Redirect to login (optional)
        window.location.assign("login.html");
    });
});
