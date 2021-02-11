'use strict'

function onMemes() {
    document.querySelector('.meme-editor').style.display = 'none';
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.search-container').style.display = 'none';
    document.querySelector('.user-memes').style.display = 'block';
}

function renderCanvasUserMemes() {
    let memes = loadFromStorage(STORAGE_KEY);
    var strHTML = '';
    memes.forEach((meme, idx) => {
        strHTML += `<canvas class="save-canvas" id="${idx}-canvas" width="200" height="200" style="outline:1px solid gray;"></canvas>`
    });

    let elUserMemes= document.querySelector('.user-memes');
    elUserMemes.innerHTML = strHTML;
}

function renderUserMemes() {
    let memes = loadFromStorage(STORAGE_KEY);
    memes.forEach((meme, idx) => {
        let elCanvas = document.getElementById(`${idx}-canvas`);
        let ctx = elCanvas.getContext('2d');
        let elImg = document.querySelector(`.img-${meme.selectedImgId}`);
        ctx.drawImage(elImg, 0, 0, elCanvas.width, elCanvas.height);
        // drawImg(meme.selectedImgId);
        // meme.lines.forEach(line => {
        //     drawText(line.txt, line.pos.x, line.pos.y, line.colorFill, line.colorStroke, line.font, line.size, line.align);
        // });
    });
}