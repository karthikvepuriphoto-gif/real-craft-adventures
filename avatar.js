// Real Craft Adventures — shared avatar + dress-up (ES module; needs the "three" import map).
// SAVE FORMAT — localStorage "realcraft_avatar_v1" = JSON:
// { v:1,
//   skin:"#hex", hair:"short|spiky|curly|long|ponytail|bun|buzz|none", hairColor:"#hex",
//   eyes:"#hex" (eye colour), face:"smile|grin|wink|wow|cool|sleepy",
//   glasses:"none|round|square|sun|goggles",
//   hat:"none|cap|beret|cowboy|sunhat|chef|helmet|sailor|beanie|turban|headband|party|space",
//   top:"tee|hoodie|striped|plaid|jersey|kurta|sherwani|happi|fiesta|carnival|explorer|astronaut|chef|firefighter|doctor|sailor|hero",
//   topColor:"#hex", jersey:"L|N",
//   bottom:"jeans|shorts|pajama|dhoti|skirt|cargo|space", bottomColor:"#hex",
//   shoes:"sneakers|boots|sandals|mojari|space", shoeColor:"#hex",
//   backpack:bool, cape:bool, scarf:bool, accColor:"#hex",
//   outfit:"set key or null", local:"place key while wearing a World-Trip local outfit, else null",
//   prev:{...spec before the local outfit, or null}, autoRevert:bool }
// Other pages (e.g. space.html): import {loadAvatar, buildAvatar} from "./avatar.js" to draw the same kid.
import * as THREE from "three";
export const AKEY = "realcraft_avatar_v1";
export const DEFAULT = {v:1,skin:"#e0ac69",hair:"short",hairColor:"#3b2314",eyes:"#4e342e",face:"smile",glasses:"none",hat:"none",
 top:"tee",topColor:"#43a047",jersey:"L",bottom:"jeans",bottomColor:"#1565c0",shoes:"sneakers",shoeColor:"#e53935",
 backpack:false,cape:false,scarf:false,accColor:"#e53935",outfit:null,local:null,prev:null,autoRevert:true};
export function loadAvatar(){try{return Object.assign({},DEFAULT,JSON.parse(localStorage.getItem(AKEY)||"{}"))}catch(e){return {...DEFAULT}}}
export function saveAvatar(s){localStorage.setItem(AKEY,JSON.stringify(s));window.dispatchEvent(new CustomEvent("avatarchange",{detail:s}))}

export const SKINS=["#fde3cf","#f5cba7","#e0ac69","#c68642","#a0663d","#8d5524","#6b3e26","#4a2a19"];
export const HAIRC=["#111111","#3b2314","#6d4c41","#a1662f","#e6be8a","#d84315","#9e9e9e","#8e24aa","#1e88e5"];
export const EYEC=["#4e342e","#212121","#1e88e5","#43a047","#8d6e63"];
export const COLORS=["#e53935","#fb8c00","#fdd835","#43a047","#00897b","#1e88e5","#3949ab","#8e24aa","#ec407a","#fafafa","#9e9e9e","#212121","#795548","#f5e6c8","#880e4f"];
export const OPT={
 hair:{short:"Short",spiky:"Spiky",curly:"Curly",long:"Long",ponytail:"Ponytail",bun:"Bun",buzz:"Buzz",none:"None"},
 face:{smile:"😊 Smile",grin:"😁 Grin",wink:"😉 Wink",wow:"😮 Wow",cool:"😎 Cool",sleepy:"😴 Sleepy"},
 glasses:{none:"None",round:"👓 Round",square:"Square",sun:"🕶️ Sun",goggles:"🥽 Goggles"},
 hat:{none:"None",cap:"🧢 Cap",beret:"Beret",cowboy:"🤠 Cowboy",sunhat:"Explorer",chef:"👨‍🍳 Chef",helmet:"⛑️ Fire helmet",sailor:"⚓ Sailor",beanie:"Beanie",turban:"Turban",headband:"Headband",party:"🥳 Party",space:"🧑‍🚀 Space helmet",tophat:"🎩 Top hat",bonnet:"Bonnet",aviator:"Aviator cap"},
 top:{tee:"T-shirt",hoodie:"Hoodie",striped:"Striped",plaid:"Plaid",jersey:"🏈 Jersey",kurta:"Kurta",sherwani:"Sherwani",happi:"Happi coat",fiesta:"Fiesta shirt",carnival:"Carnival",explorer:"Explorer",astronaut:"🚀 Space suit",wetsuit:"🤿 Wetsuit",suit:"1860s suit",chef:"Chef coat",firefighter:"🚒 Firefighter",doctor:"🩺 Doctor",sailor:"⚓ Sailor",hero:"🦸 Hero"},
 bottom:{jeans:"Pants",shorts:"Shorts",pajama:"Pajama",dhoti:"Dhoti",skirt:"Skirt",cargo:"Cargo",space:"Space pants"},
 shoes:{sneakers:"Sneakers",boots:"Boots",sandals:"Sandals",mojari:"Mojari",space:"Space boots"}};

