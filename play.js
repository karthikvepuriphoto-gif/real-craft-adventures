// Real Craft Adventures: place mini-games (flag football, playground, sand castles)
const CSS=`#playOv{position:fixed;inset:0;z-index:9000;background:#000c;display:flex;flex-direction:column;align-items:center;justify-content:center;touch-action:none;font-family:inherit}
#playOv .pbar{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;padding:8px;max-width:100%}
#playOv button{font-size:14px;padding:10px 14px;border:3px solid #000;box-shadow:0 3px 0 #000;background:#fff;color:#000;cursor:pointer;font-family:inherit}
#playOv button.on{background:#ffca28}#playOv canvas{background:#87ceeb;border:4px solid #000;max-width:98vw;max-height:72dvh;touch-action:none}
#playOv .ptitle{color:#fff;font-size:16px;margin:6px;text-align:center}#playOv .pmsg{color:#ffeb3b;font-size:13px;min-height:18px;text-align:center;padding:0 8px}`;
let st=null,raf=0;
function shell(title){if(!document.getElementById("playCss")){const s=document.createElement("style");s.id="playCss";s.textContent=CSS;document.head.appendChild(s)}close();
 const o=document.createElement("div");o.id="playOv";o.innerHTML=`<div class="ptitle">${title}</div><canvas width="800" height="500"></canvas><div class="pmsg"></div><div class="pbar"></div>`;document.body.appendChild(o);
 const bar=o.querySelector(".pbar"),cv=o.querySelector("canvas"),g=cv.getContext("2d"),msg=t=>o.querySelector(".pmsg").textContent=t;
 const btn=(t,f,cls)=>{const b=document.createElement("button");b.textContent=t;if(cls)b.className=cls;b.onclick=e=>{e.stopPropagation();f(b)};bar.appendChild(b);return b};
 const pos=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)/r.width*800,(e.clientY-r.top)/r.height*500]};
 return{o,bar,cv,g,msg,btn,pos}}
export function close(){cancelAnimationFrame(raf);const o=document.getElementById("playOv");if(o)o.remove();st=null}
export function isOpen(){return!!document.getElementById("playOv")}
const loop=f=>{let last=performance.now();const t=n=>{const dt=Math.min(.05,(n-last)/1000);last=n;f(dt,n/1000);raf=requestAnimationFrame(t)};raf=requestAnimationFrame(t)};
const kid=(g,x,y,s,shirt="#1e88e5")=>{g.fillStyle="#3949ab";g.fillRect(x-5*s,y-10*s,4*s,10*s);g.fillRect(x+1*s,y-10*s,4*s,10*s);g.fillStyle=shirt;g.fillRect(x-6*s,y-22*s,12*s,12*s);g.fillStyle="#e0ac69";g.fillRect(x-5*s,y-32*s,10*s,10*s);g.fillStyle="#3e2723";g.fillRect(x-5*s,y-33*s,10*s,3*s)};

