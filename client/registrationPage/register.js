document.addEventListener("DOMContentLoaded", () => {
  const userEmail = localStorage.getItem("email");
  const usernameDisplay = document.querySelector("#username");
  const registerForm = document.getElementById("register-form");
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

  if (!registerForm) {
    console.error("Register form not found");
    return;
  }

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(registerForm);

    console.log("Raw FormData object:", formData);
    console.log("FormData Entries:", [...formData.entries()]); // Logs all key-value pairs
    console.log(
      "Converted to JSON:",
      JSON.stringify(Object.fromEntries(formData.entries()))
    );

    if (![...formData.entries()].length) {
      console.error(
        "FormData is empty! Ensure input `name` attributes are correct."
      );
      return;
    }

    const userDetails = {
      email: formData.get("email"),
      password: formData.get("password"),
      user_type: formData.get("user_type"),
    };

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(
        "https://project-alpha-89wj.onrender.com/register",
        options
      );
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
