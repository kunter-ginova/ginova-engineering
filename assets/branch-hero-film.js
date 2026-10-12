/* Restore the matching original film. Never start sound without a user gesture. */
(()=>{'use strict';
 document.querySelectorAll('[data-branch-film]').forEach(film=>{
  const clip=film.dataset.branchFilm;if(!['engineering','soundlab'].includes(clip))return;
  const video=film.querySelector('video'),toggle=film.querySelector('[data-film-toggle]'),sound=film.querySelector('[data-film-sound]'),status=film.querySelector('.branch-film-status'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let manualPause=false,inView=true,failed=false;
  const copy={"az":["Oynat","Fasilə ver","Səsi aç","Səsi bağla"],"fr":["Lire","Mettre en pause","Activer le son","Couper le son"],en:['Play','Pause','Sound on','Mute'],es:['Reproducir','Pausa','Activar sonido','Silenciar'],de:['Abspielen','Pause','Ton an','Stumm'],it:['Riproduci','Pausa','Attiva audio','Disattiva audio'],ar:['تشغيل','إيقاف مؤقت','تشغيل الصوت','كتم الصوت'],ru:['Воспроизвести','Пауза','Включить звук','Выключить звук'],tr:['Oynat','Duraklat','Sesi aç','Sesi kapat'],zh:['播放','暂停','开启声音','静音']};
  video.muted=true;video.defaultMuted=true;video.loop=true;video.playsInline=true;
  if(reduced.matches)video.removeAttribute('autoplay');
  function render(){const lang=GinovaI18n.current(),t=copy[lang]||copy.en;toggle.textContent=video.paused?t[0]:t[1];sound.textContent=video.muted?t[2]:t[3];sound.setAttribute('aria-pressed',String(!video.muted));if(failed){status.classList.remove('sr-only');status.textContent=GinovaI18n.runtime[lang].error;}}
  function load(){if(!video.getAttribute('src')){video.src=film.dataset.filmBase+clip+'.mp4';video.load();}}
  async function start(manual=false){if(!manual&&(reduced.matches||navigator.connection?.saveData||document.hidden||manualPause||!inView))return;load();if(manual)manualPause=false;try{await video.play()}catch(e){manualPause=true;render();}}
  toggle.addEventListener('click',()=>{if(video.paused)start(true);else{manualPause=true;video.pause()}});
  sound.addEventListener('click',()=>{video.muted=!video.muted;if(!video.muted&&video.paused)start(true);render()});
  video.addEventListener('play',()=>{document.querySelectorAll('audio,video').forEach(other=>{if(other!==video)other.pause()});render()});video.addEventListener('pause',render);video.addEventListener('volumechange',render);video.addEventListener('error',()=>{failed=true;render()});
  document.querySelectorAll('audio,video').forEach(other=>{if(other!==video)other.addEventListener('play',()=>{manualPause=true;video.pause()})});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else start()});addEventListener('pagehide',()=>video.pause());addEventListener('pageshow',()=>start());
  reduced.addEventListener('change',()=>{if(reduced.matches){video.removeAttribute('autoplay');video.pause();video.removeAttribute('src');video.load()}else{video.setAttribute('autoplay','');start()}});
  if('IntersectionObserver'in window)new IntersectionObserver(entries=>{inView=entries.some(e=>e.isIntersecting);if(inView)start();else video.pause()},{threshold:.1}).observe(film);
  document.addEventListener('ginova-language',render);new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});render();start();
 });
})();