// ---------- FLAG FOOTBALL ----------
export function openFootball(){const S=shell("🏈 Flag Football — no tackling! Pull flags to stop the runner");const{g,cv,msg,btn,pos}=S;
 const F={score:0,down:1,los:120,state:"ready"};let me,mates,defs,ball,joy=null;
 function setup(){me={x:F.los,y:250,c:"#1e88e5",me:1};mates=[{x:F.los+10,y:110,c:"#42a5f5",dy:-1},{x:F.los+10,y:390,c:"#42a5f5",dy:1}];defs=[{x:F.los+90,y:160},{x:F.los+90,y:340},{x:F.los+200,y:250}].map(d=>({...d,c:"#e53935"}));ball={on:me,x:me.x,y:me.y,fly:null};F.state="play";msg("Down "+F.down+": drag to run • tap a blue teammate to PASS • reach the end zone!")}
 setup();
 cv.onpointerdown=e=>{const[x,y]=pos(e);const m=mates.find(q=>Math.hypot(q.x-x,q.y-y)<28);if(m&&ball.on===me&&F.state==="play"){ball.on=null;ball.fly={x0:me.x,y0:me.y,tx:m.x+20,ty:m.y,t:0,to:m};msg("🏈 Pass!");return}joy={x,y,cx:x,cy:y}};
 cv.onpointermove=e=>{if(joy){const[x,y]=pos(e);joy.cx=x;joy.cy=y}};cv.onpointerup=cv.onpointercancel=()=>joy=null;
 btn("🔄 New game",()=>{F.score=0;F.down=1;F.los=120;setup()});btn("✖ Done",close);
 function endDown(t){F.state="over";msg(t);setTimeout(()=>{if(!isOpen())return;if(F.down>=4){F.down=1;F.los=120;msg("New set of downs!")}else F.down++;setup()},1600)}
 loop((dt,t)=>{const car=ball.on;
  if(F.state==="play"){if(joy&&car===me){const dx=joy.cx-joy.x,dy=joy.cy-joy.y,d=Math.hypot(dx,dy);if(d>6){me.x+=dx/d*150*dt;me.y+=dy/d*150*dt}}
   else if(car&&car!==me){car.x+=120*dt}
   for(const m of mates)if(m!==car){m.x+=70*dt;m.y+=m.dy*40*dt;if(m.y<40||m.y>460)m.dy*=-1}
   for(const d of defs){const tgt=car||{x:ball.x,y:ball.y};const dx=tgt.x-d.x,dy=tgt.y-d.y,l=Math.hypot(dx,dy)||1;d.x+=dx/l*95*dt;d.y+=dy/l*95*dt;if(car&&l<20){F.los=Math.max(60,car.x);endDown("🚩 Flag pulled! Good run to the "+Math.round(car.x/7)+" yard line.")}}
   for(const p of[me,...mates]){p.x=Math.max(10,Math.min(790,p.x));p.y=Math.max(30,Math.min(470,p.y))}
   if(ball.fly){const f=ball.fly;f.t+=dt*1.6;ball.x=f.x0+(f.tx-f.x0)*f.t;ball.y=f.y0+(f.ty-f.y0)*f.t;if(f.t>=1){ball.fly=null;if(defs.some(d=>Math.hypot(d.x-ball.x,d.y-ball.y)<22)){endDown("🙈 Pass knocked away! Try again.")}else{ball.on=f.to;msg("🙌 Caught it! Run, run!")}}}
   if(ball.on){ball.x=ball.on.x;ball.y=ball.on.y;if(ball.on.x>730){F.score+=6;F.state="over";msg("🎉 TOUCHDOWN! +6 (Score "+F.score+")");setTimeout(()=>{if(isOpen()){F.down=1;F.los=120;setup()}},2000)}}}
  g.fillStyle="#43a047";g.fillRect(0,0,800,500);g.fillStyle="#1565c0";g.fillRect(0,0,60,500);g.fillStyle="#c62828";g.fillRect(740,0,60,500);g.strokeStyle="#fff";g.lineWidth=2;for(let x=60;x<=740;x+=68){g.beginPath();g.moveTo(x,0);g.lineTo(x,500);g.stroke()}
  g.fillStyle="#fff";g.font="bold 22px sans-serif";g.fillText("END ZONE",748,30);g.fillStyle="#ffeb3b";g.fillRect(F.los-1,0,3,500);
  for(const p of[...defs,...mates,me]){g.fillStyle="#0004";g.beginPath();g.ellipse(p.x,p.y+14,12,5,0,0,7);g.fill();kid(g,p.x,p.y+14,1.1,p.c);if(p.c!=="#e53935"){g.fillStyle="#ffeb3b";g.fillRect(p.x-8,p.y+2,4,9);g.fillRect(p.x+5,p.y+2,4,9)}}
  g.fillStyle="#8d5a2b";g.beginPath();g.ellipse(ball.x+8,ball.y-6,7,4.5,.5,0,7);g.fill();
  g.fillStyle="#000a";g.fillRect(10,8,250,28);g.fillStyle="#fff";g.font="bold 16px sans-serif";g.fillText("Score "+F.score+"   Down "+F.down+" of 4",18,28);
  if(joy){g.strokeStyle="#fff8";g.lineWidth=4;g.beginPath();g.arc(joy.x,joy.y,40,0,7);g.stroke();g.fillStyle="#fff8";g.beginPath();g.arc(joy.cx,joy.cy,16,0,7);g.fill()}});
 st="football"}

