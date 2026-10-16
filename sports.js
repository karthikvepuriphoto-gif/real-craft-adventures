// Real Craft Adventures: country sports mini-games for World Trip destinations
import {shell,loop,kid,close,isOpen} from "./play.js";
const KEY="realcraft_sports_v1";
export const SPORTS={
 cricket:{e:"🏏",n:"Cricket",how:["Two teams take turns to bat and to bowl.","The bowler bowls at the stumps (the wicket). The batter hits the ball to score runs.","4 runs if the ball rolls over the boundary, 6 if it flies over without bouncing.","A batter is OUT if the ball hits the stumps (bowled) or a fielder catches it. An over is 6 balls."],play:"BAT: tap SWING just as the ball reaches your bat. BOWL: tap BOWL when the marker is in the green zone."},
 soccer:{e:"⚽",n:"Soccer (Football)",how:["Two teams of 11 players try to kick the ball into the other team's goal.","Players use their feet, legs, body and head — not their hands.","Only the goalkeeper may use hands, inside their own penalty area."],play:"Drag on the field to dribble. Tap PASS or SHOOT. Then be the goalie: drag up and down to save!"},
 baseball:{e:"⚾",n:"Baseball",how:["The pitcher throws, and the batter tries to hit the ball and run the bases.","3 strikes is an out. 4 balls (bad pitches) is a walk to first base.","Run all the way around four bases to score a run. 3 outs and the teams switch."],play:"Tap SWING when the pitch reaches home plate. Don't swing at pitches outside the box!"},
 basketball:{e:"🏀",n:"Basketball",how:["Players dribble (bounce) the ball while they move and shoot it through the hoop.","A basket is worth 2 points, or 3 points from behind the three-point line.","Free throws are worth 1 point each."],play:"Drag left/right to pick your spot. Press and hold SHOOT, let go when the power bar is in the green."},
 tabletennis:{e:"🏓",n:"Table Tennis",how:["Hit the little ball over the net so it bounces once on the other side.","If the other player can't return it, you win the point.","Real games go to 11 points (you must win by 2). Here it's first to 5!"],play:"Drag left and right to move your paddle. Hit with the edge of the paddle to aim to the side."},
 cycling:{e:"🚴",n:"Cycling Race",how:["Riders race bikes on roads, often for many days in a big tour.","Riding close behind another rider is called drafting: the front rider blocks the wind so you save energy.","The first rider across the finish line wins the stage."],play:"Tap PEDAL fast to go! Ride right behind someone to draft, then switch lanes to pass."},
 hockey:{e:"🏒",n:"Ice Hockey",how:["Players skate on ice and use sticks to pass and shoot a rubber puck.","Each team has 6 players on the ice, including the goalie.","Score by shooting the puck into the other team's net."],play:"Drag to skate (it's slippery!). Tap PASS or SHOOT. Then be the goalie and block the shots!"}};
export const SPORT_AT={
 charminar:["cricket","India","Cricket is hugely popular in India! India won the Cricket World Cup in 1983 and 2011."],
 mysore:["cricket","India","Cricket is hugely popular in India! Kids play \"gully cricket\" in streets and parks everywhere."],
 taj:["cricket","India","India won the Cricket World Cup in 1983 and 2011, and the T20 World Cup in 2007, 2024 and 2026!"],
 indiagate:["cricket","India","Cricket is hugely popular in India. Huge crowds watch matches in stadiums across the country."],
 gateway:["cricket","India","Mumbai is famous for cricket! Kids play on big open grounds called maidans."],
 sydney:["cricket","Australia","Australia has won the men's Cricket World Cup 6 times — more than any other country!"],
 bigben:["soccer","England","The first official rules of modern football (soccer) were written in London in 1863 by the Football Association."],
 rio:["soccer","Brazil","Brazil has won the men's World Cup 5 times — more than any other country!"],
 colosseum:["soccer","Italy","Italy has won the men's World Cup 4 times: 1934, 1938, 1982 and 2006."],
 pisa:["soccer","Italy","In Italy, soccer is called \"calcio\", which means \"kick\"!"],
 pyramids:["soccer","Egypt","Egypt has won the Africa Cup of Nations 7 times — more than any other country!"],
 machu:["soccer","Peru","Soccer is very popular in Peru! Peru won the Copa América in 1939 and 1975."],
 eiffel:["cycling","France","The Tour de France bike race started in 1903. Since 1975 it has usually finished on the Champs-Élysées in Paris!"],
 fuji:["baseball","Japan","An American teacher, Horace Wilson, taught baseball to students in Tokyo in 1872. Today it is one of Japan's most popular sports!"],
 wall:["tabletennis","China","China has won more Olympic gold medals in table tennis than any other country!"],
 niagara:["hockey","Canada","The first organized ice hockey game was played indoors in Montreal, Canada, on March 3, 1875!"],
 liberty:["baseball","USA","Baseball is often called \"America's pastime\". New York has two big-league teams!"],
 rushmore:["baseball","USA","Baseball has been played in the United States since the 1800s and is called \"America's pastime\"."],
 arch:["baseball","USA","St. Louis has a big-league baseball team with a long history — baseball is called \"America's pastime\"."],
 yellowstone:["baseball","USA","Baseball is called \"America's pastime\". Kids play Little League all over the USA every summer!"],
 kennedy:["baseball","USA","Florida hosts baseball \"spring training\" every year, when big-league teams practice before the season."],
 goldengate:["basketball","USA","Basketball was invented in the USA in 1891 by James Naismith, using peach baskets as hoops!"],
 dc:["basketball","USA","Basketball was invented in 1891 by James Naismith in Springfield, Massachusetts."],
 spaceneedle:["basketball","USA","The first basketball games used peach baskets, and a person had to take the ball out after every basket!"],
 grandcanyon:["basketball","USA","Basketball was invented in the USA in 1891. Now it is played all around the world!"],
 hollywood:["basketball","USA","In James Naismith's first rules (1891), players could not run with the ball — dribbling became part of the game later!"],
 omaha:["baseball","USA","Omaha, Nebraska hosts the College World Series baseball tournament every June!"],
 chicago:["basketball","USA","Basketball was invented in the USA in 1891. Chicago has had a pro basketball team since 1966!"]};
