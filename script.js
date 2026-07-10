const display=document.getElementById('display');
const statusText=document.getElementById('status');
const hint=document.getElementById('hint');
const lapList=document.getElementById('lapList');
const emptyState=document.getElementById('emptyState');
const lapCount=document.getElementById('lapCount');

let startTime=0, elapsed=0, timer=null, laps=[];

function format(ms){
  const cs=Math.floor(ms/10)%100;
  const sec=Math.floor(ms/1000)%60;
  const min=Math.floor(ms/60000)%60;
  const hr=Math.floor(ms/3600000);
  const pad=n=>String(n).padStart(2,'0');
  return `${pad(hr)}:${pad(min)}:${pad(sec)}<span>.${pad(cs)}</span>`;
}

function render(){ display.innerHTML=format(elapsed); }

document.getElementById('startBtn').onclick=()=>{
  if(timer) return;
  startTime=Date.now()-elapsed;
  timer=setInterval(()=>{elapsed=Date.now()-startTime;render()},10);
  statusText.textContent='RUNNING';
  hint.textContent='Timer is running';
};

document.getElementById('pauseBtn').onclick=()=>{
  if(!timer) return;
  clearInterval(timer); timer=null;
  statusText.textContent='PAUSED';
  hint.textContent='Timing paused';
};

document.getElementById('resetBtn').onclick=()=>{
  clearInterval(timer); timer=null; elapsed=0; laps=[];
  render(); renderLaps();
  statusText.textContent='READY';
  hint.textContent='Press start to begin timing';
};

document.getElementById('lapBtn').onclick=()=>{
  if(!timer) return;
  laps.unshift(elapsed);
  renderLaps();
};

function renderLaps(){
  lapList.innerHTML='';
  emptyState.style.display=laps.length?'none':'block';
  lapCount.textContent=`${laps.length} ${laps.length===1?'lap':'laps'}`;
  laps.forEach((time,index)=>{
    const li=document.createElement('li');
    li.innerHTML=`<b>Lap ${laps.length-index}</b><span>${format(time).replace(/<[^>]*>/g,'')}</span>`;
    lapList.appendChild(li);
  });
}

render();
