"use strict";
const btn=document.getElementById("menuButton");
const menu=document.getElementById("menu");
function closeMenu(){btn?.classList.remove("active");menu?.classList.remove("active");document.body.classList.remove("menu-open");btn?.setAttribute("aria-expanded","false")}
btn?.addEventListener("click",()=>{const open=menu.classList.toggle("active");btn.classList.toggle("active",open);document.body.classList.toggle("menu-open",open);btn.setAttribute("aria-expanded",String(open))});
document.querySelectorAll(".menu a").forEach(a=>a.addEventListener("click",closeMenu));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu()});
document.getElementById("year").textContent=new Date().getFullYear();
const els=document.querySelectorAll(".reveal");
if("IntersectionObserver"in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.12});els.forEach(e=>io.observe(e))}else els.forEach(e=>e.classList.add("visible"));
