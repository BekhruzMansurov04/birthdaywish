/* =========================
   PARTICLE SYSTEM
========================= */

const heartContainer = document.getElementById("heart-container");
const petalContainer = document.getElementById("petal-container");
const fireflyContainer = document.getElementById("firefly-container");

/* =========================
   HEART PARTICLES
========================= */

function createHeart() {

    const heart = document.createElement("div");

    heart.innerHTML = "💖";

    heart.style.position = "absolute";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.bottom = "-20px";

    heart.style.fontSize = (12 + Math.random() * 25) + "px";
    heart.style.opacity = 0.9;

    heart.style.filter = "drop-shadow(0 0 10px hotpink)";

    heart.style.animation = "floatHeart 6s linear forwards";

    heartContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
}

/* continuous hearts */
setInterval(createHeart, 250);

/* =========================
   FALLING PETALS
========================= */

function createPetal() {

    const petal = document.createElement("div");

    petal.innerHTML = "🌸";

    petal.style.position = "absolute";
    petal.style.left = Math.random() * window.innerWidth + "px";
    petal.style.top = "-30px";

    petal.style.fontSize = (10 + Math.random() * 18) + "px";

    petal.style.opacity = 0.8;

    petal.style.animation = "fallPetal 7s linear forwards";

    petalContainer.appendChild(petal);

    setTimeout(() => petal.remove(), 7000);
}

/* continuous petals */
setInterval(createPetal, 350);

/* =========================
   FIREFLIES SYSTEM
========================= */

class Firefly {

    constructor() {

        this.el = document.createElement("div");

        this.el.className = "firefly";

        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;

        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;

        this.el.style.left = this.x + "px";
        this.el.style.top = this.y + "px";

        fireflyContainer.appendChild(this.el);
    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        // bounce
        if (this.x < 0 || this.x > window.innerWidth) this.speedX *= -1;
        if (this.y < 0 || this.y > window.innerHeight) this.speedY *= -1;

        this.el.style.left = this.x + "px";
        this.el.style.top = this.y + "px";

    }
}

const fireflies = [];

for (let i = 0; i < 25; i++) {
    fireflies.push(new Firefly());
}

/* animate fireflies */
function animateFireflies() {

    fireflies.forEach(f => f.update());

    requestAnimationFrame(animateFireflies);
}

animateFireflies();

/* =========================
   BUTTERFLIES (OPTIONAL MAGIC)
========================= */

function createButterfly() {

    const b = document.createElement("div");

    b.innerHTML = "🦋";

    b.style.position = "absolute";

    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;

    let angle = 0;

    function move() {

        angle += 0.05;

        x += Math.cos(angle) * 2;
        y += Math.sin(angle * 2) * 2;

        b.style.left = x + "px";
        b.style.top = y + "px";

        requestAnimationFrame(move);
    }

    document.body.appendChild(b);

    move();
}

/* spawn butterflies after delay */
setTimeout(() => {

    createButterfly();
    createButterfly();

}, 5000);

/* =========================
   CSS ANIMATIONS INJECTED
========================= */

const style = document.createElement("style");

style.innerHTML = `

@keyframes floatHeart {
    0% {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
    100% {
        transform: translateY(-120vh) scale(1.5);
        opacity: 0;
    }
}

@keyframes fallPetal {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(120vh) rotate(360deg);
        opacity: 0;
    }
}

.firefly {
    position: absolute;
    width: 6px;
    height: 6px;
    background: yellow;
    border-radius: 50%;
    box-shadow: 0 0 10px yellow, 0 0 20px gold;
    animation: glow 2s infinite alternate;
}

@keyframes glow {
    from { opacity: 0.3; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1.3); }
}

`;

document.head.appendChild(style);