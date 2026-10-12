(()=>{'use strict';const row=document.getElementById('eng-process-6'),choice=row.querySelector('.eng-detail-select'),pause=row.querySelector('[data-quality-pause]'),replay=row.querySelector('[data-quality-replay]'),refs=document.querySelector('.quality-references');let paused=matchMedia('(prefers-reduced-motion: reduce)').matches;
function paint(){row.dataset.qualityMode=choice.value;row.querySelectorAll('[data-quality-node]').forEach(el=>el.setAttribute('aria-pressed',String(Number(choice.value)===0||Number(choice.value)===2||Number(el.dataset.qualityMode)===Number(choice.value))));}
choice.addEventListener('change',paint);paint();
row.querySelectorAll('[data-quality-node]').forEach(el=>{const activate=()=>{choice.value=el.dataset.qualityMode;choice.dispatchEvent(new Event('change',{bubbles:true}))};el.addEventListener('click',activate);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate()}})});
function state(){row.classList.toggle('quality-paused',paused);const q=window.GinovaQualityR21Copy[GinovaI18n.current()];pause.textContent=paused?q.play:q.pause;pause.setAttribute('aria-pressed',String(paused))}
pause.addEventListener('click',()=>{paused=!paused;state()});replay.addEventListener('click',()=>{row.classList.remove('quality-replay');void row.offsetWidth;row.classList.add('quality-replay');row.querySelectorAll('.quality-batch,.quality-feedback').forEach(el=>{el.style.animation='none';void el.getBoundingClientRect();el.style.animation=''});});
document.addEventListener('ginova-language',state);state();
const process=document.getElementById('eng-process-select');const visible=()=>refs.hidden=process.value!=='6';process.addEventListener('change',visible);visible();
})();
