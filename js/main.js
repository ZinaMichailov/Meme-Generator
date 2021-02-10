'use strict'

let gElCanvas;
let gCtx;

function init() {
    renderGallery();
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
}

// render canvas
function renderImg() {
    if (!gIsImgSelected) return;
    let meme = getMeme();
    drawImg(meme.selectedImgId);
}

function renderText(txt) {
    if (!gIsImgSelected) return;
    let meme = getMeme();
    let line = meme.lines[0];
    drawText(txt, 100, 60, line.color, line.size, line.align)
}

function renderTexts() {
    if (!gIsImgSelected) return;
    let meme = getMeme();
    if (meme.lines.length === 0) return;
    meme.lines.forEach(line => {
        drawText(line.txt, 100, 60, line.color, line.size, line.align);
    });
} 

function draw() {
    if (!gIsImgSelected) return;
    let elTxt = document.querySelector('input[name=txt]').value;
    addLine(elTxt);
    clearCanvas();
    renderImg();
    renderText(elTxt);
}

function addLine(txt) {
    if (!gIsImgSelected) return;
    let meme = getMeme();
    let line = createLine(txt);
    meme.lines[0] = line;
}

function initCanvas() {
    renderImg();
    draw();
    window.addEventListener("keyup", draw, true);
}