// Real Craft Adventures: shared phone/tablet adaptation + touch-scroll fixes (loaded by every page)
(function(){const d=document.documentElement;
function cls(){const w=innerWidth,h=innerHeight,s=Math.min(w,h),touch=matchMedia("(pointer:coarse)").matches||"ontouchstart"in window;d.classList.toggle("phone",s<=500&&touch||s<=430);d.classList.toggle("land",w>h);d.classList.toggle("ptr",!!touch);d.style.setProperty("--vh",h/100+"px")}
cls();addEventListener("resize",cls);addEventListener("orientationchange",()=>setTimeout(cls,200));
window.RCA_DPR=(max=2)=>Math.min(d.classList.contains("phone")?(max>=2?1.5:1.25):max,devicePixelRatio||1);
const P="#help,#help .card,.ov,.card2,.pan,.abOv,.abPan,#dzOv,#dzBody,#dzTabs,#playOv,.spCard,#gopanel,#goto,#tripBody,.scroll,.modal,.panel,.sheet,[data-scroll]";
const A=P.split(",").map(s=>s+","+s+" *").join(",");
const css=`html,body{touch-action:manipulation}
${A}{touch-action:pan-x pan-y!important}
#playOv canvas,#dzPrev,#dzPrev *,html:not(.phone) .tl li,html:not(.phone) .tl li *,#labCv,input[type=range],.stage,.stage *,canvas.nopan{touch-action:none!important}
.card2,.pan,.abPan,.spCard,#gopanel,#dzBody,.scroll{overflow-y:auto!important;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}
.card2,.abPan,.spCard{max-height:calc(100dvh - 16px - env(safe-area-inset-top) - env(safe-area-inset-bottom))!important}
.card2>.ovClose:not(.inl),.abPan>.abX,.pan>.x:first-child,.pan>.ovClose:first-child{position:sticky!important;top:0;float:right;z-index:5;margin:-6px -6px 0 6px}
html.phone .card2{padding:10px!important;width:96vw!important;font-size:10px}
html.phone .tgrid{grid-template-columns:repeat(auto-fill,minmax(104px,1fr))!important;gap:6px!important}
html.phone .tcard{min-height:84px!important;padding:6px!important;font-size:11px!important}html.phone .tcard .te{font-size:26px!important}
html.phone .ttabs button{font-size:9px!important;padding:6px 7px!important}
html.phone #playOv canvas{max-height:calc(100dvh - 120px - env(safe-area-inset-top) - env(safe-area-inset-bottom))!important}
html.phone.land #playOv{flex-direction:row;flex-wrap:wrap;align-content:center}html.phone.land #playOv .ptitle{width:100%;margin:2px;font-size:12px}html.phone.land #playOv canvas{max-height:calc(100dvh - 60px)!important;max-width:72vw!important}html.phone.land #playOv .pbar{flex-direction:column;max-width:26vw}html.phone.land #playOv .pmsg{position:absolute;bottom:2px;left:0;right:0;font-size:11px}
body:has(.ov:not(.hidden)) #musicBtn,body:has(#playOv) #musicBtn,body:has(#dzOv:not(.hidden)) #musicBtn,body:has(.abOv:not(.hidden)) #musicBtn{display:none!important}
html.phone #musicBtn{width:40px!important;height:40px!important;font-size:20px!important;top:max(4px,env(safe-area-inset-top))!important;right:max(4px,env(safe-area-inset-right))!important}
html.phone #playOv button{font-size:11px;padding:7px 9px}

/* ---- Build World phone HUD ---- */
#rcaMenu{display:none}html.phone #rcaMenu{display:inline-block;background:#ffca28}
html.phone #top{right:56px!important;padding:max(4px,env(safe-area-inset-top)) 4px 4px max(4px,env(safe-area-inset-left))!important;gap:4px!important}
html.phone #top button,html.phone #goBtn{font-size:8px!important;padding:5px 7px!important;min-height:34px!important}
html.phone:not(.menuOpen) #top>button:not(:first-child):not(#rcaMenu){display:none!important}
html.phone:not(.menuOpen) #top>#hint{display:none}
html.phone #saved{display:none}
html.phone #goto{top:calc(48px + env(safe-area-inset-top))!important;left:max(4px,env(safe-area-inset-left))!important}
html.phone.menuOpen #goto{top:auto!important;bottom:-200px!important}
html.phone #gopanel{width:min(300px,62vw)!important;max-height:calc(100dvh - 120px - env(safe-area-inset-top) - env(safe-area-inset-bottom))!important}
html.phone #mm{width:84px!important;height:84px!important;top:calc(50px + env(safe-area-inset-top))!important;right:max(4px,env(safe-area-inset-right))!important}
html.phone #lm{top:calc(44px + env(safe-area-inset-top))!important;font-size:9px!important;padding:5px 8px!important;max-width:50vw}
html.phone #hud{top:calc(80px + env(safe-area-inset-top))!important}
html.phone #joy{width:112px!important;height:112px!important;left:max(10px,env(safe-area-inset-left))!important;bottom:max(10px,env(safe-area-inset-bottom))!important}
html.phone #knob{left:28px!important;top:28px!important;width:50px!important;height:50px!important}
html.phone #right{right:max(8px,env(safe-area-inset-right))!important;bottom:max(10px,env(safe-area-inset-bottom))!important;gap:6px!important}
html.phone #right button{width:54px!important;height:54px!important;font-size:18px!important;min-height:0!important}
html.phone #zoom{right:calc(70px + env(safe-area-inset-right))!important;bottom:calc(76px + env(safe-area-inset-bottom))!important;gap:6px!important}
html.phone #zoom button{width:42px!important;height:42px!important;font-size:16px!important;min-height:0!important}
html.phone #hotbar{left:calc(130px + env(safe-area-inset-left))!important;right:calc(70px + env(safe-area-inset-right))!important;bottom:max(10px,env(safe-area-inset-bottom))!important;padding:4px!important;gap:4px!important}
html.phone #hotbar .hb{flex:0 0 40px!important;width:40px!important;height:40px!important;min-height:0!important}
html.phone #modes{left:calc(130px + env(safe-area-inset-left))!important;right:calc(118px + env(safe-area-inset-right))!important;bottom:calc(66px + env(safe-area-inset-bottom))!important;gap:4px!important}
html.phone #modes button{min-width:0!important;font-size:8px!important;padding:4px 6px!important;min-height:34px!important}
html.phone #look{display:none!important}
html.phone #toast{bottom:calc(150px + env(safe-area-inset-bottom))!important;font-size:10px!important}
html.phone #getIn,html.phone #playBtn{bottom:calc(150px + env(safe-area-inset-bottom))!important;font-size:12px!important;padding:10px 14px!important}
html.phone #flyHome{bottom:calc(128px + env(safe-area-inset-bottom))!important;font-size:11px!important;padding:8px 12px!important}
html.phone #vui{right:max(8px,env(safe-area-inset-right))!important;bottom:max(10px,env(safe-area-inset-bottom))!important;gap:5px!important}html.phone #vui button{width:72px!important;height:48px!important;font-size:16px!important;min-height:0!important}
html.phone #tricks{left:calc(130px + env(safe-area-inset-left))!important;right:calc(88px + env(safe-area-inset-right))!important;bottom:max(10px,env(safe-area-inset-bottom))!important;gap:4px!important}html.phone #tricks button{width:52px!important;height:46px!important;font-size:15px!important;min-height:0!important}
html.phone #help .card{font-size:9px!important;line-height:1.7!important;padding:12px!important;max-height:calc(100dvh - 20px)!important;overflow-y:auto!important}
html.phone #help,html.phone #help *{touch-action:pan-y!important}

/* ---- Workshop phone ---- */
html.phone #tools{gap:3px!important;max-height:calc(100% - 50px);overflow-y:auto;pointer-events:auto!important}
html.phone #tools button{font-size:8px!important;padding:4px 6px!important;min-height:32px!important}
html.phone .sw{width:30px!important;height:30px!important;border-width:3px!important}
html.phone #wrap>header,html.phone body>header{padding:max(4px,env(safe-area-inset-top)) 56px 4px max(4px,env(safe-area-inset-left))!important;gap:4px!important}
html.phone body>header button{font-size:8px!important;padding:5px 7px!important}
html.phone.land #panel{width:250px!important;padding-right:max(8px,env(safe-area-inset-right))!important}

/* ---- Dress-up ---- */
#dzSide,#dzBody{min-height:0!important}
html.phone:not(.land) #dzPrev{flex:0 0 34%!important}
html.phone #dzPrev .t{font-size:16px!important;top:6px!important}html.phone #dzPrev .b button{padding:6px 9px!important;font-size:13px!important}
html.phone #dzTabs button{font-size:12px!important;padding:6px 8px!important}html.phone .dzSet{grid-template-columns:repeat(auto-fill,minmax(120px,1fr))!important}html.phone .dzSet button,html.phone .dzG button{font-size:13px!important;padding:7px!important}

/* ---- Labs / timelines on phones: keep page scrollable around interactive canvases ---- */
html.phone #labCv{max-height:52dvh!important;width:auto!important;max-width:100%!important;margin:0 auto}
html.phone .tl li{touch-action:pan-y!important}html.phone .tl li *:not(.em){touch-action:pan-y!important}html.phone .tl li .em{touch-action:none!important;cursor:grab}html.phone .tl li .em::after{content:'↕';font-size:14px;margin-left:2px}
`;const st=document.createElement("style");st.id="rcaMobile";st.textContent=css;(document.head||d).appendChild(st);
function menuBtn(){const t=document.getElementById("top");if(!t||document.getElementById("rcaMenu"))return;const b=document.createElement("button");b.id="rcaMenu";b.textContent="☰ Menu";b.addEventListener("pointerdown",e=>{e.preventDefault();e.stopPropagation();d.classList.toggle("menuOpen");b.textContent=d.classList.contains("menuOpen")?"✖ Close":"☰ Menu"});t.insertBefore(b,t.children[1]||null)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",menuBtn);else menuBtn();
// never block scrolling inside panels: stop page-level touchmove blockers from seeing panel touches
document.addEventListener("touchmove",e=>{const t=e.target;if(t&&t.closest&&t.closest(P)&&!t.closest("#playOv canvas,#dzPrev,.tl li,#labCv,.stage"))e.stopImmediatePropagation()},{capture:true,passive:true});
})();