// Outfit sets. lock: {stamps:[place keys any-of], hint} or {stars:n, hint}
export const SETS={
 lincoln:{n:"Lincoln game day",e:"🏈",p:{top:"jersey",topColor:"#d50000",jersey:"N",bottom:"jeans",bottomColor:"#fafafa",hat:"cap",shoes:"sneakers",shoeColor:"#d50000",cape:false}},
 india:{n:"India kurta pajama",e:"🇮🇳",p:{top:"kurta",topColor:"#fb8c00",bottom:"pajama",shoes:"mojari",hat:"none",glasses:"none",cape:false,backpack:false}},
 dhoti:{n:"India kurta & dhoti",e:"🇮🇳",p:{top:"kurta",topColor:"#fdd835",bottom:"dhoti",shoes:"sandals",hat:"none",cape:false,backpack:false}},
 sherwani:{n:"India festive sherwani",e:"✨",p:{top:"sherwani",topColor:"#880e4f",bottom:"pajama",shoes:"mojari",hat:"none",scarf:true,accColor:"#fdd835",cape:false,backpack:false},lock:{stamps:["charminar","taj","indiagate","gateway","mysore","grand"],hint:"Visit any place in India on World Trip"}},
 paris:{n:"Paris",e:"🇫🇷",p:{top:"striped",topColor:"#1a237e",bottom:"jeans",bottomColor:"#212121",hat:"beret",scarf:true,accColor:"#e53935",shoes:"sneakers",shoeColor:"#fafafa",cape:false}},
 cowboy:{n:"USA cowboy",e:"🤠",p:{top:"plaid",topColor:"#c62828",bottom:"jeans",bottomColor:"#1565c0",hat:"cowboy",shoes:"boots",scarf:true,accColor:"#fdd835",cape:false}},
 explorer:{n:"Explorer",e:"🧭",p:{top:"explorer",bottom:"cargo",hat:"sunhat",shoes:"boots",backpack:true,accColor:"#2e7d32",cape:false}},
 egypt:{n:"Desert explorer",e:"🐪",p:{top:"explorer",bottom:"cargo",hat:"sunhat",shoes:"boots",scarf:true,accColor:"#f5e6c8",glasses:"sun",backpack:true,cape:false}},
 japan:{n:"Japan happi coat",e:"🇯🇵",p:{top:"happi",topColor:"#283593",bottom:"shorts",bottomColor:"#212121",hat:"headband",shoes:"sandals",cape:false,backpack:false}},
 rio:{n:"Rio carnival",e:"🎉",p:{top:"carnival",topColor:"#00c853",bottom:"shorts",bottomColor:"#fdd835",hat:"party",shoes:"sneakers",shoeColor:"#fdd835",cape:false}},
 fiesta:{n:"Fiesta",e:"🪅",p:{top:"fiesta",topColor:"#fafafa",bottom:"jeans",bottomColor:"#795548",hat:"none",shoes:"boots",cape:false}},
 astronaut:{n:"Astronaut",e:"🧑‍🚀",p:{top:"astronaut",bottom:"space",shoes:"space",hat:"space",backpack:true,accColor:"#eeeeee",glasses:"none",cape:false,scarf:false},lock:{stamps:["kennedy"],hint:"Visit Kennedy Space Center, launch to space, or time-travel to 1969!",space:true,time:true}},
 diver:{n:"Scuba diver",e:"🤿",p:{top:"wetsuit",bottom:"jeans",bottomColor:"#212121",shoes:"boots",shoeColor:"#212121",glasses:"goggles",hat:"none",backpack:true,accColor:"#fdd835",cape:false,scarf:false},lock:{sea:true,hint:"Dive in 🌊 Sea Mode"}},
 hero:{n:"Superhero",e:"🦸",p:{top:"hero",topColor:"#1e88e5",bottom:"jeans",bottomColor:"#1565c0",shoes:"boots",cape:true,accColor:"#e53935",hat:"none",backpack:false},lock:{stars:5,hint:"Collect 5 ⭐ (fly through rings or ace quizzes)"}},
 chef:{n:"Chef",e:"👩‍🍳",p:{top:"chef",bottom:"jeans",bottomColor:"#212121",hat:"chef",shoes:"sneakers",shoeColor:"#212121",cape:false,backpack:false}},
 firefighter:{n:"Firefighter",e:"🚒",p:{top:"firefighter",bottom:"cargo",hat:"helmet",shoes:"boots",cape:false,backpack:false,scarf:false}},
 doctor:{n:"Doctor",e:"🩺",p:{top:"doctor",bottom:"jeans",bottomColor:"#00897b",hat:"none",shoes:"sneakers",shoeColor:"#fafafa",cape:false,backpack:false}},
 fossil:{n:"Fossil hunter",e:"🦕",p:{top:"explorer",bottom:"cargo",hat:"sunhat",shoes:"boots",glasses:"goggles",backpack:true,accColor:"#6d4c41",cape:false,scarf:false},lock:{time:true,hint:"Travel in ⏳ Time Machine"}},
 pioneer:{n:"Pioneer (1840s)",e:"🐂",p:{top:"plaid",topColor:"#6d4c41",bottom:"jeans",bottomColor:"#5d4037",hat:"cowboy",shoes:"boots",scarf:true,accColor:"#c62828",cape:false,backpack:false},lock:{time:true,hint:"Travel in ⏳ Time Machine"}},
 prairie:{n:"Prairie bonnet",e:"🌾",p:{top:"kurta",topColor:"#5c6bc0",bottom:"skirt",bottomColor:"#5c6bc0",hat:"bonnet",shoes:"boots",cape:false,backpack:false,scarf:false},lock:{time:true,hint:"Travel in ⏳ Time Machine"}},
 suit1860:{n:"1860s top hat",e:"🎩",p:{top:"suit",bottom:"jeans",bottomColor:"#212121",hat:"tophat",shoes:"boots",shoeColor:"#212121",cape:false,backpack:false,scarf:false,glasses:"none"},lock:{time:true,hint:"Travel in ⏳ Time Machine"}},
 aviator:{n:"Early aviator",e:"✈️",p:{top:"hoodie",topColor:"#6d4c41",bottom:"jeans",bottomColor:"#3e2723",hat:"aviator",shoes:"boots",scarf:true,accColor:"#fafafa",cape:false,backpack:false},lock:{time:true,hint:"Travel in ⏳ Time Machine"}},
 sailor:{n:"Sailor",e:"⚓",p:{top:"sailor",bottom:"jeans",bottomColor:"#1a237e",hat:"sailor",shoes:"sneakers",shoeColor:"#fafafa",cape:false},lock:{stamps:["liberty","sydney","goldengate"],hint:"Visit a harbor: Statue of Liberty, Sydney or Golden Gate"}}};
