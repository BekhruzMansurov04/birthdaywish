
const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/* =========================
   TREE CONFIG
========================= */

let branches = [];
let particles = [];
let hearts = [];

let growthSpeed = 0;
let animationStarted = false;

/* =========================
   BRANCH CLASS
========================= */

class Branch {
    constructor(x, y, angle, length, depth) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.length = length;
        this.depth = depth;

        this.grown = 0;
        this.maxGrow = length;
    }

    update() {

        if (this.grown < this.maxGrow) {
            this.grown += 2; // growth speed
        }

        // wind sway
        this.angle += Math.sin(Date.now() * 0.001 + this.depth) * 0.002;
    }

    draw() {

        const endX = this.x + Math.cos(this.angle) * this.grown;
        const endY = this.y + Math.sin(this.angle) * this.grown;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(endX, endY);

        ctx.strokeStyle = "#5a2a1a";
        ctx.lineWidth = Math.max(1, 6 - this.depth);

        ctx.shadowColor = "#ff4da6";
        ctx.shadowBlur = 8;

        ctx.stroke();

        // spawn heart at tip when fully grown
        if (this.grown >= this.maxGrow && this.depth < 6) {

            spawnHeart(endX, endY);

        }
    }
}

/* =========================
   CREATE TREE ROOT
========================= */

function createTree() {

    branches = [];

    const startX = canvas.width / 2;
    const startY = canvas.height;

    // trunk
    branches.push(new Branch(startX, startY, -Math.PI / 2, 120, 0));

}

/* =========================
   BRANCH EXPANSION
========================= */

function growBranches() {

    let newBranches = [];

    branches.forEach(branch => {

        branch.update();

        if (branch.grown >= branch.maxGrow && branch.depth < 6 && !branch.split) {

            branch.split = true;

            let endX = branch.x + Math.cos(branch.angle) * branch.length;
            let endY = branch.y + Math.sin(branch.angle) * branch.length;

            let angleSpread = Math.random() * 0.6 + 0.4;

            newBranches.push(
                new Branch(endX, endY, branch.angle - angleSpread, branch.length * 0.75, branch.depth + 1)
            );

            newBranches.push(
                new Branch(endX, endY, branch.angle + angleSpread, branch.length * 0.75, branch.depth + 1)
            );
        }

    });

    branches = branches.concat(newBranches);
}

/* =========================
   HEART PARTICLES
========================= */

function spawnHeart(x, y) {

    hearts.push({
        x,
        y,
        size: Math.random() * 10 + 10,
        alpha: 1,
        vy: Math.random() * -1 - 0.5
    });

}

/* =========================
   DRAW HEARTS
========================= */

function drawHearts() {

    hearts.forEach((h, i) => {

        ctx.font = `${h.size}px Arial`;
        ctx.fillStyle = `rgba(255, 0, 120, ${h.alpha})`;

        ctx.fillText("❤️", h.x, h.y);

        h.y += h.vy;
        h.alpha -= 0.01;

        if (h.alpha <= 0) {
            hearts.splice(i, 1);
        }

    });

}

/* =========================
   MAIN ANIMATION LOOP
========================= */

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw branches
    branches.forEach(b => {
        b.draw();
    });

    growBranches();

    drawHearts();

    requestAnimationFrame(animate);

}

/* =========================
   START TREE (CALLED FROM main.js)
========================= */

window.startTree = function () {

    if (animationStarted) return;

    animationStarted = true;

    createTree();

    animate();

};