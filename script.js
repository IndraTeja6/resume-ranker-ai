document.getElementById("resumeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById("resumeFile");
  const resumeText = document.getElementById("resumeText").value.trim();

  let textToSend = resumeText;

  // If user uploaded a file, send it to /api/upload
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://your-app.onrender.com/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      textToSend = data.text; // backend extracts text
    } catch (err) {
      console.error(err);
      alert("Error uploading file.");
      return;
    }
  }

  // If we have text (from paste or file), score it
  if (textToSend) {
    try {
      const response = await fetch("https://your-app.onrender.com/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToSend }),
      });
      const data = await response.json();

      document.getElementById("results").style.display = "block";
      document.getElementById("score").innerText = data.score;

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
  } else {
    alert("Please paste text or upload a file!");
  }
});

function restartAnalysis() {
  document.getElementById("results").style.display = "none";
  document.getElementById("resumeText").value = "";
  document.getElementById("resumeFile").value = "";
}
