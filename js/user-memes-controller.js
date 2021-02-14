'use strict'

function onMemes() {
    document.querySelector('.meme-editor').style.display = 'none';
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.search-container').style.display = 'none';
    document.querySelector('.user-memes').style.display = 'grid';
    renderUserMemes();
}

function renderUserMemes() {
    let memes = loadFromStorage(STORAGE_KEY);
    if (!memes) return;
    var strHTML = '';
    memes.forEach((meme) => {
        strHTML += `<img class="user-img" src="${meme.url}" onclick="onUserMeme(${meme})">`
    });
    
    let elUserMemes= document.querySelector('.user-memes');
    elUserMemes.innerHTML = strHTML;
}

function onUserMeme(meme) {
    console.log(meme)
    document.querySelector('.user-memes').style.display = 'none';
    document.querySelector('.meme-editor').style.display = 'grid';
    // gMeme = meme;
    // initCanvas();
}