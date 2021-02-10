'use strict'

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
    initCanvas();
    document.querySelector('.meme-editor').style.display = 'grid';
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.search-container').style.display = 'none';
}

