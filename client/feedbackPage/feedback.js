document.addEventListener("DOMContentLoaded", () => {
    const userId = localStorage.getItem("email") || "Guest";
    document.querySelector(".user-id").textContent = `Hello, ${userId}`;

    loadLeaderboard();
})

async function loadLeaderboard() {
    try {
        const response = await fetch("http://localhost:3000/user_responses");
        if (!response.ok) throw new Error("Failed to fetch leaderboard data.");

        const userResponses = await response.json();
        console.log("📊 Leaderboard data:", userResponses);

        const leaderboardTable = document.querySelector(".leaderboard tbody");

        // Clear existing table rows (except the header)
        leaderboardTable.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Score</th>
            </tr>
        `;

        // Populate table with fetched user responses
        userResponses.sort((a, b) => b.score - a.score).forEach(user => {
            const row = `
                <tr>
                    <td>${user.email}</td>
                    <td>${user.score}</td>
                </tr>
            `;
            leaderboardTable.insertAdjacentHTML("beforeend", row);
        });

    } catch (error) {
        console.error("Error loading leaderboard:", error);
    }
}






function logout() {
    console.log("Logging out...");
    localStorage.removeItem("token"); // Clear authentication token
    localStorage.removeItem("email")
    localStorage.removeItem("user_id")
    window.location.href = "../loginPage/login.html"; // Redirect to login page
}

