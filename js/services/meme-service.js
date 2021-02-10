'use strict'

let gImgs = [
    {id: 1, url: 'img/meme-imgs/1.jpg', keywords: ['politicians', 'angry']},
    {id: 2, url: 'img/meme-imgs/2.jpg', keywords: ['animals', 'sweet']},
    {id: 3, url: 'img/meme-imgs/3.jpg', keywords: ['animals', 'sweet', 'sleep', 'baby']},
    {id: 4, url: 'img/meme-imgs/4.jpg', keywords: ['animals', 'sleep']},
    {id: 5, url: 'img/meme-imgs/5.jpg', keywords: ['baby', 'angry']},
    {id: 6, url: 'img/meme-imgs/6.jpg', keywords: ['happy', 'excited', 'tv']},
    {id: 7, url: 'img/meme-imgs/7.jpg', keywords: ['baby', 'surprised']},
    {id: 8, url: 'img/meme-imgs/8.jpg', keywords: ['happy', 'excited']},
    {id: 9, url: 'img/meme-imgs/9.jpg', keywords: ['happy', 'excited', 'conspiracy']},
    {id: 10, url: 'img/meme-imgs/10.jpg', keywords: ['happy', 'politicians']},
    {id: 11, url: 'img/meme-imgs/11.jpg', keywords: ['angry', 'fight']},
    {id: 12, url: 'img/meme-imgs/12.jpg', keywords: ['explain', 'tv', 'righteous', 'celeb']},
    {id: 13, url: 'img/meme-imgs/13.jpg', keywords: ['celeb', 'happy']},
    {id: 14, url: 'img/meme-imgs/14.jpg', keywords: ['celeb', 'tv', 'movie', 'surprised']},
    {id: 15, url: 'img/meme-imgs/15.jpg', keywords: ['celeb', 'tv', 'movie', 'explain']},
    {id: 16, url: 'img/meme-imgs/16.jpg', keywords: ['celeb', 'tv', 'movie', 'happy', 'excited']},
    {id: 17, url: 'img/meme-imgs/17.jpg', keywords: ['politicians', 'explain']},
    {id: 18, url: 'img/meme-imgs/18.jpg', keywords: ['tv', 'explain', 'surprised']},
];

let gKeywords = _mapKeywords(gImgs);
console.log(gKeywords);
let id = 18;

let gMeme;

function updateMeme(imgIdx) {
    gMeme = { 
        selectedImgId: imgIdx, 
        selectedLineIdx: 0, 
        lines: [] 
    };
    console.log(gMeme)
}

function createLine(txt) {
    return { 
        txt: txt, 
        size: 40, 
        align: 'left', 
        color: 'white' 
    }
}

function getMeme() {
    return gMeme;
}

function getImgs() {
    return gImgs;
}

function _mapKeywords() {
    var res = gImgs.reduce(function (obj, currObj) {
        currObj.keywords.forEach(keyword => {
            if (!obj[keyword]) {
                obj[keyword] = 1;
            } else {
                obj[keyword]++;
            }
        });
        return obj;
    }, {})
    return res;
}