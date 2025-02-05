document.addEventListener("DOMContentLoaded", () => {
    const userId = localStorage.getItem("email") || "Guest";
    document.querySelector(".user-id").textContent = `Hello, ${userId}`;
})

function logout() {
    console.log("Logging out...");
    localStorage.removeItem("token"); // Clear authentication token
    localStorage.removeItem("email")
    localStorage.removeItem("user_id")
    window.location.href = "../loginPage/login.html"; // Redirect to login page
}