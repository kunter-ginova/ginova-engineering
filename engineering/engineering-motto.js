/* Owner-selected Engineering motto only. */
(()=>{'use strict';
const copy={"tr":"Yenilik, mühendislikle hayat bulur","en":"Innovation brought to life through engineering","ru":"Инженерия воплощает инновации в жизнь","it":"L’innovazione prende vita grazie all’ingegneria","az":"Mühəndislik innovasiyalara həyat verir","ar":"الابتكار ينبض بالحياة بفضل الهندسة","de":"Ingenieurarbeit erweckt Innovationen zum Leben","es":"La innovación cobra vida a través de la ingeniería","zh":"工程赋予创新生命","fr":"L’innovation prend vie grâce à l’ingénierie"};
const element=document.querySelector('[data-engineering-motto]');if(!element)return;
function render(){const lang=window.GinovaI18n?GinovaI18n.current():'en';element.textContent='“'+(copy[lang]||copy.en)+'”';}
document.addEventListener('ginova-language',render);render();
})();
