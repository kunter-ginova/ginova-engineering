(()=>{'use strict';
function line(key){const aside=document.createElement('div');aside.className='eng-method-line';aside.dataset.methodOutput=key;aside.innerHTML='<span data-method-workflow></span>'+(key==='food'?'':'<small><b data-method-label></b> <span data-method-output></span></small>');return aside}
document.querySelectorAll('#scope .scope-row').forEach((row,i)=>{row.querySelectorAll('.scope-body>div:not(.eng-select-shell):not(.eng-juice-controls)').forEach(block=>block.append(line(i===6?'quality':'food')))});
document.querySelectorAll('.eng-domain-scene').forEach(scene=>{const p=scene.querySelector('[role=status]'),wrap=document.createElement('div');wrap.className='eng-domain-description';p.before(wrap);wrap.append(p,line(scene.dataset.domain))});
function render(){const q=window.GinovaMethodCopy[GinovaI18n.current()]||window.GinovaMethodCopy.en;document.querySelectorAll('[data-method-output]').forEach(block=>{
 if(!block.classList.contains('eng-method-line'))return;
 block.querySelector('[data-method-workflow]').textContent=q.workflow;
 if(block.dataset.methodOutput!=='food'){block.querySelector('[data-method-label]').textContent=q.outputLabel+':';block.querySelector('span[data-method-output]').textContent=q.outputs[block.dataset.methodOutput]}

})}
document.addEventListener('ginova-language',render);render();
})();
