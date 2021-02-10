'use strict'

let gIsImgSelected = false

function renderGallery(){
    var imgs = getImgs();
    var strHTML = '';
    imgs.forEach(img => {
        strHTML += `<img class="img-${img.id}" onclick="onImg(${img.id})" src="img/meme-imgs/${img.id}.jpg">\n`;
    }); 

    var elGallery = document.querySelector('.gallery');
    elGallery.innerHTML = strHTML;
}

function onImg(imgIdx) {
    updateMeme(imgIdx);
    gIsImgSelected = true;
    initCanvas();
}