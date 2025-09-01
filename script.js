function showUpload() {
  document.getElementById('home').style.display = 'none';
  document.getElementById('upload').style.display = 'block';
  document.getElementById('results').style.display = 'none';
}

function analyzeResume() {
  const fileInput = document.getElementById('resumeInput');
  
  if (!fileInput.files[0]) {
    alert('Please select a resume file first!');
    return;
  }

  // Simulate analysis delay
  const uploadBtn = document.querySelector('#upload button');
  uploadBtn.textContent = 'Analyzing...';
  uploadBtn.disabled = true;

  setTimeout(() => {
    showResults();
    uploadBtn.textContent = 'Upload';
    uploadBtn.disabled = false;
  }, 2000);
}

function showResults() {
  document.getElementById('home').style.display = 'none';
  document.getElementById('upload').style.display = 'none';
  document.getElementById('results').style.display = 'block';

  // Generate fake score and feedback
  const scores = [72, 85, 91, 68, 79, 88, 94];
  const randomScore = scores[Math.floor(Math.random() * scores.length)];
  
  const feedbackOptions = [
    [
      "Strong technical skills section detected",
      "Consider adding more quantified achievements",
      "Resume format is ATS-friendly"
    ],
    [
      "Excellent work experience descriptions",
      "Missing contact information section",
      "Keywords match well with common job requirements"
    ],
    [
      "Great use of action verbs throughout",
      "Resume length is optimal (1-2 pages)",
      "Consider adding a professional summary"
    ],
    [
      "Skills section needs improvement",
      "Strong educational background",
      "Work experience shows good progression"
    ]
  ];

  const randomFeedback = feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)];

  // Update score with animation
  animateScore(randomScore);
  
  // Update feedback
  const feedbackList = document.getElementById('feedback');
  feedbackList.innerHTML = '';
  randomFeedback.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    feedbackList.appendChild(li);
  });

  // Add score circle
  addScoreCircle(randomScore);
}

function animateScore(targetScore) {
  const scoreElement = document.getElementById('score');
  let currentScore = 0;
  const increment = targetScore / 50;
  
  const timer = setInterval(() => {
    currentScore += increment;
    if (currentScore >= targetScore) {
      currentScore = targetScore;
      clearInterval(timer);
    }
    scoreElement.textContent = Math.round(currentScore);
  }, 30);
}

function addScoreCircle(score) {
  const resultsSection = document.getElementById('results');
  
  // Remove existing circle if any
  const existingCircle = document.querySelector('.score-circle');
  if (existingCircle) {
    existingCircle.remove();
  }

  const circle = document.createElement('div');
  circle.className = 'score-circle';
  
  const percentage = (score / 100) * 360;
  circle.style.background = `conic-gradient(#4CAF50 0deg ${percentage}deg, #e0e0e0 ${percentage}deg 360deg)`;
  
  const scoreText = document.createElement('div');
  scoreText.className = 'score-text';
  scoreText.textContent = score;
  
  circle.appendChild(scoreText);
  resultsSection.insertBefore(circle, document.getElementById('feedback'));
}

// Add restart functionality
function restartAnalysis() {
  document.getElementById('home').style.display = 'block';
  document.getElementById('upload').style.display = 'none';
  document.getElementById('results').style.display = 'none';
  document.getElementById('resumeInput').value = '';
}