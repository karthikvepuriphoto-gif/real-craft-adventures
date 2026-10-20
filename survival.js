/* Real Craft Adventures: gentle Survival Mode (no monsters, no damage, nothing lost). Off by default. */
(function(){
const DAYLEN=600,NIGHT0=.62,NIGHT1=.95; // 10-minute day: day, sunset, night, sunrise
const FOOD={berries:{e:"🫐",n:"Berries",v:12},corn:{e:"🌽",n:"Corn",v:15,farm:1},tomato:{e:"🍅",n:"Tomato",v:12,farm:1},apple:{e:"🍎",n:"Apple",v:15,farm:1},rasp:{e:"🔴",n:"Raspberries",v:12,farm:1},carrot:{e:"🥕",n:"Carrot",v:12,farm:1},
 roastcorn:{e:"🌽",n:"Roasted Corn",v:30},cornsoup:{e:"🍲",n:"Corn Soup",v:40},eggs:{e:"🍳",n:"Scrambled Eggs",v:35},bread:{e:"🍞",n:"Bread",v:35},beansoup:{e:"🥣",n:"Bean Soup",v:40},bakedpot:{e:"🥔",n:"Baked Potato",v:35},jam:{e:"🫙",n:"Berry Toast",v:45}};
const FARMIN=["corn","wheat","soy","beans","tomato","apple","pumpkin","rasp","carrot","potato","egg","milk"];
const RAWN={wheat:["🌾","Wheat"],soy:["🫛","Soybeans"],beans:["🫘","Beans"],pumpkin:["🎃","Pumpkin"],egg:["🥚","Egg"],milk:["🥛","Milk"],potato:["🥔","Potato"]};
const COOK=[
 {k:"roastcorn",need:{corn:1},t:"Heat turns some of the starch in corn sweet and toasty."},
 {k:"cornsoup",need:{corn:2,milk:1},t:"Warm soup: corn cooked in milk."},
 {k:"eggs",need:{egg:2},t:"Cook eggs until the white and yolk are firm. That makes them safe to eat!"},
 {k:"bread",need:{wheat:3},t:"Wheat is ground into flour, then baked into bread."},
 {k:"beansoup",need:{beans:2},alt:{soy:2},t:"Dry beans must be cooked until soft before we eat them."},
 {k:"bakedpot",need:{potato:1},t:"A potato is a tuber, a plant part that grows underground and stores food."},
 {k:"jam",need:{berries:3,wheat:1},t:"Berries cooked with sugar make jam. Spread it on toast!"}];
const FACTS={
 day:["🌍 Why do we have day and night?","The Earth spins like a top. It turns all the way around about once every 24 hours. When your side of the Earth faces the Sun, it is daytime. When your side turns away from the Sun, it is night!"],
 sleep:["😴 Why do we sleep?","Sleep helps your brain sort and save what you learned, and it helps your body grow and repair itself. Kids ages 6 to 12 need about 9 to 12 hours of sleep each night (American Academy of Sleep Medicine)."],
 food:["🍎 Food is energy!","Food gives your body energy to move, think and grow. Food energy is measured in Calories. Fruits, vegetables, grains, beans and eggs all help fuel your body."],
 berry:["🫐 Berry safety","Some wild berries look tasty but are poisonous. In real life, only eat berries that a grown-up says are safe!"],
 light:["💡 Light at night","Long ago, people used fire, candles and oil lamps at night. Thomas Edison's team made a long-lasting electric light bulb in 1879."]};
let B,S,KEYSV,hud,lights=[],lastScan=0,bushT=0,dimSet=false,faded=false,lastPhase="",homeP=null,sky0=null,fog0=null,i0=null;
const $=id=>document.getElementById(id);
function wait(){if(window.BW&&window.BW.scene&&window.BW.ADV)init();else setTimeout(wait,200)}
function save(){try{localStorage.setItem(KEYSV,JSON.stringify(S))}catch(e){}}
function farmKey(){let h={id:"lincoln"};try{h=JSON.parse(localStorage.getItem("realcraft_hometown_v1"))||h}catch(e){}return "realcraft_farm_v1_"+(h.id||"lincoln")}
function farmLoad(){try{return JSON.parse(localStorage.getItem(farmKey())||"null")}catch(e){return null}}
const inv=()=>B.ADV.inv;
function has(k){return inv()[k]||0}
function init(){B=window.BW;KEYSV="realcraft_survival_v1_"+B.KEYA.slice("realcraft_adv_v1_".length);
 S=Object.assign({on:false,t:.05,energy:100,nights:0,cozy:0,stars:0,badges:{},facts:{},ate:0,cooked:{},picked:0,asked:0},(()=>{try{return JSON.parse(localStorage.getItem(KEYSV)||"{}")}catch(e){return{}}})());
 Object.assign(B.ITM,Object.fromEntries(Object.entries(FOOD).filter(([k])=>!B.ITM[k]).map(([k,f])=>[k,{n:f.n,e:f.e}])));
 for(const k in RAWN)if(!B.ITM[k])B.ITM[k]={n:RAWN[k][1],e:RAWN[k][0]};
 sky0=B.scene.background.clone();fog0=B.scene.fog.color.clone();i0={s:B.sun.intensity,h:B.hemi.intensity,a:B.amb.intensity};
 for(let i=0;i<4;i++){const l=new B.THREE.PointLight("#ffb74d",0,9,1.5);B.scene.add(l);lights.push(l)}
 homeP={x:.5,z:8.5};homeP.y=B.groundTop(homeP.x,homeP.z);if(S.on)setTimeout(ensureBushes,1500);
 $("helpOk").addEventListener("click",()=>{if(!S.asked)setTimeout(askMode,500)});
 buildUI();apply();
 if(!S.asked&&!localStorage.getItem("realcraft_bw_help_pending"))setTimeout(askMode,1200);
 let last=performance.now();(function loop(now){const dt=Math.min(.25,(now-last)/1000);last=now;try{tick(dt)}catch(e){console.warn(e)}requestAnimationFrame(loop)})(last);
 window.SURV={S,picked,ensureBushes,cook:openCook,toggle,setTime:t=>{S.t=t},setEnergy:e=>{S.energy=e},shelter:shelterCheck,sleep:trySleep,openPanel,FOOD,COOK,tick};}
function css(){const st=document.createElement("style");st.textContent=`
#svHud{position:fixed;left:50%;transform:translateX(-50%);top:62px;z-index:9;display:none;align-items:center;gap:6px;background:rgba(0,0,0,.6);color:#fff;border:3px solid #000;border-radius:12px;padding:4px 8px;font:bold 12px system-ui;pointer-events:auto}
body.surv #svHud{display:flex}body.riding #svHud,body.realm #svHud{display:none!important}
#svBar{width:110px;height:14px;background:#333;border:2px solid #fff;border-radius:8px;overflow:hidden}#svBar i{display:block;height:100%;background:linear-gradient(90deg,#ffb300,#7cb342);transition:width .5s}
#svHud button{font-size:13px;padding:4px 8px;min-height:32px;border-radius:9px}
#svMode{position:fixed;right:68px;top:8px;z-index:11;font-size:12px;padding:6px 10px;min-height:40px;border-radius:10px}#svMode.on{background:#ffca28}
body.realm #svMode,body.riding #svMode{display:none}
#svFade{position:fixed;inset:0;background:#0d1b3a;opacity:0;pointer-events:none;transition:opacity 1.6s;z-index:60;display:flex;align-items:center;justify-content:center;color:#fff;font:bold 22px system-ui;text-align:center}
#svFade.on{opacity:1;pointer-events:auto}
.svGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;margin:8px 0}.svCard{background:#fff8e1;border:3px solid #000;border-radius:10px;padding:6px;text-align:center;font-size:12px}.svCard .e{font-size:28px}.svCard button{font-size:12px;padding:4px 8px;min-height:34px;margin-top:4px}
.svChk div{padding:3px 0;font-size:14px}
html.phone #svHud{top:calc(46px + env(safe-area-inset-top));padding:2px 6px;font-size:10px;gap:4px}html.phone #svBar{width:70px;height:11px}html.phone #svHud button{font-size:11px;padding:2px 6px;min-height:28px}
html.phone:not(.land) #svHud{top:calc(140px + env(safe-area-inset-top));left:60px;right:4px;transform:none;justify-content:center}html.phone:not(.land) #svBar{width:54px}html.phone.land #svHud{top:calc(6px + env(safe-area-inset-top))}
html.phone #svMode{top:calc(6px + env(safe-area-inset-top));right:62px;font-size:10px;padding:4px 6px;min-height:34px}
`;document.head.appendChild(st)}
function buildUI(){css();
 hud=document.createElement("div");hud.id="svHud";hud.innerHTML=`<span id="svClock">☀️</span><span>⚡</span><div id="svBar"><i></i></div><span id="svNum">100</span><button id="svEat" class="go">🍽️ Eat</button><button id="svSleep">😴 Sleep</button><button id="svInfo">🏕️</button>`;document.body.appendChild(hud);
 const m=document.createElement("button");m.id="svMode";document.body.appendChild(m);
 const f=document.createElement("div");f.id="svFade";document.body.appendChild(f);
 const ov=document.createElement("div");ov.id="svOv";ov.className="ov hidden";ov.innerHTML=`<div class="card2"><button class="ovClose" id="svClose">✖</button><div id="svBody"></div></div>`;document.body.appendChild(ov);
 const tb=(id,fn)=>$(id).addEventListener("pointerdown",e=>{e.preventDefault();e.stopPropagation();fn()});
 tb("svMode",()=>S.on?confirmOff():toggle(true));tb("svEat",()=>openPanel("eat"));tb("svSleep",trySleep);tb("svInfo",()=>openPanel("base"));
 $("svClose").onclick=()=>B.closeOv("svOv");}
function confirmOff(){openBody(`<h3>🎨 Switch to Creative?</h3><p>Your energy and day clock will pause. Your shelter and food stay saved.</p><button class="go" id="svYes">🎨 Creative</button> <button id="svNo">🏕️ Keep Survival</button>`);$("svYes").onclick=()=>{B.closeOv("svOv");toggle(false)};$("svNo").onclick=()=>B.closeOv("svOv")}
function askMode(){if(!$("help").classList.contains("hidden")||document.querySelector("#htPick,.htPick"))return;S.asked=1;save();
 openBody(`<h3>🌍 How do you want to play?</h3><div class="svGrid"><div class="svCard"><div class="e">🎨</div><b>Creative</b><br>Build anything, no energy bar.<br><button class="go" id="svC">🎨 Creative</button></div><div class="svCard"><div class="e">🏕️</div><b>Survival</b><br>Find food, keep your energy up, build a cozy shelter before night.<br><button id="svS">🏕️ Survival</button></div></div><small>No monsters, no getting hurt. You can switch anytime with the button at the top.</small>`);
 $("svC").onclick=()=>{B.closeOv("svOv");toggle(false,true)};$("svS").onclick=()=>{B.closeOv("svOv");toggle(true)}}
function toggle(on,quiet){S.on=!!on;save();apply();if(quiet)return;if(on){B.toast("🏕️ Survival on! Eat to keep ⚡ energy up. Build a shelter before night 🌙");setTimeout(()=>fact("day"),2800);ensureBushes()}else B.toast("🎨 Creative mode: build freely!")}
function apply(){document.body.classList.toggle("surv",S.on);const m=$("svMode");m.textContent=S.on?"🏕️ Survival":"🎨 Creative";m.classList.toggle("on",S.on);if(!S.on)light(0)}
function fact(k,force){if(S.facts[k]&&!force)return;S.facts[k]=1;save();const[t,b]=FACTS[k];openBody(`<div class="big">${t.split(" ")[0]}</div><h3>${t.replace(/^\S+\s/,"")}</h3><p>${b}</p><button id="svSay">🔊 Read to me</button> <button class="go" id="svOk">👍 Got it</button>`);$("svSay").onclick=()=>B.advSay(t.replace(/^\S+\s/,"")+". "+b);$("svOk").onclick=()=>B.closeOv("svOv")}
function openBody(h){$("svBody").innerHTML=h;B.openOv("svOv")}
function home(){return !B.away()&&!B.realm()&&!B.ride()}
// ----- day & night -----
function phase(){const t=S.t;return t<NIGHT0-.07?"day":t<NIGHT0?"dusk":t<NIGHT1?"night":"dawn"}
function dayLight(){const t=S.t;if(t<NIGHT0-.07)return 1;if(t<NIGHT0)return 1-(t-(NIGHT0-.07))/.07;if(t<NIGHT1)return 0;return (t-NIGHT1)/(1-NIGHT1)}
function light(dark){const T=B.THREE,n=new T.Color("#26365e");B.scene.background.copy(sky0).lerp(n,dark*.85);B.scene.fog.color.copy(fog0).lerp(n,dark*.85);
 B.sun.intensity=i0.s*(1-dark*.88);B.hemi.intensity=i0.h*(1-dark*.62);B.amb.intensity=i0.a*(1+dark*.2);B.hemi.color.set(dark>.5?"#b9c8ff":"#ffffff")}
function scanLights(dark){const P=B.P,x0=Math.floor(P.x),y0=Math.floor(P.y),z0=Math.floor(P.z),found=[];
 if(dark>.05)for(let dx=-10;dx<=10;dx++)for(let dz=-10;dz<=10;dz++)for(let dy=-3;dy<=6;dy++){const id=B.get(x0+dx,y0+dy,z0+dz);if(id===49||id===52||id===68)found.push([x0+dx+.5,y0+dy+.5,z0+dz+.5,dx*dx+dz*dz+dy*dy,id])}
 found.sort((a,b)=>a[3]-b[3]);lights.forEach((l,i)=>{const f=found[i];if(f){l.position.set(f[0],f[1],f[2]);l.intensity=(f[4]===52?2.4:f[4]===68?2.6:1.8)*dark;l.color.set(f[4]===52?"#ffe082":"#ffb74d")}else l.intensity=0})}
function tick(dt){if(!S.on){return}
 const atHome=home();
 if(atHome&&!faded){S.t=(S.t+dt/DAYLEN)%1}
 const ph=phase(),dark=atHome?1-dayLight():0;
 if(atHome||!dimSet){light(dark);dimSet=!atHome}
 if(performance.now()-lastScan>700){lastScan=performance.now();scanLights(dark)}
 if(atHome&&ph!==lastPhase){if(lastPhase&&ph==="dusk")B.toast("🌇 The sun is setting! Get to your shelter, light torches and find your bed 🛏️");if(lastPhase&&ph==="night"){B.toast("🌙 Nighttime! Stand by your bed and tap 😴 Sleep.");setTimeout(()=>fact("sleep"),2000)}if(lastPhase&&ph==="day"&&lastPhase==="dawn")B.toast("☀️ Good morning!");lastPhase=ph}
 // energy: slow drain (about 12 minutes from full while moving, slower when resting)
 if(atHome&&!faded){const mv=Math.hypot(B.inp.jx||0,B.inp.jy||0)>.1||Object.values(B.inp.keys||{}).some(Boolean);S.energy=Math.max(0,S.energy-dt*(mv?.14:.06)*(B.P.fly?1.4:1));if(S.energy<=0)sleepy()}
 if(S.energy<25&&!S.lowTip&&atHome){S.lowTip=1;B.toast("🥱 Getting sleepy… tap 🍽️ Eat for a snack!")}if(S.energy>40)S.lowTip=0;
 bushT+=dt;if(bushT>5&&atHome){bushT=0;regrow();save()}
 const c=$("svClock");const hr=Math.floor(((S.t*24)+6)%24),mn=Math.floor(((S.t*24*60)+360)%60/15)*15;c.textContent=(ph==="night"?"🌙":ph==="dusk"?"🌇":ph==="dawn"?"🌅":"☀️")+" "+((hr%12)||12)+":"+String(mn).padStart(2,"0")+(hr<12?" AM":" PM");
 hud.querySelector("#svBar i").style.width=S.energy+"%";$("svNum").textContent=Math.round(S.energy);$("svSleep").classList.toggle("go",ph==="night"||ph==="dusk")}
// ----- energy & food -----
function sleepy(){if(faded)return;faded=true;const f=$("svFade");f.innerHTML="😴💤<br><small>So sleepy… time for a nap!</small>";f.classList.add("on");
 setTimeout(()=>{wakeAt();S.energy=60;save();f.innerHTML="☀️<br><small>You took a cozy nap and woke up "+(bedOK()?"in your bed":"at home")+". Nothing was lost!</small>";setTimeout(()=>{f.classList.remove("on");faded=false;B.toast("🍽️ Eat something to fill up your ⚡ energy!")},1800)},1900)}
function bedOK(){const b=B.ADV.bed;return b&&B.get(b.x,b.y,b.z)===51}
function wakeAt(){const P=B.P,b=bedOK()?B.ADV.bed:null;let x=b?b.x+.5:homeP.x,z=b?b.z+1.5:homeP.z;if(b){for(const[dx,dz]of[[0,1],[1,0],[-1,0],[0,-1]]){const tx=b.x+dx,tz=b.z+dz;if(!B.get(tx,b.y,tz)&&!B.get(tx,b.y+1,tz)){x=tx+.5;z=tz+.5;break}}}
 P.x=x;P.z=z;P.vy=0;P.fly=false;let y=b?b.y:B.groundTop(x,z);while(B.collide(P.x,y,P.z)&&y<47)y++;P.y=y}
function farmFoods(){const F=farmLoad();if(!F)return null;return F}
function takeFarm(){const F=farmLoad();if(!F)return B.toast("🚜 Visit My First Farm and grow some crops first!");let got=[];
 F.inv=F.inv||{};for(const k of FARMIN){const n=Math.min(5,F.inv[k]||0);if(n>0){F.inv[k]-=n;inv()[k]=(inv()[k]||0)+n;got.push(n+" "+(FOOD[k]||{e:RAWN[k]?RAWN[k][0]:""}).e)}}
 if(!got.length)return B.toast("🧺 Your farm basket is empty. Harvest crops or collect eggs at My First Farm!");
 localStorage.setItem(farmKey(),JSON.stringify(F));B.saveADV();B.toast("🧺 Brought from the farm: "+got.join(" "));openPanel("eat")}
function eat(k){if(!(has(k)>0))return;const f=FOOD[k];inv()[k]--;S.energy=Math.min(100,S.energy+f.v);S.ate++;save();B.saveADV();B.beep(660,.06);setTimeout(()=>B.beep(880,.06),80);B.toast("😋 Yum! "+f.e+" "+f.n+" +"+f.v+" ⚡");checkBadges();openPanel("eat");if(!S.facts.food)setTimeout(()=>fact("food"),900)}
function canCook(r){const ok=n=>Object.entries(n).every(([k,v])=>has(k)>=v);return ok(r.need)?r.need:r.alt&&ok(r.alt)?r.alt:null}
function nearFire(){const P=B.P,x0=Math.floor(P.x),y0=Math.floor(P.y),z0=Math.floor(P.z);for(let x=-4;x<=4;x++)for(let y=-2;y<=2;y++)for(let z=-4;z<=4;z++)if(B.get(x0+x,y0+y,z0+z)===68)return true;return false}
function openCook(){const nf=nearFire();const chip=(k,n)=>{const I=B.ITM[k]||{e:"",n:k};return `<span class="ichip ${has(k)>=n?"ok":"no"}">${I.e} ${I.n} <b>${has(k)}/${n}</b></span>`};
 openBody(`<h3>🏕️ Campfire Cooking</h3>${nf?"<p>🔥 Your campfire is warm and ready!</p>":"<p>Craft a 🏕️ Campfire (3 sticks + 1 coal) in ⚒️ Craft, place it, then tap it to cook.</p>"}<div class="svGrid">${COOK.map((r,i)=>{const use=canCook(r);const I=FOOD[r.k];return `<div class="svCard"><div class="e">${I.e}</div><b>${I.n}</b> <small>+${I.v}⚡</small><div>${Object.entries(r.need).map(([k,n])=>chip(k,n)).join(" + ")}${r.alt?" <small>or</small> "+Object.entries(r.alt).map(([k,n])=>chip(k,n)).join(" + "):""}</div><small>${r.t}</small><br><button class="${use&&nf?"go":""}" data-ck="${i}">${!nf?"🔥 Needs campfire":use?"🍳 Cook it":"Need more"}</button></div>`}).join("")}</div><button id="svFarm">🧺 Bring food from My First Farm</button>`);
 $("svFarm").onclick=takeFarm;document.querySelectorAll("[data-ck]").forEach(b=>b.onclick=()=>{const r=COOK[+b.dataset.ck],use=canCook(r);if(!nearFire())return B.toast("🔥 Stand near your campfire to cook!");if(!use)return B.toast("Need more ingredients!");for(const[k,n]of Object.entries(use))inv()[k]-=n;inv()[r.k]=(inv()[r.k]||0)+1;S.cooked[r.k]=1;save();B.saveADV();B.beep(520,.08);setTimeout(()=>B.beep(780,.1),100);B.toast("🍳 You cooked "+FOOD[r.k].e+" "+FOOD[r.k].n+"!");checkBadges();openCook()})}
function openPanel(tab){if(tab==="eat"){const ks=Object.keys(FOOD).filter(k=>has(k)>0);
  openBody(`<h3>🍽️ Snack time · ⚡ ${Math.round(S.energy)}/100</h3>${ks.length?`<div class="svGrid">${ks.map(k=>`<div class="svCard"><div class="e">${FOOD[k].e}</div><b>${FOOD[k].n}</b> ×${has(k)}<br><small>+${FOOD[k].v} ⚡</small><br><button class="go" data-eat="${k}">😋 Eat</button></div>`).join("")}</div>`:`<p>No food in your bag yet!</p>`}
  <p>🫐 Break a <b>berry bush</b> near home to pick berries · 🚜 bring crops and eggs from My First Farm · 🏕️ cook at a campfire for big energy.</p><button id="svFarm">🧺 Bring food from My First Farm</button> <button id="svCook">🏕️ Cooking recipes</button>`);
  document.querySelectorAll("[data-eat]").forEach(b=>b.onclick=()=>eat(b.dataset.eat));$("svFarm").onclick=takeFarm;$("svCook").onclick=openCook;return}
 const c=shelterCheck();const L=(ok,t)=>`<div>${ok?"✅":"⬜"} ${t}</div>`;
 openBody(`<h3>🏕️ Night Shelter Challenge</h3><p>Before dark, build a cozy shelter around your bed. Then sleep to skip to morning!</p><div class="svChk">${L(c.bed,"🛏️ Place a bed (craft it in ⚒️ Craft)")}${L(c.roof,"🏠 A roof over the bed")}${L(c.walls,"🧱 Walls on all 4 sides")}${L(c.door,"🚪 A door")}${L(c.torch,"🔥 Torches or a lantern inside")}</div>
 <p>🌙 Nights slept: <b>${S.nights}</b> · 🏡 Cozy nights: <b>${S.cozy}</b> · ⭐ Survival stars: <b>${S.stars}</b></p><p>🏅 ${S.badges.cozy?"✅":"⬜"} Cozy Base · ${S.badges.chef?"✅":"⬜"} Campfire Chef · ${S.badges.nights3?"✅":"⬜"} 3 Cozy Nights</p>
 <button id="svF1">🌍 Why day and night?</button> <button id="svF2">😴 Why we sleep</button> <button id="svF3">💡 Light at night</button> <button id="svF4">🫐 Berry safety</button>`);
 $("svF1").onclick=()=>fact("day",1);$("svF2").onclick=()=>fact("sleep",1);$("svF3").onclick=()=>fact("light",1);$("svF4").onclick=()=>fact("berry",1)}
// ----- shelter -----
function shelterCheck(){const b=bedOK()?B.ADV.bed:null,r={bed:!!b,roof:false,walls:false,door:false,torch:false};if(!b)return r;const g=B.get;
 for(let y=b.y+2;y<=b.y+7;y++)if(g(b.x,y,b.z)&&g(b.x,y,b.z)!==49){r.roof=true;break}
 let w=0;for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]]){for(let s=1;s<=7;s++){const id=g(b.x+dx*s,b.y,b.z+dz*s)||g(b.x+dx*s,b.y+1,b.z+dz*s);if(id&&id!==49&&id!==52){w++;break}}}r.walls=w===4;
 for(let x=-7;x<=7;x++)for(let y=-1;y<=5;y++)for(let z=-7;z<=7;z++){const id=g(b.x+x,b.y+y,b.z+z);if(id===50)r.door=true;if((id===49||id===52)&&Math.abs(x)<=6&&Math.abs(z)<=6)r.torch=true}
 r.all=r.bed&&r.roof&&r.walls&&r.door&&r.torch;return r}
