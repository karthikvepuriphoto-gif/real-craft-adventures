// Real Craft Adventures: "Pick your hometown" (shared by index, buildworld, space)
export const HT_KEY="realcraft_hometown_v1";
const FLAG={
 ne:`<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#1f3c88"/><circle cx="30" cy="20" r="11" fill="#e8c547"/><circle cx="30" cy="20" r="8" fill="#9bc0e8"/><rect x="22" y="22" width="16" height="4" fill="#6a9a3a"/></svg>`,
 ca:`<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#fff"/><rect y="34" width="60" height="6" fill="#c62828"/><polygon points="6,3 7.5,7 11.5,7 8.3,9.5 9.5,13.5 6,11 2.5,13.5 3.7,9.5 .5,7 4.5,7" fill="#c62828"/><path d="M14 22h22l4 3h4v4H16z" fill="#7b4a2a"/><rect x="18" y="29" width="3" height="3" fill="#7b4a2a"/><rect x="36" y="29" width="3" height="3" fill="#7b4a2a"/><rect x="14" y="20" width="30" height="1.5" fill="#6a9a3a"/><text x="30" y="33.4" font-size="3.4" text-anchor="middle" fill="#7b4a2a" font-family="sans-serif" font-weight="bold">CALIFORNIA REPUBLIC</text></svg>`,
 ny:`<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#1f3c88"/><circle cx="30" cy="19" r="8" fill="#9bc0e8" stroke="#e8c547" stroke-width="1.5"/><rect x="17" y="12" width="4" height="15" fill="#e8c547"/><rect x="39" y="12" width="4" height="15" fill="#e8c547"/><rect x="20" y="31" width="20" height="4" fill="#fff"/></svg>`,
 il:`<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#fff"/><circle cx="30" cy="17" r="10" fill="#e8c547"/><path d="M24 17l6-6 6 6-6 4z" fill="#5d4037"/><text x="30" y="36" font-size="6" text-anchor="middle" fill="#1f3c88" font-family="sans-serif" font-weight="bold">ILLINOIS</text></svg>`,
 tx:`<svg viewBox="0 0 60 40"><rect width="60" height="20" fill="#fff"/><rect y="20" width="60" height="20" fill="#c62828"/><rect width="20" height="40" fill="#1f3c88"/><polygon points="10,12 12.4,18.5 19,18.5 13.6,22.4 15.7,29 10,25 4.3,29 6.4,22.4 1,18.5 7.6,18.5" fill="#fff"/></svg>`,
 wa:`<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#1b6b3a"/><circle cx="30" cy="20" r="13" fill="#e8c547"/><circle cx="30" cy="20" r="10" fill="#fff"/><circle cx="30" cy="18" r="4" fill="#d7a86e"/><path d="M23 28c2-5 12-5 14 0z" fill="#333"/></svg>`
};
export const HOMES={
 lincoln:{n:"Lincoln",full:"Lincoln, Nebraska",e:"🌽",ll:[40.8136,-96.7026],state:{st:"Nebraska",flag:FLAG.ne,nick:"The Cornhusker State",bird:"Western meadowlark",cap:"Lincoln is the capital of Nebraska!",src:"nebraska.gov / Nebraska Legislature state symbols"}},
 sacramento:{n:"Sacramento",full:"Sacramento, California",e:"🌉",ll:[38.5816,-121.4944],state:{st:"California",flag:FLAG.ca,nick:"The Golden State",bird:"California quail",cap:"Sacramento is the capital of California!",src:"ca.gov State Symbols"},
  lm:[
  {k:"capitol",n:"🏛️ California State Capitol",x:0,z:46,y:28,go:[0.5,24.5],s:1.5,
   fact:"California's Capitol was finished in 1874, and its dome rises about 220 feet with a golden ball on top!",
   more:["Building it started in 1860 and took about 14 years.","Inside the dome you can spot iron grizzly bears, a symbol of California.","Sacramento has been California's capital since 1854."],src:"capitolmuseum.ca.gov"},
  {k:"bridge",n:"🌉 Tower Bridge",x:45,z:14,y:16,go:[33.5,14.5],s:1.3,
   fact:"Tower Bridge opened in 1935. Its middle part lifts straight up so tall boats can pass under!",
   more:["It crosses the Sacramento River.","It was painted shiny gold in 2002.","A bridge that lifts flat like an elevator is called a vertical lift bridge."],src:"City of Sacramento / Caltrans"},
  {k:"oldsac",n:"🚂 Old Sacramento",x:22,z:48,y:12,go:[22.5,30.5],
   fact:"Old Sacramento has wooden sidewalks and buildings from Gold Rush days, plus a giant railroad museum!",
   more:["In 1860 the Pony Express mail riders ended their long ride here.","Work on the first transcontinental railroad began in Sacramento in 1863.","The California State Railroad Museum has real steam trains you can see."],src:"oldsacramento.com / parks.ca.gov"},
  {k:"sutter",n:"🏰 Sutter's Fort",x:-22,z:47,y:9,go:[-22.5,30.5],
   fact:"Sutter's Fort was built in 1839 by John Sutter. It's one of the oldest buildings in Sacramento!",
   more:["Gold was found in 1848 at Sutter's Mill in Coloma, which started the California Gold Rush.","The fort has thick adobe walls made of mud bricks.","Today it's a state historic park where kids can learn about pioneer life."],src:"parks.ca.gov"},
  {k:"lake",n:"🌊 Two Rivers",x:45,z:-16,y:6,go:[33.5,-16.5],
   fact:"Sacramento sits where two rivers meet: the Sacramento River and the American River!",
   more:["The Sacramento River is the longest river in California.","Gold was found near the American River in 1848.","People kayak, fish and ride boats on the rivers."],src:"ca.gov / water.ca.gov"}]},
 newyork:{n:"New York",full:"New York City, New York",e:"🗽",ll:[40.7128,-74.006],state:{st:"New York",flag:FLAG.ny,nick:"The Empire State",bird:"Eastern bluebird",cap:"The capital of New York State is Albany.",src:"ny.gov State Symbols"},
  lm:[
  {k:"empire",n:"🏙️ Empire State Building",x:0,z:46,y:47,go:[0.5,24.5],s:1.6,
   fact:"The Empire State Building opened in 1931. It's 1,454 feet tall to the tip and has 102 floors!",
   more:["Workers built it in just about 410 days (1 year and 45 days)!","Its lights at the top change colors for holidays.","For about 40 years it was the tallest building in the world."],src:"esbnyc.com"},
  {k:"liberty",n:"🗽 Statue of Liberty",x:52,z:-42,y:21,go:[34.5,-42.5],s:1.3,
   fact:"The Statue of Liberty was a gift from France in 1886. From the ground to her torch she's about 305 feet tall!",
   more:["She is made of copper, which turned green over time.","Her crown has 7 rays.","She stands on Liberty Island in New York Harbor."],src:"nps.gov/stli"},
  {k:"park",n:"🌳 Central Park",x:-36,z:48,y:9,go:[-36.5,30.5],s:1.3,
   fact:"Central Park is 843 acres, a giant green park right in the middle of the city!",
   more:["It was designed by Frederick Law Olmsted and Calvert Vaux in 1858.","It has lakes, a zoo, playgrounds and an ice rink.","Millions of people visit it every year."],src:"centralparknyc.org"},
  {k:"brooklyn",n:"🌉 Brooklyn Bridge",x:50,z:14,y:19,go:[33.5,14.5],s:1.3,
   fact:"The Brooklyn Bridge opened in 1883 and connects Manhattan and Brooklyn over the East River!",
   more:["Emily Warren Roebling helped finish it and was the first person to cross it in a carriage.","Its towers are made of stone with pointy arches.","People can walk or bike across on a path above the cars."],src:"nyc.gov (NYC DOT)"},
  {k:"lake",n:"⛴️ New York Harbor",x:46,z:-16,y:6,go:[33.5,-16.5],
   fact:"New York Harbor is one of the biggest natural harbors in the world!",
   more:["Ferries carry people to the Statue of Liberty.","Ships from all over the world come here.","Long ago, many families arrived at nearby Ellis Island."],src:"nps.gov"}]},
 chicago:{n:"Chicago",full:"Chicago, Illinois",e:"🌬️",ll:[41.8781,-87.6298],state:{st:"Illinois",flag:FLAG.il,nick:"The Prairie State (also the “Land of Lincoln”)",bird:"Northern cardinal",cap:"The capital of Illinois is Springfield.",src:"illinois.gov / Illinois State Symbols"},
  lm:[
  {k:"willis",n:"🏢 Willis Tower",x:0,z:46,y:47,go:[0.5,24.5],s:1.6,
   fact:"Willis Tower is 110 stories and about 1,450 feet tall. It opened in 1973!",
   more:["On the 103rd floor, glass boxes called The Ledge stick out so you can look straight down!","On a clear day you can see up to 4 states from the top.","It is made of 9 tall tubes bundled together."],src:"theskydeck.com"},
  {k:"bean",n:"🫘 Cloud Gate (the Bean)",x:20,z:47,y:8,go:[20.5,30.5],s:1.2,
   fact:"Cloud Gate, nicknamed the Bean, is made of 168 stainless steel plates welded together and polished like a mirror!",
   more:["It was designed by artist Anish Kapoor and unveiled in 2004.","It weighs about 110 tons.","It's in Millennium Park. Look at it to see the sky and your own reflection!"],src:"chicago.gov / choosechicago.com"},
  {k:"pier",n:"🎡 Navy Pier",x:50,z:14,y:23,go:[33.5,14.5],s:1.3,
   fact:"Navy Pier opened in 1916 and stretches about 3,300 feet into Lake Michigan!",
   more:["It was first called Municipal Pier and renamed Navy Pier in 1927.","Its Centennial Wheel is almost 200 feet tall.","It has boats, rides, fireworks and a children's museum."],src:"navypier.org"},
  {k:"lake",n:"🏖️ Lakefront",x:46,z:-16,y:6,go:[33.5,-16.5],
   fact:"Chicago's lakefront has beaches and an 18-mile trail along Lake Michigan!",
   more:["Lake Michigan is one of the five Great Lakes.","Every St. Patrick's Day the Chicago River is dyed bright green.","In 1900 engineers made the Chicago River flow backward, away from the lake!"],src:"chicagoparkdistrict.com"}]},
 dallas:{n:"Dallas",full:"Dallas, Texas",e:"🤠",ll:[32.7767,-96.797],state:{st:"Texas",flag:FLAG.tx,nick:"The Lone Star State",bird:"Northern mockingbird",cap:"The capital of Texas is Austin.",src:"tsl.texas.gov / Texas State Symbols"},
  lm:[
  {k:"reunion",n:"🔮 Reunion Tower",x:0,z:46,y:46,go:[0.5,24.5],s:1.6,
   fact:"Reunion Tower opened in 1978 and is 561 feet tall. Its round ball glows with lights at night!",
   more:["The ball on top is a geodesic dome covered in lights.","Visitors ride up to a deck to see all of Dallas.","At Halloween it can glow orange like a giant jack-o'-lantern!"],src:"reuniontower.com"},
  {k:"fairpark",n:"🤠 Fair Park & Big Tex",x:-48,z:44,y:24,go:[-48.5,30.5],s:1.4,
   fact:"Big Tex is the 55-foot-tall cowboy who greets visitors at the State Fair of Texas in Fair Park. He says “Howdy, folks!”",
   more:["Big Tex first appeared at the State Fair in 1952.","Fair Park has beautiful Art Deco buildings from the 1936 Texas Centennial.","The fair is famous for rides, livestock shows and fun fair food."],src:"bigtex.com"},
  {k:"klyde",n:"🌳 Klyde Warren Park",x:-18,z:46,y:9,go:[-18.5,30.5],s:1.2,
   fact:"Klyde Warren Park is a park built right on top of a busy freeway. Cars drive underneath!",
   more:["It opened in 2012.","It's about 5 acres, with lawns, a playground and food trucks.","It reconnected neighborhoods that the freeway had split apart."],src:"dallasparks.org / klydewarrenpark.org"},
  {k:"lake",n:"🌊 Trinity River",x:45,z:-16,y:6,go:[33.5,-16.5],
   fact:"The Trinity River flows through Dallas on its way to the Gulf of Mexico!",
   more:["Big white arch bridges cross the river near downtown.","There are trails and parks along its banks.","It's the longest river that flows only inside Texas."],src:"dallascityhall.com / tpwd.texas.gov"}]},
 seattle:{n:"Seattle",full:"Seattle, Washington",e:"🌲",ll:[47.6062,-122.3321],state:{st:"Washington",flag:FLAG.wa,nick:"The Evergreen State",bird:"American goldfinch (willow goldfinch)",cap:"The capital of Washington is Olympia.",src:"sos.wa.gov / leg.wa.gov State Symbols"},
  lm:[
  {k:"needle",n:"🛸 Space Needle",x:0,z:46,y:46,go:[0.5,24.5],s:1.6,
   fact:"The Space Needle is 605 feet tall and was built for the 1962 World's Fair. It took only about 400 days to build!",
   more:["People called it the “400-day wonder.”","The 1962 fair's theme was “The Age of Space.”","Today its top has a glass floor you can stand on!"],src:"spaceneedle.com"},
  {k:"pike",n:"🐟 Pike Place Market",x:21,z:14,y:9,go:[21.5,4.5],s:1.3,
   fact:"Pike Place Market opened in 1907. Fish sellers there are famous for tossing big fish to each other!",
   more:["It's one of the oldest public farmers markets in the United States still running.","Farmers, bakers and crafters sell things there every day.","Look for the big red “Public Market” sign and clock."],src:"pikeplacemarket.org"},
  {k:"wheel",n:"🎡 Waterfront",x:45,z:30,y:19,go:[33.5,24.5],s:1.3,
   fact:"Seattle's waterfront is on Elliott Bay, part of Puget Sound. The Great Wheel there is 175 feet tall!",
   more:["The Seattle Great Wheel opened in 2012.","Big green-and-white ferries carry cars and people across Puget Sound.","You might spot seals and seagulls by the piers."],src:"seattlegreatwheel.com / wsdot.wa.gov"},
  {k:"lake",n:"⛴️ Elliott Bay",x:46,z:-16,y:6,go:[33.5,-16.5],
   fact:"Elliott Bay is part of Puget Sound, a big arm of the Pacific Ocean. Ferries and ships sail right past downtown!",
   more:["Seattle's ferries are part of the largest ferry system in the United States.","Look for seals, seagulls and big cargo ships.","Lots of the water here comes from rain and melting mountain snow."],src:"wsdot.wa.gov (Washington State Ferries)"}]},
 custom:{n:"My Town",full:"My Town",e:"🏗️",ll:null,state:null,lm:[]}
};
export function getHometown(){try{const h=JSON.parse(localStorage.getItem(HT_KEY)||"null");if(h&&HOMES[h.id])return h}catch(e){}return null}
export function setHometown(id,name){const h={id,name:id==="custom"?String(name||"My Town").slice(0,24):HOMES[id].n};localStorage.setItem(HT_KEY,JSON.stringify(h));return h}
export function htName(h){h=h||getHometown();return h?(h.id==="custom"?h.name:HOMES[h.id].n):"Lincoln"}
// silently keep existing Lincoln players in Lincoln
export function ensureDefault(){if(getHometown())return true;if(localStorage.getItem("realcraft_buildworld_v1")||localStorage.getItem("questcraft_save_v1")){setHometown("lincoln");return true}return false}
export function stateCardHTML(id){const H=HOMES[id];if(!H||!H.state)return"";const s=H.state;return`<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;justify-content:center"><div style="width:120px;border:3px solid #000">${s.flag}</div><div style="text-align:left;font-size:13px;line-height:1.7"><b>${s.st}</b><br>🏷️ Nickname: ${s.nick}<br>🐦 State bird: ${s.bird}<br>🏛️ ${s.cap}</div></div><p style="font-size:10px;opacity:.7">Flag drawn simply in blocks. Facts from ${s.src}.</p>`}
export function openPicker(onDone,opts={}){
 let ov=document.getElementById("htPick");if(ov)ov.remove();ov=document.createElement("div");ov.id="htPick";
 ov.style.cssText="position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.75);display:flex;align-items:center;justify-content:center;padding:12px;touch-action:pan-y";
 const cur=getHometown();
 const btn=(id)=>{const H=HOMES[id];return`<button data-h="${id}" style="font-size:13px;line-height:1.6;padding:12px 6px;border:3px solid #000;background:${cur&&cur.id===id?"#ffca28":"#fff"};color:#000;cursor:pointer;box-shadow:0 3px 0 #000">${H.e}<br>${H.full}</button>`};
 ov.innerHTML=`<div style="background:#2e3b2e;color:#fff;border:4px solid #000;max-width:560px;width:100%;max-height:92dvh;overflow:auto;-webkit-overflow-scrolling:touch;touch-action:pan-y;padding:16px;text-align:center;font-family:inherit"><h2 style="margin:4px 0 6px;font-size:20px">🏙️ Pick your hometown</h2><p style="font-size:12px;margin:0 0 12px">Build World starts in your city! You can change it anytime.</p>
 <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">${["lincoln","sacramento","newyork","chicago","dallas","seattle"].map(btn).join("")}</div>
 <div style="margin-top:12px;border:3px dashed #ffca28;padding:10px"><b>🏗️ Build your own hometown</b><br><input id="htName" maxlength="24" placeholder="Type your town's name" value="${cur&&cur.id==="custom"?cur.name.replace(/"/g,""):""}" style="font-size:16px;padding:8px;width:70%;margin:8px 0;border:3px solid #000"><br><button data-h="custom" style="font-size:14px;padding:10px 14px;border:3px solid #000;background:#66bb6a;box-shadow:0 3px 0 #000">Start a blank block city</button></div>
 ${cur&&!opts.first?'<button id="htCancel" style="margin-top:12px;font-size:13px;padding:8px 14px;border:3px solid #000">✖ Keep '+htName(cur)+'</button>':""}</div>`;
 document.body.appendChild(ov);
 ov.querySelectorAll("[data-h]").forEach(b=>b.onclick=()=>{const id=b.dataset.h;let name;if(id==="custom"){name=(ov.querySelector("#htName").value||"").replace(/[<>&"]/g,"").trim();if(!name){ov.querySelector("#htName").focus();ov.querySelector("#htName").placeholder="👆 Type a name first!";return}}const h=setHometown(id,name);ov.remove();onDone&&onDone(h)});
 const c=ov.querySelector("#htCancel");if(c)c.onclick=()=>ov.remove();
}