// ---------- PLAYGROUND ----------
export function openPlayground(){const S=shell("🛝 Playground — pick something to play on!");const{g,msg,btn,cv}=S;
 const P={mode:"slide",t:0,sw:{a:.2,v:0},mb:{i:0,hand:0},mg:{a:0,v:0},sl:{p:0,go:false}};const bs={};
 const pick=m=>{P.mode=m;for(const k in bs)bs[k].classList.toggle("on",k===m);msg({slide:"Tap the canvas to climb up and WHEEE down the slide!",swing:"Tap PUMP at the right time to swing higher!",bars:"Tap the canvas to swing hand-over-hand across!",merry:"Swipe across the canvas to spin the merry-go-round!"}[m])};
 bs.slide=btn("🛝 Slide",()=>pick("slide"));bs.swing=btn("🪢 Swings",()=>pick("swing"));bs.bars=btn("🐒 Monkey bars",()=>pick("bars"));bs.merry=btn("🎠 Merry-go-round",()=>pick("merry"));btn("💪 PUMP",()=>{if(P.mode==="swing")P.sw.v+=Math.sign(P.sw.v||1)*.9});btn("✖ Done",close);pick("slide");
 let sx=null;cv.onpointerdown=e=>{sx=e.clientX;if(P.mode==="slide"&&!P.sl.go){P.sl.go=true;P.sl.p=0}if(P.mode==="bars"){P.mb.hand^=1;P.mb.i=Math.min(7,P.mb.i+.5);if(P.mb.i>=7)msg("🎉 You made it across! Tap Monkey bars to go again.")}if(P.mode==="merry")P.mg.v+=.5};
 cv.onpointermove=e=>{if(sx!=null&&P.mode==="merry"){P.mg.v+=(e.clientX-sx)*.004;sx=e.clientX}};cv.onpointerup=()=>sx=null;
 bs.bars.addEventListener("click",()=>{P.mb.i=0});
 loop((dt,t)=>{g.fillStyle="#87ceeb";g.fillRect(0,0,800,500);g.fillStyle="#7cc94a";g.fillRect(0,400,800,100);g.fillStyle="#f5e6a3";g.fillRect(60,400,680,30);
  if(P.mode==="slide"){g.fillStyle="#9e9e9e";g.fillRect(250,180,10,220);g.fillRect(300,180,10,220);for(let y=200;y<400;y+=25)g.fillRect(250,y,60,5);g.fillStyle="#e53935";g.fillRect(240,170,80,14);g.fillStyle="#fdd835";g.beginPath();g.moveTo(310,175);g.lineTo(560,390);g.lineTo(560,405);g.lineTo(300,195);g.fill();
   let x=230,y=420;if(P.sl.go){P.sl.p+=dt*.45;const p=P.sl.p;if(p<.4){x=280;y=420-(p/.4)*245}else if(p<1){const q=(p-.4)/.6;x=310+250*q;y=175+215*q*q**.2}else{x=590;y=420;if(p>1.3){P.sl.go=false;msg("WHEEE! 🎉 Tap to slide again!")}}}kid(g,x,y,1.6,"#1e88e5")}
  if(P.mode==="swing"){const s=P.sw;s.v+=-Math.sin(s.a)*6*dt;s.v*=.995;s.a+=s.v*dt;s.a=Math.max(-1.3,Math.min(1.3,s.a));g.strokeStyle="#5d4037";g.lineWidth=10;g.beginPath();g.moveTo(250,400);g.lineTo(330,100);g.lineTo(470,100);g.lineTo(550,400);g.stroke();
   const L=230,px=400+Math.sin(s.a)*L,py=100+Math.cos(s.a)*L;g.lineWidth=3;g.strokeStyle="#424242";g.beginPath();g.moveTo(390,100);g.lineTo(px-10,py);g.moveTo(410,100);g.lineTo(px+10,py);g.stroke();g.fillStyle="#e53935";g.fillRect(px-18,py,36,8);kid(g,px,py+2,1.4,"#1e88e5");g.fillStyle="#000a";g.fillRect(10,10,200,26);g.fillStyle="#fff";g.font="bold 15px sans-serif";g.fillText("Height: "+"★".repeat(Math.round(Math.abs(s.a)*4)),18,28)}
  if(P.mode==="bars"){g.fillStyle="#1e88e5";g.fillRect(150,150,12,250);g.fillRect(640,150,12,250);g.fillRect(150,150,502,10);for(let i=0;i<8;i++)g.fillRect(170+i*62,140,8,30);const x=176+P.mb.i*62,sw=Math.sin(t*6)*6;g.save();g.translate(x,165);g.rotate(sw*.02);kid(g,0,110,1.4,"#43a047");g.fillStyle="#e0ac69";g.fillRect(-8+(P.mb.hand?6:-6),0,6,40);g.restore()}
  if(P.mode==="merry"){const m=P.mg;m.v*=.99;m.a+=m.v*dt;g.fillStyle="#795548";g.fillRect(392,330,16,60);g.fillStyle="#e53935";g.beginPath();g.ellipse(400,380,220,40,0,0,7);g.fill();g.fillStyle="#fdd835";g.beginPath();g.ellipse(400,372,220,40,0,0,7);g.fill();
   for(let i=0;i<4;i++){const a=m.a+i*Math.PI/2,x=400+Math.cos(a)*180,y=372+Math.sin(a)*32;g.fillStyle="#1e88e5";g.fillRect(x-3,y-60,6,60);if(i===0)kid(g,x+12,y,1.3,"#8e24aa")}g.fillStyle="#000a";g.fillRect(10,10,200,26);g.fillStyle="#fff";g.font="bold 15px sans-serif";g.fillText("Spin: "+"🌀".repeat(Math.min(6,Math.round(Math.abs(m.v)))),18,28)}});
 st="playground"}