export function sportFor(k){if(SPORT_AT[k])return SPORT_AT[k];const c=((window.BW&&window.BW.PLACES&&window.BW.PLACES[k])||{}).country||"";
 if(c==="India")return["cricket","India","Cricket is hugely popular in India! India won the Cricket World Cup in 1983 and 2011."];
 if(c==="USA")return["basketball","USA","Basketball was invented in the USA in 1891 by James Naismith, using peach baskets as hoops!"];
 return["soccer",c||"the world","Soccer is the most popular sport in the world!"]}
export function loadSP(){try{const s=JSON.parse(localStorage.getItem(KEY)||"{}");s.played=s.played||{};s.where=s.where||{};s.best=s.best||{};return s}catch(e){return{played:{},where:{},best:{}}}}
function stamp(sp,k){const s=loadSP(),first=!s.played[sp];s.played[sp]=s.played[sp]||new Date().toISOString().slice(0,10);s.where[k]=1;localStorage.setItem(KEY,JSON.stringify(s));return first}
function best(sp,v){const s=loadSP();if(!(s.best[sp]>=v)){s.best[sp]=v;localStorage.setItem(KEY,JSON.stringify(s))}}
const speak=t=>{try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.rate=.92;speechSynthesis.speak(u)}catch(e){}};
function card(S,html,btns){const d=document.createElement("div");d.className="spCard";d.style.cssText="position:absolute;inset:0;margin:auto;width:min(560px,94vw);height:fit-content;max-height:86dvh;overflow:auto;background:#fffde7;color:#212121;border:4px solid #000;padding:14px;font-size:15px;line-height:1.45;z-index:2;-webkit-overflow-scrolling:touch";d.innerHTML=html;const r=document.createElement("div");r.style.cssText="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px";for(const[t,f,c]of btns){const b=document.createElement("button");b.textContent=t;if(c)b.style.background=c;b.onclick=e=>{e.stopPropagation();f(d)};r.appendChild(b)}d.appendChild(r);S.o.appendChild(d);return d}
export function openPassport(){const S=shell("🏅 Sports Passport");S.cv.style.display="none";const s=loadSP();
 card(S,`<h3 style="margin:0 0 6px">🏅 Sports Passport</h3><p>Play a sport at a World Trip stop to earn its badge!</p><div style="display:flex;flex-wrap:wrap;gap:8px">${Object.entries(SPORTS).map(([k,v])=>`<div style="width:120px;text-align:center;border:3px solid #000;padding:6px;background:#fff;${s.played[k]?"":"opacity:.35;filter:grayscale(1)"}"><div style="font-size:34px">${v.e}</div><b>${v.n}</b><br><small>${s.played[k]?"✅ "+s.played[k]+(s.best[k]!=null?"<br>Best: "+s.best[k]:""):"Not yet"}</small></div>`).join("")}</div><p><small>Where to play: India & Australia 🏏 · England, Brazil, Italy, Egypt, Peru ⚽ · Japan & USA ⚾ · USA 🏀 · China 🏓 · France 🚴 · Niagara (Canada side) 🏒</small></p>`,[["✖ Close",close]])}
export function openSport(k,toast){const[sp,country,fact]=sportFor(k),D=SPORTS[sp];const S=shell(`${D.e} ${D.n} in ${country}`);
 const intro=card(S,`<h3 style="margin:0 0 6px">${D.e} ${D.n} — ${country}</h3><b>How to play</b><ul style="margin:4px 0 8px 18px;padding:0">${D.how.map(h=>`<li>${h}</li>`).join("")}</ul><b>🎮 Your controls:</b> ${D.play}<p style="background:#e3f2fd;border:2px solid #1565c0;padding:6px;margin:8px 0 0">🌏 <b>Fun fact:</b> ${fact}</p>`,
  [["▶ Play!",d=>{d.remove();if(stamp(sp,k)&&toast)toast("🏅 Sports Passport: new "+D.e+" "+D.n+" badge!");ENG[sp](S,sp)},"#66bb6a"],["🔊 Read to me",()=>speak(D.n+". How to play. "+D.how.join(" ")+" Fun fact: "+fact)],["🏅 Passport",openPassport],["✖ Not now",close]]);
 S.g.fillStyle="#2e7d32";S.g.fillRect(0,0,800,500);return S}
