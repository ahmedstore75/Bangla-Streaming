// ===== শুধু এগুলো বসাবেন =====

const HOST="http://xcv70.fyi:8080";

const USER="adil2912";

const PASS="adil1229";

// ===========================

let cache=[];

async function fetchAPI(action){

const url=

`${HOST}/player_api.php?username=${USER}&password=${PASS}&action=${action}`;

const r=
await fetch(url);

return r.json();

}

async function loadCategories(){

try{

const cats=
await fetchAPI(
"get_live_categories"
);

const side=
document.getElementById(
"sidebar"
);

side.innerHTML="";

cats.forEach(c=>{

const el=
document.createElement(
"div"
);

el.className=
"cat";

el.textContent=
c.category_name;

el.onclick=
()=>loadChannels(
c.category_id
);

side.append(
el
);

});

if(
cats.length
){

loadChannels(
cats[0].category_id
);

}

}
catch{

document
.getElementById(
"sidebar"
)

.innerHTML=

"Server Error";

}

}

async function loadChannels(id){

const r=
await fetch(

`${HOST}/player_api.php?username=${USER}&password=${PASS}&action=get_live_streams&category_id=${id}`

);

cache=
await r.json();

render(
cache
);

}

function render(list){

const box=
document.getElementById(
"channels"
);

box.innerHTML="";

list.forEach(ch=>{

const card=
document.createElement(
"div"
);

card.className=
"card";

card.innerHTML=

`
<img
src="${ch.stream_icon||''}"
>

<div class="name">

${ch.name}

</div>

`;

card.onclick=
()=>play(
ch.stream_id
);

box.append(
card
);

});

}

function play(id){

const stream=

`${HOST}/live/${USER}/${PASS}/${id}.m3u8`;

const video=
document.getElementById(
"player"
);

if(
Hls.isSupported()
){

const hls=
new Hls();

hls.loadSource(
stream
);

hls.attachMedia(
video
);

}
else{

video.src=
stream;

}

}

document

.getElementById(
"search"
)

.oninput=

e=>{

const q=

e.target.value

.toLowerCase();

render(

cache.filter(

x=>

x.name

.toLowerCase()

.includes(
q
)

)

);

};

loadCategories();
