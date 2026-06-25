// শুধু এই ৩টা বসাবেন

const HOST="এখানে_হোস্ট";

const USER="এখানে_ইউজার";

const PASS="এখানে_পাস";

let channels=[];

async function api(action){

const r=
await fetch(

`${HOST}/player_api.php?username=${USER}&password=${PASS}&action=${action}`

);

return r.json();

}

async function loadCats(){

const data=
await api(
"get_live_categories"
);

const box=
document.getElementById(
"cats"
);

box.innerHTML="";

data.forEach(c=>{

const el=
document.createElement(
"div"
);

el.className="cat";

el.innerText=
c.category_name;

el.onclick=
()=>loadChannels(
c.category_id
);

box.append(el);

});

}

async function loadChannels(id){

const r=
await fetch(

`${HOST}/player_api.php?username=${USER}&password=${PASS}&action=get_live_streams&category_id=${id}`

);

channels=
await r.json();

render(
channels
);

}

function render(data){

const grid=
document.getElementById(
"grid"
);

grid.innerHTML="";

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

<div class="name">

${ch.name}

</div>
`;

card.onclick=
()=>play(
ch.stream_id
);

grid.append(
card
);

});

}

function play(id){

const url=

`${HOST}/live/${USER}/${PASS}/${id}.m3u8`;

const v=
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
v
);

}else{

v.src=url;

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

.includes(
q
)

)

);

};

loadCats();