// ---------- SAND CASTLE ----------
export function openSandcastle(key="realcraft_sandcastle_v1"){const S=shell("🏰 Sand Castle Builder — waves wash in every so often!");const{g,msg,btn,cv,pos}=S;
 const C=16,R=9,cw=50,ch=40,oy=40;let grid;try{grid=JSON.parse(localStorage.getItem(key)||"null")}catch(e){}if(!grid||grid.length!==R)grid=Array.from({length:R},()=>Array(C).fill(0));
 const T={1:"🗼 Tower",2:"🧱 Wall",3:"💧 Moat",4:"🐚 Shell",5:"🚩 Flag"};let tool=1;const tb={};
 for(const k of[1,2,3,4,5])tb[k]=btn(T[k],()=>{tool=k;for(const j in tb)tb[j].classList.toggle("on",+j===k)});tb[1].classList.add("on");
 btn("🧽 Erase",b=>{tool=0;for(const j in tb)tb[j].classList.remove("on")});btn("🌊 Wave!",()=>wave());btn("💾 Save",()=>{localStorage.setItem(key,JSON.stringify(grid));msg("💾 Saved! Your castle will be here next time.")});btn("🧹 Clear",()=>{grid=grid.map(r=>r.map(()=>0))});btn("✖ Done",()=>{localStorage.setItem(key,JSON.stringify(grid));close()});
 let down=false;const paint=e=>{const[x,y]=pos(e);const c=Math.floor(x/cw),r=Math.floor((y-oy)/ch);if(r>=0&&r<R&&c>=0&&c<C){if(tool===5&&grid[r][c]!==1){msg("🚩 Put flags on top of towers!");return}grid[r][c]=tool}};
 cv.onpointerdown=e=>{down=true;paint(e)};cv.onpointermove=e=>{if(down&&tool!==5)paint(e)};cv.onpointerup=cv.onpointercancel=()=>down=false;
 let wv=0,next=performance.now()/1000+25;msg("Tap to build! Moats protect your castle from waves.");
 function wave(){wv=1;let lost=0;for(let c=0;c<C;c++){for(let r=R-1;r>=R-3;r--){const v=grid[r][c];if(v===3){break}if(v&&v!==4&&Math.random()<(r===R-1?.8:.35)){grid[r][c]=0;lost++}}}msg(lost?"🌊 Splash! The wave washed away "+lost+" piece"+(lost>1?"s":"")+". Dig moats to protect it!":"🌊 Splash! Your castle survived the wave! 💪")}
 loop((dt,t)=>{if(t>next){next=t+25;wave()}g.fillStyle="#f5e6a3";g.fillRect(0,0,800,500);g.fillStyle="#29b6f6";g.fillRect(0,oy+R*ch,800,500);
  if(wv>0){wv-=dt*.6;g.fillStyle="rgba(255,255,255,"+(.7*wv)+")";g.fillRect(0,oy+R*ch-wv*120,800,wv*120)}
  for(let r=0;r<R;r++)for(let c=0;c<C;c++){const x=c*cw,y=oy+r*ch,v=grid[r][c];g.strokeStyle="#0000000d";g.strokeRect(x,y,cw,ch);
   if(v===1||v===5){g.fillStyle="#d4b26a";g.fillRect(x+8,y-30,cw-16,ch+22);g.fillStyle="#c49a50";for(let i=0;i<3;i++)g.fillRect(x+8+i*12,y-38,8,8);if(v===5){g.fillStyle="#5d4037";g.fillRect(x+cw/2,y-62,3,26);g.fillStyle="#e53935";g.fillRect(x+cw/2+3,y-62,16,10)}}
   if(v===2){g.fillStyle="#c9a35e";g.fillRect(x,y+4,cw,ch-8);g.fillStyle="#b88f4a";for(let i=0;i<4;i++)g.fillRect(x+i*13,y-2,8,6)}
   if(v===3){g.fillStyle="#4fc3f7";g.fillRect(x+2,y+6,cw-4,ch-12)}
   if(v===4){g.fillStyle="#f8bbd0";g.beginPath();g.arc(x+cw/2,y+ch/2,10,Math.PI,0);g.fill();g.strokeStyle="#ec407a";g.beginPath();for(let i=-2;i<=2;i++){g.moveTo(x+cw/2,y+ch/2);g.lineTo(x+cw/2+i*4,y+ch/2-9)}g.stroke()}}
  g.fillStyle="#000a";g.fillRect(560,6,232,26);g.fillStyle="#fff";g.font="bold 14px sans-serif";g.fillText("Next wave in "+Math.max(0,Math.ceil(next-t))+"s",570,24)});
 st="sand"}
