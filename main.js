const loadingScreen = document.getElementById("loading-screen");
const welcomeScreen = document.getElementById("welcome-screen");
const mainScene = document.getElementById("main-scene");

const startBtn = document.getElementById("startBtn");
const typingBox = document.getElementById("typing");
const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("bgMusic");

/* =========================
   SAFE GUARDS
========================= */

let heartInterval;
let petalInterval;
let finalShown = false;

/* =========================
   LOADING → WELCOME
========================= */

window.onload = () => {

    setTimeout(() => {

        if (!loadingScreen || !welcomeScreen) return;

        loadingScreen.style.opacity = "0";

        setTimeout(() => {
            loadingScreen.style.display = "none";
            welcomeScreen.classList.remove("hidden");
        }, 800);

    }, 2000);

};

/* =========================
   START BUTTON
========================= */

startBtn?.addEventListener("click", () => {

    welcomeScreen.style.display = "none";
    mainScene.classList.remove("hidden");

    startExperience();

});

/* =========================
   START EXPERIENCE
========================= */

function startExperience() {

    startStars();
    startFloatingHearts();
    startFireflies();
    startPetals();
    startTyping();
    growTree();

}

/* =========================
   TYPEWRITER
========================= */

const message = `
Happy Birthday Sabina ❤️

You are the most beautiful part of my life.

Every moment with you feels magical.

May your smile always shine brighter than stars.

I Love You Forever ❤️
`;

function startTyping() {

    if (!typingBox) return;

    let i = 0;
    typingBox.innerHTML = "";

    function type() {

        if (i < message.length) {
            typingBox.innerHTML += message.charAt(i);
            i++;
            setTimeout(type, 35);
        } else {
            setTimeout(showFinal, 1200);
        }
    }

    type();
}

/* =========================
   FLOATING HEARTS (FIXED)
========================= */

function startFloatingHearts() {

    if (heartInterval) return;

    heartInterval = setInterval(() => {

        const heart = document.createElement("div");
        heart.innerHTML = "💖";

        heart.style.position = "absolute";
        heart.style.left = Math.random() * window.innerWidth + "px";
        heart.style.bottom = "-20px";
        heart.style.fontSize = (14 + Math.random() * 20) + "px";
        heart.style.opacity = "0.8";
        heart.style.pointerEvents = "none";
        heart.style.animation = "floatUp 6s linear forwards";

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 6000);

    }, 350);
}

/* =========================
   FIRELIES
========================= */

function startFireflies() {

    const container = document.getElementById("firefly-container");
    if (!container) return;

    for (let i = 0; i < 20; i++) {

        const f = document.createElement("div");
        f.className = "firefly";

        f.style.left = Math.random() * window.innerWidth + "px";
        f.style.top = Math.random() * window.innerHeight + "px";

        container.appendChild(f);
    }
}

/* =========================
   PETALS (FIXED)
========================= */

function startPetals() {

    const container = document.getElementById("petal-container");
    if (!container || petalInterval) return;

    petalInterval = setInterval(() => {

        const petal = document.createElement("div");
        petal.innerHTML = "🌸";

        petal.style.position = "absolute";
        petal.style.left = Math.random() * window.innerWidth + "px";
        petal.style.top = "-20px";
        petal.style.fontSize = (12 + Math.random() * 18) + "px";
        petal.style.animation = "fall 7s linear forwards";
        petal.style.pointerEvents = "none";

        container.appendChild(petal);

        setTimeout(() => petal.remove(), 7000);

    }, 500);
}

/* =========================
   STARS
========================= */

function startStars() {

    const stars = document.getElementById("stars");
    if (!stars || stars.childElementCount > 0) return;

    for (let i = 0; i < 70; i++) {

        let star = document.createElement("div");
        star.className = "star";

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";

        star.style.animationDuration = (2 + Math.random() * 3) + "s";

        stars.appendChild(star);
    }
}

/* =========================
   TREE
========================= */

function growTree() {
    if (window.startTree) window.startTree();
}

/* =========================
   FINAL SCREEN (FIXED)
========================= */

function showFinal() {

    if (finalShown) return;
    finalShown = true;

    const final = document.createElement("div");

    final.innerHTML = `
        <h1>❤️ I Love You Forever ❤️</h1>
        <p>You are my dream, my peace, my happiness.</p>
    `;

    final.style.position = "fixed";
    final.style.inset = "0";
    final.style.display = "flex";
    final.style.flexDirection = "column";
    final.style.justifyContent = "center";
    final.style.alignItems = "center";
    final.style.background = "rgba(0,0,0,0.75)";
    final.style.color = "white";
    final.style.zIndex = "9999";
    final.style.textAlign = "center";

    document.body.appendChild(final);
}

/* =========================
   MUSIC
========================= */

musicBtn?.addEventListener("click", () => {

    if (!music) return;

    if (music.paused) {
        music.play();
        musicBtn.innerHTML = "⏸ Pause Music";
    } else {
        music.pause();
        musicBtn.innerHTML = "🎵 Music";
    }

});