const T=(g,t,x,y,s=16,c="#fff")=>{g.fillStyle=c;g.font=`bold ${s}px sans-serif`;g.fillText(t,x,y)};
const board=(g,t,w=300)=>{g.fillStyle="#000b";g.fillRect(8,8,w,30);T(g,t,16,29)};
const finish=(S,sp,html,score,again)=>{best(sp,score);card(S,html,[["🔁 Play again",d=>{d.remove();again()}],["🏅 Passport",openPassport],["✖ Done",close]])};
const ENG={};
// ---------- SOCCER / HOCKEY (one engine) ----------
ENG.soccer=ENG.hockey=(S,sp)=>{const ice=sp==="hockey",{g,cv,msg,btn,pos}=S;const R={you:0,cpu:0,round:1,phase:"attack"};const N=4;let me,mate,defs,gk,ball,joy=null,wait=0,pk=null;
 const fr=ice?.992:.965,spd=ice?170:150,ballC=ice?"#111":"#fff";
 function attack(){R.phase="attack";me={x:120,y:250,vx:0,vy:0,c:"#1e88e5"};mate={x:220,y:120,c:"#42a5f5"};defs=[{x:470,y:180},{x:470,y:330}];gk={x:760,y:250};ball={x:134,y:250,vx:0,vy:0,own:me};msg(`Attack ${R.round}/${N}: drag to ${ice?"skate":"dribble"} • PASS to your teammate • SHOOT at the goal!`)}
 function save(){R.phase="save";pk={y:250,bx:560,by:250,ty:190+Math.random()*120,t:-1.2,res:null};msg("🧤 You're the goalie! Drag up and down to block the shot!")}
 function next(){if(R.phase==="attack")save();else{R.round++;if(R.round>N)return end();attack()}}
 function end(){R.phase="end";const w=R.you>R.cpu?"🏆 You win!":R.you===R.cpu?"🤝 It's a tie!":"💪 Good try!";finish(S,sp,`<h3>${w}</h3><p style="font-size:22px">You ${R.you} – ${R.cpu} CPU</p>`,R.you,()=>{R.you=R.cpu=0;R.round=1;attack()})}
 const result=(t,ms=1500)=>{R.phase="wait";msg(t);wait=ms/1000};let after=null;
 btn("🦶 Pass",()=>{if(R.phase!=="attack")return;const h=ball.own;if(h!==me&&h!==mate)return;const to=h===me?mate:me;const dx=to.x+30-h.x,dy=to.y-h.y,l=Math.hypot(dx,dy)||1;ball.own=null;ball.vx=dx/l*420;ball.vy=dy/l*420;ball.from=h;msg("👟 Pass!")});
 btn("🥅 Shoot",()=>{if(R.phase!=="attack")return;const h=ball.own;if(h!==me&&h!==mate)return;const ty=200+Math.random()*100,dx=790-h.x,dy=ty-h.y,l=Math.hypot(dx,dy);ball.own=null;ball.vx=dx/l*560;ball.vy=dy/l*560;ball.shot=1;msg("💥 SHOT!")});
 btn("🔄 Restart",()=>{R.you=R.cpu=0;R.round=1;attack()});btn("✖ Done",close);
 cv.onpointerdown=e=>{const[x,y]=pos(e);joy={x,y,cx:x,cy:y};if(R.phase==="save")pk.drag=y};cv.onpointermove=e=>{if(!joy)return;const[x,y]=pos(e);joy.cx=x;joy.cy=y;if(R.phase==="save")pk.drag=y};cv.onpointerup=cv.onpointercancel=()=>joy=null;
 attack();
 loop(dt=>{if(R.phase==="wait"){wait-=dt;if(wait<=0)next()}
  if(R.phase==="attack"){const ax=joy?joy.cx-joy.x:0,ay=joy?joy.cy-joy.y:0,d=Math.hypot(ax,ay);
   if(ice){if(d>6){me.vx+=ax/d*400*dt;me.vy+=ay/d*400*dt}const v=Math.hypot(me.vx,me.vy);if(v>spd){me.vx*=spd/v;me.vy*=spd/v}me.vx*=Math.pow(.985,dt*60);me.vy*=Math.pow(.985,dt*60);me.x+=me.vx*dt;me.y+=me.vy*dt}
   else if(d>6){me.x+=ax/d*spd*dt;me.y+=ay/d*spd*dt}
   const mt=ball.own===mate?{x:mate.x+80,y:mate.y+(250-mate.y)*.3}:{x:Math.min(700,me.x+120),y:me.y<250?me.y+150:me.y-150};const mdx=mt.x-mate.x,mdy=mt.y-mate.y,ml=Math.hypot(mdx,mdy);if(ml>4){mate.x+=mdx/ml*110*dt;mate.y+=mdy/ml*110*dt}
   if(ball.own===mate){mate.hold=(mate.hold||0)+dt;if(mate.hold>.9){mate.hold=0;const dx=me.x+40-mate.x,dy=me.y-mate.y,l=Math.hypot(dx,dy)||1;ball.own=null;ball.vx=dx/l*400;ball.vy=dy/l*400;ball.from=mate;msg("🙌 Your teammate passes back!")}}
   for(const p of[me,mate]){p.x=Math.max(20,Math.min(770,p.x));p.y=Math.max(30,Math.min(470,p.y))}
   if(ball.own){const o=ball.own;ball.x=o.x+14;ball.y=o.y+4}else{ball.x+=ball.vx*dt;ball.y+=ball.vy*dt;const f=Math.pow(fr,dt*60);ball.vx*=f;ball.vy*=f;if(ball.y<20||ball.y>480){ball.vy*=-1;ball.y=Math.max(20,Math.min(480,ball.y))}if(ball.x<10){ball.vx*=-1;ball.x=10}
    if(ball.x>770&&ball.y>200&&ball.y<300){R.you++;result("🎉 GOAL! You "+R.you+" – "+R.cpu+" CPU")}else if(ball.x>790){result("Wide! So close.")}
    else if(Math.hypot(ball.vx,ball.vy)<380||!ball.shot)for(const p of[me,mate])if(p!==ball.from||Math.hypot(ball.vx,ball.vy)<200)if(Math.hypot(p.x+14-ball.x,p.y+4-ball.y)<20){ball.own=p;ball.shot=0;ball.from=null;mate.hold=0}}
   gk.y+=Math.max(-150*dt,Math.min(150*dt,Math.max(205,Math.min(295,ball.y))-gk.y));if(!ball.own&&ball.x>745&&Math.abs(ball.y-gk.y)<30&&R.phase==="attack"){result("🧤 The goalie saved it!")}
   for(const q of defs){const dx=ball.x-q.x,dy=ball.y-q.y,l=Math.hypot(dx,dy)||1;q.x+=dx/l*(ice?95:88)*dt;q.y+=dy/l*(ice?95:88)*dt;if(l<16&&R.phase==="attack"){result("🔴 The other team stole it! Next time pass or shoot sooner.")}}}
  if(R.phase==="save"){const p=pk;if(p.drag!=null)p.y+=Math.max(-300*dt,Math.min(300*dt,p.drag-p.y));p.y=Math.max(195,Math.min(305,p.y));p.t+=dt;if(p.t>0&&!p.res){const k=Math.min(1,p.t/.85);p.bx=560-k*510;p.by=250+(p.ty-250)*k;if(k>=.94&&Math.abs(p.by-p.y)<32){p.res=1;result("🧤 GREAT SAVE!")}else if(k>=1){p.res=1;R.cpu++;result("😮 CPU scores. You "+R.you+" – "+R.cpu+" CPU")}}}
  // draw
  g.fillStyle=ice?"#e3f2fd":"#43a047";g.fillRect(0,0,800,500);if(!ice)for(let x=0;x<800;x+=100){g.fillStyle="#4caf50";g.fillRect(x,0,50,500)}
  g.strokeStyle=ice?"#c62828":"#fff";g.lineWidth=3;g.strokeRect(10,20,780,460);g.beginPath();g.moveTo(400,20);g.lineTo(400,480);g.stroke();g.beginPath();g.arc(400,250,60,0,7);g.stroke();g.strokeRect(690,140,100,220);g.strokeRect(10,140,100,220);
  g.fillStyle="#fff";g.fillRect(782,200,10,100);g.fillRect(8,200,10,100);g.strokeStyle="#999";g.lineWidth=1;for(let y=200;y<300;y+=8){g.beginPath();g.moveTo(782,y);g.lineTo(792,y);g.moveTo(8,y);g.lineTo(18,y);g.stroke()}
  const ppl=R.phase==="save"||(R.phase==="wait"&&pk&&pk.res)?[{x:560,y:250,c:"#e53935"},{x:30,y:pk.y,c:"#fdd835"}]:[...defs.map(d=>({...d,c:"#e53935"})),{x:gk.x,y:gk.y,c:"#8e24aa"},mate,me];
  for(const p of ppl){g.fillStyle="#0004";g.beginPath();g.ellipse(p.x,p.y+14,12,5,0,0,7);g.fill();kid(g,p.x,p.y+14,1.1,p.c);if(ice){g.strokeStyle="#5d4037";g.lineWidth=3;g.beginPath();g.moveTo(p.x+6,p.y);g.lineTo(p.x+14,p.y+14);g.lineTo(p.x+22,p.y+14);g.stroke()}}
  g.fillStyle="#fff";g.font="12px sans-serif";if(R.phase==="attack"||R.phase==="wait"&&!pk?.res){T(g,"YOU",me.x-12,me.y-26,12,"#ffeb3b")}
  const bx=R.phase==="save"||(pk&&pk.res&&R.phase==="wait")?pk.bx:ball.x,by=R.phase==="save"||(pk&&pk.res&&R.phase==="wait")?pk.by:ball.y;g.fillStyle=ballC;g.strokeStyle="#000";g.lineWidth=2;g.beginPath();if(ice)g.ellipse(bx,by+10,7,4,0,0,7);else g.arc(bx,by+8,7,0,7);g.fill();g.stroke();
  board(g,`You ${R.you} – ${R.cpu} CPU   Round ${Math.min(R.round,N)}/${N}`);if(R.phase!=="attack"&&R.phase!=="wait"||!pk||R.phase==="attack")pk=R.phase==="attack"?null:pk;
  if(joy&&R.phase==="attack"){g.strokeStyle="#fff8";g.lineWidth=4;g.beginPath();g.arc(joy.x,joy.y,40,0,7);g.stroke();g.fillStyle="#fff8";g.beginPath();g.arc(joy.cx,joy.cy,16,0,7);g.fill()}})};