// World Trip place -> local outfit offered on arrival
export const PLACE_SET={eiffel:"paris",taj:"india",charminar:"india",indiagate:"india",gateway:"india",mysore:"sherwani",grand:"india",
 fuji:"japan",rio:"rio",pyramids:"egypt",grandcanyon:"explorer",yellowstone:"explorer",machu:"explorer",rushmore:"cowboy",arch:"cowboy",
 kennedy:"astronaut",liberty:"sailor",sydney:"sailor"};
function stampsNow(){try{return JSON.parse(localStorage.getItem("realcraft_passport_v1")||"{}").stamps||{}}catch(e){return {}}}
function starsNow(){let r=0;try{r=JSON.parse(localStorage.getItem("realcraft_bw_rings")||"[]").length}catch(e){}return (+localStorage.getItem("realcraft_bw_stars")||0)+r}
export function isUnlocked(k){const L=SETS[k].lock;if(!L)return true;if(L.space&&localStorage.getItem("realcraft_space_visited"))return true;if(L.time&&localStorage.getItem("realcraft_time_visited"))return true;if(L.sea)return !!localStorage.getItem("realcraft_sea_visited");
 if(L.stamps){const s=stampsNow();return L.stamps.some(x=>s[x])}if(L.stars)return starsNow()>=L.stars;return true}

// ---------- 3D build ----------
const mat=c=>new THREE.MeshLambertMaterial({color:c});
function canvasTex(w,h,draw){const c=document.createElement("canvas");c.width=w;c.height=h;const g=c.getContext("2d");draw(g,w,h);const t=new THREE.CanvasTexture(c);t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestFilter;t.colorSpace=THREE.SRGBColorSpace;return t}
function box(p,w,h,d,m,x,y,z){const ms=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),typeof m==="string"?mat(m):m);ms.position.set(x,y,z);p.add(ms);return ms}
function faceTex(s){return canvasTex(16,16,(g)=>{g.fillStyle=s.skin;g.fillRect(0,0,16,16);const E=s.eyes,ey=6;
 const eye=(x,closed)=>{if(closed){g.fillStyle="#212121";g.fillRect(x,ey+1,3,1)}else{g.fillStyle="#fff";g.fillRect(x,ey,3,3);g.fillStyle=E;g.fillRect(x+1,ey,2,3);g.fillStyle="#111";g.fillRect(x+1,ey+1,1,1)}};
 const f=s.face;eye(3,f==="sleepy");eye(10,f==="wink"||f==="sleepy");if(f==="sleepy"){g.fillStyle="#90caf9";g.font="5px sans-serif";g.fillText("z",13,4)}
 g.fillStyle="rgba(239,83,80,.45)";if(f!=="cool"){g.fillRect(2,10,2,1);g.fillRect(12,10,2,1)}
 g.fillStyle="#8d2a1e";if(f==="wow"){g.fillRect(7,11,2,3)}else if(f==="grin"){g.fillRect(5,11,6,2);g.fillStyle="#fff";g.fillRect(6,11,4,1)}else if(f==="sleepy"){g.fillRect(7,12,2,1)}else if(f==="cool"){g.fillRect(6,12,5,1);g.fillRect(10,11,1,1)}else{g.fillRect(6,12,4,1);g.fillRect(5,11,1,1);g.fillRect(10,11,1,1)}
 g.fillStyle="rgba(0,0,0,.12)";g.fillRect(7,9,2,1)})}
