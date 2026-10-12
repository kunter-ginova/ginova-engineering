(()=>{'use strict';
const scope=document.getElementById('scope'),picker=scope.querySelector('.eng-panel-label');
picker.classList.add('eng-process-overlay');
function dock(){const visible=[...document.querySelectorAll('#scope .scope-row,#gn-field-food .scope-row')].find(row=>!row.hidden);visible.querySelector('.eng-scope-panels').append(picker)}
document.getElementById('eng-process-select').addEventListener('change',dock);dock();
let counter=0;
document.querySelectorAll('#scope select,.eng-domain-scene select').forEach(native=>{
 const shell=document.createElement('div');shell.className='eng-select-shell';native.before(shell);shell.append(native);native.classList.add('eng-select-native');native.tabIndex=-1;native.setAttribute('aria-hidden','true');
 const toggle=document.createElement('button');toggle.type='button';toggle.className='eng-select-toggle';toggle.setAttribute('aria-haspopup','listbox');toggle.setAttribute('aria-expanded','false');shell.append(toggle);
 // Keep menus outside every canvas/figure/backdrop stacking and clipping context.
 const menu=document.createElement('div');menu.className='eng-select-menu eng-select-portal';menu.id='eng-fancy-menu-'+counter++;menu.setAttribute('role','listbox');menu.setAttribute('popover','manual');if(typeof menu.showPopover!=='function')menu.removeAttribute('popover');menu.hidden=true;toggle.setAttribute('aria-controls',menu.id);document.body.append(menu);
 let opened=false;
 const close=()=>{if(menu.hidePopover)try{menu.hidePopover()}catch(_){}opened=false;menu.hidden=true;toggle.setAttribute('aria-expanded','false')};
 function place(){
  if(!opened)return;const rect=toggle.getBoundingClientRect(),gap=8,edge=12;
  if(rect.bottom<0||rect.top>innerHeight){close();return}
  const width=Math.min(Math.max(rect.width,230),innerWidth-edge*2);
  const above=Math.max(0,rect.top-gap-edge),below=Math.max(0,innerHeight-rect.bottom-gap-edge);
  const preferUp=!!native.closest('.scope-body,.eng-domain-bottom');
  const up=(preferUp&&above>=120)||(below<180&&above>below);
  const limit=Math.max(48,Math.min(280,up?above:below,innerHeight-edge*2));
  menu.style.width=width+'px';menu.style.maxHeight=limit+'px';
  const height=Math.min(menu.scrollHeight||native.options.length*44+12,limit);
  const top=up?rect.top-gap-height:rect.bottom+gap;
  menu.style.left=Math.max(edge,Math.min(document.documentElement.dir==='rtl'?rect.right-width:rect.left,innerWidth-width-edge))+'px';
  menu.style.top=Math.max(edge,Math.min(top,innerHeight-height-edge))+'px';
  menu.dataset.direction=up?'up':'down';
 }
 function render(){
  toggle.textContent=native.selectedOptions[0]?.textContent||'';toggle.setAttribute('aria-label',(native.getAttribute('aria-label')||picker.querySelector('span')?.textContent||'')+': '+toggle.textContent);
  menu.setAttribute('aria-label',native.getAttribute('aria-label')||toggle.textContent);menu.replaceChildren();
  [...native.options].forEach((option,i)=>{
   const btn=document.createElement('button');btn.type='button';btn.className='eng-select-option';btn.setAttribute('role','option');btn.setAttribute('aria-selected',String(option.selected));btn.textContent=option.textContent;
   btn.addEventListener('click',()=>{native.value=option.value;native.dispatchEvent(new Event('change',{bubbles:true}));render();close();toggle.focus()});
   btn.addEventListener('keydown',e=>{const items=[...menu.children];
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();items[(i+(e.key==='ArrowDown'?1:-1)+items.length)%items.length].focus()}
    if(e.key==='Home'||e.key==='End'){e.preventDefault();items[e.key==='Home'?0:items.length-1].focus()}
    if(e.key==='Escape'){e.preventDefault();close();toggle.focus()}
   });menu.append(btn);
  });place();
 }
 function open(){
  document.dispatchEvent(new CustomEvent('eng-menu-open',{detail:{id:menu.id}}));
  opened=true;menu.hidden=false;toggle.setAttribute('aria-expanded','true');
  if(menu.showPopover&&menu.hasAttribute('popover'))try{menu.showPopover()}catch(_){menu.removeAttribute('popover')}
  place();menu.children[native.selectedIndex]?.focus();
 }
 toggle.addEventListener('click',()=>opened?close():open());
 toggle.addEventListener('keydown',e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();open()}if(e.key==='Escape')close()});
 const focusLeave=e=>{if(!shell.contains(e.relatedTarget)&&!menu.contains(e.relatedTarget))close()};
 shell.addEventListener('focusout',focusLeave);menu.addEventListener('focusout',focusLeave);
 document.addEventListener('pointerdown',e=>{if(!shell.contains(e.target)&&!menu.contains(e.target))close()});
 document.addEventListener('eng-menu-open',e=>{if(e.detail.id!==menu.id)close()});
 addEventListener('scroll',place,{capture:true,passive:true});addEventListener('resize',place,{passive:true});
 native.addEventListener('change',render);document.addEventListener('ginova-language',()=>{render();close()});render();
});
})();
