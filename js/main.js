'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
let gElCanvas;
let gCtx;
let gStartPos;

function init() {
    renderKeywords();
    renderGallery();
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    addListeners();
    renderStickersBtn();
    renderUserMemes();
}

// render canvas
function renderImg() {
    let meme = getMeme();
    if (meme === undefined) return;
    drawImg(meme.selectedImgId);
}

function renderTextBox(line) {
    let posX = line.pos.x - (line.width / 2);
    let posY = line.pos.y - (line.size);
    let width = line.width;
    let height = line.size * 1.4;
    switch(line.align) {
        case 'right': 
            drawRect(posX - width / 2, posY, width, height)
            break;
        case 'left': 
            drawRect(posX + width / 2, posY, width, height)
            break;
        case 'center': 
            drawRect(posX, posY, width, height);
            break;
        default:
            break;
    }
}

function renderInputText(txt) {
    let line = getCurrLine();
    let width = gCtx.measureText(txt).width;
    updateWidthLine(width);
    drawText(txt, line.pos.x, line.pos.y, line.colorFill, line.colorStroke, line.font, line.size, line.align);
}

function renderTexts() {
    let meme = getMeme();
    if (meme === undefined) return;
    if (meme.lines.length === 0) return;
    meme.lines.forEach(line => {
        drawText(line.txt, line.pos.x, line.pos.y, line.colorFill, line.colorStroke, line.font, line.size, line.align);
    });
} 

function renderStickers() {
    let meme = getMeme();
    if (meme === undefined) return;
    if (meme.stickers.length === 0) return;
    meme.stickers.forEach(sticker => {
        let elSticker = document.querySelector(`.sticker-${sticker.id}`);
        gCtx.drawImage(elSticker, sticker.pos.x, sticker.pos.y, sticker.width, sticker.height);
    });
}

function draw() {
    window.addEventListener("keyup", draw, true);
    let elTxt = document.querySelector('input[name=txt]').value;
    updateLineTxt(elTxt);
    clearCanvas();
    renderImg();
    renderTexts();
    renderStickers();
    renderInputText(elTxt);
}

function initCanvas() {
    clearCanvas();
    renderImg();
    renderTexts();
    renderStickers();
    draw();
}

// Stickers

function renderStickersBtn() {
    let stickers = getStickers();
    let strHTML = '<span onclick="onPrevPage()" style="font-weight: bold; font-size: 30px; flex: 1;"><</span>';
    stickers.forEach(sticker => {
        strHTML += `<img class="sticker sticker-${sticker}" src="img/stickers/${sticker}.png" onclick="onSticker(${sticker})">\n`;
    }); 
    strHTML += '<span class"page" onclick="onNextPage()" style="font-weight: bold; font-size: 30px; flex: 1;">></span>';
    let elContainer = document.querySelector('.btn-sticker');
    elContainer.innerHTML = strHTML;
}

function onNextPage() {
    nextPage();
    renderStickersBtn();
}

function onPrevPage() {
    prevPage();
    renderStickersBtn();
}

// Drag&Drop

function onDown(ev) {
    const pos = getEvPos(ev);
    if (!isTxtClicked(pos) && !isStickerClicked(pos)) return;
    if (isTxtClicked(pos)) {
        let line = getCurrLine();
        line.isDragging = true;
        renderTextBox(line);
        gStartPos = pos;
        document.body.style.cursor = 'grabbing';
    }
    else if (isStickerClicked(pos)) {
        let sticker = getCurrSticker();
        sticker.isDragging = true;
        gStartPos = pos;
        document.body.style.cursor = 'grabbing';
    }
}

function onMove(ev) {
    let line = getCurrLine();
    let sticker = getCurrSticker();
    renderTextBox(line);
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
        renderStickers();
    }
    if (sticker === undefined) return;
    if (sticker.isDragging) {
        const pos = getEvPos(ev);
        const dx = pos.x - gStartPos.x;
        const dy = pos.y - gStartPos.y;

        sticker.pos.x += dx;
        sticker.pos.y += dy;
        
        gStartPos = pos;
        clearCanvas();
        renderImg();
        renderTexts();
        renderStickers();

    }
}

function onUp() {
    let line = getCurrLine();
    line.isDragging = false;
    let sticker = getCurrSticker();
    if (sticker === undefined) return;
    sticker.isDragging = false;
    document.body.style.cursor = 'grab';
}

function isTxtClicked(clickedPos) {
    let meme = getMeme();
    let idx = meme.lines.findIndex(line => {
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
    updateCurrLine(idx);
    return true;
}

function isStickerClicked(clickedPos) {
    let meme = getMeme();
    let idx = meme.stickers.findIndex(sticker => {
        return (sticker.pos.y <= clickedPos.y && sticker.pos.y + sticker.height >= clickedPos.y &&
        sticker.pos.x <= clickedPos.x && sticker.pos.x + sticker.width * 2 >= clickedPos.x)
    })
    if (idx === -1) return false;
    updateCurrSticker(idx);
    return true;
}

// buttons

function onSwitch() {
    switchLine();
    clearCanvas();
    renderImg();
    renderTexts();
    renderStickers();
    let line = getCurrLine();
    document.querySelector('input[name=txt]').value = line.txt;
    renderTextBox(line);
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
    let elColorFill = document.querySelector('input[name=color-fill]').value;
    let elColorStroke = document.querySelector('input[name=color-stroke]').value;
    updateColor(elColorFill, elColorStroke);
    initCanvas();
}

function onSticker(idx) {
    let sticker = _createSticker(idx)
    const elSticker = document.querySelector(`.sticker-${idx}`);
    gCtx.drawImage(elSticker, sticker.pos.x, sticker.pos.y, sticker.width, sticker.height);
} 

function onSave() {
    saveUrl();
    renderUserMemes();
}

function saveUrl() {
    let imgUrl = gElCanvas.toDataURL('img/jpg');
    _saveMemeToStorage(imgUrl);
}

// Listeners

function addListeners() {
    addMouseListeners();
    addTouchListeners();
    window.addEventListener('resize', () => {
        resizeCanvas();
        renderImg();
        renderTexts();
        renderStickers();
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove);
    gElCanvas.addEventListener('mousedown', onDown);
    gElCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove);
    gElCanvas.addEventListener('touchstart', onDown);
    gElCanvas.addEventListener('touchend', onUp);
}

function resizeCanvas() {
    const elContainer = document.getElementById('my-canvas');
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}