// ---------- CRICKET ----------
ENG.cricket=(S,sp)=>{const{g,cv,msg,btn}=S;const C={inn:"bat",runs:0,wk:0,balls:0,target:0,cpu:0,cwk:0};let b=null,mk=0,mdir=1,anim=null,wait=0;const BALLS=12,WK=3;
 const ov=n=>Math.floor(n/6)+"."+(n%6);
 function bowlBall(){b={t:0,dur:1.05+Math.random()*.35,stumps:Math.random()<.55,swung:false};msg("Ball "+ov(C.balls)+" — get ready… tap SWING when it reaches the bat!")}
 function res(t,ms=1300){msg(t);wait=ms/1000;b=null}
 function after(){if(C.inn==="bat"){if(C.balls>=BALLS||C.wk>=WK){C.inn="mid";C.target=C.runs+1;card(S,`<h3>🏏 Innings over!</h3><p>You scored <b>${C.runs}/${C.wk}</b> in ${ov(C.balls)} overs.</p><p>Now you BOWL. The computer needs <b>${C.target}</b> runs in 2 overs. Take 3 wickets or stop them!</p>`,[["🎯 Start bowling",d=>{d.remove();C.inn="bowl";C.balls=0;msg("Tap BOWL when the marker is in the GREEN zone (good length)!")},"#66bb6a"]])}else bowlBall()}
  else if(C.inn==="bowl"){if(C.cpu>=C.target||C.balls>=BALLS||C.cwk>=WK){C.inn="end";const w=C.cpu>=C.target?"💪 The computer won this time!":C.cpu===C.target-1?"🤝 It's a tie!":"🏆 You won the match!";finish(S,sp,`<h3>${w}</h3><p>You: ${C.runs}/${C.wk} · Computer: ${C.cpu}/${C.cwk}</p>`,C.runs,()=>{Object.assign(C,{inn:"bat",runs:0,wk:0,balls:0,cpu:0,cwk:0});bowlBall()})}else msg("Tap BOWL in the GREEN zone!")}}
 const swing=()=>{if(C.inn!=="bat"||!b||b.swung)return;b.swung=true;const e=Math.abs(b.t-b.dur);let r;if(e<.05)r=6;else if(e<.09)r=4;else if(e<.13)r=2;else if(e<.2)r=1;else r=-1;
  C.balls++;if(r<0){if(b.stumps){C.wk++;res("💥 BOWLED! The ball hit the stumps. Wicket "+C.wk+"/"+WK)}else res("Missed! No run — the ball went past.")}
  else if(r<=2&&Math.random()<.2){C.wk++;res("🧤 CAUGHT! The fielder caught it. Wicket "+C.wk+"/"+WK)}else{C.runs+=r;anim={t:0,r};res(r===6?"🚀 SIX! Over the boundary!":r===4?"🔥 FOUR! It rolled to the boundary!":"🏃 "+r+" run"+(r>1?"s":"")+"!")}};
 const bowl=()=>{if(C.inn!=="bowl"||wait>0)return;const q=Math.abs(mk-.5);C.balls++;let t;if(q<.08&&Math.random()<.55){C.cwk++;t="🎯 BOWLED HIM! Wicket "+C.cwk+"/"+WK}else{const r=q<.08?[0,0,1,1,2][Math.random()*5|0]:q<.2?[0,1,1,2,4][Math.random()*5|0]:[1,2,4,4,6][Math.random()*5|0];C.cpu+=r;t=(q<.08?"Great ball! ":q<.2?"Good ball. ":"Too short/full — ")+"Computer scores "+r+"."}res(t,1300)};
 btn("🏏 SWING",swing,"on");btn("🎯 BOWL",bowl);btn("✖ Done",close);cv.onpointerdown=()=>{if(C.inn==="bat")swing();else bowl()};
 bowlBall();
 loop(dt=>{if(wait>0){wait-=dt;if(wait<=0)after()}if(b&&C.inn==="bat"){b.t+=dt;if(b.t>b.dur+.25&&!b.swung){b.swung=true;C.balls++;if(b.stumps){C.wk++;res("💥 BOWLED! You didn't swing. Wicket "+C.wk+"/"+WK)}else res("Left it alone — no run.")}}
  if(C.inn==="bowl"&&wait<=0){mk+=mdir*dt*.9;if(mk>1||mk<0){mdir*=-1;mk=Math.max(0,Math.min(1,mk))}}
  g.fillStyle="#7cb342";g.fillRect(0,0,800,500);g.fillStyle="#9ccc65";g.fillRect(0,300,800,200);g.fillStyle="#d7b98e";g.fillRect(120,320,600,60);g.fillStyle="#fff";g.fillRect(150,322,3,56);g.fillRect(690,322,3,56);
  for(const sx of[140,700])for(let i=0;i<3;i++){g.fillStyle="#f5deb3";g.fillRect(sx+i*6,280,4,50);g.fillStyle="#8d6e63";g.fillRect(sx,278,18,3)}
  kid(g,180,345,2,"#fafafa");g.fillStyle="#8d6e63";g.save();g.translate(196,290);g.rotate(b&&b.swung?-1.2:.6);g.fillRect(-3,0,7,48);g.restore();kid(g,690,345,2,"#1565c0");
  if(b&&C.inn==="bat"){const k=Math.min(1.3,b.t/b.dur),x=680-k*500,bounce=.62,yy=k<bounce?220+k/bounce*120:340-(k-bounce)/(1-bounce)*55;g.fillStyle="#c62828";g.beginPath();g.arc(x,yy,7,0,7);g.fill()}
  if(anim){anim.t+=dt;const k=anim.t;g.fillStyle="#c62828";g.beginPath();g.arc(200+k*500,300-(anim.r===6?k*400-k*k*160:Math.max(0,60-k*80)),7,0,7);g.fill();if(k>1.4)anim=null}
  if(C.inn==="bowl"){g.fillStyle="#000a";g.fillRect(200,80,400,40);g.fillStyle="#e53935";g.fillRect(205,85,390,30);g.fillStyle="#fdd835";g.fillRect(205+390*.3,85,390*.4,30);g.fillStyle="#43a047";g.fillRect(205+390*.42,85,390*.16,30);g.fillStyle="#000";g.fillRect(205+390*mk-3,78,6,44);T(g,"short",210,140,13);T(g,"good length",360,140,13);T(g,"full",560,140,13)}
  board(g,C.inn==="bowl"||C.inn==="end"?`Computer ${C.cpu}/${C.cwk}  Overs ${ov(C.balls)}/2  Target ${C.target}`:`You ${C.runs}/${C.wk}  Overs ${ov(C.balls)}/2`,420)})};
