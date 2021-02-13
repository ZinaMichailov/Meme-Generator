'use strict'

function onMemes() {
    document.querySelector('.meme-editor').style.display = 'none';
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.search-container').style.display = 'none';
    document.querySelector('.user-memes').style.display = 'block';
    renderCanvasUserMemes();
    renderUserMemes();
}

function renderCanvasUserMemes() {
    let memes = loadFromStorage(STORAGE_KEY);
    if (!memes) return;
    var strHTML = '';
    memes.forEach((meme, idx) => {
        strHTML += `<canvas class="save-canvas" id="${idx}-canvas" width="200" height="200" 
                    style="outline:1px solid gray; margin-top: 20px; margin-left: 20px;"></canvas>`
    });

    let elUserMemes= document.querySelector('.user-memes');
    elUserMemes.innerHTML = strHTML;
}

function renderUserMemes() {
    let memes = loadFromStorage(STORAGE_KEY);
    if (!memes) return;
    memes.forEach((meme, idx) => {
        let elCanvas = document.getElementById(`${idx}-canvas`);
        let ctx = elCanvas.getContext('2d');
        let elImg = document.querySelector(`.img-${meme.selectedImgId}`);
        ctx.drawImage(elImg, 0, 0, elCanvas.width, elCanvas.height);
        if (meme.lines.length !== 0) {
            meme.lines.forEach(line => {
                drawTextStorage(line.txt, line.pos.x, line.pos.y, line.colorFill, line.colorStroke, line.font, line.size, line.align);
            });
        }
        if (meme.stickers.length !== 0) {
            meme.stickers.forEach(sticker => {
                let elSticker = document.querySelector(`.sticker-${sticker.id}`);
                ctx.drawImage(elSticker, sticker.pos.x, sticker.pos.y, sticker.width, sticker.height);
            })
        }
    });
}