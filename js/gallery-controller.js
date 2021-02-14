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
    document.querySelector('input[name=txt]').value = '';
    updateMeme(imgIdx);
    initCanvas();
    addListeners();
    document.querySelector('.meme-editor').style.display = 'grid';
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.search-container').style.display = 'none';
    document.querySelector('.user-memes').style.display = 'none';
    document.querySelector('.about').style.display = 'none';
}

function onGallery() {
    document.querySelector('.meme-editor').style.display = 'none';
    document.querySelector('.user-memes').style.display = 'none';
    document.querySelector('.gallery').style.display = 'grid';
    document.querySelector('.search-container').style.display = 'block';
    document.querySelector('.about').style.display = 'flex';
    renderGallery();
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

function renderKeywords() {
    let keywords = getKeywords();
    let strHTML = '';
    for (const key in keywords) {
        strHTML +=`<div class="keyword" onclick="onKeyword(this, '${key}')">${key}</div>`;
    }

    let elContainer = document.querySelector('.keywords-container');
    elContainer.innerHTML = strHTML;
    document.querySelector('.more-keywords').style.display = 'none';
}

function onKeyword(elKeyword, keyword) {
    let style = window.getComputedStyle(elKeyword, null).getPropertyValue('font-size');
    let currentSize = parseFloat(style);
    elKeyword.style.fontSize = (currentSize + 10) + 'px';
    let imgs = sortBtKeyword(keyword);
    renderGallery(imgs);
}

function onMore() {
    let elKeywords = document.querySelector('.more-keywords');
    if ( elKeywords.style.display === 'none') {
        elKeywords.style.display = 'flex';
        document.querySelector('.more').innerText = 'less...';
    } else {
        elKeywords.style.display = 'none';
        document.querySelector('.more').innerText = 'more...';
    }
}

