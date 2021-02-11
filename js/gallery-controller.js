'use strict'

function renderGallery(imgs = getImgs()) {
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

function onSearch(ev) {
    ev.preventDefault(); 

    let word = document.querySelector('input[name=search]').value;
    let keywords = getKeywords();
    if (keywords[word] > 0) {
        let imgs = sortBtKeyword(word);
        renderGallery(imgs);
    } else {
        renderGallery();
    }
}
renderKeywords()
function renderKeywords() {
    let keywords = getKeywords();
    let strHTML = '';
    for (const key in keywords) {
        strHTML +=`<span class="keyword" onclick="onKeyword(this)">${key}</span>`;
    }

    let elContainer = document.querySelector('.keywords-container');
    elContainer.innerHTML = strHTML;
}

function onKeyword(elKeyword) {
    let style = window.getComputedStyle(elKeyword, null).getPropertyValue('font-size');
    let currentSize = parseFloat(style);
    elKeyword.style.fontSize = (currentSize + 10) + 'px';
    // let imgs = sortBtKeyword(keyword);
    // renderGallery(imgs);

}