function trySleep(){if(!home())return B.toast("🏠 Sleep at home in your bed!");const ph=phase();if(ph==="day")return B.toast("☀️ It's daytime! You can sleep when it gets dark 🌇");
 const b=bedOK()?B.ADV.bed:null;if(!b)return B.toast("🛏️ You need a bed! Craft one in ⚒️ Craft and place it in your shelter.");
 if(Math.hypot(B.P.x-b.x-.5,B.P.z-b.z-.5)>4)return B.toast("🛏️ Walk over to your bed first!");
 const c=shelterCheck();faded=true;const f=$("svFade");f.innerHTML="🌙💤<br><small>Good night…</small>";f.classList.add("on");
 setTimeout(()=>{S.t=.02;S.energy=Math.max(S.energy,90);S.nights++;let msg="☀️ Good morning! You slept all night.";
  if(c.all){S.cozy++;S.stars+=2;B.addStars(2);msg="☀️ Good morning! Cozy shelter: ⭐+2";if(!S.badges.cozy){S.badges.cozy=Date.now();S.stars++;B.addStars(1);msg="🏅 Cozy Base badge! Your shelter has a roof, walls, a door, torches and a bed. ⭐+3"}}
  else msg+=" Tip: tap 🏕️ to see what your shelter still needs.";
  checkBadges();save();wakeAt();light(0);f.innerHTML=msg.replace(/^(\S+)\s/,"$1<br><small>")+"</small>";setTimeout(()=>{f.classList.remove("on");faded=false;lastPhase="day";if(!S.facts.light)setTimeout(()=>fact("light"),600)},2600)},1900)}