// ---------- BASEBALL (bat-ball engine) ----------
ENG.baseball=(S,sp)=>{const{g,cv,msg,btn}=S;const B={runs:0,outs:0,str:0,bal:0,base:[0,0,0]};let p=null,wait=0,anim=null;
 function pitch(){p={t:-.6,dur:.75+Math.random()*.3,zone:Math.random()<.72,sw:false};msg(`Pitch coming! Balls ${B.bal} · Strikes ${B.str} · Outs ${B.outs}`)}
 const res=(t,ms=1300)=>{msg(t);wait=ms/1000;p=null};
 function adv(n){let sc=0;const b=B.base;if(n===4){sc=1+b.filter(Boolean).length;B.base=[0,0,0]}else{for(let i=2;i>=0;i--)if(b[i]){if(i+n>=3){sc++;b[i]=0}else{b[i+n]=1;b[i]=0}}b[n-1]=1}B.runs+=sc;return sc}
 function walk(){const b=B.base;if(b[0]){if(b[1]){if(b[2])B.runs++;b[2]=1}b[1]=1}b[0]=1}
 function out(t){B.outs++;B.str=B.bal=0;res(t+(B.outs>=3?" That's 3 outs!":` (${B.outs} out)`))}
 function after(){if(B.outs>=3){finish(S,sp,`<h3>⚾ Inning over!</h3><p style="font-size:22px">You scored ${B.runs} run${B.runs===1?"":"s"}!</p><p>A real game has 9 innings.</p>`,B.runs,()=>{Object.assign(B,{runs:0,outs:0,str:0,bal:0,base:[0,0,0]});pitch()})}else pitch()}
 const swing=()=>{if(!p||p.sw||p.t<0)return;p.sw=true;const e=Math.abs(p.t-p.dur);if(!p.zone&&Math.random()<.6){B.str=Math.min(2,B.str+1);return res("Swing and miss — that pitch was outside the box! Strike "+B.str+".")}
  if(e>.16){B.str++;if(B.str>=3)return out("😮 Strike three!");return res("Swing and a miss! Strike "+B.str+".")}
  if(e>.11){if(B.str<2)B.str++;return res("Foul ball! Strike "+B.str+".")}
  const n=e<.03?4:e<.055?3:e<.08?2:1;if(n===1&&Math.random()<.3)return out("🧤 Caught for an out!");B.str=B.bal=0;const sc=adv(n);anim={t:0,n};res((n===4?"💥 HOME RUN!":n===3?"Triple!":n===2?"Double!":"Single!")+(sc?` +${sc} run${sc>1?"s":""}!`:""),1500)};
 btn("⚾ SWING",swing,"on");btn("✖ Done",close);cv.onpointerdown=swing;pitch();
 loop(dt=>{if(wait>0){wait-=dt;if(wait<=0)after()}if(p){p.t+=dt;if(p.t>p.dur+.25&&!p.sw){p.sw=true;if(p.zone){B.str++;if(B.str>=3)out("😮 Called strike three!");else res("Strike "+B.str+" — that one was in the box!")}else{B.bal++;if(B.bal>=4){B.str=B.bal=0;walk();res("🚶 Ball four — walk to first base!")}else res("Ball "+B.bal+" — good eye, it was outside!")}}}
  g.fillStyle="#66bb6a";g.fillRect(0,0,800,500);g.fillStyle="#c79a63";g.beginPath();g.moveTo(200,420);g.lineTo(560,420);g.lineTo(760,300);g.lineTo(420,300);g.fill();g.fillStyle="#fff";g.fillRect(160,412,30,12);g.fillStyle="#a1887f";g.beginPath();g.ellipse(640,330,40,12,0,0,7);g.fill();
  kid(g,640,330,2,"#c62828");kid(g,130,420,2.2,"#1e88e5");g.fillStyle="#8d6e63";g.save();g.translate(150,350);g.rotate(p&&p.sw?-1.4:-.3);g.fillRect(-3,-60,7,60);g.restore();
  g.strokeStyle="#fff";g.setLineDash([6,4]);g.lineWidth=2;g.strokeRect(150,320,50,70);g.setLineDash([]);
  if(p&&p.t>=0){const k=Math.min(1.3,p.t/p.dur),x=630-k*460,y=290+k*(p.zone?60:-30)+Math.sin(k*3)*8;g.fillStyle="#fff";g.strokeStyle="#c62828";g.beginPath();g.arc(x,y,7,0,7);g.fill();g.stroke()}
  if(anim){anim.t+=dt;const k=anim.t;g.fillStyle="#fff";g.beginPath();g.arc(170+k*480,360-k*(anim.n===4?380:200)+k*k*(anim.n===4?120:150),7,0,7);g.fill();if(k>1.4)anim=null}
  const dm=[[700,90],[740,50],[700,10],[660,50]];g.fillStyle="#000a";g.fillRect(640,0,140,105);dm.forEach(([x,y],i)=>{g.fillStyle=i===0?"#fff":B.base[i-1]?"#ffeb3b":"#777";g.fillRect(x-7,y+3,14,14)});
  board(g,`Runs ${B.runs}  Outs ${B.outs}  B ${B.bal} S ${B.str}`,330)})};
