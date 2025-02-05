document.addEventListener("DOMContentLoaded", () => {
    const userId = localStorage.getItem("email") || "Guest";
    document.querySelector(".user-id").textContent = `Hello, ${userId}`;
})