(()=>{'use strict';const ship=document.getElementById('sourcing-ship-top-route');if(!ship)return;
const row=ship.closest('.scope-row'),cargo=document.getElementById('sourcing-onboard-cargo'),exchange=document.getElementById('sourcing-cargo-exchange'),svgNS='http://www.w3.org/2000/svg';
const colors={A:'#71b8ae',B:'#c3a369',C:'#96ae73',D:'#8aa9bd',E:'#b092bd',F:'#d0ae79',G:'#72989b',H:'#abb67d'};
const dest={A:'Mersin',B:'Napoli',C:'Jacksonville',D:'Savannah',E:'NY/NJ',F:'Savannah',G:'Mersin',H:'Napoli'};
const stops=[
{name:'Shanghai',x:85,y:62,in:['A','B'],out:[],board:['A','B']},
{name:'Tanjung Priok',x:250,y:62,in:['C'],out:[],board:['A','B','C']},
{name:'Colombo',x:415,y:62,in:['D'],out:[],board:['A','B','C','D']},
{name:'Mersin',x:745,y:62,in:['E'],out:['A'],board:['B','C','D','E']},
{name:'Napoli',x:910,y:62,in:['F'],out:['B'],board:['C','D','E','F']},
{name:'New York / New Jersey',x:1018,y:75,in:['G'],out:['E'],board:['C','D','F','G']},
{name:'Savannah',x:1018,y:155,in:['H'],out:['D','F'],board:['C','G','H']},
{name:'Jacksonville',x:1018,y:235,in:[],out:['C'],board:['G','H']},
{name:'Napoli',x:910,y:62,in:[],out:['H'],board:['G']},
{name:'Mersin',x:745,y:62,in:[],out:['G'],board:[]}
];
let stage=-1,manual=false,start=performance.now();const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function box(parent,id,x,y,cls){const g=document.createElementNS(svgNS,'g');if(cls)g.setAttribute('class',cls);const r=document.createElementNS(svgNS,'rect');r.setAttribute('x',x);r.setAttribute('y',y);r.setAttribute('width','11');r.setAttribute('height','10');r.setAttribute('rx','1');r.setAttribute('fill',colors[id]);r.setAttribute('stroke','#345448');const t=document.createElementNS(svgNS,'text');t.setAttribute('x',Number(x)+5.5);t.setAttribute('y',Number(y)+7.5);t.setAttribute('font-size','6');t.setAttribute('fill','#16332b');t.setAttribute('text-anchor','middle');t.textContent=id;g.append(r,t);parent.append(g)}
function show(i){stage=i;const s=stops[i];cargo.replaceChildren();exchange.replaceChildren();s.board.forEach((id,k)=>box(cargo,id,-21+k*12,-10,''));s.out.forEach((id,k)=>box(exchange,id,-21+k*12,-10,'source-cargo-offload'));s.in.forEach((id,k)=>box(exchange,id,27+k*12,-28,'source-cargo-load'));document.getElementById('sourcing-manifest-count').textContent=s.name+' · Σ '+s.board.length;document.getElementById('sourcing-manifest-change').textContent=(s.out.length?'↓ '+s.out.join(' '):'')+(s.in.length?'  ↑ '+s.in.join(' '):'');document.getElementById('sourcing-manifest-destinations').textContent=s.board.map(id=>id+' → '+dest[id]).join(' · ');row.dataset.sourcingStage=String(i)}
function pick(i){manual=true;labels();show(i);ship.setAttribute('transform','translate('+stops[i].x+' '+stops[i].y+')')}
document.querySelectorAll('[data-source-stop]').forEach(el=>{el.addEventListener('click',()=>pick(Number(el.dataset.sourceStop)));el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(Number(el.dataset.sourceStop))}})});
const pause=row.querySelector('[data-source-pause]'),replay=row.querySelector('[data-source-replay]');function labels(){const q=window.GinovaQualityR21Copy[GinovaI18n.current()];pause.textContent=manual?q.play:q.pause;replay.textContent=q.replay;pause.setAttribute('aria-pressed',String(manual))}pause.addEventListener('click',()=>{manual=!manual;if(!manual)start=performance.now()-Math.max(stage,0)*3000;labels()});replay.addEventListener('click',()=>{manual=false;start=performance.now();stage=-1;show(0);labels()});document.addEventListener('ginova-language',labels);show(0);if(reduced){manual=true;pause.disabled=true;replay.disabled=true;labels();return}labels();function tick(now){if(!manual&&!row.hidden&&!document.hidden){const t=(Math.max(0,now-start)/1000)%(stops.length*3),i=Math.floor(t/3),phase=t%3,s=stops[i],next=stops[(i+1)%stops.length];if(stage!==i)show(i);const progress=Math.max(0,(phase-1.7)/1.3),smooth=progress*progress*(3-2*progress);ship.setAttribute('transform','translate('+(s.x+(next.x-s.x)*smooth)+' '+(s.y+(next.y-s.y)*smooth)+')')}requestAnimationFrame(tick)}requestAnimationFrame(tick);
})();