// ---------- BASKETBALL ----------
ENG.basketball=(S,sp)=>{const{g,cv,msg,btn,pos}=S;const K={pts:0,shot:0,N:10};let px=380,hold=null,pw=0,pdir=1,ball=null,wait=0;const HX=700,HY=170,FLOOR=440,TP=440;
 const ideal=()=>{const d=HX-px,h=FLOOR-80-HY,th=Math.PI/3,v2=9.8*60*d*d/(2*Math.cos(th)**2*(d*Math.tan(th)-h));return Math.sqrt(v2)};
 const shoot=()=>{if(ball||wait>0||K.shot>=K.N)return;const v=ideal()*(.82+pw*.36),th=Math.PI/3;ball={x:px,y:FLOOR-80,vx:v*Math.cos(th),vy:-v*Math.sin(th),three:px<TP,scored:false,rim:0};K.shot++;hold=null};
 const sb=btn("🏀 Hold to SHOOT",()=>{},"on");sb.onpointerdown=e=>{e.stopPropagation();if(!ball&&wait<=0){hold=1;pw=0;pdir=1}};sb.onpointerup=sb.onpointerleave=e=>{if(hold)shoot()};btn("✖ Done",close);
 let drag=null;cv.onpointerdown=e=>{drag=pos(e)[0]};cv.onpointermove=e=>{if(drag!=null&&!hold&&!ball){px=Math.max(200,Math.min(560,pos(e)[0]))}};cv.onpointerup=()=>drag=null;
 msg("Drag to move. Hold SHOOT, let go in the GREEN! Behind the dashed line = 3 points.");
 loop(dt=>{if(hold){pw+=pdir*dt*1.1;if(pw>1||pw<0){pdir*=-1;pw=Math.max(0,Math.min(1,pw))}}
  if(wait>0){wait-=dt;if(wait<=0){if(K.shot>=K.N)finish(S,sp,`<h3>🏀 Great shooting!</h3><p style="font-size:22px">${K.pts} points from ${K.N} shots</p>`,K.pts,()=>{K.pts=0;K.shot=0});msg(`Shot ${K.shot+1}/${K.N}. Drag to move, hold SHOOT.`)}}
  if(ball){const ox=ball.x,oy=ball.y;ball.vy+=9.8*60*dt;ball.x+=ball.vx*dt;ball.y+=ball.vy*dt;
   if(!ball.scored&&oy<HY&&ball.y>=HY&&ball.vy>0){const cx=ox+(ball.x-ox)*((HY-oy)/(ball.y-oy));if(cx>HX-18&&cx<HX+18){ball.scored=true;const n=ball.three?3:2;K.pts+=n;msg((ball.rim?"Rolled in! ":"🎉 SWISH! ")+"+"+n)}else if(cx>HX-28&&cx<HX+28&&!ball.rim){ball.rim=1;ball.vy=-ball.vy*.5;ball.vx*=-.4;ball.y=HY-1}}
   if(ball.x>HX+40&&ball.y<HY+40&&ball.y>HY-100&&ball.vx>0){ball.vx=-ball.vx*.5}
   if(ball.y>FLOOR||ball.x>800||ball.x<0){if(!ball.scored)msg(ball.rim?"Off the rim! So close.":(ball.x<HX-18?"Too short!":"Too long!"));ball=null;wait=1}}
  g.fillStyle="#d7a86e";g.fillRect(0,0,800,500);g.fillStyle="#90caf9";g.fillRect(0,0,800,260);g.fillStyle="#c08a52";g.fillRect(0,FLOOR,800,60);
  g.strokeStyle="#fff";g.setLineDash([10,6]);g.lineWidth=3;g.beginPath();g.moveTo(TP,FLOOR);g.lineTo(TP,FLOOR+60);g.stroke();g.setLineDash([]);T(g,"3-PT LINE",TP-40,FLOOR+50,12);
  g.fillStyle="#757575";g.fillRect(HX+40,HY-10,10,FLOOR-HY+10);g.fillStyle="#fff";g.fillRect(HX+28,HY-80,14,100);g.strokeStyle="#e53935";g.lineWidth=4;g.beginPath();g.moveTo(HX-20,HY);g.lineTo(HX+22,HY);g.stroke();g.strokeStyle="#fff";g.lineWidth=1;for(let i=-16;i<=16;i+=8){g.beginPath();g.moveTo(HX+i,HY);g.lineTo(HX+i*.6,HY+26);g.stroke()}
  kid(g,px,FLOOR,2.2,"#1e88e5");const bx=ball?ball.x:px,by=ball?ball.y:FLOOR-80;g.fillStyle="#ef6c00";g.beginPath();g.arc(bx,by,11,0,7);g.fill();g.strokeStyle="#000";g.lineWidth=1.5;g.stroke();
  if(hold){g.fillStyle="#000a";g.fillRect(px-60,FLOOR-140,120,18);g.fillStyle="#e53935";g.fillRect(px-57,FLOOR-137,114,12);g.fillStyle="#43a047";g.fillRect(px-57+114*.38,FLOOR-137,114*.24,12);g.fillStyle="#fff";g.fillRect(px-57+114*pw-2,FLOOR-142,4,22)}
  board(g,`Points ${K.pts}   Shot ${Math.min(K.shot+ (ball?0:1),K.N)}/${K.N}   ${px<TP?"3-pointer spot":"2-pointer spot"}`,420)})};
