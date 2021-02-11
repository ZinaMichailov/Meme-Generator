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
    renderCanvasUserMemes();
    renderUserMemes();
}

// render canvas
function renderImg() {
    let meme = getMeme();
    drawImg(meme.selectedImgId);
}

function renderTextBox(line) {
    let posX = line.pos.x - (line.width / 2);
    let posY = line.pos.y - (line.size);
    let width = line.width + line.size * 0.5;
    let height = line.size * 1.4;
    drawRect(posX, posY, width, height);
}

function renderInputText(txt) {
    let line = getCurrLine();
    let width = gCtx.measureText(txt).width;
    updateWidthLine(width);
    drawText(txt, line.pos.x, line.pos.y, line.colorFill, line.colorStroke, line.font, line.size, line.align);
}

function renderTexts() {
    let meme = getMeme();
    if (meme.lines.length === 0) return;
    meme.lines.forEach(line => {
        drawText(line.txt, line.pos.x, line.pos.y, line.colorFill, line.colorStroke, line.font, line.size, line.align);
    });
} 

function draw() {
    let elTxt = document.querySelector('input[name=txt]').value;
    console.log(elTxt)
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
    let idx = gMeme.lines.findIndex(line => {
        let width = line.width / 2;
        let height = line.size / 2;
        if (line.pos.y - height <= clickedPos.y && line.pos.y + height >= clickedPos.y) {
            switch(line.align) {
                case 'right': 
                    if (line.pos.x - width*2 <= clickedPos.x && line.pos.x + line.size >= clickedPos.x)
                        return true;
                    return false;
                case 'left': 
                    if (line.pos.x <= clickedPos.x && line.pos.x + width*2 + line.size >= clickedPos.x)
                        return true;
                    return false;
                case 'center': 
                    if (line.pos.x - width <= clickedPos.x && line.pos.x + width + line.size >= clickedPos.x)
                        return true;
                    return false;
            }
        }
        return false;
    })

    if (idx === -1) return false;
    document.querySelector('input[name=txt]').value = '';
    updateCurrLine(idx);
    return true;
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

function onColor() {
    console.log('hi')
    let elColorFill = document.querySelector('input[name=color-fill]').value;
    let elColorStroke = document.querySelector('input[name=color-stroke]').value;
    updateColor(elColorFill, elColorStroke);
    initCanvas();
}

function onSave() {
    _saveMemeToStorage();
}
