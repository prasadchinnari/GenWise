const careerMap = {
  engineering: {score:0, title:'Engineering', desc:'Great for logical thinkers who enjoy math and problem solving. Path: Science (Maths) -> Diploma/B.Tech.'},
  medical: {score:0, title:'Medical & Healthcare', desc:'For those who want to help people and work in health — Path: Biology -> MBBS / Nursing / Allied Health.'},
  design: {score:0, title:'Design & Creative Arts', desc:'Ideal for creative minds who love drawing, UI/UX, and visual design. Path: Art & Design courses -> B.Des / Diploma.'},
  tech: {score:0, title:'Computer Science & IT', desc:'Perfect if you enjoy computers, coding and building software. Path: Computer courses -> B.Tech/BE in CS, or diplomas and bootcamps.'},
  commerce: {score:0, title:'Commerce & Business', desc:'For numerically inclined students interested in business, finance, or entrepreneurship. Path: Commerce stream -> B.Com / BBA / CA pathway.'},
  arts: {score:0, title:'Arts, Media & Communication', desc:'Great for writers, communicators, journalists, and content creators. Path: Arts stream -> BA / Journalism / Mass Communication.'},
  building: {score:0, title:'Architecture & Civil', desc:'For students who love building, planning and hands-on design. Path: Science (Maths) or Diploma -> B.Arch / Civil engineering.'}
};

function resetScores(){
  for(const k in careerMap) careerMap[k].score = 0;
}

function analyzeAndShow(){
  resetScores();
  const form = document.getElementById('quizForm');
  const data = new FormData(form);

  if(data.get('logic')){ careerMap.engineering.score += 3; careerMap.tech.score += 1; careerMap.building.score += 1; }
  if(data.get('biology')){ careerMap.medical.score += 3; careerMap.arts.score += 1; }
  if(data.get('design')){ careerMap.design.score += 3; careerMap.arts.score += 1; }
  if(data.get('tech')){ careerMap.tech.score += 3; careerMap.engineering.score += 1; }
  if(data.get('commerce')){ careerMap.commerce.score += 3; careerMap.tech.score += 1; }
  if(data.get('arts')){ careerMap.arts.score += 3; careerMap.design.score += 1; }
  if(data.get('building')){ careerMap.building.score += 3; careerMap.engineering.score += 1; }

  const arr = Object.entries(careerMap).map(([key,val])=>({key,score:val.score,title:val.title,desc:val.desc}));
  arr.sort((a,b)=>b.score - a.score);

  const top = arr.filter(x=>x.score>0).slice(0,3);
  const container = document.getElementById('resultsContainer');
  container.innerHTML = '';

  if(top.length === 0){
    container.innerHTML = `<p class="small">No options selected — please choose interests to get personalized suggestions.</p>`;
  } else {
    top.forEach(item=>{
      const card = document.createElement('div');
      card.className = 'career-card ' + item.key;
      card.innerHTML = `<div class="left">${item.title.split(' ')[0].slice(0,2).toUpperCase()}</div>
                        <div class="body">
                          <h3 class="title">${item.title}</h3>
                          <p class="desc">${item.desc}</p>
                        </div>`;
      container.appendChild(card);
    });
  }

  document.getElementById('quizSection').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');
  window.scrollTo({top: document.getElementById('resultSection').offsetTop - 20, behavior:'smooth'});
}

document.getElementById('findPath').addEventListener('click', analyzeAndShow);