const TOPS={
 tee:{sl:"short"},hoodie:{sl:"long",tex:(g,c)=>{g.fillStyle="rgba(0,0,0,.18)";g.fillRect(8,24,16,8);g.fillStyle="#fafafa";g.fillRect(12,2,1,8);g.fillRect(19,2,1,8)}},
 striped:{sl:"long",base:"#fafafa",tex:(g,c)=>{g.fillStyle=c;for(let y=4;y<40;y+=6)g.fillRect(0,y,32,3)},arm:(g,c)=>{g.fillStyle=c;for(let y=2;y<40;y+=6)g.fillRect(0,y,8,3)}},
 plaid:{sl:"long",tex:(g,c)=>{g.fillStyle="rgba(255,255,255,.45)";for(let i=0;i<32;i+=8){g.fillRect(i,0,3,40);g.fillRect(0,i,32,3)}g.fillStyle="#fafafa";g.fillRect(15,0,2,40)}},
 jersey:{sl:"short",tex:(g,c,s)=>{g.fillStyle="#fafafa";g.font="bold 22px sans-serif";g.textAlign="center";g.fillText(s.jersey||"L",16,30);g.fillRect(0,0,32,2)},arm:(g)=>{g.fillStyle="#fafafa";g.fillRect(0,14,8,3)}},
 kurta:{sl:"long",long:true,tex:(g,c)=>{g.fillStyle="#fdd835";g.fillRect(15,0,2,16);for(let y=2;y<16;y+=4)g.fillRect(13,y,6,1);for(let x=1;x<32;x+=4)g.fillRect(x,37,2,2)},skirtTex:(g)=>{g.fillStyle="#fdd835";for(let x=1;x<32;x+=4)g.fillRect(x,13,2,2)}},
 sherwani:{sl:"long",long:true,tex:(g,c)=>{g.fillStyle="#fdd835";g.fillRect(0,0,32,3);for(let y=6;y<40;y+=6)g.fillRect(15,y,2,2);g.fillStyle="rgba(253,216,53,.5)";for(let i=0;i<6;i++)g.fillRect(4+(i%2)*20,8+i*5,3,3)},skirtTex:(g)=>{g.fillStyle="#fdd835";g.fillRect(0,14,32,2);g.fillRect(15,0,2,16)}},
 happi:{sl:"long",long:true,tex:(g,c)=>{g.fillStyle="#fafafa";g.fillRect(9,0,3,40);g.fillRect(20,0,3,40);g.fillRect(0,36,32,4);g.fillStyle="#e53935";g.fillRect(0,22,32,3)},skirtTex:(g)=>{g.fillStyle="#fafafa";g.fillRect(0,12,32,4);g.fillRect(9,0,3,16);g.fillRect(20,0,3,16)}},
 fiesta:{sl:"short",tex:(g)=>{const C=["#e53935","#1e88e5","#43a047","#fb8c00","#8e24aa"];for(let i=0;i<10;i++){g.fillStyle=C[i%5];g.fillRect(3+(i%2)*21,4+(i>>1)*7,5,2)}g.fillStyle="#bdbdbd";g.fillRect(15,0,1,40)}},
 carnival:{sl:"short",tex:(g)=>{const C=["#fdd835","#e91e63","#00e5ff","#fafafa","#ff6d00"];for(let i=0;i<60;i++){g.fillStyle=C[i%5];g.fillRect((i*7)%31,(i*11)%39,2,2)}}},
 explorer:{sl:"short",base:"#c8b27d",fixed:true,tex:(g)=>{g.fillStyle="#a1887f";g.fillRect(4,8,9,8);g.fillRect(19,8,9,8);g.fillStyle="#6d4c41";g.fillRect(15,0,2,40)}},
 astronaut:{sl:"long",base:"#eeeeee",fixed:true,tex:(g)=>{g.fillStyle="#1e88e5";g.fillRect(4,6,8,5);g.fillStyle="#9e9e9e";g.fillRect(9,18,14,10);g.fillStyle="#e53935";g.fillRect(11,20,3,3);g.fillStyle="#43a047";g.fillRect(16,20,3,3);g.fillStyle="#fdd835";g.fillRect(11,24,8,2)},arm:(g)=>{g.fillStyle="#ff9800";g.fillRect(0,12,8,3)}},
 chef:{sl:"long",base:"#fafafa",fixed:true,tex:(g)=>{g.fillStyle="#424242";for(let y=6;y<36;y+=7){g.fillRect(10,y,2,2);g.fillRect(20,y,2,2)}}},
 firefighter:{sl:"long",base:"#6d5a2f",fixed:true,tex:(g)=>{g.fillStyle="#ffeb3b";g.fillRect(0,26,32,3);g.fillRect(0,32,32,3);g.fillStyle="#9e9e9e";g.fillRect(0,27,32,1);g.fillRect(0,33,32,1);g.fillStyle="#212121";g.fillRect(15,0,2,40)},arm:(g)=>{g.fillStyle="#ffeb3b";g.fillRect(0,22,8,3)}},
 doctor:{sl:"long",long:true,base:"#fafafa",fixed:true,tex:(g)=>{g.fillStyle="#26a69a";g.fillRect(10,0,12,40);g.fillStyle="#455a64";g.fillRect(9,4,1,14);g.fillRect(22,4,1,14);g.fillRect(9,18,14,1);g.fillStyle="#b0bec5";g.fillRect(14,18,4,4);g.fillStyle="#1e88e5";g.fillRect(24,10,4,1)},skirtTex:(g)=>{g.fillStyle="#bdbdbd";g.fillRect(15,0,2,16)}},
 sailor:{sl:"short",base:"#fafafa",fixed:true,tex:(g)=>{g.fillStyle="#1a237e";g.fillRect(0,0,32,6);g.beginPath();g.moveTo(6,0);g.lineTo(16,14);g.lineTo(26,0);g.fill();g.fillStyle="#e53935";g.fillRect(13,12,6,4)}},
 suit:{sl:"long",long:true,base:"#212121",fixed:true,tex:(g)=>{g.fillStyle="#fafafa";g.fillRect(12,0,8,14);g.fillStyle="#111";g.fillRect(13,2,6,3);g.fillStyle="#424242";for(let y=16;y<40;y+=7)g.fillRect(15,y,2,2)},skirtTex:(g)=>{g.fillStyle="#111";g.fillRect(15,0,2,16)}},
 wetsuit:{sl:"long",tex:(g,c)=>{g.fillStyle="#212121";g.fillRect(0,0,6,40);g.fillRect(26,0,6,40);g.fillRect(0,30,32,10);g.fillStyle="#fdd835";g.fillRect(15,0,2,26)},arm:(g)=>{g.fillStyle="#212121";g.fillRect(0,20,8,20)}},
 hero:{sl:"long",tex:(g)=>{g.fillStyle="#fdd835";g.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?4:10;g.lineTo(16+Math.cos(a)*r,16+Math.sin(a)*r)}g.fill();g.fillStyle="#fdd835";g.fillRect(0,34,32,3)}}};
