const HOST=
"https://hydraa.st:80";
const USER = "sameh68g";
const PASS = "15472848";

let all = [];

async function api(action, category = "") {

let url =
`${HOST}/player_api.php?username=${USER}&password=${PASS}&action=${action}`;

if(category){

url += `&category_id=${category}`;

}

const res = await fetch(url,{
mode:"cors"
});

if(!res.ok){

throw new Error();

}

return res.json();

}

async function loadCategories(){

const box =
document.getElementById(
"categories"
);

box.innerHTML =
"Loading...";

try{

const cats =
await api(
"get_live_categories"
);

box.innerHTML="";

cats.forEach(c=>{

const btn=
document.createElement(
"div"
);

btn.className=
"cat";

btn.innerText=
c.category_name;

btn.onclick=
()=>loadChannels(
c.category_id
);

box.append(btn);

});

if(cats[0]){

loadChannels(
cats[0].category_id
);

}

}catch{

box.innerHTML=
"API Blocked";

}

}

async function loadChannels(id){

const data=
await api(
"get_live_streams",
id
);

all=data;

render(
all
);

}

function render(data){

const grid=
document.getElementById(
"channels"
);

grid.innerHTML="";

data.forEach(ch=>{

const div=
document.createElement(
"div"
);

div.className=
"card";

div.innerHTML=

`
<img
src="${ch.stream_icon||''}"
>

<div class="name">

${ch.name}

</div>

`;

div.onclick=
()=>play(
ch.stream_id
);

grid.append(div);

});

}

function play(id){

const url=

`${HOST}/live/${USER}/${PASS}/${id}.m3u8`;

const v=
document.getElementById(
"player"
);

if(Hls.isSupported()){

const h=
new Hls();

h.loadSource(
url
);

h.attachMedia(
v
);

}else{

v.src=
url;

}

}

document
.getElementById(
"search"
)

.oninput=

e=>{

render(

all.filter(

x=>

x.name

.toLowerCase()

.includes(

e.target.value
.toLowerCase()

)

)

);

};

loadCategories();