function checkBadges(){const give=(k,n)=>{if(S.badges[k])return;S.badges[k]=Date.now();S.stars++;B.addStars(1);setTimeout(()=>B.toast("🏅 Badge: "+n+"! ⭐+1"),1200)};
 if(Object.keys(S.cooked).length>=1)give("chef","Campfire Chef");if(S.cozy>=3)give("nights3","3 Cozy Nights");if(S.ate>=10)give("snack10","Healthy Snacker");save()}
// ----- berry bushes near home -----
function ensureBushes(){if(!home()||S.bushes)return;const out=[];let tries=0,a=0;while(out.length<10&&tries++<400){a+=2.4;const d=6+tries*.15,x=Math.floor(homeP.x+Math.cos(a)*d),z=Math.floor(homeP.z+Math.sin(a)*d),g=B.groundTop(x,z);if(g<1||g>3||B.get(x,g,z)||B.get(x,g+1,z))continue;const top=B.get(x,g-1,z);if(top!==1&&top!==2)continue;B.set(x,g,z,67);out.push([x,g,z])}
 S.bushes=out;S.regrow={};save();B.saveNow();B.toast("🫐 Berry bushes grew near you! Break one to pick berries.")}
function regrow(){if(!S.bushes)return;const now=Date.now();S.regrow=S.regrow||{};let ch=0;S.bushes.forEach(([x,y,z],i)=>{const id=B.get(x,y,z);if(id===67){delete S.regrow[i];return}if(id)return;if(!S.regrow[i]){S.regrow[i]=now;return}if(now-S.regrow[i]>90000&&!(Math.abs(B.P.x-x-.5)<1&&Math.abs(B.P.z-z-.5)<1)){B.set(x,y,z,67);delete S.regrow[i];ch=1}});if(ch)B.saveNow()}
function picked(){S.picked++;save();if(!S.facts.berry)setTimeout(()=>fact("berry"),900)}
wait();
})();
