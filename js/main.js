document.getElementById('startBtn').addEventListener('click', () => {
  document.getElementById('quizSection').classList.remove('hidden');
  document.getElementById('resultSection').classList.add('hidden');
  window.scrollTo({top: document.getElementById('quizSection').offsetTop - 20, behavior:'smooth'});
});

document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('quizForm').reset();
});

document.getElementById('startAgain').addEventListener('click', () => {
  document.getElementById('quizSection').classList.remove('hidden');
  document.getElementById('resultSection').classList.add('hidden');
  document.getElementById('resultsContainer').innerHTML = '';
  document.getElementById('quizForm').reset();
  window.scrollTo({top: document.getElementById('quizSection').offsetTop - 20, behavior:'smooth'});
});

document.getElementById('copyResults').addEventListener('click', () => {
  const el = document.getElementById('resultsContainer').innerText;
  navigator.clipboard.writeText(el).then(()=> alert('Results copied! Paste into README or notes.'));
});