export function topBase(s){const T=TOPS[s.top]||TOPS.tee;return T.fixed?T.base:(T.base&&s.top==="striped"?T.base:s.topColor)}
export function buildAvatarInto(av,s){const g=av.g;while(g.children.length){const c=g.children.pop();c.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{m.map&&m.map.dispose();m.dispose()})}})}
 av.legs.length=0;av.arms.length=0;const T=TOPS[s.top]||TOPS.tee,base=topBase(s),skin=s.skin,space=s.top==="astronaut";
 // torso
 const front=canvasTex(32,40,(c)=>{c.fillStyle=base;c.fillRect(0,0,32,40);T.tex&&T.tex(c,s.topColor,s)});const tm=mat(base);
 box(g,.6,.75,.35,[tm,tm,tm,tm,new THREE.MeshLambertMaterial({map:front}),tm],0,1.08,0);
 if(T.long){const st=canvasTex(32,16,c=>{c.fillStyle=base;c.fillRect(0,0,32,16);T.skirtTex&&T.skirtTex(c)});const sm=mat(base);box(g,.62,.38,.37,[sm,sm,sm,sm,new THREE.MeshLambertMaterial({map:st}),sm],0,.52,0)}
 const B=s.bottom,bcol=B==="pajama"||B==="dhoti"?"#fafafa":B==="cargo"?"#8d7a4b":B==="space"?"#eeeeee":s.bottomColor;
 if(B==="skirt")box(g,.64,.32,.4,bcol,0,.56,0);
 if(B==="dhoti")box(g,.6,.08,.37,"#fdd835",0,.69,0);
 // head + face
 const hm=mat(skin);box(g,.5,.5,.5,[hm,hm,hm,hm,new THREE.MeshLambertMaterial({map:faceTex(s)}),hm],0,1.72,0);
 const hc=s.hairColor,H=s.hair,hatOn=s.hat!=="none";
 if(H!=="none"&&H!=="buzz"){box(g,.54,.13,.54,hc,0,2.0,0);box(g,.54,.32,.08,hc,0,1.84,-.24);if(!hatOn)box(g,.54,.08,.06,hc,0,1.94,.25)}
 if(H==="buzz")box(g,.52,.05,.52,hc,0,1.98,0);
 if(H==="spiky"&&!hatOn)for(let i=0;i<5;i++)box(g,.12,.16,.12,hc,-.2+i*.1,2.12,(i%2)*.1-.05);
 if(H==="curly")for(let i=0;i<8;i++){const a=i/8*Math.PI*2;box(g,.14,.14,.14,hc,Math.cos(a)*.27,1.95,Math.sin(a)*.27)}
 if(H==="long"){box(g,.08,.5,.5,hc,-.27,1.7,-.02);box(g,.08,.5,.5,hc,.27,1.7,-.02);box(g,.54,.6,.08,hc,0,1.65,-.25)}
 if(H==="ponytail"){box(g,.14,.4,.14,hc,0,1.75,-.33)}if(H==="bun"&&!hatOn)box(g,.22,.18,.22,hc,0,2.15,-.08);
 // eyes extras
 const gl=s.glasses;if(gl!=="none"){const fc=gl==="goggles"?"#ff6f00":"#212121",lc=gl==="sun"?mat("#111"):gl==="goggles"?new THREE.MeshLambertMaterial({color:"#80deea",transparent:true,opacity:.6}):new THREE.MeshLambertMaterial({color:"#e1f5fe",transparent:true,opacity:.35});
  for(const x of[-.12,.12]){box(g,gl==="round"?.15:.17,gl==="square"?.12:.14,.03,lc,x,1.775,.27);box(g,.19,.03,.03,fc,x,1.86,.275);box(g,.19,.03,.03,fc,x,1.69,.275)}box(g,.08,.03,.03,fc,0,1.79,.275);if(gl==="goggles")box(g,.54,.06,.54,"#ff6f00",0,1.78,0)}
 // hats
 const h=s.hat;
 if(h==="cap"){box(g,.56,.16,.56,s.topColor==="#fafafa"?"#e53935":s.top==="jersey"?s.topColor:"#1e88e5",0,2.08,0);box(g,.5,.04,.25,"#212121",0,2.01,.35)}
 if(h==="tophat"){box(g,.8,.05,.8,"#212121",0,2.02,0);box(g,.5,.6,.5,"#212121",0,2.33,0);box(g,.52,.08,.52,"#5d4037",0,2.1,0)}
 if(h==="bonnet"){box(g,.6,.5,.62,s.topColor||"#5c6bc0",0,1.82,-.04);box(g,.66,.12,.12,s.topColor||"#5c6bc0",0,1.95,.3)}
 if(h==="aviator"){box(g,.56,.2,.56,"#6d4c41",0,2.04,0);box(g,.58,.36,.1,"#6d4c41",0,1.78,-.28);box(g,.5,.12,.06,"#90caf9",0,1.97,.29)}
 if(h==="beret"){box(g,.6,.1,.58,"#212121",-.03,2.07,0);box(g,.05,.08,.05,"#212121",0,2.14,0)}
 if(h==="cowboy"){box(g,.95,.05,.9,"#8d6e63",0,2.02,0);box(g,.5,.3,.5,"#8d6e63",0,2.18,0);box(g,.52,.06,.52,"#3e2723",0,2.07,0)}
 if(h==="sunhat"){box(g,.85,.05,.85,"#c8b27d",0,2.03,0);box(g,.52,.22,.52,"#c8b27d",0,2.15,0);box(g,.54,.05,.54,"#6d4c41",0,2.08,0)}
 if(h==="chef"){box(g,.5,.12,.5,"#fafafa",0,2.04,0);box(g,.62,.35,.62,"#fafafa",0,2.27,0)}
 if(h==="helmet"){box(g,.6,.25,.6,"#d50000",0,2.08,0);box(g,.7,.04,.75,"#d50000",0,1.98,-.04);box(g,.18,.14,.04,"#fdd835",0,2.1,.31)}
 if(h==="sailor"){box(g,.56,.14,.56,"#fafafa",0,2.05,0);box(g,.56,.04,.56,"#1a237e",0,2.0,0)}
 if(h==="beanie"){box(g,.56,.22,.56,s.accColor,0,2.07,0);box(g,.14,.1,.14,"#fafafa",0,2.22,0)}
 if(h==="turban"){box(g,.58,.25,.58,s.accColor,0,2.07,0);box(g,.5,.12,.5,s.accColor,0,2.22,-.02);box(g,.1,.1,.03,"#fdd835",0,2.1,.3)}
 if(h==="headband"){box(g,.54,.08,.54,"#fafafa",0,1.96,0);box(g,.12,.06,.03,"#e53935",0,1.96,.28)}
 if(h==="party"){const cg=new THREE.ConeGeometry(.18,.4,8);const m=new THREE.Mesh(cg,mat("#ec407a"));m.position.set(0,2.17,0);g.add(m);box(g,.1,.1,.1,"#fdd835",0,2.4,0)}
 if(h==="space"){box(g,.66,.64,.66,new THREE.MeshLambertMaterial({color:"#b3e5fc",transparent:true,opacity:.35,depthWrite:false}),0,1.75,0);box(g,.7,.08,.7,"#eeeeee",0,1.43,0)}
 // accessories
 const ac=s.accColor;
 if(s.scarf){box(g,.58,.1,.4,ac,0,1.44,0);box(g,.12,.36,.06,ac,.14,1.24,.2)}
 if(s.backpack){box(g,.46,.5,.2,space?"#eeeeee":ac,0,1.12,-.27);if(!space)box(g,.3,.15,.05,"#fdd835",0,1,-.38)}
 if(s.cape){const cp=box(g,.62,1.1,.05,ac,0,.92,-.22);cp.rotation.x=.08;av.cape=cp}else av.cape=null;
 // arms
 const armCol=T.sl==="long"?base:skin,armTex=T.arm?canvasTex(8,40,c=>{c.fillStyle=base;c.fillRect(0,0,8,40);T.arm(c,s.topColor)}):null;
 for(const sx of[-.42,.42]){const pv=new THREE.Group();pv.position.set(sx,1.4,0);g.add(pv);
  const sleeve=T.sl==="long"?.62:.3;const am=armTex?new THREE.MeshLambertMaterial({map:armTex}):mat(base);
  box(pv,.2,sleeve,.2,am,0,-sleeve/2,0);box(pv,.18,.7-sleeve,.18,skin,0,-sleeve-(.7-sleeve)/2,0);if(T.sl==="long")box(pv,.19,.08,.19,space?"#eeeeee":skin,0,-.66,0);
  if(space)box(pv,.22,.1,.22,"#ff9800",0,-.6,0);av.arms.push(pv)}
 // legs
 const wide=B==="pajama"||B==="dhoti"?.29:.25,sh=s.shoes,shc=sh==="boots"?"#5d4037":sh==="mojari"?"#d4a017":sh==="space"?"#eeeeee":sh==="sandals"?"#8d6e63":s.shoeColor;
 for(const sx of[-.14,.14]){const pv=new THREE.Group();pv.position.set(sx,.7,0);g.add(pv);
  if(B==="shorts"||B==="skirt"){box(pv,.26,.3,.26,B==="skirt"?skin:bcol,0,-.15,0);box(pv,.22,.4,.22,skin,0,-.5,0)}
  else if(B==="cargo"&&(s.top==="explorer"||s.top==="carnival")){box(pv,.26,.36,.26,bcol,0,-.18,0);box(pv,.08,.1,.04,"#6d5a2f",sx>0?.1:-.1,-.2,.13);box(pv,.22,.34,.22,skin,0,-.53,0)}
  else{box(pv,wide,.7,wide,bcol,0,-.35,0);if(B==="cargo")box(pv,.06,.12,.12,"#6d5a2f",sx>0?.15:-.15,-.35,0)}
  if(B==="dhoti")box(pv,wide+.01,.06,wide+.01,"#fdd835",0,-.58,0);
  if(sh==="boots"||sh==="space")box(pv,.28,.24,.32,shc,0,-.6,.03);else box(pv,.27,sh==="sandals"?.06:.12,.32,shc,0,sh==="sandals"?-.67:-.64,.04);
  if(sh==="mojari")box(pv,.1,.08,.08,shc,0,-.6,.22);if(sh==="sneakers")box(pv,.27,.04,.33,"#fafafa",0,-.69,.04);if(sh==="sandals")box(pv,.22,.04,.05,"#5d4037",0,-.62,.08);
  av.legs.push(pv)}
 g.traverse(o=>{o.userData.isAvatar=true});return av}
