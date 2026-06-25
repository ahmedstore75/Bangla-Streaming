const HOST="http://xcv70.fyi:8080";
const USER="adil2912";
const PASS="adil1229";

let allChannels=[];

async function fetchJSON(url){
const r=await fetch(url);
return await r.json();
}

async function loadCategories(){

try{

const cats=await fetchJSON(
`${HOST}/player_api.php?username=${USER}&password=${PASS}&action=get_live_categories`
);

const box=
document.getElementById("categories");

box.innerHTML="";

cats.forEach(cat=>{

const item=
document.createElement("div");

item.className="cat";

item.textContent=
cat.category_name;

item.onclick=()=>{

loadChannels(
cat.category_id
);

};

box.appendChild(item);

});

if(cats.length){

loadChannels(
cats[0].category_id
);

}

}catch(e){

document.getElementById(
"categories"
).innerHTML=
"Category Load Failed";

}

}

async function loadChannels(id){

try{

allChannels=
await fetchJSON(

`${HOST}/player_api.php?username=${USER}&password=${PASS}&action=get_live_streams&category_id=${id}`

);

render(
allChannels
);

}catch{

document
.getElementById(
"channels"
)

.innerHTML=

"Channel Load Failed";

}

}

function render(list){

const grid=
document.getElementById(
"channels"
);

grid.innerHTML="";

list.forEach(ch=>{

const card=
document.createElement(
"div"
);

card.className=
"card";

card.innerHTML=`

<img
src="${ch.stream_icon||''}"
onerror="this.style.display='none'">

<div class="name">

${ch.name}

</div>

`;

card.onclick=
()=>play(
ch.stream_id
);

grid.appendChild(
card
);

});

}

function play(id){

const url=

`${HOST}/live/${USER}/${PASS}/${id}.m3u8`;

const video=
document.getElementById(
"player"
);

if(Hls.isSupported()){

const hls=
new Hls();

hls.loadSource(url);

hls.attachMedia(video);

}else{

video.src=url;

}

}

document

.getElementById(
"search"
)

.addEventListener(
"input",

e=>{

const q=
e.target.value
.toLowerCase();

render(

allChannels.filter(
x=>

x.name
.toLowerCase()
.includes(q)

)

);

}

);

loadCategories();
