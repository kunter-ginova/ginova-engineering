(()=>{'use strict';
const locales=window.GinovaDomainR20Copy;
const language=()=>window.GinovaI18n?.current()||'en';
const copy=()=>locales[language()]||locales.en;
function renderScene(scene){
 const data=copy()[scene.dataset.domain],select=scene.querySelector('select');const art=scene.querySelector('.eng-domain-canvas>svg');art.setAttribute('aria-label',data.subtitle+' '+copy().illustrativeNote);art.removeAttribute('aria-labelledby');
 scene.querySelector('.eng-domain-heading>p').textContent=data.subtitle;
 scene.querySelector('.eng-domain-note').textContent=copy().illustrativeNote;
 select.setAttribute('aria-label',copy().scenarioLabel);
 [...select.options].forEach((option,i)=>option.textContent=data.options[i]);
 scene.querySelector('[role=status]').textContent=data.descriptions[Number(select.value)];
}
document.querySelectorAll('.eng-domain-scene').forEach(scene=>scene.querySelector('select').addEventListener('change',()=>renderScene(scene)));
function render(){
 document.querySelectorAll('.eng-domain-scene').forEach(renderScene);
 document.querySelectorAll('[data-r20-source]').forEach(el=>el.textContent=copy()[el.dataset.r20Source]);
}
document.addEventListener('ginova-language',render);render();
})();
