/* US History Trail + Presidents Hall for the Time Machine.
   Facts checked against: whitehouse.gov (presidents), National Archives (Declaration, Constitution, Bill of Rights, 19th Amendment, 13th Amendment),
   Library of Congress, NPS (Jamestown, Lewis & Clark Council Bluff, Oregon Trail, Homestead NHP, Harriet Tubman, Ellis Island, Liberty Bell, Statue of Liberty, Wright Brothers NM),
   Smithsonian (NMAAHC, Air & Space), NASA (Apollo 11), Nebraska State Historical Society (History Nebraska), Nebraska State Capitol, Nebraska Commission on Indian Affairs, Congress.gov (national bird, 2024). */
(function(){
const HKEY="realcraft_history_v1",SKEY="realcraft_bw_stars";
const load=()=>{try{return Object.assign({stamps:{},quiz:{},seen:{},match:0,badges:{}},JSON.parse(localStorage.getItem(HKEY)||"{}"))}catch(e){return{stamps:{},quiz:{},seen:{},match:0,badges:{}}}};
const save=p=>localStorage.setItem(HKEY,JSON.stringify(p));
function stars(n){if(window.tmAddStars)window.tmAddStars(n);else{localStorage.setItem(SKEY,(+localStorage.getItem(SKEY)||0)+n);window.dispatchEvent(new Event("starschange"))}}
function toast(t){const el=document.getElementById("toast");if(!el)return;el.textContent=t;el.style.opacity=1;clearTimeout(toast.t);toast.t=setTimeout(()=>el.style.opacity=0,2800)}
let VOICE=null;function pickVoice(){try{const v=speechSynthesis.getVoices();VOICE=v.find(x=>x.lang==="en-US"&&/Samantha|Allison|Ava|Google US|Aria|Jenny/i.test(x.name))||v.find(x=>x.lang==="en-US")||v.find(x=>/^en[-_]US/i.test(x.lang))||null}catch(e){}}
try{pickVoice();speechSynthesis.onvoiceschanged=pickVoice}catch(e){}
function say(t){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t.replace(/<[^>]+>/g,""));u.lang="en-US";if(VOICE)u.voice=VOICE;u.rate=.92;speechSynthesis.speak(u)}catch(e){}}
const esc=s=>String(s).replace(/"/g,"&quot;");

// ---------------- STOPS ----------------
const STOPS=[
{k:"native",e:"🦬",n:"Native Peoples of the Plains",when:"Thousands of years ago to today",
 story:"People lived all across North America for thousands of years before anyone came from Europe. Here in Nebraska, nations like the Pawnee, Omaha, Ponca, Otoe-Missouria, Lakota, Cheyenne and Arapaho made their homes on the plains and along the rivers. The Pawnee and Omaha built big round earth lodges and grew corn, beans and squash. They also hunted bison, and used almost every part of it for food, clothing and tools. Even the name Nebraska comes from an Otoe word meaning flat water, for the Platte River. When settlers came, the U.S. government pushed many Native nations off their lands, often by breaking promises in treaties. That was very unfair. Native nations are still here today. Four tribes have their headquarters in Nebraska: the Omaha, Ponca, Santee Sioux and Winnebago.",
 act:{type:"tap",q:"Tap everything in the Pawnee village to learn about it!",items:[["🏠","Earth lodge","A round home made of wood and covered with thick soil and grass. Warm in winter, cool in summer!"],["🌽","Corn, beans & squash","Often called the Three Sisters. They grow well together and give lots of healthy food."],["🦬","Bison","Bison gave meat, warm robes, and bones for tools. Hunters followed the herds."],["🌊","Platte River","'Flat water!' Rivers gave water, fish and a path to travel."]]},
 quiz:[["What does the name Nebraska mean in the Otoe language?",["Flat water","Big mountain","Cold snow"],0],["What kind of homes did the Pawnee build?",["Earth lodges","Skyscrapers","Igloos"],0]]},
{k:"pilgrims",e:"⛵",n:"Jamestown & the Pilgrims",when:"1607 and 1620",
 story:"In 1607, English settlers built Jamestown in Virginia. It was the first English town in America that lasted. The Powhatan people already lived there, and a girl named Pocahontas, the daughter of their leader, met the colonists. In 1620, the Pilgrims sailed across the ocean on the Mayflower and started Plymouth Colony in Massachusetts. Before landing, the men signed the Mayflower Compact, a promise to make fair rules together. The first winter was very hard and many got sick. The Wampanoag people lived there, and a Patuxet man named Tisquantum, or Squanto, who spoke English, showed the Pilgrims how to grow corn. In the fall of 1621, the Pilgrims held a harvest celebration, and about 90 Wampanoag men came with their leader Massasoit. People often call it the first Thanksgiving.",
 act:{type:"order",q:"Tap these in the order they happened!",items:[["🏘️","Jamestown is built",1607],["⛵","The Mayflower sails",1620],["📜","Mayflower Compact is signed",1620.5],["🌽","Harvest feast with the Wampanoag",1621]]},
 quiz:[["What ship did the Pilgrims sail on?",["The Mayflower","The Titanic","The Eagle"],0],["Who showed the Pilgrims how to grow corn?",["Tisquantum (Squanto)","George Washington","Neil Armstrong"],0]]},
{k:"colonies",e:"🏘️",n:"The 13 Colonies",when:"1607 to 1776",
 story:"Over time, there were 13 English colonies along the Atlantic coast. People group them in three regions. The New England Colonies were Massachusetts, New Hampshire, Connecticut and Rhode Island, with rocky soil, fishing and shipbuilding. The Middle Colonies were New York, New Jersey, Pennsylvania and Delaware, called the breadbasket because they grew lots of wheat. The Southern Colonies were Maryland, Virginia, North Carolina, South Carolina and Georgia, with big farms of tobacco and rice. Sadly, many of those big farms used enslaved Africans, who were forced to work without pay and were not free.",
 act:{type:"sort",q:"Which region does each colony belong to?",cats:["New England","Middle","Southern"],items:[["Massachusetts",0],["Pennsylvania",1],["Virginia",2],["Rhode Island",0],["New York",1],["Georgia",2]]},
 quiz:[["How many original colonies were there?",["13","50","7"],0],["Which colonies were called the breadbasket?",["The Middle Colonies","The Southern Colonies","None of them"],0]]},
{k:"revolution",e:"🔔",n:"The American Revolution",when:"1775 to 1783 · Declaration in 1776",
 story:"The colonists were angry that Great Britain made them pay taxes without letting them vote on them. They said: no taxation without representation! In 1773, at the Boston Tea Party, colonists dumped British tea into Boston Harbor. In 1775 the Revolutionary War began, and George Washington led the Continental Army. On July 4, 1776, the Continental Congress adopted the Declaration of Independence, written mostly by Thomas Jefferson. It said that all men are created equal, with rights to life, liberty and the pursuit of happiness. Back then those words did not include everyone, like enslaved people and women, and Americans have worked ever since to make them true for all. The war ended with the Treaty of Paris in 1783, and the United States was free.",
 act:{type:"tap",q:"Tap the objects from 1776!",items:[["🪶","Quill pen","Jefferson wrote the Declaration with a quill, a pen made from a feather dipped in ink."],["📜","Declaration of Independence","Adopted July 4, 1776. 56 men signed it. The real one is at the National Archives in Washington, D.C."],["🫖","Tea crate","At the Boston Tea Party in 1773, colonists dumped 342 chests of tea into the harbor to protest a tax."],["✍️","John Hancock's signature","He signed so big that today people say 'put your John Hancock here' when they mean sign your name!"]]},
 quiz:[["When was the Declaration of Independence adopted?",["July 4, 1776","December 25, 1800","January 1, 1900"],0],["Who wrote most of the Declaration?",["Thomas Jefferson","Abraham Lincoln","Harriet Tubman"],0]]},
{k:"constitution",e:"⚖️",n:"The Constitution & Three Branches",when:"1787",
 story:"In 1787, leaders met in Philadelphia and wrote the Constitution, the plan for our government. It starts with the words, We the People. It splits the government into three branches so no one gets too much power. The legislative branch, Congress, makes the laws. The executive branch, led by the President, carries out the laws. The judicial branch, with the Supreme Court, explains the laws and decides if they follow the Constitution. Each branch can check the others. This is called checks and balances. In 1791, ten amendments called the Bill of Rights were added, protecting freedoms like freedom of speech and freedom of religion.",
 act:{type:"sort",q:"Which branch does this job?",cats:["Congress (makes laws)","President (carries out laws)","Supreme Court (explains laws)"],items:[["Votes on a new law",0],["Signs a bill to make it law",1],["Decides if a law follows the Constitution",2],["Leads the military as commander in chief",1],["Has senators and representatives",0],["Has nine justices",2]]},
 quiz:[["What are the first three words of the Constitution?",["We the People","Once upon a","Hello my friends"],0],["What are the first 10 amendments called?",["The Bill of Rights","The Ten Rules","The Mayflower Compact"],0]]},
{k:"lewisclark",e:"🛶",n:"Lewis & Clark",when:"1804 to 1806",
 story:"In 1803, President Thomas Jefferson bought a huge piece of land from France called the Louisiana Purchase. Nebraska was part of it! He sent Meriwether Lewis and William Clark with a team called the Corps of Discovery to explore it, all the way to the Pacific Ocean. In 1804 they paddled up the Missouri River, right along Nebraska's eastern edge. On August 3, 1804, near today's Fort Calhoun, Nebraska, they held their first council, a meeting, with Otoe and Missouria leaders. A Shoshone woman named Sacagawea helped as an interpreter, carrying her baby son. A man named York, who was enslaved by Clark, worked as a full member of the team. They even brought a big dog named Seaman! They drew maps and described many plants and animals that were new to them, like the prairie dog.",
 act:{type:"order",q:"Put the journey in order!",items:[["🗺️","Louisiana Purchase",1803],["🛶","Start up the Missouri River",1804],["🤝","First council near Fort Calhoun, Nebraska",1804.6],["🌊","Reach the Pacific Ocean",1805],["🏠","Return home to St. Louis",1806]]},
 quiz:[["Which river did Lewis and Clark travel up past Nebraska?",["The Missouri River","The Nile","The Amazon"],0],["What was the name of their dog?",["Seaman","Rover","Spot"],0]]},
{k:"trail",e:"🐂",n:"Pioneers & the Oregon Trail",when:"1840s to 1860s",threeD:"trail",
 story:"From the 1840s to the 1860s, more than 400,000 people traveled west in covered wagons on the Oregon, California and Mormon trails. Most of the trails ran right across Nebraska along the Platte River! Pioneers looked for landmarks like Chimney Rock and Scotts Bluff, and stopped at Fort Kearny. Wagons went about 15 miles a day, and most people walked beside them. In 1862, the Homestead Act said a family could get 160 acres of land if they lived on it and farmed it for five years. Daniel Freeman filed one of the very first homestead claims, near Beatrice, Nebraska. Today it is Homestead National Historical Park. Remember, this land was already home to Native nations, who lost much of it as settlers came.",
 act:{type:"sort",q:"Pack your wagon! Bring it or leave it?",cats:["Pack it 🧺","Leave it 🙅"],items:[["Flour",0],["A big heavy piano",1],["Water barrel",0],["A tool kit",0],["Glass chandelier",1],["Warm blankets",0]]},
 quiz:[["Which river did the trails follow across Nebraska?",["The Platte River","The Hudson River","The Thames"],0],["How much land did the Homestead Act offer?",["160 acres","1 acre","1 million acres"],0]]},
{k:"tubman",e:"⭐",n:"Underground Railroad & Harriet Tubman",when:"1849 to 1860",
 story:"Slavery meant people were owned by others and forced to work without pay, and families could be split apart. It was terribly wrong. The Underground Railroad was not a real railroad. It was a secret network of brave people, Black and white, who helped freedom seekers travel north to freedom. Helpers were called conductors and safe houses were called stations. Harriet Tubman was born into slavery in Maryland. In 1849 she escaped to Philadelphia and freedom. Then she bravely went back about 13 times and led about 70 family members and friends to freedom, and gave directions to many more. People called her Moses. Freedom seekers often followed the North Star at night.",
 act:{type:"pick",q:"Help find north! Which star is the North Star? (Hint: the two stars at the end of the Big Dipper's cup point to it.)",opts:[["✨ The bright star the Dipper points to",1,"Yes! The North Star, Polaris, stays in the same spot in the sky, so it always shows which way is north."],["🌟 A star low in the south",0,"Not quite. Stars in the south would lead the wrong way."],["💫 Any shooting star",0,"Shooting stars zip by too fast to follow! Look for the star the Big Dipper points to."]]},
 quiz:[["What was the Underground Railroad?",["A secret network helping people escape slavery","A subway train","A toy train"],0],["About how many trips did Harriet Tubman make back to Maryland?",["About 13","About 1,000","None"],0]]},
{k:"lincoln",e:"🎩",n:"Abraham Lincoln & the End of Slavery",when:"1861 to 1865",threeD:"lincoln",
 story:"Abraham Lincoln was born in a log cabin in Kentucky in 1809 and mostly taught himself by reading borrowed books. He became our 16th President in 1861. Soon the Civil War began between the North, called the Union, and the South, called the Confederacy. The biggest cause was slavery. On January 1, 1863, Lincoln's Emancipation Proclamation declared enslaved people in the Confederate states free. The war ended in 1865. On June 19, 1865, news of freedom reached enslaved people in Galveston, Texas. We celebrate that day as Juneteenth. In December 1865, the 13th Amendment ended slavery in the whole United States. Two years later, Nebraska's new capital city was named Lincoln, after him!",
 act:{type:"order",q:"Put these in order!",items:[["🪵","Lincoln is born in Kentucky",1809],["🎩","Lincoln becomes President",1861],["📜","Emancipation Proclamation",1863],["🎉","Juneteenth: news of freedom reaches Texas",1865],["⚖️","13th Amendment ends slavery",1865.9]]},
 quiz:[["Which amendment ended slavery in the whole country?",["The 13th","The 1st","The 50th"],0],["What holiday celebrates June 19, 1865?",["Juneteenth","Groundhog Day","Halloween"],0]]},
{k:"statehood",e:"🌾",n:"Nebraska Becomes a State",when:"March 1, 1867",
 story:"In 1854, the Kansas-Nebraska Act created the Nebraska Territory. On March 1, 1867, Nebraska became the 37th state! The capital had been in Omaha, but the new state leaders wanted it more central. They picked a tiny village called Lancaster, with only about 30 people, and renamed it Lincoln, after President Abraham Lincoln. Today's Nebraska State Capitol in Lincoln was built from 1922 to 1932. Its tower is about 400 feet tall, with a statue called The Sower on top, planting seeds. Nebraska is also the only state with a one-house legislature, called the Unicameral, since 1937.",
 act:{type:"tap",q:"Explore the Nebraska State Capitol!",items:[["🗼","The tower","About 400 feet tall. You can see it from miles away across the prairie!"],["🌱","The Sower","A bronze statue on top, planting seeds. It stands for farming and hope for the future."],["🏛️","The Unicameral","Nebraska's lawmakers meet in one house, not two. No other state does this!"],["🏘️","Lancaster","The tiny village of about 30 people that became the city of Lincoln in 1867."]]},
 quiz:[["What number state is Nebraska?",["37th","1st","50th"],0],["What was Lincoln's town called before 1867?",["Lancaster","Omaha","Kearney"],0]]},
{k:"immigration",e:"🗽",n:"Inventions & Ellis Island",when:"1870s to 1954",
 story:"In the late 1800s, inventions changed everyday life. Alexander Graham Bell patented the telephone in 1876, and Thomas Edison made a long-lasting light bulb in 1879, with Lewis Latimer improving it. At the same time, millions of immigrants came to America looking for a better life. Ellis Island in New York Harbor opened on January 1, 1892. The first person through was Annie Moore, a 17-year-old girl from Ireland. By 1954, more than 12 million people had come through Ellis Island. Many immigrants came to Nebraska too, from places like Germany, Sweden and Czech lands. The town of Wilber, Nebraska still celebrates its Czech heritage!",
 act:{type:"tap",q:"You just arrived by steamship! Tap each step.",items:[["🚢","Steamship","Many families crossed the ocean for about one to two weeks, often in crowded rooms below deck."],["🗽","Statue of Liberty","The first thing many immigrants saw in New York Harbor. A welcome sign of freedom!"],["🩺","Health check","Doctors checked each person quickly. Most people were done in just a few hours."],["🧳","Your suitcase","People brought only what they could carry: clothes, photos, a special treasure from home."]]},
 quiz:[["When did Ellis Island open?",["1892","1492","1992"],0],["Who patented the telephone in 1876?",["Alexander Graham Bell","Orville Wright","Rosa Parks"],0]]},
{k:"suffrage",e:"🗳️",n:"Women's Right to Vote",when:"1848 to 1920",
 story:"For a long time, women in most of the United States were not allowed to vote. In 1848, at a meeting in Seneca Falls, New York, Elizabeth Cady Stanton and others said women should have equal rights, including voting. Susan B. Anthony traveled and gave speeches for decades. Sojourner Truth, who had escaped slavery, spoke for the rights of women and Black Americans. These women were called suffragists, from suffrage, which means the right to vote. They marched, wrote and spoke peacefully for more than 70 years. In 1920, the 19th Amendment gave women the right to vote. Some women, like many Native American and Asian American women, still had to keep working for that right after 1920.",
 act:{type:"order",q:"Put the march to the ballot box in order!",items:[["📣","Seneca Falls meeting",1848],["🚂","Susan B. Anthony travels giving speeches",1870],["🚶‍♀️","Big suffrage parade in Washington, D.C.",1913],["🗳️","19th Amendment: women can vote",1920]]},
 quiz:[["What does suffrage mean?",["The right to vote","A kind of soup","A long trip"],0],["Which amendment gave women the right to vote in 1920?",["The 19th","The 13th","The 2nd"],0]]},
{k:"wright",e:"🛩️",n:"The Wright Brothers",when:"December 17, 1903",threeD:"wright",
 story:"Wilbur and Orville Wright ran a bicycle shop in Dayton, Ohio. They tested kites, gliders and a home-made wind tunnel for years. On December 17, 1903, near Kitty Hawk, North Carolina, Orville flew the very first powered airplane flight. It lasted 12 seconds and went 120 feet. They made four flights that day, and Wilbur's last one went 852 feet in 59 seconds. The real 1903 Wright Flyer is at the Smithsonian's National Air and Space Museum.",
 act:{type:"pick",q:"Why did the Wrights fly near Kitty Hawk?",opts:[["💨 Steady wind and soft sand",1,"Right! Strong, steady wind helped lift the plane, and the soft sand dunes made landings safer."],["🏙️ It was a big city",0,"Nope, it was a quiet, sandy place far from cities."],["❄️ It was always snowy",0,"Not quite. They picked it for its wind and soft sand."]]},
 quiz:[["How long was the first flight?",["12 seconds","12 hours","12 minutes"],0],["What shop did the Wright brothers run?",["A bicycle shop","A bakery","A pet shop"],0]]},
{k:"civilrights",e:"✊",n:"Civil Rights: Rosa Parks & Dr. King",when:"1950s and 1960s",
 story:"Even after slavery ended, unfair laws in many places kept Black Americans apart from white Americans. This was called segregation. On December 1, 1955, in Montgomery, Alabama, Rosa Parks refused to give up her bus seat to a white rider. She was arrested. Black families then stopped riding the buses for 381 days, the Montgomery Bus Boycott, until the buses were made fair. A young pastor, Dr. Martin Luther King Jr., helped lead it. He believed in changing things peacefully, without violence. In 1960, six-year-old Ruby Bridges bravely became the first Black child at her New Orleans elementary school. On August 28, 1963, Dr. King gave his I Have a Dream speech to about 250,000 people in Washington, D.C. Laws in 1964 and 1965 helped protect equal rights and the right to vote. We honor him on Martin Luther King Jr. Day.",
 act:{type:"pick",q:"Dr. King believed in peaceful change. Which of these is a peaceful way to change an unfair rule?",opts:[["🗣️ Speak up, march and vote",1,"Yes! Speeches, peaceful marches, boycotts and voting were how the Civil Rights Movement changed laws."],["😠 Be mean to people",0,"Dr. King taught that kindness and peace are stronger than meanness."],["🙈 Do nothing ever",0,"Rosa Parks and Ruby Bridges showed that even one brave, calm person can help change things."]]},
 quiz:[["What city's buses did Rosa Parks help change?",["Montgomery, Alabama","Lincoln, Nebraska","Paris"],0],["What is Dr. King's famous 1963 speech called?",["I Have a Dream","One Small Step","We the People"],0]]},
{k:"moon",e:"🌕",n:"The Moon Landing",when:"July 20, 1969",threeD:"moon",
 story:"In 1961, President John F. Kennedy set a goal to land people on the Moon. On July 20, 1969, NASA's Apollo 11 lunar module, the Eagle, landed on the Moon's Sea of Tranquility. Neil Armstrong stepped out first and said, that's one small step for man, one giant leap for mankind. Buzz Aldrin joined him, while Michael Collins circled above in the command module Columbia. They planted an American flag and brought back about 47 pounds of Moon rocks. Between 1969 and 1972, 12 astronauts walked on the Moon.",
 act:{type:"order",q:"Countdown! Put the mission in order.",items:[["🚀","Launch from Florida",1],["🌕","Eagle lands on the Moon",2],["👣","Armstrong's first step",3],["🌊","Splashdown in the Pacific Ocean",4]]},
 quiz:[["Who was the first person on the Moon?",["Neil Armstrong","Buzz Lightyear","George Washington"],0],["What was the lunar module called?",["The Eagle","The Mayflower","The Sower"],0]]},
{k:"symbols",e:"🇺🇸",n:"American Symbols",when:"Then and now",
 story:"The American flag has 13 stripes for the 13 original colonies and 50 stars for the 50 states. The 50th star was added in 1960, after Hawaii became a state. The Liberty Bell in Philadelphia has the words, proclaim liberty throughout all the land. In the 1830s, people working to end slavery started calling it the Liberty Bell. It has a famous crack. The Statue of Liberty was a gift of friendship from France and was dedicated in New York Harbor in 1886. Her torch stands for freedom lighting the way. The bald eagle has been on the Great Seal since 1782, and in 2024 a new law officially made it the national bird.",
 act:{type:"tap",q:"Tap each symbol!",items:[["🇺🇸","The flag","13 stripes for the first colonies, 50 stars for today's states."],["🔔","Liberty Bell","In Philadelphia. People who worked to end slavery gave it its name in the 1830s."],["🗽","Statue of Liberty","A gift from France, dedicated in 1886. She is about 151 feet tall, not counting her base!"],["🦅","Bald eagle","Officially the national bird since 2024, and on the Great Seal since 1782."]]},
 quiz:[["What do the 13 stripes on the flag stand for?",["The 13 original colonies","13 presidents","13 rivers"],0],["Which country gave us the Statue of Liberty?",["France","Japan","Brazil"],0]]}
];

// ---------------- PRESIDENTS (whitehouse.gov list; 47 presidencies, 45 people) ----------------
// p:[number,name,years,fact,look] look = hair color | style: w=white wig, b=beard, m=mustache, s=sideburns, x=bald top
const PRES=[
[1,"George Washington","1789–1797","Our first President! He led the Continental Army in the Revolution. He never lived in the White House because it wasn't finished yet.","#eee|w"],
[2,"John Adams","1797–1801","The first President to live in the White House, starting in 1800.","#ddd|x"],
[3,"Thomas Jefferson","1801–1809","He wrote most of the Declaration of Independence and made the Louisiana Purchase, which included Nebraska!","#c97b4a|w"],
[4,"James Madison","1809–1817","Called the 'Father of the Constitution.' At 5 feet 4 inches, he was our shortest President.","#ccc|x"],
[5,"James Monroe","1817–1825","His Monroe Doctrine told European countries not to start new colonies in the Americas.","#ccc|w"],
[6,"John Quincy Adams","1825–1829","The son of John Adams, our 2nd President.","#ddd|xs"],
[7,"Andrew Jackson","1829–1837","He signed the Indian Removal Act, which forced many Native nations to leave their homes. That was very unfair, and we remember the Trail of Tears.","#eee|"],
[8,"Martin Van Buren","1837–1841","The first President born a citizen of the United States. He grew up speaking Dutch!","#ddd|xs"],
[9,"William Henry Harrison","1841","He was President for only 31 days, the shortest time ever.","#ccc|"],
[10,"John Tyler","1841–1845","The first Vice President to become President when a President died.","#bbb|"],
[11,"James K. Polk","1845–1849","The country grew all the way to the Pacific Ocean while he was President.","#999|"],
[12,"Zachary Taylor","1849–1850","An army general nicknamed 'Old Rough and Ready.'","#bbb|"],
[13,"Millard Fillmore","1850–1853","He and his wife Abigail started the first White House library.","#bbb|"],
[14,"Franklin Pierce","1853–1857","He signed the Kansas-Nebraska Act in 1854, which created the Nebraska Territory.","#3e2723|"],
[15,"James Buchanan","1857–1861","The only President who never married.","#eee|"],
[16,"Abraham Lincoln","1861–1865","The tallest President at 6 feet 4 inches. He led the country through the Civil War and worked to end slavery. Our capital city is named after him!","#222|b"],
[17,"Andrew Johnson","1865–1869","Nebraska became the 37th state while he was President, on March 1, 1867.","#333|"],
[18,"Ulysses S. Grant","1869–1877","He was the Union's top general, and as President he signed the law creating Yellowstone, the first national park, in 1872.","#5d4037|b"],
[19,"Rutherford B. Hayes","1877–1881","He started the White House Easter Egg Roll in 1878.","#6d4c41|b"],
[20,"James A. Garfield","1881","The last President born in a log cabin.","#795548|b"],
[21,"Chester A. Arthur","1881–1885","He loved fancy clothes and had the White House redecorated, including a glass screen by Louis Comfort Tiffany.","#5d4037|ms"],
[22,"Grover Cleveland","1885–1889","The only President to get married in the White House, in 1886.","#666|xm"],
[23,"Benjamin Harrison","1889–1893","Grandson of President William Henry Harrison. Electric lights were put in the White House while he was President.","#8d6e63|b"],
[24,"Grover Cleveland","1893–1897","The same Grover Cleveland! He's counted as both the 22nd and 24th President because his terms weren't back-to-back.","#666|xm"],
[25,"William McKinley","1897–1901","The last President who served as a soldier in the Civil War.","#444|"],
[26,"Theodore Roosevelt","1901–1909","The teddy bear is named after him! He protected about 230 million acres of land for nature.","#6d4c41|m"],
[27,"William Howard Taft","1909–1913","The only person to be both President and Chief Justice of the Supreme Court. He began the tradition of the President throwing the first pitch of baseball season.","#888|xm"],
[28,"Woodrow Wilson","1913–1921","He was President during World War I. The 19th Amendment, giving women the vote, was added in 1920.","#999|"],
[29,"Warren G. Harding","1921–1923","The first President to ride to his inauguration in a car.","#ccc|"],
[30,"Calvin Coolidge","1923–1929","The only President born on the Fourth of July! He lit the first National Christmas Tree in 1923.","#a1887f|"],
[31,"Herbert Hoover","1929–1933","He was a mining engineer, and the Hoover Dam is named after him.","#777|"],
[32,"Franklin D. Roosevelt","1933–1945","Elected four times, more than any other President. He led during the Great Depression and World War II, and talked to Americans on the radio in 'fireside chats.'","#777|"],
[33,"Harry S. Truman","1945–1953","The 'S' in his name doesn't stand for anything! He kept a sign on his desk: 'The Buck Stops Here.'","#888|"],
[34,"Dwight D. Eisenhower","1953–1961","A World War II general. He signed the law that built the Interstate highways, like I-80 through Lincoln!","#ddd|x"],
[35,"John F. Kennedy","1961–1963","He set the goal of landing astronauts on the Moon, and started the Peace Corps.","#8d4b20|"],
[36,"Lyndon B. Johnson","1963–1969","He signed the Civil Rights Act of 1964 and the Voting Rights Act of 1965.","#666|"],
[37,"Richard Nixon","1969–1974","He talked on the phone with the Apollo 11 astronauts while they were on the Moon. He is the only President who resigned, which means he left the job early.","#444|"],
[38,"Gerald R. Ford","1974–1977","Born in Omaha, Nebraska, in 1913! He's the only President who was never elected President or Vice President.","#c9a26b|"],
[39,"Jimmy Carter","1977–1981","A peanut farmer from Georgia who won the Nobel Peace Prize. He lived to be 100, longer than any other President.","#c9a26b|"],
[40,"Ronald Reagan","1981–1989","He was a movie actor before he went into politics.","#4e342e|"],
[41,"George H. W. Bush","1989–1993","A Navy pilot in World War II. He went skydiving for his 90th birthday!","#bbb|"],
[42,"Bill Clinton","1993–2001","He loves to play the saxophone.","#ccc|"],
[43,"George W. Bush","2001–2009","The son of George H. W. Bush, like John Quincy Adams and John Adams. He enjoys painting.","#999|"],
[44,"Barack Obama","2009–2017","The first African American President, and the first born in Hawaii.","#333|"],
[45,"Donald J. Trump","2017–2021","A businessman who had never served in government or the military before becoming President.","#e0c070|"],
[46,"Joe Biden","2021–2025","He was 78 when he took office, the oldest ever at the time. Before that he was Vice President under Barack Obama.","#eee|"],
[47,"Donald J. Trump","2025–","The same Donald Trump! Like Grover Cleveland, he's counted twice (45th and 47th) because his terms weren't back-to-back.","#e0c070|"]];
const SKINS={44:"#8d5524"};
const KEY_MORE={
1:"Washington was chosen unanimously, which means every elector voted for him. After two terms he stepped down, showing that power in America passes peacefully. The capital city and the state of Washington are named after him.",
3:"Jefferson loved books. His collection of 6,487 books helped rebuild the Library of Congress after a fire in 1814. He also sent Lewis and Clark to explore the West.",
16:"Lincoln grew up on the frontier and only went to school for about a year in total. He loved reading and telling funny stories. His Gettysburg Address is only about 270 words long. He is on the penny and the five-dollar bill.",
26:"In 1902 he refused to shoot a bear on a hunting trip. A cartoon about it led a shop owner to make a stuffed 'Teddy's bear.' He created many national parks, forests and wildlife refuges.",
32:"FDR got polio as an adult and used a wheelchair, but he didn't let it stop him. His New Deal programs helped people find work during the Great Depression.",
38:"Ford was born Leslie Lynch King Jr. in Omaha, and later took his stepfather's name. He was a football star at the University of Michigan. He became President in 1974 and worked to help the country heal.",
44:"Obama was born in Honolulu and was a senator from Illinois. He and his family brought a dog named Bo to the White House."};
const KEYS=Object.keys(KEY_MORE).map(Number);

function portrait(p,size=64){const [hair,st]=p[4].split("|");const sk=SKINS[p[0]]||"#f0c8a0";const w=st.includes("w"),b=st.includes("b"),m=st.includes("m"),s=st.includes("s"),x=st.includes("x");
 return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true"><rect width="64" height="64" rx="8" fill="#e8eaf6"/><rect x="6" y="6" width="52" height="52" rx="6" fill="none" stroke="#c5a14a" stroke-width="3"/>
 <path d="M14 64 Q14 46 32 46 Q50 46 50 64Z" fill="#263238"/><path d="M27 46 L32 54 L37 46Z" fill="#fff"/>
 <ellipse cx="32" cy="30" rx="11" ry="13" fill="${sk}"/>
 ${x?`<path d="M21 28 Q20 20 23 19 M43 28 Q44 20 41 19" stroke="${hair}" stroke-width="4" fill="none"/>`:w?`<path d="M20 30 Q19 15 32 15 Q45 15 44 30 Q46 22 42 18 Q32 10 22 18 Q18 22 20 30Z" fill="${hair}"/><circle cx="20" cy="31" r="3" fill="${hair}"/><circle cx="44" cy="31" r="3" fill="${hair}"/>`:`<path d="M21 27 Q20 16 32 16 Q44 16 43 27 Q40 20 32 20 Q24 20 21 27Z" fill="${hair}"/>`}
 ${s?`<rect x="20" y="28" width="3" height="9" fill="${hair}"/><rect x="41" y="28" width="3" height="9" fill="${hair}"/>`:""}
 <circle cx="27.5" cy="29" r="1.6" fill="#222"/><circle cx="36.5" cy="29" r="1.6" fill="#222"/><path d="M28 37 Q32 39 36 37" stroke="#7a4a3a" stroke-width="1.5" fill="none"/>
 ${b?`<path d="M21 33 Q22 46 32 46 Q42 46 43 33 Q40 41 32 41 Q24 41 21 33Z" fill="${hair}"/>`:""}${m?`<path d="M26 35 Q32 32 38 35 Q32 37 26 35Z" fill="${hair}"/>`:""}</svg>`}

// ---------------- QUESTS ----------------
const QUESTS=[
{k:"nebraska",e:"🌾",n:"Nebraska Explorer",need:["native","lewisclark","trail","statehood"],r:3,desc:"Earn the stamps for 4 Nebraska stops."},
{k:"freedom",e:"🕊️",n:"Freedom Path",need:["tubman","lincoln","suffrage","civilrights"],r:3,desc:"Learn how brave people worked for freedom and fairness."},
{k:"founders",e:"📜",n:"Founders Club",need:["colonies","revolution","constitution","symbols"],r:3,desc:"Discover how the United States began."},
{k:"pres",e:"🏛️",n:"Presidents Pro",need:[],r:5,desc:"Finish 3 rounds of the Presidents Match game.",test:p=>p.match>=3},
{k:"all",e:"🛂",n:"Master Time Traveler",need:STOPS.map(s=>s.k),r:10,desc:"Collect all 16 History Passport stamps."}];
function checkQuests(){const p=load();for(const q of QUESTS){const ok=q.test?q.test(p):q.need.every(k=>p.stamps[k]);if(ok&&!p.badges[q.k]){p.badges[q.k]=1;save(p);stars(q.r);setTimeout(()=>toast(`🏅 Quest complete: ${q.n}! ⭐+${q.r}`),900)}}}

// ---------------- UI ----------------
const css=`#hsOv .pan{width:min(980px,100%)}
.hgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.hcard{display:flex;flex-direction:column;align-items:center;gap:4px;background:#e3f2fd;font-family:system-ui,sans-serif;font-size:14px;font-weight:700;padding:10px 6px;position:relative;text-align:center;line-height:1.25}
.hcard .e{font-size:32px}.hcard small{font-weight:400;color:#555;font-size:12px}.hcard i{position:absolute;top:4px;right:6px;font-style:normal}
.hscene{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;background:linear-gradient(#bbdefb,#c5e1a5);border:3px solid #000;border-radius:12px;padding:12px;margin:8px 0}
.hscene button{font-family:system-ui,sans-serif;font-size:15px;background:#fff;display:flex;flex-direction:column;align-items:center;min-width:92px}.hscene button .e{font-size:34px}
.hscene button.ok{background:#c8e6c9}.hscene button.no{background:#ffccbc}
.hsort{display:flex;flex-wrap:wrap;align-items:center;gap:6px;background:#fff8e1;border:3px solid #000;border-radius:10px;padding:8px;margin:6px 0}.hsort b{flex:1 1 160px}.hsort button{font-family:system-ui,sans-serif;font-size:13px;background:#fff;padding:7px 8px}.hsort button.ok{background:#66bb6a}.hsort button.no{background:#ef9a9a}
.hpres{display:flex;gap:10px;align-items:center;background:#f5f5f5;border:3px solid #000;border-radius:10px;padding:8px;font-family:system-ui,sans-serif;font-size:14px;text-align:left;line-height:1.35;font-weight:400}
.hpres svg{flex:none}.hpres b{display:block;font-size:15px}.hpres .no{font-family:'Press Start 2P',monospace;font-size:10px;color:#4527a0}.hpres.key{background:#fff8e1}
.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px}
.mcol{display:flex;flex-direction:column;gap:6px;flex:1 1 220px}.mrow{display:flex;gap:10px;flex-wrap:wrap}
.mcol button svg{flex:none}.mcol button{font-family:system-ui,sans-serif;font-size:14px;background:#fff;text-align:left;display:flex;gap:8px;align-items:center;line-height:1.3}.mcol button.sel{background:#fff59d}.mcol button.done{background:#c8e6c9;opacity:.7}.mcol button.no{background:#ffccbc}
.story{font-size:17px;line-height:1.55}
@media (max-width:560px){.hgrid{grid-template-columns:repeat(2,1fr)}.pgrid{grid-template-columns:1fr}.story{font-size:16px}}`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
const ov=document.createElement("div");ov.id="hsOv";ov.className="ov hidden";ov.innerHTML=`<div class="pan"><button class="x" id="hsX">✖</button><h2 id="hsTitle">🇺🇸 US History Trail</h2><div class="tabs" id="hsTabs"></div><div id="hsBody"></div></div>`;
document.body.appendChild(ov);
const $=id=>document.getElementById(id);
$("hsX").onclick=()=>{ov.classList.add("hidden");try{speechSynthesis.cancel()}catch(e){}};
let tab="stops";
const TABS=[["stops","🗺️ Stops"],["pres","🏛️ Presidents Hall"],["match","🧩 Presidents Match"],["pass","🛂 Passport & Quests"]];
function open(t){if(t)tab=t;document.querySelectorAll(".ov").forEach(o=>o.classList.add("hidden"));ov.classList.remove("hidden");render()}
window.openHistory=open;
function tabs(){$("hsTabs").innerHTML=TABS.map(t=>`<button data-t="${t[0]}" class="${t[0]===tab?"on":""}">${t[1]}</button>`).join("");$("hsTabs").querySelectorAll("button").forEach(b=>b.onclick=()=>{tab=b.dataset.t;render()})}
function render(){tabs();const B=$("hsBody");$("hsTitle").textContent="🇺🇸 US History Trail";ov.querySelector(".pan").scrollTop=0;
 if(tab==="stops")renderStops(B);else if(tab==="pres")renderPres(B);else if(tab==="match")renderMatch(B);else renderPass(B)}
function renderStops(B){const p=load();B.innerHTML=`<p>Travel through American history! Each stop has a story, a mini-game and a quiz. Finish the mini-game to earn a <b>passport stamp</b>.</p><div class="hgrid">${STOPS.map(s=>`<button class="hcard" data-k="${s.k}"><span class="e">${s.e}</span>${s.n}<small>${s.when}</small>${p.stamps[s.k]?"<i>✅</i>":""}</button>`).join("")}</div>`;
 B.querySelectorAll(".hcard").forEach(b=>b.onclick=()=>openStop(b.dataset.k))}
function stamp(k){const p=load();if(!p.stamps[k]){p.stamps[k]=1;save(p);stars(2);toast("🛂 Passport stamp earned! ⭐+2");checkQuests()}}
function openStop(k){const s=STOPS.find(x=>x.k===k),p=load(),got=p.quiz[k]||{};const B=$("hsBody");ov.querySelector(".pan").scrollTop=0;
 B.innerHTML=`<button id="hsBack" style="background:#e0e0e0">⬅ All stops</button>
 <h2 style="margin-top:10px">${s.e} ${s.n}</h2><p style="font-family:'Press Start 2P',monospace;font-size:10px;color:#6a1b9a">${s.when}${p.stamps[k]?" · ✅ Stamped":""}</p>
 <div style="display:flex;gap:6px;flex-wrap:wrap"><button id="hsRead" style="background:#b39ddb">🔊 Read to me</button><button id="hsStop" style="background:#e0e0e0">⏹ Stop</button>${s.threeD&&window.goEra?`<button id="hs3d" style="background:#4fc3f7">🚀 Visit in 3D</button>`:""}</div>
 <p class="story">${s.story}</p><h3>🎮 Try it!</h3><p><b>${s.act.q}</b></p><div id="hsAct"></div>
 <h3>❓ Quiz (⭐ for each first right answer)</h3>${s.quiz.map((q,i)=>`<div class="q" data-i="${i}"><b>${q[0]}</b><br>${q[1].map((a,j)=>`<button data-j="${j}" class="${got[i]&&j===q[2]?"ok":""}">${a}</button>`).join("")}</div>`).join("")}`;
 $("hsBack").onclick=()=>render();$("hsRead").onclick=()=>say(s.n+". "+s.story);$("hsStop").onclick=()=>{try{speechSynthesis.cancel()}catch(e){}};
 if($("hs3d"))$("hs3d").onclick=()=>{ov.classList.add("hidden");window.goEra(s.threeD)};
 B.querySelectorAll(".q").forEach(d=>d.querySelectorAll("button").forEach(b=>b.onclick=()=>{const i=+d.dataset.i,j=+b.dataset.j,q=s.quiz[i];if(j===q[2]){b.className="ok";const p=load();p.quiz[k]=p.quiz[k]||{};if(!p.quiz[k][i]){p.quiz[k][i]=1;save(p);stars(1);toast("✅ Correct! ⭐+1")}else toast("✅ Correct!")}else{b.className="no";toast("Not quite. Try again! 🙂")}}));
 act(s,$("hsAct"))}
function act(s,el){const a=s.act,done=()=>stamp(s.k);
 if(a.type==="tap"){const seen=new Set();el.innerHTML=`<div class="hscene">${a.items.map((it,i)=>`<button data-i="${i}"><span class="e">${it[0]}</span>${it[1]}</button>`).join("")}</div><div class="why" id="hsWhy">Tap a picture!</div>`;
  el.querySelectorAll(".hscene button").forEach(b=>b.onclick=()=>{const it=a.items[+b.dataset.i];seen.add(b.dataset.i);b.className="ok";$("hsWhy").innerHTML=`<b>${it[0]} ${it[1]}:</b> ${it[2]} <small>(${seen.size}/${a.items.length})</small>`;say(it[1]+". "+it[2]);if(seen.size===a.items.length)done()})}
 else if(a.type==="order"){const sorted=[...a.items].sort((x,y)=>x[2]-y[2]);const sh=[...a.items].sort(()=>Math.random()-.5);let n=0;
  el.innerHTML=`<div class="hscene">${sh.map(it=>`<button data-y="${it[2]}"><span class="e">${it[0]}</span>${it[1]}</button>`).join("")}</div><div class="why" id="hsWhy">Tap the first one!</div>`;
  el.querySelectorAll(".hscene button").forEach(b=>b.onclick=()=>{if(b.classList.contains("ok"))return;if(+b.dataset.y===sorted[n][2]){n++;b.className="ok";b.insertAdjacentHTML("afterbegin",`<small>#${n}</small>`);$("hsWhy").textContent=n===sorted.length?"🎉 Perfect order!":"Great! What came next?";if(n===sorted.length)done()}else{b.classList.add("no");setTimeout(()=>b.classList.remove("no"),500);$("hsWhy").textContent="Hmm, something else came before that. Try again!"}})}
 else if(a.type==="sort"){let right=0;el.innerHTML=a.items.map((it,i)=>`<div class="hsort" data-i="${i}"><b>${it[0]}</b>${a.cats.map((c,j)=>`<button data-j="${j}">${c}</button>`).join("")}</div>`).join("")+`<div class="why" id="hsWhy">Pick an answer for each one.</div>`;
  el.querySelectorAll(".hsort").forEach(d=>d.querySelectorAll("button").forEach(b=>b.onclick=()=>{if(d.dataset.done)return;const it=a.items[+d.dataset.i];if(+b.dataset.j===it[1]){b.className="ok";d.dataset.done=1;right++;$("hsWhy").textContent=right===a.items.length?"🎉 All sorted!":`Yes! ${right}/${a.items.length}`;if(right===a.items.length)done()}else{b.className="no";$("hsWhy").textContent="Not that one. Try another!"}}))}
 else if(a.type==="pick"){el.innerHTML=`<div class="hscene">${a.opts.map((o,i)=>`<button data-i="${i}" style="min-width:180px">${o[0]}</button>`).join("")}</div><div class="why" id="hsWhy">Choose one!</div>`;
  el.querySelectorAll(".hscene button").forEach(b=>b.onclick=()=>{const o=a.opts[+b.dataset.i];b.className=o[1]?"ok":"no";$("hsWhy").textContent=o[2];say(o[2]);if(o[1])done()})}}
function renderPres(B){const p=load();B.innerHTML=`<p>All ${PRES.length} presidencies, from George Washington to today. Grover Cleveland and Donald Trump each served two terms that weren't back-to-back, so they're counted twice (45 people in all). Tap a card to hear it. ⭐ cards have extra stories!</p>
 <div class="pgrid">${PRES.map((q,i)=>`<button class="hpres ${KEY_MORE[q[0]]?"key":""}" data-i="${i}">${portrait(q,60)}<span><span class="no">#${q[0]} · ${q[2]}</span><b>${KEY_MORE[q[0]]?"⭐ ":""}${q[1]}</b>${q[3]}${p.seen[q[0]]?" ✅":""}</span></button>`).join("")}</div>
 <p style="font-size:13px;color:#555">Portraits are friendly drawings, not real pictures. Facts from whitehouse.gov, the National Archives and the Library of Congress.</p>`;
 B.querySelectorAll(".hpres").forEach(b=>b.onclick=()=>{const q=PRES[+b.dataset.i];const p=load();p.seen[q[0]]=1;save(p);const more=KEY_MORE[q[0]];
  if(more){B.innerHTML=`<button id="hsBack" style="background:#e0e0e0">⬅ All presidents</button><div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin-top:10px">${portrait(q,120)}<div><p class="no" style="font-family:'Press Start 2P',monospace;font-size:11px;color:#4527a0">President #${q[0]} · ${q[2]}</p><h2 style="margin:4px 0">${q[1]}</h2></div></div><p class="story">${q[3]}</p><p class="story">${more}</p><button id="hsRead" style="background:#b39ddb">🔊 Read to me</button>`;
   ov.querySelector(".pan").scrollTop=0;$("hsBack").onclick=()=>renderPres(B);$("hsRead").onclick=()=>say(`${q[1]}, President number ${q[0]}. ${q[3]} ${more}`);say(`${q[1]}. ${q[3]}`)}
  else{say(`${q[1]}, President number ${q[0]}. ${q[3]}`);if(!b.textContent.includes("✅"))b.querySelector("span").insertAdjacentHTML("beforeend"," ✅")}})}
function renderMatch(B){const p=load();const pool=PRES.filter((q,i)=>PRES.findIndex(r=>r[1]===q[1])===i);const pick=[];const prefer=[1,3,16,26,32,38,44,2,18,30,34,35];
 const cand=[...pool].sort(()=>Math.random()-.5).sort((a,b)=>(prefer.includes(b[0])?1:0)-(prefer.includes(a[0])?1:0)+(Math.random()-.5)*1.2);
 for(const q of cand){if(pick.length<4)pick.push(q)}
 const facts=[...pick].sort(()=>Math.random()-.5);let sel=null,done=0;
 B.innerHTML=`<p>Tap a President, then tap the fact that matches! Rounds finished: <b>${p.match}</b>${p.match>=3?" 🏅 Presidents Pro!":" (finish 3 for the Presidents Pro badge)"}</p>
 <div class="mrow"><div class="mcol">${pick.map((q,i)=>`<button data-n="${i}">${portrait(q,44)}<span><b>${q[1]}</b><br><small>#${q[0]}</small></span></button>`).join("")}</div>
 <div class="mcol" id="mf">${facts.map(q=>`<button data-f="${pick.indexOf(q)}">${q[3].replace(q[1],"This President")}</button>`).join("")}</div></div><div class="why" id="hsWhy">Pick a President first.</div>`;
 const names=B.querySelectorAll("[data-n]");names.forEach(b=>b.onclick=()=>{if(b.classList.contains("done"))return;names.forEach(x=>x.classList.remove("sel"));b.classList.add("sel");sel=+b.dataset.n;$("hsWhy").textContent="Now tap the matching fact!"});
 B.querySelectorAll("[data-f]").forEach(b=>b.onclick=()=>{if(sel===null||b.classList.contains("done"))return;if(+b.dataset.f===sel){b.classList.add("done");names[sel].classList.remove("sel");names[sel].classList.add("done");sel=null;done++;
  if(done===4){const p=load();p.match++;save(p);stars(2);$("hsWhy").innerHTML=`🎉 Round complete! ⭐+2 <button id="mAgain" style="margin-left:8px">▶️ Next round</button>`;$("mAgain").onclick=()=>renderMatch(B);checkQuests()}else $("hsWhy").textContent="✅ Match! Keep going."}else{b.classList.add("no");setTimeout(()=>b.classList.remove("no"),500);$("hsWhy").textContent="Not that one. Try another fact!"}})}
function renderPass(B){const p=load();const n=STOPS.filter(s=>p.stamps[s.k]).length;
 B.innerHTML=`<p><b>${n}/${STOPS.length}</b> stamps collected · ${Object.keys(p.seen).length} President cards read</p><div class="grid">${STOPS.map(s=>`<div class="stamp ${p.stamps[s.k]?"":"off"}"><span class="e">${s.e}</span>${s.n}<br><small>${s.when}</small></div>`).join("")}</div>
 <h3>🎯 Quests</h3><div class="grid">${QUESTS.map(q=>{const have=q.test?Math.min(p.match,3)+"/3":q.need.filter(k=>p.stamps[k]).length+"/"+q.need.length;return`<div class="stamp ${p.badges[q.k]?"":"off"}" style="${p.badges[q.k]?"":"opacity:.7"}"><span class="e">${q.e}</span>${q.n}<br><small>${q.desc}</small><br><small>${p.badges[q.k]?"🏅 Done!":have} · ⭐${q.r}</small></div>`}).join("")}</div>`}

// buttons in the top bar
function addBtns(){const top=document.getElementById("top");if(!top)return;const b=document.createElement("button");b.id="bHist";b.textContent="🇺🇸 US History";b.style.background="#ef9a9a";b.onclick=()=>open("stops");
 const c=document.createElement("button");c.id="bPres";c.textContent="🏛️ Presidents";c.style.background="#90caf9";c.onclick=()=>open("pres");
 const tm=document.getElementById("bTM");if(tm&&tm.nextSibling){top.insertBefore(c,tm.nextSibling);top.insertBefore(b,c)}else{top.appendChild(b);top.appendChild(c)}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",addBtns);else addBtns();
if(location.hash==="#history")setTimeout(()=>open("stops"),300);if(location.hash==="#presidents")setTimeout(()=>open("pres"),300);
window.__HISTORY={STOPS,PRES,QUESTS};
})();
