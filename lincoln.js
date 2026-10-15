// Lincoln-only family content. Loaded only when the hometown is Lincoln.
(function(){
const GRAND={place:"My Home Mangala",city:"Hyderabad",ll:[17.4600,78.3600],grandma:"Ammamma",grandpa:"Thatha"};
const FAM={place:"Fremont",city:"Fremont, California",ll:[37.5485,-121.9886],aunt:"Inni"};
function addGrand(P){
P.grand={n:GRAND.place,e:"❤️",city:GRAND.city,country:"India",cont:"Asia",ll:GRAND.ll,hello:"Namaskaram",lang:"Telugu",india:1,grand:1,
 fact:"Welcome to "+GRAND.place+" in Hyderabad, where "+GRAND.grandma+" and "+GRAND.grandpa+" live! Find them waving by the playground.",
 when:"Hyderabad was founded in 1591, the same time the Charminar was built. Today it is the capital of the state of Telangana.",
 why:"Hyderabad is called the \"City of Pearls\" because it has been famous for pearl trading for hundreds of years. It's also famous for its yummy Hyderabadi biryani, a spiced rice dish!",
 big:GRAND.place+" is a big apartment community with 11 towers, each 15 floors tall, plus a clubhouse, a swimming pool, tennis courts and play areas.",
 cool:["Most people in Hyderabad speak Telugu, and say \"Namaskaram\" to say hello.","Hyderabad is a big technology city where lots of computer companies work.","The Charminar is only a short trip across the city!"],
 quiz:[["Why is Hyderabad called the City of Pearls?",["Pearl trading","Pearl-colored buildings","It rains pearls"],0],["What language do most people in Hyderabad speak?",["Telugu","French","Japanese"],0]]};
}
function addFam(P){
P.fremont={n:"Fremont, California",e:"💛",city:FAM.city,country:"USA",cont:"North America",ll:FAM.ll,hello:"Hello",lang:"English",grand:1,
 fact:"Welcome to Fremont, where "+FAM.aunt+" lives! Wave hello, then fly to Mission Peak and Lake Elizabeth.",
 when:"Fremont became a city in 1956 when five small towns joined together: Centerville, Irvington, Mission San Jose, Niles and Warm Springs.",
 why:"Mission San José was founded there in 1797, and early silent movies were filmed in Niles, including Charlie Chaplin's \"The Tramp\" in 1915.",
 big:"Mission Peak is about 2,500 feet tall, more than 6 Nebraska Capitols (400 feet) stacked up! Hikers climb it for the view of the Bay Area.",
 cool:["Lake Elizabeth is in Fremont's Central Park, with ducks, geese and (in summer) paddle boats.","Fremont is in the San Francisco Bay Area, near the Golden Gate Bridge.","A famous pole stands near the top of Mission Peak, and hikers love taking pictures with it."],
 quiz:[["Which hill do hikers climb in Fremont?",["Mission Peak","Mount Fuji","Mount Rushmore"],0],["What lake is in Fremont's Central Park?",["Lake Elizabeth","Holmes Lake","Lake Michigan"],0]]};
}
const BIOMES={
 pioneers:{name:"Pioneers Park",ic:"🦬",quest:"Look for the bison and spot 3 kinds of birds or animal tracks."},
 zoo:{name:"Lincoln Children's Zoo",ic:"🦒",quest:"Visit 5 different animals and learn one fun fact about your favorite."},
 lake:{name:"Holmes Lake",ic:"🌊",quest:"Walk along the lake path and count the ducks and geese."},
 kahoa:{name:"Kahoa Elementary",ic:"🏫",quest:"Invent a new recess game and teach it to a friend at Kahoa!"},
 capitol:{name:"Nebraska State Capitol",ic:"🏛️",quest:"Find The Sower statue on top of the tall tower and count the steps at the entrance!"},
 garden:{name:"Sunken Gardens",ic:"🌷",quest:"Find 4 flower colors. Which smells best?"},
 museum:{name:"Morrill Hall Museum",ic:"🦣",quest:"Find the giant mammoth and one fossil. Draw it!"}
};
window.RCA_LINCOLN={GRAND,FAM,addGrand,addFam,greetMa:["Namaskaram! I'm "+GRAND.grandma+". So happy you came!","Have you eaten? Come, I made your favorite snacks!","Let's go to the playground together!","You've grown so tall! Give me a big hug!"],greetPa:["Namaskaram! I'm "+GRAND.grandpa+". Want to fly around together?","Shall we play tennis? I'll go easy on you!","Did you see the pool? Let's go swimming later!","I'm so proud of you, kanna!"],BIOMES,
 patchLM(LM){for(const L of LM){if(L.k==="kahoa")L.n="🏫 Kahoa Elementary";if(L.k==="lake")L.n="🛶 Holmes Lake"}},
 patchBlocks(B){for(const b of B)if(b.hint)b.hint=b.hint.replace("School quest","Kahoa Elementary quest")},
 sticker:"Kahoa Recess"};
})();
