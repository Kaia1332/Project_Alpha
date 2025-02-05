document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");

    if (!registerForm) {
        console.error("Register form not found");
        return;
    }

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(registerForm);

        console.log("🚀 Raw FormData object:", formData);
        console.log("📩 FormData Entries:", [...formData.entries()]); // Logs all key-value pairs
        console.log("📌 Converted to JSON:", JSON.stringify(Object.fromEntries(formData.entries())));

        if (![...formData.entries()].length) {
            console.error("🚨 FormData is empty! Ensure input `name` attributes are correct.");
            return;
        }

        const userDetails = {
            email: formData.get("email"),
            password: formData.get("password"),
            user_type: formData.get("user_type")
        };

        const options = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userDetails)
        };

        try {
            const response = await fetch("http://localhost:3011/user/register", options);
            const data = await response.json();
            console.log("🔄 Response Status:", response.status);
            console.log("📬 Server Response:", data);

            if (response.ok) {
                alert("Registration successful!");
                console.log(data);
                window.location.assign("../loginPage/login.html"); // Redirect to login
            } else {
                alert(data.error || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Something went wrong. Please try again later.");
        }
    });
});
