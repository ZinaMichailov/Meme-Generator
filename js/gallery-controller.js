'use strict'

function renderGallery(){
    let imgs = getImgs();
    let strHTML = '';
    imgs.forEach(img => {
        strHTML += `<img class="img-${img.id}" onclick="onImg(${img.id})" src="img/meme-imgs/${img.id}.jpg">\n`;
    }); 

    let elGallery = document.querySelector('.gallery');
    elGallery.innerHTML = strHTML;
}

function onImg(imgIdx) {
    updateMeme(imgIdx);
    initCanvas();
    document.querySelector('.meme-editor').style.display = 'grid';
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.search-container').style.display = 'none';
    document.querySelector('.user-memes').style.display = 'none';
}

function onGallery() {
    document.querySelector('.meme-editor').style.display = 'none';
    document.querySelector('.user-memes').style.display = 'none';
    document.querySelector('.gallery').style.display = 'grid';
    document.querySelector('.search-container').style.display = 'block';
}

