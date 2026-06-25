const HOST="http://xcv70.fyi:8080";
const USER="adil2912";
const PASS="adil1229";

let channels=[];

async function api(url){

try{

const res=await fetch(url);

if(!res.ok){

throw new Error(
"HTTP "+res.status
);

}

return await res.json();

}

catch(err){

document.getElementById(
"sidebar"
).innerHTML=

`
<div class="cat">
Connection Failed
</div>
`;

console.log(err);

return [];

}

}

async function loadCategories(){

const url=

`${HOST}/player_api.php?username=${USER}&password=${PASS}&action=get_live_categories`;

const data=
await api(url);

const box=
document.getElementById(
"sidebar"
);

if(!data.length){

box.innerHTML=
"<div class='cat'>No Category</div>";

return;

}

box.innerHTML="";

data.forEach(c=>{

const div=
document.createElement(
"div"
);

div.className=
"cat";

div.innerText=
c.category_name;

div.onclick=
()=>loadChannels(
c.category_id
);

box.append(div);

});

loadChannels(
data[0].category_id
);

}

async function loadChannels(id){

const url=

`${HOST}/player_api.php?username=${USER}&password=${PASS}&action=get_live_streams&category_id=${id}`;

channels=
await api(url);

render(channels);

}

function render(data){

const grid=
document.getElementById(
"channels"
);

grid.innerHTML="";

data.forEach(ch=>{

const el=
document.createElement(
"div"
);

el.className=
"card";

el.innerHTML=

`
<img src="${ch.stream_icon||''}">
<div class="name">
${ch.name}
</div>
`;

el.onclick=
()=>play(
ch.stream_id
);

grid.append(
el
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

.oninput=

e=>{

const q=
e.target.value
.toLowerCase();

render(

channels.filter(
x=>

x.name

.toLowerCase()

.includes(q)

)

);

};

loadCategories();