// ---------- TABLE TENNIS ----------
ENG.tabletennis=(S,sp)=>{const{g,cv,msg,btn,pos}=S;const P={me:0,cpu:0,srv:0};let pad=400,cpu=400,b=null,wait=.8;const TX0=250,TX1=550,TY0=40,TY1=460,WIN=5;
 function serve(){const meS=Math.floor((P.me+P.cpu)/2)%2===0;b={x:meS?pad:cpu,y:meS?440:60,vx:(Math.random()-.5)*120,vy:meS?-260:260,bz:0,last:meS?"me":"cpu",bounced:0};msg(meS?"Your serve!":"Computer serves…")}
 const point=(w,t)=>{if(w==="me")P.me++;else P.cpu++;b=null;msg(t+`  You ${P.me} – ${P.cpu} CPU`);wait=1.2};
 cv.onpointerdown=cv.onpointermove=e=>{if(e.type==="pointermove"&&!e.buttons&&e.pointerType==="mouse")return;pad=Math.max(TX0-40,Math.min(TX1+40,pos(e)[0]))};btn("🔄 Restart",()=>{P.me=P.cpu=0;b=null;wait=.5});btn("✖ Done",close);
 loop(dt=>{if(wait>0){wait-=dt;if(wait<=0){if(P.me>=WIN||P.cpu>=WIN){const w=P.me>P.cpu;wait=1e9;finish(S,sp,`<h3>${w?"🏆 You win!":"💪 Good game!"}</h3><p style="font-size:22px">You ${P.me} – ${P.cpu} CPU</p>`,P.me,()=>{P.me=P.cpu=0;wait=.5})}else serve()}}
  if(b){b.x+=b.vx*dt;b.y+=b.vy*dt;if(b.x<TX0-60||b.x>TX1+60){point(b.last==="me"?"cpu":"me",b.last==="me"?"Out wide!":"Computer hit it out!")}
   else if(b.vy<0&&b.y<70){if(Math.abs(b.x-cpu)<38){b.vy=Math.min(520,-b.vy*1.05);b.vx=(b.x-cpu)*5+(Math.random()-.5)*60;b.last="cpu"}else if(b.y<20)point("me","⭐ Computer missed!")}
   else if(b.vy>0&&b.y>430){if(Math.abs(b.x-pad)<42){b.vy=-Math.min(560,b.vy*1.06);b.vx=(b.x-pad)*6;b.last="me";msg("Nice hit!")}else if(b.y>480)point("cpu","Missed it!")}
   if(b)cpu+=Math.max(-190*dt,Math.min(190*dt,(b.vy<0?b.x:400)-cpu))}
  g.fillStyle="#37474f";g.fillRect(0,0,800,500);g.fillStyle="#1565c0";g.fillRect(TX0,TY0,TX1-TX0,TY1-TY0);g.strokeStyle="#fff";g.lineWidth=3;g.strokeRect(TX0,TY0,TX1-TX0,TY1-TY0);g.beginPath();g.moveTo(400,TY0);g.lineTo(400,TY1);g.lineWidth=1;g.stroke();g.fillStyle="#eee";g.fillRect(TX0-20,247,TX1-TX0+40,6);
  g.fillStyle="#c62828";g.beginPath();g.ellipse(pad,452,34,10,0,0,7);g.fill();g.fillStyle="#000";g.beginPath();g.ellipse(cpu,48,34,10,0,0,7);g.fill();
  if(b){const s=1+Math.sin(Math.min(1,Math.abs(b.y-(b.vy<0?440:60))/380)*Math.PI)*.6;g.fillStyle="#0004";g.beginPath();g.arc(b.x+6,b.y+6,6,0,7);g.fill();g.fillStyle="#fff";g.beginPath();g.arc(b.x,b.y-10*s+10,7*s,0,7);g.fill()}
  board(g,`You ${P.me} – ${P.cpu} CPU   (first to ${WIN})`)})};
