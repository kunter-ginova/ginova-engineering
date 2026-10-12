/* Deliberately manual: no autoplay, focus surprises or background timers. */
(()=>{'use strict';
 const region=document.querySelector('.eng-people-carousel');if(!region)return;
 const slides=[...region.querySelectorAll('[data-eng-scene]')],selectors=[...region.querySelectorAll('[data-eng-select]')],status=region.querySelector('[data-eng-status]');let current=0;
 const stage=document.createElement('div');stage.className='eng-people-stage';slides[0].before(stage);slides.forEach((slide,i)=>{stage.append(slide);slide.setAttribute('aria-hidden',String(i!==current));slide.inert=i!==current});
 function labels(announce=false){const code=GinovaI18n.current(),s=D[code].s;selectors.forEach((button,index)=>button.setAttribute('aria-label',s['eng.people.scene']+' '+(index+1)));if(announce)status.textContent=s['eng.people.scene']+' '+(current+1)+' / '+slides.length;}
 function select(index){current=(index+slides.length)%slides.length;slides.forEach((slide,i)=>{slide.hidden=i!==current;slide.setAttribute('aria-hidden',String(i!==current));slide.inert=i!==current});selectors.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===current)));labels(true);}
 selectors.forEach((button,index)=>button.addEventListener('click',()=>select(index)));
 region.querySelector('[data-eng-prev]').addEventListener('click',()=>select(current-1));region.querySelector('[data-eng-next]').addEventListener('click',()=>select(current+1));
 region.addEventListener('keydown',event=>{const key=GinovaI18n.key(event);if(!['ArrowLeft','ArrowRight','Home','End'].includes(key))return;event.preventDefault();select(key==='Home'?0:key==='End'?slides.length-1:current+(key==='ArrowRight'?1:-1));});
 document.addEventListener('ginova-language',()=>labels(true));labels();
})();
