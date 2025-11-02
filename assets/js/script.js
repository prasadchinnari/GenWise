
document.addEventListener('DOMContentLoaded', ()=>{
  // Tasks
  const taskFormInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task');
  const taskList = document.getElementById('task-list');
  const taskModal = document.getElementById('task-modal');
  const modalClose = document.getElementById('task-close');
  const modalAdd = document.getElementById('modal-add-task');
  const modalInput = document.getElementById('modal-task-input');

  function renderTasks(){
    const tasks = JSON.parse(localStorage.getItem('gw_tasks')||'[]');
    taskList.innerHTML = tasks.map((t,idx)=>`<li>${t}<button data-i="${idx}" class="btn btn-ghost small del">Delete</button></li>`).join('');
    document.querySelectorAll('.del').forEach(b=> b.addEventListener('click', (e)=>{
      const i = e.target.getAttribute('data-i');
      deleteTask(parseInt(i,10));
    }));
  }
  function addTask(text){
    const tasks = JSON.parse(localStorage.getItem('gw_tasks')||'[]');
    tasks.unshift(text);
    localStorage.setItem('gw_tasks', JSON.stringify(tasks));
    renderTasks();
  }
  function deleteTask(i){
    const tasks = JSON.parse(localStorage.getItem('gw_tasks')||'[]');
    tasks.splice(i,1);
    localStorage.setItem('gw_tasks', JSON.stringify(tasks));
    renderTasks();
  }

  addTaskBtn.addEventListener('click', ()=>{
    const val = taskFormInput.value.trim();
    if(val) addTask(val);
    taskFormInput.value='';
  });
  // modal add
  document.getElementById('open-task').addEventListener('click', ()=>{
    taskModal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  });
  modalClose.addEventListener('click', ()=>{ taskModal.setAttribute('aria-hidden','true'); document.body.style.overflow='';});
  modalAdd.addEventListener('click', ()=>{ const v = modalInput.value.trim(); if(v){ addTask(v); modalInput.value=''; taskModal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; } });
  renderTasks();

  // Timer
  let timerInterval=null;
  let timerSeconds=1500;
  const timerDisplay = document.getElementById('timer-display');
  function formatTime(s){ const m = Math.floor(s/60); const sec = s%60; return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`; }
  function updateTimer(){ timerDisplay.textContent = formatTime(timerSeconds); }
  updateTimer();
  document.getElementById('start-timer').addEventListener('click', ()=>{
    if(timerInterval) return;
    timerInterval = setInterval(()=>{ timerSeconds--; updateTimer(); if(timerSeconds<=0){ clearInterval(timerInterval); timerInterval=null; alert('Timer finished!'); } },1000);
  });
  document.getElementById('stop-timer').addEventListener('click', ()=>{ if(timerInterval) clearInterval(timerInterval); timerInterval=null; });
  document.getElementById('reset-timer').addEventListener('click', ()=>{ if(timerInterval) clearInterval(timerInterval); timerInterval=null; timerSeconds=1500; updateTimer(); });

  // Quotes
  const quotes = [
    "Small steps every day lead to big changes.",
    "Consistency is the key to success.",
    "Focus on progress, not perfection.",
    "Learning is a marathon, not a sprint."
  ];
  document.getElementById('new-quote').addEventListener('click', ()=>{
    const q = quotes[Math.floor(Math.random()*quotes.length)];
    document.getElementById('quote').textContent = q;
  });

  // Quiz
  function getQuizScore(){ let total=0; for(let i=1;i<=6;i++){ total += parseInt(document.getElementById('q'+i).value||0,10); } return total; }
  function recommendStream(score){ if(score>=9) return {stream:'Science (MPC)', careers:['Engineer','Data Scientist','Researcher']}; if(score>=6) return {stream:'Commerce', careers:['Accountant','Business Analyst','Manager']}; if(score>=3) return {stream:'Arts & Humanities', careers:['Content Writer','Designer','Social Work']}; return {stream:'General / Explore Options', careers:['Counseling Recommended']}; }
  document.getElementById('quiz-submit').addEventListener('click', ()=>{ const s=getQuizScore(); const r=recommendStream(s); document.getElementById('quiz-result').innerHTML=`<strong>Recommended Stream:</strong> ${r.stream}<br/><strong>Careers:</strong> ${r.careers.join(', ')}<p class="small">Score: ${s}</p>`; });

  // Colleges
  const colleges = [
    {name:'National College of Engineering', stream:'science', city:'Hyderabad'},
    {name:'St. Marys Commerce College', stream:'commerce', city:'Vijayawada'},
    {name:'Arts & Humanities Institute', stream:'arts', city:'Visakhapatnam'},
    {name:'State Engineering College', stream:'science', city:'Kakinada'},
    {name:'City Business School', stream:'commerce', city:'Rajahmundry'}
  ];
  function renderColleges(filter){ const container = document.getElementById('college-list'); const list = colleges.filter(c=> filter==='all' ? true : c.stream===filter); if(list.length===0) container.innerHTML = '<p class="small">No colleges found for this stream.</p>'; else container.innerHTML = list.map(c=>`<div class="college-item card"><h4>${c.name}</h4><p class="small">${c.city}</p><p class="small">Stream: ${c.stream}</p></div>`).join(''); }
  document.getElementById('college-stream').addEventListener('change', (e)=> renderColleges(e.target.value));
  renderColleges('all');

  // Theme toggle
  const btnTheme = document.getElementById('btn-theme');
  btnTheme.addEventListener('click', ()=>{ document.body.classList.toggle('dark'); });
});
