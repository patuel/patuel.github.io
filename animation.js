function toDegrees(deg) {
    return deg * Math.PI / 180;
}

let canvas = document.getElementsByTagName("canvas")[0];

let w = window.innerWidth;
let h = window.innerHeight;
let hw = w * .5;
let hh = h * .5;

canvas.width = w;
canvas.height = h;

let ctx = canvas.getContext("2d");

let sprite = null;

let init = false;

function setImage(emoji) {
    ctx.font = "5em serif";
    ctx.textBaseline = "top";

    const dim = ctx.measureText(emoji);
    console.log(dim);
    let dimW = dim.width;
    let hDimW = dimW * .5;
    let dimH = dim.fontBoundingBoxDescent + dim.fontBoundingBoxAscent;
    let hDimH = dimH * .5;

    let tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = dimW;
    tmpCanvas.height = dimH;

    let tmpCtx = tmpCanvas.getContext("2d");
    tmpCtx.font = "5em serif";
    tmpCtx.textBaseline = "top";
    // tmpCtx.fillStyle = "rgba(100,200,0,0.1)";
    // tmpCtx.fillRect(0, 0, dimW, dimH);
    tmpCtx.fillStyle = "red";
    tmpCtx.fillText(emoji, 0, dim.actualBoundingBoxAscent);

    let img = new Image();
    img.width = dimW;
    img.height = dimW;
    img.src = tmpCanvas.toDataURL("image/png");

    img.addEventListener("load", () => {
        console.log(img);

        deg = 0;
        num = 1;
        ctx.clearRect(0, 0, w, h);
        sprite = {
            img,
            pw: dimW,
            ph: dimH,
            hw: hDimW,
            hh: hDimH
        };

        if (!init) {
            ctx.font = "2em serif";
            ctx.fillStyle = "red";
            ctx.fillText("⬅️ Change Emoji here ❤️", 150, 40);

            init = true;
            requestAnimationFrame(loop);
        }
    });
};
setImage("❤️");

let deg = 0;
let num = 1;
const degadd = 0.005;
const numadd = 0.5;

function loop() {
    // ctx.clearRect(0, 0, w, h);
    ctx.save();

    // ctx.drawImage(sprite.img, 200, 200);

    ctx.translate(hw, hh);
    ctx.rotate(toDegrees(num));

    const count = Math.min(2000, Math.floor(num));
    let trans = (30 * Math.sin(num * 0.02)) + 15;
    for (let i = 0; i < count; i++) {
        ctx.translate(trans, trans);
        // deg += degadd * 14;
        ctx.rotate(toDegrees(i * 2 + deg));
        ctx.drawImage(sprite.img, -sprite.hw, -sprite.hw);
        // ctx.fillText(text, 0, 0);
    }
    ctx.restore();

    deg += degadd;
    num += numadd;

    requestAnimationFrame(loop);
}

