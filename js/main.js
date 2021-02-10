'use strict'

let gElCanvas;
let gCtx;

function init() {
    renderGallery();
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    window.addEventListener("keyup", draw, true);
}

// render canvas
function renderImg() {
    let meme = getMeme();
    drawImg(meme.selectedImgId);
}

function renderInputText(txt) {
    let line = getCurrLine();
    drawText(txt, line.pos.x, line.pos.y, line.color, line.size, line.align);
}

function renderTexts() {
    let meme = getMeme();
    meme.lines.forEach(line => {
        drawText(line.txt, line.pos.x, line.pos.y, line.color, line.size, line.align);
    });
} 

function draw() {
    let elTxt = document.querySelector('input[name=txt]').value;
    updateLineTxt(elTxt);
    clearCanvas();
    renderImg();
    renderTexts();
    renderInputText(elTxt);
}

function initCanvas() {
    clearCanvas();
    renderImg();
    renderTexts();
    draw();
}

// buttons

function onSwitch() {
    switchLine();
}

function onAdd() {
    addLine();
    document.querySelector('input[name=txt]').value = '';
}

function onIncrease() {
    addIncrease();
    initCanvas(); 
}

function onDecrease() {
    addDecrease();
    initCanvas();
}

function onAlignLeft() {
    addAlign('right');
    initCanvas();
}

function onAlignCenter() {
    addAlign('center');
    initCanvas();
}

function onAlignRight() {
    addAlign('left');
    initCanvas();
}