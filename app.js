const HOST="http://xcv70.fyi:8080";

const USER="adil2912";

const PASS="adil1229";

let all=[];

async function get(url){

const r=
await fetch(url);

return r.json();

}

async function loadCategories(){

try{

const data=

await get(

`${HOST}/player_api.php?username=${USER}&password=${PASS}&action=get_live_categories`

);

const box=

document.getElementById(
"categories"
);

box.innerHTML="";

data.forEach(c=>{

const d=
document.createElement(
"div"
);

d.className=
"cat";

d.innerHTML=
c.category_name;

d.onclick=
()=>loadChannels(
c.category_id
);

box.append(
d
);

});

if(
data.length
){

loadChannels(
data[0].category_id
);

}

}catch{

document
.getElementById(
"categories"
)

.innerHTML=

"Load Failed";

}

}

async function loadChannels(id){

all=

await get(

`${HOST}/player_api.php?username=${USER}&password=${PASS}&action=get_live_streams&category_id=${id}`

);

render(all);

}

function render(data){

const box=
document.getElementById(
"channels"
);

box.innerHTML="";

data.forEach(ch=>{

const card=
document.createElement(
"div"
);

card.className=
"card";

card.innerHTML=

`
<img src="${ch.stream_icon||''}">

<div class=name>

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

const url=

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
url
);

hls.attachMedia(
video
);

}else{

video.src=
url;

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

all.filter(

x=>

x.name

.toLowerCase()

.includes(q)

)

);

};

loadCategories();
