const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");
const FPS = 60;
const G = 5;
var mouse, mario;
var balls = [], leftBall, rightBall, upBall;
var mario, jump, jumpHeight, ground;
var action = "none";
var left = new Image(), right = new Image(), up = new Image(), oiram = new Image();

function unMouse() {
    mouse = {
        x: 0,
        y: 0
    };
}

(function init() {
    unMouse();
    addEventListener("mousedown", (e) => {
        mouse = {
            x: e.clientX,
            y: e.clientY
        };
        cnv.requestFullscreen();
    });

    leftBall = {
        x: window.innerWidth / 15,
        y: window.innerHeight - window.innerHeight / 10,
        r: (window.innerWidth + window.innerHeight) / 30
    };

    rightBall = {
        x: window.innerWidth / 15 + window.innerWidth / 15 + (window.innerWidth + window.innerHeight) / 30,
        y: window.innerHeight - window.innerHeight / 10,
        r: (window.innerWidth + window.innerHeight) / 30
    };

    upBall = {
        x: window.innerWidth - window.innerWidth / 15,
        y: window.innerHeight - window.innerHeight / 10,
        r: (window.innerWidth + window.innerHeight) / 30
    };

    ground = {
        x: 0,
        y: window.innerHeight / 1.3,
        w: window.innerWidth,
        h: window.innerHeight
    };

    mario = {
        x: window.innerWidth / 2,
        y: 600,
        w: 91,
        h: 102,
        v: 3
    };

    balls = [leftBall, rightBall, upBall];

    left.src = "images/left.png";
    right.src = "images/right.png";
    up.src = "images/up.png";
    oiram.src = "images/mario.png";

    setInterval(main, 1000 / FPS);
}());

function main() {
    cnv.width = window.innerWidth;
    cnv.height = window.innerHeight;
    update();
    draw();
}

function update() {
    !(mario.y + mario.h + G > ground.y) ? mario.y += G : mario.y = ground.y - mario.h;

    for (ball in balls) {
        let hipo = balls[ball].r - Math.sqrt((mouse.x - balls[ball].x) * (mouse.x - balls[ball].x)  + (mouse.y - balls[ball].y) * (mouse.y - balls[ball].y));
        if (hipo > 0) {
            if (balls[ball] == leftBall) {
                action = "left";
                break;
            } if (balls[ball] == rightBall) {
                action = "right";
                break;
            } if (balls[ball] == upBall) {
                jump = true;
                break;
            }
        }
    }

    if (action == "left") {mario.x -= mario.v;}
    if (action == "right") {mario.x += mario.v;}
    if (jump) {
        mario.y -= jumpHeight / 2;
        (jumpHeight >= G) ? jumpHeight -= G * 2 : jump = false;
    }
    if (!jump) {
        jumpHeight = mario.h / 1.5;
        unMouse();
    }
}

function draw() {
    ctx.fillStyle = "#20a0ff";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    ctx.fillStyle = "green";
    ctx.fillRect(ground.x, ground.y, ground.w, ground.h);

    ctx.drawImage(left, leftBall.x - leftBall.r / 2, leftBall.y - leftBall.r / 2, leftBall.r, leftBall.r);
    ctx.drawImage(right, rightBall.x - rightBall.r / 2, rightBall.y  - rightBall.r / 2, rightBall.r, rightBall.r);
    ctx.drawImage(up, upBall.x - upBall.r / 2, upBall.y - upBall.r / 2, upBall.r, upBall.r);

    ctx.drawImage(oiram, mario.x, mario.y, mario.w, mario.h);

    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.font = "40px Comic Sans MS";
    ctx.fillText("QUEM FEZ: ARTHUR, RODRIGO e o resto q ficou no fundo conversando", cnv.width / 2, 40);
}