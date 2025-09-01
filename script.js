document
  .getElementById("resumeForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const resumeText = document.getElementById("resumeText").value.trim();
    if (!resumeText) {
      alert("Please paste your resume text first!");
      return;
    }

    try {
      const response = await fetch("https://resumerank-backend.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: resumeText }),
      });

      const data = await response.json();

      // Show results
      document.getElementById("results").style.display = "block";
      document.getElementById("score").innerText = data.score;

      // Feedback list
      const feedbackList = document.getElementById("feedback");
      feedbackList.innerHTML = "";
      if (data.feedback) {
        data.feedback.forEach((item) => {
          const li = document.createElement("li");
          li.innerText = item;
          feedbackList.appendChild(li);
        });
      }
    } catch (err) {
      console.error(err);
      alert("Error contacting ResumeRanker API.");
    }
  });

function restartAnalysis() {
  document.getElementById("results").style.display = "none";
  document.getElementById("resumeText").value = "";
}
