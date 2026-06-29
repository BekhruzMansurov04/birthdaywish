setTimeout(() => {

loading.style.display="none";
welcome.classList.remove("hidden");

},2500);


const wishes=`Happy Birthday Sabina ❤️

May God bless you with happiness,

good health,

beautiful smiles,

success,

and endless love.

Thank you for coming into my life.

You are my happiness.

I Love You Forever ❤️`;

document.getElementById("startBtn").onclick=function(){

welcome.style.display="none";
scene.classList.remove("hidden");

typeWriter();

growTree();

}


function typeWriter(){

let i=0;

let speed=45;

function typing(){

if(i<wishes.length){

typingBox.innerHTML+=wishes.charAt(i);

i++;

setTimeout(typing,speed);

}

}

let typingBox=document.getElementById("typing");

typing();

}

function growTree(){

const container=document.getElementById("heartContainer");

let colors=["❤️","💖","💕","💗","💓"];

for(let i=0;i<350;i++){

let heart=document.createElement("div");

heart.className="heart";

heart.innerHTML=colors[Math.floor(Math.random()*colors.length)];

heart.style.left=(Math.random()*420-200)+"px";

heart.style.top=(Math.random()*220-260)+"px";

heart.style.animationDelay=(i*0.02)+"s";

heart.style.fontSize=(12+Math.random()*18)+"px";

container.appendChild(heart);

}

floatingHearts();

}

function floatingHearts(){

setInterval(()=>{

const h=document.createElement("div");

h.innerHTML="💖";

h.style.position="absolute";

h.style.left=Math.random()*window.innerWidth+"px";

h.style.top="100%";

h.style.fontSize=(15+Math.random()*30)+"px";

h.style.animation="float 6s linear forwards";

document.body.appendChild(h);

setTimeout(()=>{

h.remove();

},6000);

},250);

}

const style=document.createElement("style");

style.innerHTML=`

@keyframes float{

from{

transform:translateY(0);

opacity:1;

}

to{

transform:translateY(-120vh);

opacity:0;

}

}

`;

document.head.appendChild(style);