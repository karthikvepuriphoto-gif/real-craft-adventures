// Real Craft Adventures: shared phone/tablet adaptation + touch-scroll fixes (loaded by every page)
(function(){const d=document.documentElement;
function cls(){const w=innerWidth,h=innerHeight,s=Math.min(w,h),touch=matchMedia("(pointer:coarse)").matches||"ontouchstart"in window;d.classList.toggle("phone",s<=500&&touch||s<=430);d.classList.toggle("land",w>h);d.classList.toggle("ptr",!!touch);d.style.setProperty("--vh",h/100+"px")}
cls();addEventListener("resize",cls);addEventListener("orientationchange",()=>setTimeout(cls,200));
window.RCA_DPR=()=>Math.min(d.classList.contains("phone")?1.5:2,devicePixelRatio||1);
const P=".ov,.card2,.pan,.abOv,.abPan,#dzOv,#dzBody,#dzTabs,#playOv,.spCard,#gopanel,#goto,#tripBody,.scroll,.modal,.panel,.sheet,[data-scroll]";
const A=P.split(",").map(s=>s+","+s+" *").join(",");
const css=`html,body{touch-action:manipulation}
${A}{touch-action:pan-x pan-y!important}
#playOv canvas,#dzPrev,#dzPrev *,.tl li,.tl li *,#labCv,input[type=range],.stage,.stage *,canvas.nopan{touch-action:none!important}
.card2,.pan,.abPan,.spCard,#gopanel,#dzBody,.scroll{overflow-y:auto!important;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}
.card2,.abPan,.spCard{max-height:calc(100dvh - 16px - env(safe-area-inset-top) - env(safe-area-inset-bottom))!important}
.card2>.ovClose:not(.inl){position:sticky!important;top:0;float:right;z-index:5;margin:-6px -6px 0 6px}
html.phone .card2{padding:10px!important;width:96vw!important;font-size:10px}
html.phone .tgrid{grid-template-columns:repeat(auto-fill,minmax(104px,1fr))!important;gap:6px!important}
html.phone .tcard{min-height:84px!important;padding:6px!important;font-size:11px!important}html.phone .tcard .te{font-size:26px!important}
html.phone .ttabs button{font-size:9px!important;padding:6px 7px!important}
html.phone #playOv canvas{max-height:calc(100dvh - 120px - env(safe-area-inset-top) - env(safe-area-inset-bottom))!important}
html.phone.land #playOv{flex-direction:row;flex-wrap:wrap;align-content:center}html.phone.land #playOv .ptitle{width:100%;margin:2px;font-size:12px}html.phone.land #playOv canvas{max-height:calc(100dvh - 60px)!important;max-width:72vw!important}html.phone.land #playOv .pbar{flex-direction:column;max-width:26vw}html.phone.land #playOv .pmsg{position:absolute;bottom:2px;left:0;right:0;font-size:11px}
body:has(.ov:not(.hidden)) #musicBtn,body:has(#playOv) #musicBtn,body:has(#dzOv:not(.hidden)) #musicBtn,body:has(.abOv:not(.hidden)) #musicBtn{display:none!important}
html.phone #musicBtn{width:40px!important;height:40px!important;font-size:20px!important;top:max(4px,env(safe-area-inset-top))!important;right:max(4px,env(safe-area-inset-right))!important}
html.phone #playOv button{font-size:11px;padding:7px 9px}
`;const st=document.createElement("style");st.id="rcaMobile";st.textContent=css;(document.head||d).appendChild(st);
// never block scrolling inside panels: stop page-level touchmove blockers from seeing panel touches
document.addEventListener("touchmove",e=>{const t=e.target;if(t&&t.closest&&t.closest(P)&&!t.closest("#playOv canvas,#dzPrev,.tl li,#labCv,.stage"))e.stopImmediatePropagation()},{capture:true,passive:true});
})();
