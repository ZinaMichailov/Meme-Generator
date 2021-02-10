'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
let gElCanvas;
let gCtx;
let gStartPos;

function init() {
    renderGallery();
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    window.addEventListener("keyup", draw, true);
    addListeners();
}

// render canvas
function renderImg() {
    let meme = getMeme();
    drawImg(meme.selectedImgId);
}

function renderInputText(txt) {
    let line = getCurrLine();
    drawText(txt, line.pos.x, line.pos.y, line.colorFill, line.colorStroke, line.font, line.size, line.align);
}

function renderTexts() {
    let meme = getMeme();
    meme.lines.forEach(line => {
        drawText(line.txt, line.pos.x, line.pos.y, line.colorFill, line.colorStroke, line.font, line.size, line.align);
    });
} 

function draw() {
    let elTxt = document.querySelector('input[name=txt]').value;
    updateLineTxt(elTxt);
    let line = getCurrLine();
    line.colorFill = document.querySelector('input[name=color-fill]').value;
    line.colorStroke = document.querySelector('input[name=color-stroke]').value;
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

// Drag&Drop

function onDown(ev) {
    const pos = getEvPos(ev);
    if (!isTxtClicked(pos)) return;
    let line = getCurrLine();
    line.isDragging = true;
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
    let line = getCurrLine();
    if (line.isDragging) {
        const pos = getEvPos(ev);
        const dx = pos.x - gStartPos.x;
        const dy = pos.y - gStartPos.y;

        line.pos.x += dx;
        line.pos.y += dy;

        gStartPos = pos;
        clearCanvas();
        renderImg();
        renderTexts();
    }
}

function onUp() {
    let line = getCurrLine();
    line.isDragging = false;
    document.body.style.cursor = 'grab';
}

function isTxtClicked(clickedPos) {
    let line = getCurrLine();
    const distance = Math.sqrt((line.pos.x - clickedPos.x) ** 2 + (line.pos.y - clickedPos.y) ** 2);
    return distance <= line.size;
}

// buttons

function onSwitch() {
    document.querySelector('input[name=txt]').value = '';
    switchLine();
}

function onAdd() {
    addLine();
    document.querySelector('input[name=txt]').value = '';
}

function onTrash() {
    document.querySelector('input[name=txt]').value = '';
    clearLine();
    initCanvas();     
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

function onFont() {
    let elFont = document.querySelector('select[name=font]').value;
    updateFont(elFont);
    initCanvas();
}

function onColorFill() {
    let elColorFill = document.querySelector('input[name=color-fill]').value;
    let elColorStroke = document.querySelector('input[name=color-stroke]').value;
    updateColor(elColorFill, elColorStroke);
    initCanvas();
}

function onColorStroke() {
    let elColorFill = document.querySelector('input[name=color-fill]').value;
    let elColorStroke = document.querySelector('input[name=color-stroke]').value;
    updateColor(elColorFill, elColorStroke);
    draw();
}