export function buildAvatar(scene,s=loadAvatar()){const av={g:new THREE.Group(),legs:[],arms:[]};buildAvatarInto(av,s);if(scene)scene.add(av.g);return av}

// ---------- UI ----------
const CSS=`#dzTabs,#dzTabs *{touch-action:pan-x!important}#dzBody,#dzBody *{touch-action:pan-y!important}#dzOv{height:100dvh;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);position:fixed;inset:0;z-index:200;background:linear-gradient(135deg,#7e57c2,#26c6da);display:flex;font-family:system-ui,-apple-system,sans-serif;color:#222}
#dzOv.hidden,#dzOffer.hidden{display:none}#dzPrev{flex:0 0 40%;position:relative;touch-action:none}#dzPrev canvas{width:100%!important;height:100%!important;display:block}
#dzPrev .t{position:absolute;top:10px;left:0;right:0;text-align:center;color:#fff;font:bold 22px system-ui;text-shadow:0 2px 0 #0005}
#dzPrev .b{position:absolute;bottom:12px;left:0;right:0;display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
#dzOv button{font:inherit;cursor:pointer}#dzPrev .b button{background:#fff;border:3px solid #000;border-radius:12px;padding:10px 14px;font-weight:bold;font-size:16px}#dzPrev .b .ok{background:#43a047;color:#fff}
#dzSide{flex:1;display:flex;flex-direction:column;background:#fff;border-left:4px solid #000;min-width:0}
#dzTabs{display:flex;gap:4px;overflow-x:auto;padding:8px 70px 8px 8px;background:#ede7f6;border-bottom:3px solid #000;-webkit-overflow-scrolling:touch}
#dzTabs button{flex:0 0 auto;border:3px solid #000;border-radius:12px;background:#fff;padding:8px 10px;font-size:15px;font-weight:bold}#dzTabs button.on{background:#fdd835}
#dzBody{flex:1;overflow-y:auto;padding:10px 12px 30px;-webkit-overflow-scrolling:touch}#dzBody h4{margin:12px 0 6px;font-size:16px}
.dzG{display:flex;flex-wrap:wrap;gap:8px}.dzG button{border:3px solid #000;border-radius:12px;background:#fafafa;padding:10px 12px;font-size:15px;min-height:46px}.dzG button.on{background:#fdd835;box-shadow:0 0 0 3px #7e57c2}
.dzG button.lk{opacity:.55;background:#eee}.dzG .sw{width:46px;height:46px;padding:0;border-radius:50%}.dzG .sw.on{box-shadow:0 0 0 4px #7e57c2}
.dzSet{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}.dzSet button{border:3px solid #000;border-radius:14px;background:#fff8e1;padding:10px;text-align:left;font-size:15px}
.dzSet button b{display:block;font-size:26px}.dzSet button small{display:block;color:#666;font-size:12px;margin-top:3px}.dzSet button.on{background:#fdd835}.dzSet button.lk{background:#eee;color:#777}
.dzTog{display:flex;align-items:center;gap:10px;font-size:15px;margin:10px 0}.dzTog input{width:26px;height:26px}
@media (orientation:portrait){#dzOv{flex-direction:column}#dzPrev{flex:0 0 38%}#dzSide{border-left:0;border-top:4px solid #000}}
#dzOffer{position:fixed;left:0;right:0;bottom:150px;margin:auto;width:fit-content;max-width:92%;z-index:60;background:#fff;border:4px solid #000;border-radius:16px;padding:12px 14px;font-family:system-ui,sans-serif;font-size:17px;text-align:center;box-shadow:0 6px 0 #0004}
#dzOffer button{font:bold 16px system-ui;border:3px solid #000;border-radius:12px;padding:10px 16px;margin:8px 4px 0;background:#43a047;color:#fff}#dzOffer button.no{background:#fff;color:#000}`;
function ensureCss(){if(document.getElementById("dzCss"))return;const st=document.createElement("style");st.id="dzCss";st.textContent=CSS;document.head.appendChild(st)}
const TABS=[["outfits","✨ Outfits"],["skin","🎨 Skin"],["hair","💇 Hair"],["face","😊 Face"],["glasses","👓 Glasses"],["hat","🎩 Hats"],["top","👕 Tops"],["bottom","👖 Bottoms"],["shoes","👟 Shoes"],["acc","🎒 Extras"]];
let ui=null;
export function openDressUp(opts={}){ensureCss();if(ui)return;let s=loadAvatar(),tab="outfits";
 const ov=document.createElement("div");ov.id="dzOv";ov.innerHTML=`<div id="dzPrev"><div class="t">👕 My Character</div><div class="b"><button id="dzRand">🎲 Surprise me</button><button id="dzReset">↩ Start over</button><button class="ok" id="dzDone">✅ Done</button></div></div><div id="dzSide"><div id="dzTabs">${TABS.map(([k,n])=>`<button data-t="${k}">${n}</button>`).join("")}</div><div id="dzBody"></div></div>`;
 document.body.appendChild(ov);const pv=ov.querySelector("#dzPrev");
 const ren=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});ren.setPixelRatio(window.RCA_DPR?RCA_DPR(2):Math.min(2,devicePixelRatio));pv.prepend(ren.domElement);
 const sc=new THREE.Scene();sc.add(new THREE.HemisphereLight(0xffffff,0x8866aa,1.6));const dl=new THREE.DirectionalLight(0xffffff,1.2);dl.position.set(3,5,6);sc.add(dl);
 const ped=new THREE.Mesh(new THREE.CylinderGeometry(1,1.1,.2,24),mat("#fdd835"));ped.position.y=-.1;sc.add(ped);
 const cam=new THREE.PerspectiveCamera(35,1,.1,50);cam.position.set(0,1.5,5.6);cam.lookAt(0,1.1,0);const av=buildAvatar(sc,s);
 let rot=0,spin=true,drag=null,raf=0,t0=performance.now();
 pv.addEventListener("pointerdown",e=>{if(e.target.tagName==="BUTTON")return;drag=e.clientX;spin=false});addEventListener("pointermove",e=>{if(drag!=null){rot+=(e.clientX-drag)*.012;drag=e.clientX}});addEventListener("pointerup",()=>{if(drag!=null){drag=null;setTimeout(()=>spin=true,1500)}});
 function frame(t){raf=requestAnimationFrame(frame);const W=pv.clientWidth,H=pv.clientHeight;if(ren.domElement.width!==Math.floor(W*ren.getPixelRatio())||ren.domElement.height!==Math.floor(H*ren.getPixelRatio())){ren.setSize(W,H,false);cam.aspect=W/H;cam.position.z=W/H<1?5.6:4.8;cam.updateProjectionMatrix()}
  const dt=Math.min(.05,(t-t0)/1000);t0=t;if(spin)rot+=dt*.8;av.g.rotation.y=rot;const w=Math.sin(t/300)*.25;av.arms[0].rotation.x=w;av.arms[1].rotation.x=-w;if(av.cape)av.cape.rotation.x=.12+Math.sin(t/250)*.06;ren.render(sc,cam)}raf=requestAnimationFrame(frame);
 const commit=()=>{saveAvatar(s);buildAvatarInto(av,s);opts.onChange&&opts.onChange(s);render()};
 const set=(k,v)=>{s[k]=v;s.outfit=null;if(s.local){s.local=null;s.prev=null}commit()};
 const grid=(k,opt)=>`<div class="dzG">${Object.entries(opt).map(([v,n])=>`<button data-k="${k}" data-v="${v}" class="${s[k]===v?"on":""}">${n}</button>`).join("")}</div>`;
 const sw=(k,list)=>`<div class="dzG">${list.map(c=>`<button class="sw ${s[k]===c?"on":""}" data-k="${k}" data-v="${c}" style="background:${c}" aria-label="colour ${c}"></button>`).join("")}</div>`;
 const tog=(k,n)=>`<label class="dzTog"><input type="checkbox" data-tg="${k}" ${s[k]?"checked":""}>${n}</label>`;
 function render(){ov.querySelectorAll("#dzTabs button").forEach(b=>b.classList.toggle("on",b.dataset.t===tab));let h="";
  if(tab==="outfits"){const grp=[["🌍 Around the world",["india","dhoti","sherwani","paris","cowboy","explorer","egypt","japan","rio","fiesta","lincoln"]],["⏳ Time travel",["fossil","pioneer","prairie","suit1860","aviator","astronaut"]],["🦸 Fun jobs & heroes",["astronaut","hero","chef","firefighter","doctor","sailor"]]];
   for(const[t,ks]of grp)h+=`<h4>${t}</h4><div class="dzSet">${ks.map(k=>{const S=SETS[k],u=isUnlocked(k);return`<button data-set="${k}" class="${u?"":"lk"} ${s.outfit===k?"on":""}"><b>${u?S.e:"🔒"}</b>${S.n}${u?"":`<small>${S.lock.hint}</small>`}</button>`}).join("")}</div>`;
   h+=tog("autoRevert","🏠 When I fly home, change back from a local outfit")}
  if(tab==="skin")h=`<h4>Skin tone</h4>`+sw("skin",SKINS);
  if(tab==="hair")h=`<h4>Hair style</h4>`+grid("hair",OPT.hair)+`<h4>Hair color</h4>`+sw("hairColor",HAIRC);
  if(tab==="face")h=`<h4>Face</h4>`+grid("face",OPT.face)+`<h4>Eye color</h4>`+sw("eyes",EYEC);
  if(tab==="glasses")h=`<h4>Glasses</h4>`+grid("glasses",OPT.glasses);
  if(tab==="hat")h=`<h4>Hats</h4>`+grid("hat",OPT.hat)+`<h4>Beanie / turban color</h4>`+sw("accColor",COLORS);
  if(tab==="top")h=`<h4>Tops</h4>`+grid("top",OPT.top)+`<h4>Color</h4>`+sw("topColor",COLORS)+(s.top==="jersey"?`<h4>Jersey letter</h4>`+grid("jersey",{L:"L for Lincoln",N:"N for Nebraska"}):"");
  if(tab==="bottom")h=`<h4>Bottoms</h4>`+grid("bottom",OPT.bottom)+`<h4>Color</h4>`+sw("bottomColor",COLORS);
  if(tab==="shoes")h=`<h4>Shoes</h4>`+grid("shoes",OPT.shoes)+`<h4>Sneaker color</h4>`+sw("shoeColor",COLORS);
  if(tab==="acc")h=`<h4>Extras</h4>`+tog("backpack","🎒 Backpack")+tog("cape","🦸 Cape")+tog("scarf","🧣 Scarf")+`<h4>Extras color</h4>`+sw("accColor",COLORS);
  const body=ov.querySelector("#dzBody");body.innerHTML=h;
  body.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>set(b.dataset.k,b.dataset.v));
  body.querySelectorAll("[data-tg]").forEach(b=>b.onchange=()=>{s[b.dataset.tg]=b.checked;if(b.dataset.tg!=="autoRevert")s.outfit=null;commit()});
  body.querySelectorAll("[data-set]").forEach(b=>b.onclick=()=>{const k=b.dataset.set;if(!isUnlocked(k)){b.animate([{transform:"translateX(-6px)"},{transform:"translateX(6px)"},{transform:"none"}],250);return}Object.assign(s,SETS[k].p);s.outfit=k;s.local=null;s.prev=null;commit()})}
 ov.querySelectorAll("#dzTabs button").forEach(b=>b.onclick=()=>{tab=b.dataset.t;render()});
 ov.querySelector("#dzRand").onclick=()=>{const pick=a=>a[Math.random()*a.length|0],ks=o=>Object.keys(o);Object.assign(s,{skin:pick(SKINS),hair:pick(ks(OPT.hair)),hairColor:pick(HAIRC),face:pick(ks(OPT.face)),glasses:Math.random()<.3?pick(ks(OPT.glasses)):"none",hat:Math.random()<.5?pick(ks(OPT.hat).filter(h=>h!=="space")):"none",top:pick(ks(OPT.top).filter(t=>t!=="astronaut")),topColor:pick(COLORS),bottom:pick(ks(OPT.bottom).filter(b=>b!=="space")),bottomColor:pick(COLORS),shoes:pick(["sneakers","boots","sandals"]),shoeColor:pick(COLORS),cape:Math.random()<.25,backpack:Math.random()<.3,scarf:Math.random()<.2,accColor:pick(COLORS),outfit:null,local:null,prev:null});commit()};
 ov.querySelector("#dzReset").onclick=()=>{s={...DEFAULT,skin:s.skin,autoRevert:s.autoRevert};commit()};
 const close=()=>{cancelAnimationFrame(raf);ren.dispose();ren.forceContextLoss&&ren.forceContextLoss();ov.remove();ui=null;opts.onClose&&opts.onClose(s)};
 ov.querySelector("#dzDone").onclick=close;ui={close,ov};render();return ui}
