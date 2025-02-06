const userId = localStorage.getItem("email") || "Guest";

document.addEventListener("DOMContentLoaded", () => {
  // document.querySelector(".user-id").textContent = `Hello, ${userId}`;
  const userEmail = localStorage.getItem("email");
  const usernameDisplay = document.querySelector("#username");
  const authButton = document.querySelector("#auth-btn");

  if (userEmail) {
    usernameDisplay.textContent = userEmail;
    authButton.textContent = "Log Out";

    authButton.removeEventListener("click", logout); // Ensure no duplicate listeners
    authButton.addEventListener("click", logout); //  Attach logout function
  } else {
    usernameDisplay.textContent = "Guest";
    authButton.textContent = "Log In";

    authButton.removeEventListener("click", loginRedirect); //  Ensure no duplicate listeners
    authButton.addEventListener("click", loginRedirect); //  Attach login function
  }

  loadLeaderboard();
});

function loginRedirect() {
  window.location.href = "../loginPage/login.html"; // Redirect to login page
}

async function loadLeaderboard() {
  try {
    const response = await fetch("https://project-alpha-89wj.onrender.com/user_response");
    if (!response.ok) throw new Error("Failed to fetch leaderboard data.");

    const userResponses = await response.json();
    console.log("Leaderboard data:", userResponses);

    const leaderboardTable = document.querySelector(".leaderboard tbody");
    const feedbackSection = document.querySelector("article");

    // Clear existing table rows (except the header)
    leaderboardTable.innerHTML = ""; // Clears the table for fresh data

    const loggedInUser = localStorage.getItem("email");

    let userFeedback = `<h2>Your Feedback</h2>
                        <p>Hello Guest, please log in to get personalised feedback!</p>
                        <a href="../loginPage/login.html"><button id="auth-btn">Log In</button></a>`;

    if (loggedInUser) {
      let latestUserResponse = userResponses
        .filter((user) => user.email === loggedInUser) //Get only this user's data
        .sort((a, b) => b.response_id - a.response_id)[0]; //Sort by latest response_id (assuming higher ID means newer)

      if (latestUserResponse) {
        const incorrectCategories = latestUserResponse.incorrect_categories
          ?.length
          ? latestUserResponse.incorrect_categories.join(", ")
          : "None";

        let score = latestUserResponse.score;
        let scoreMessage = getScoreFeedback(score);

        if (latestUserResponse.incorrect_categories?.length) {
          const categoryFeedback = generateFeedback(
            latestUserResponse.incorrect_categories
          );
          userFeedback = `<h2>Your Feedback</h2>
                                <p><b>${latestUserResponse.email},</b> ${scoreMessage}</p>
                                <p><b>You need to work on:</b> ${incorrectCategories}</p>
                                <ul>${categoryFeedback}</ul>`;
        } else {
          userFeedback = `<h2>Your Feedback</h2>
                                <p><b>${latestUserResponse.email},</b> ${scoreMessage}</p>
                                <p>You got everything correct. Keep up the good work!</p>`;
        }
      } else {
        // If user is logged in but has no quiz history
        userFeedback = `<h2>Your Feedback</h2>
                          <p><b>${loggedInUser}</b>, you haven't taken any quizzes yet.</p>
                          <p>Take a quiz to get personalised feedback!</p>`;
      }
    }

    feedbackSection.innerHTML = userFeedback;

    // Populate table with user responses
    userResponses.forEach((user, index) => {
      const incorrectCategories = user.incorrect_categories?.length
        ? user.incorrect_categories.join(", ")
        : "None";

      const row = document.createElement("tr");

      if (user.email === loggedInUser) {
        row.classList.add("highlight-user");
      }

      row.innerHTML = `
              <td>#${index + 1}</td>
              <td>${user.email}</td>
              <td>${user.score}</td>
              <td>${incorrectCategories}</td>
          `;

      leaderboardTable.appendChild(row); // Appends the row to the table
    });
    // feedbackSection.innerHTML = userFeedback;
  } catch (error) {
    console.log("Error loading leaderboard:", error);
    leaderboardTable.innerHTML = `<tr><td colspan="3">Failed to load leaderboard</td></tr>`;
  }
}

function getScoreFeedback(score) {
  if (score === 10) {
    return "Excellent! You got a perfect score!";
  } else if (score >= 8) {
    return "Great job! You're doing well, but there's room for improvement.";
  } else if (score >= 5) {
    return "You're on the right track! Keep practicing to improve further.";
  } else {
    return "Keep going! Review your mistakes and try again for a better score.";
  }
}

function generateFeedback(incorrectCategories) {
  let feedbackMessages = {
    Weather:
      "It looks like you're struggling with Weather concepts. Review climate patterns and meteorological effects.",
    "Climate Change":
      "Brush up on Climate Change topics! Consider studying greenhouse gases and global warming effects.",
    "Natural Disasters":
      "You may need to revisit Natural Disasters. Focus on causes and responses to earthquakes, tsunamis, and hurricanes.",
    Geography:
      "Improve your Geography knowledge! Try learning more about continents, maps, and landforms.",
    Science:
      "Science concepts can be tricky! Consider reviewing fundamental scientific principles.",
  };

  let feedback = incorrectCategories.map(
    (category) =>
      feedbackMessages[category] || `Keep practicing on ${category}!`
  );

  return feedback.join(" ");
}

function logout() {
  console.log("Logging out...");
  localStorage.removeItem("token"); // Clear authentication token
  localStorage.removeItem("email");
  localStorage.removeItem("userId");
  window.location.href = "../loginPage/login.html"; // Redirect to login page
}
