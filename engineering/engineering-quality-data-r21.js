(()=>{'use strict';
const locales=window.GinovaQualityR21Copy;
Object.entries(locales).forEach(([code,q])=>{const s=D[code].s;s['eng.service6.title']=q.title;s['eng.service6.fit']=q.fit;for(let i=0;i<4;i++){s['eng.quality.'+i+'.title']=q.headings[i+1];s['eng.quality.'+i+'.body']=q.descriptions[i+1]}});
function render(){const q=locales[GinovaI18n.current()]||locales.en;document.querySelectorAll('[data-quality]').forEach(el=>el.textContent=q[el.dataset.quality]);document.querySelectorAll('[data-quality-node-label]').forEach(el=>el.textContent=q.nodes[Number(el.dataset.qualityNodeLabel)]);document.querySelectorAll('[data-quality-node]').forEach(el=>el.setAttribute('aria-label',q.nodes[Number(el.dataset.qualityNode)]));document.querySelectorAll('[data-t^="eng.quality."],[data-t^="eng.service6."]').forEach(el=>el.textContent=D[GinovaI18n.current()].s[el.dataset.t]);}
document.addEventListener('ginova-language',render);render();
})();
