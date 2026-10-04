'use strict';
const menuButton=document.getElementById('menuButton');
const menu=document.getElementById('menu');
function closeMenu(){menu?.classList.remove('active');menuButton?.classList.remove('active');menuButton?.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')}
menuButton?.addEventListener('click',()=>{const open=!menu.classList.contains('active');menu.classList.toggle('active',open);menuButton.classList.toggle('active',open);menuButton.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-open',open)});
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
window.addEventListener('resize',()=>{if(window.innerWidth>900)closeMenu()});
document.getElementById('year').textContent=new Date().getFullYear();
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const elements=document.querySelectorAll('.reveal');
if(reduced||!('IntersectionObserver' in window)){elements.forEach(el=>el.classList.add('visible'))}else{const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px -35px 0px'});elements.forEach(el=>observer.observe(el))}
const header=document.getElementById('header');const progress=document.getElementById('progress');let scheduled=false;
function updateScroll(){header.classList.toggle('scrolled',window.scrollY>25);const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?Math.min(100,window.scrollY/max*100):0)+'%';scheduled=false}
window.addEventListener('scroll',()=>{if(!scheduled){requestAnimationFrame(updateScroll);scheduled=true}},{passive:true});updateScroll();
if(!reduced&&window.matchMedia('(hover:hover) and (pointer:fine)').matches){const glow=document.querySelector('.cursor-glow');window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true})}
const sections=document.querySelectorAll('main section[id]');if('IntersectionObserver' in window){const navObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){menu?.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id))}})},{rootMargin:'-35% 0px -55% 0px'});sections.forEach(s=>navObserver.observe(s))}
