/* GiNOVA Engineering: process charts. Motion runs only while the section is on screen and can be paused.
   Sourcing timeline adapted from the live Engineering site (r23). */
(function(){
'use strict';
var sec=document.getElementById('processes');if(!sec)return;
var pauseBtn=document.getElementById('chartPause'),replayBtn=document.getElementById('chartReplay');
var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,paused=false,inView=false;
if('IntersectionObserver' in window)new IntersectionObserver(function(es){inView=es[0].isIntersecting;sec.classList.toggle('in-view',inView)},{threshold:.15}).observe(sec);else{inView=true;sec.classList.add('in-view')}
function label(){pauseBtn.textContent=GN.t(paused?'chart.play':'chart.pause');pauseBtn.setAttribute('aria-pressed',String(paused))}
pauseBtn.addEventListener('click',function(){paused=!paused;sec.classList.toggle('motion-off',paused);if(!paused)resume();label()});
GN.onLang(label);label();
function active(){return sec.querySelector('.chart:not([hidden])')}
function tabChanged(){replayBtn.hidden=!active().hasAttribute('data-replay')}
sec.querySelector('[data-tabset]').addEventListener('gn-tab',tabChanged);tabChanged();
replayBtn.addEventListener('click',function(){var a=active();
  if(a.getAttribute('data-replay')==='sourcing'){stage=-1;start=performance.now();show(0)}
  else [].forEach.call(a.querySelectorAll('.quality-batch,.quality-feedback'),function(el){el.style.animation='none';void el.getBoundingClientRect();el.style.animation=''});
});
/* sourcing timeline */
var ship=document.getElementById('sourcing-ship-top-route'),panel=document.getElementById('pc0'),cargo=document.getElementById('sourcing-onboard-cargo'),exchange=document.getElementById('sourcing-cargo-exchange'),NS='http://www.w3.org/2000/svg';
var colors={A:'#71b8ae',B:'#c3a369',C:'#96ae73',D:'#8aa9bd',E:'#b092bd',F:'#d0ae79',G:'#72989b',H:'#abb67d'};
var dest={A:'Mersin',B:'Napoli',C:'Jacksonville',D:'Savannah',E:'NY/NJ',F:'Savannah',G:'Mersin',H:'Napoli'};
var stops=[
{name:'Shanghai',x:85,y:62,in:['A','B'],out:[],board:['A','B']},
{name:'Tanjung Priok',x:250,y:62,in:['C'],out:[],board:['A','B','C']},
{name:'Colombo',x:415,y:62,in:['D'],out:[],board:['A','B','C','D']},
{name:'Mersin',x:745,y:62,in:['E'],out:['A'],board:['B','C','D','E']},
{name:'Napoli',x:910,y:62,in:['F'],out:['B'],board:['C','D','E','F']},
{name:'New York / New Jersey',x:1018,y:75,in:['G'],out:['E'],board:['C','D','F','G']},
{name:'Savannah',x:1018,y:155,in:['H'],out:['D','F'],board:['C','G','H']},
{name:'Jacksonville',x:1018,y:235,in:[],out:['C'],board:['G','H']},
{name:'Napoli',x:910,y:62,in:[],out:['H'],board:['G']},
{name:'Mersin',x:745,y:62,in:[],out:['G'],board:[]}];
var stage=-1,start=performance.now(),last=start;
function box(parent,id,x,y,cls){var g=document.createElementNS(NS,'g');if(cls)g.setAttribute('class',cls);var r=document.createElementNS(NS,'rect');r.setAttribute('x',x);r.setAttribute('y',y);r.setAttribute('width','11');r.setAttribute('height','10');r.setAttribute('fill',colors[id]);r.setAttribute('stroke','#345448');r.setAttribute('stroke-width','.7');g.appendChild(r);parent.appendChild(g)}
function show(i){stage=i;var s=stops[i];cargo.replaceChildren();exchange.replaceChildren();
  s.board.forEach(function(id,k){box(cargo,id,-21+k*12,-10,'')});
  s.out.forEach(function(id,k){box(exchange,id,-21+k*12,-10,'source-cargo-offload')});
  s.in.forEach(function(id,k){box(exchange,id,27+k*12,-28,'source-cargo-load')});
  document.getElementById('sourcing-manifest-count').textContent=s.name+' · Σ '+s.board.length;
  document.getElementById('sourcing-manifest-change').textContent=(s.out.length?'↓ '+s.out.join(' '):'')+(s.in.length?'  ↑ '+s.in.join(' '):'');
  document.getElementById('sourcing-manifest-destinations').textContent=s.board.map(function(id){return id+' → '+dest[id]}).join(' · ');
  ship.setAttribute('transform','translate('+s.x+' '+s.y+')')}
function resume(){start=performance.now()-Math.max(stage,0)*3000}
show(0);
if(reduced)return;
function tick(now){
  if(!paused&&inView&&!panel.hidden&&!document.hidden){
    var t=(Math.max(0,now-start)/1000)%(stops.length*3),i=Math.floor(t/3),phase=t%3,s=stops[i],next=stops[(i+1)%stops.length];
    if(stage!==i)show(i);
    var p=Math.max(0,(phase-1.7)/1.3),sm=p*p*(3-2*p);
    ship.setAttribute('transform','translate('+(s.x+(next.x-s.x)*sm)+' '+(s.y+(next.y-s.y)*sm)+')');
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
})();