// ---------- CYCLING ----------
ENG.cycling=(S,sp)=>{const{g,msg,btn}=S;const LEN=3000;let me,riders,on=false,cnt=3,place=0;
 function setup(){me={d:0,v:0,lane:1,c:"#1e88e5"};riders=[0,1,2].map(i=>({d:20+i*15,v:0,lane:i===1?0:i,c:["#e53935","#fdd835","#43a047"][i],top:150+Math.random()*25}));on=false;cnt=3;place=0;msg("Get ready… tap PEDAL fast when it says GO!")}
 btn("🚴 PEDAL",()=>{if(on)me.v=Math.min(260,me.v+16)},"on");btn("⬆ Lane",()=>me.lane=Math.max(0,me.lane-1));btn("⬇ Lane",()=>me.lane=Math.min(2,me.lane+1));btn("✖ Done",close);
 S.cv.onpointerdown=()=>{if(on)me.v=Math.min(260,me.v+16)};setup();
 loop(dt=>{if(!on&&cnt>0){cnt-=dt;if(cnt<=0){on=true;msg("GO! Tap tap tap! Stay right behind a rider to draft.")}}
  if(on){const ahead=riders.find(r=>r.lane===me.lane&&r.d>me.d&&r.d-me.d<60);const drag=ahead?.35:.6;me.v=Math.max(0,me.v-me.v*drag*dt-10*dt);me.draft=!!ahead;me.d+=me.v*dt;
   for(const r of riders){r.v+=(r.top-r.v)*dt*.6;r.d+=r.v*dt;if(Math.random()<dt*.15)r.lane=Math.random()*3|0}
   const all=[me,...riders];if(me.d>=LEN&&!place){place=1+riders.filter(r=>r.d>=me.d).length;on=false;const t=["","🥇 1st place! Amazing!","🥈 2nd place! Great ride!","🥉 3rd place!","4th place — keep pedaling!"][place];finish(S,sp,`<h3>${t}</h3><p>Drafting saves energy — real racers ride in a big group called the peloton!</p>`,5-place,setup)}
   if(riders.every(r=>r.d>=LEN)&&me.d<LEN&&!place){place=4;on=false;finish(S,sp,"<h3>4th place — keep pedaling!</h3><p>Tip: tap faster and draft behind riders.</p>",1,setup)}}
  const cam=me.d-200;g.fillStyle="#81d4fa";g.fillRect(0,0,800,500);g.fillStyle="#7cb342";g.fillRect(0,160,800,340);g.fillStyle="#616161";g.fillRect(0,200,800,240);g.strokeStyle="#fff";g.setLineDash([30,20]);g.lineWidth=3;for(const y of[280,360]){g.beginPath();g.moveTo(-(cam%50),y);g.lineTo(800,y);g.stroke()}g.setLineDash([]);
  for(let x=-(cam%200);x<800;x+=200){g.fillStyle="#2e7d32";g.fillRect(x,120,30,40)}const fx=LEN-cam;if(fx<820){for(let i=0;i<12;i++){g.fillStyle=i%2?"#000":"#fff";g.fillRect(fx,200+i*20,14,20)}T(g,"FINISH",fx-20,190,18,"#000")}
  for(const r of[...riders,me]){const x=r.d-cam,y=240+r.lane*80;if(x<-40||x>840)continue;g.strokeStyle="#000";g.lineWidth=3;g.beginPath();g.arc(x-14,y+14,10,0,7);g.arc(x+16,y+14,10,0,7);g.stroke();g.fillStyle=r.c;g.fillRect(x-8,y-10,16,16);g.fillStyle="#e0ac69";g.fillRect(x-4,y-22,10,10);g.fillStyle=r.c;g.fillRect(x-6,y-26,14,6);if(r===me)T(g,"YOU",x-14,y-30,12,"#ffeb3b")}
  if(!on&&cnt>0)T(g,cnt>2?"3":cnt>1?"2":"1",380,120,60,"#fff");
  board(g,`Distance ${Math.round(Math.min(me.d,LEN)/10)}/${LEN/10} m   Speed ${Math.round(me.v/5)}   ${me.draft?"💨 DRAFTING!":""}`,440)})};