export function closeDressUp(){ui&&ui.close()}

// World-Trip helpers
export function offerLocalOutfit(place,onApply){ensureCss();const k=PLACE_SET[place];let el=document.getElementById("dzOffer");if(el)el.remove();if(!k)return null;const s=loadAvatar();if(s.outfit===k)return null;
 el=document.createElement("div");el.id="dzOffer";el.innerHTML=`<div>${SETS[k].e} Try the local outfit? <b>${SETS[k].n}</b></div><button id="dzYes">👕 Yes!</button><button class="no" id="dzNo">No thanks</button>`;document.body.appendChild(el);
 const done=()=>{el.remove();clearTimeout(tm)};const tm=setTimeout(done,20000);
 el.querySelector("#dzNo").onclick=done;el.querySelector("#dzYes").onclick=()=>{done();const cur=loadAvatar();const prev=cur.local?cur.prev:{...cur,prev:null,local:null};Object.assign(cur,SETS[k].p);cur.outfit=k;cur.local=place;cur.prev=prev;saveAvatar(cur);onApply&&onApply(cur)};return el}
export function revertLocalOutfit(onApply){const el=document.getElementById("dzOffer");if(el)el.remove();const s=loadAvatar();if(!s.local||!s.prev||!s.autoRevert)return false;const p={...s.prev,autoRevert:s.autoRevert,local:null,prev:null};saveAvatar(p);onApply&&onApply(p);return true}
